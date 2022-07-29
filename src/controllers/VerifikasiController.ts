import { VerifikasiAkun } from '../models/VerifikasiAkun';
import { History } from '../models/History';
import { database } from '../database';
import { RequestHandler } from 'express';
import { IResponse } from '../interfaces/IResponse';
import { IVerifikasiAkun } from '../interfaces/IVerifikasiAkun';
import { IHistory } from '../interfaces/IHistory';
import { getUsernameFromToken, isAdmin, isCustomer } from '../middlewares/Token';
import { User } from '../models/User';
import { IDRRate } from '../middlewares/Currency';

const verifAkunRepo = database.getRepository(VerifikasiAkun);
const verifRequestRepo = database.getRepository(History);
const userRepo = database.getRepository(User);

export const getVerifAkun: RequestHandler = async (req, res) => {
  if (!isAdmin(req.headers.authorization)) {
    res.status(403).json({
      message: 'You are not authorized to access this resource'
    })
    return;
  }
  try {
    const verifAkun = await verifAkunRepo.find({
      relations: ['user']
    });
    const payload: IResponse<IVerifikasiAkun[]> = {
      message: 'SUCCESS',
      data: verifAkun,
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const putVerifAkun: RequestHandler = async (req, res) => {
  const { username, isAccepted } = req.body;
  if (!isAdmin(req.headers.authorization)) {
    res.status(403).json({
      message: 'You are not authorized to access this resource'
    })
    return;
  }
  try {
    const verifAkun = await verifAkunRepo.findOne({
      relations: ['user'],
      where: {
        user: {
          username
        }
      }
    })
    if (!verifAkun) {
      res.status(404).json({
        message: 'Specified user not found'
      })
      return;
    }
    const curUser = verifAkun.user;
    if (isAccepted) {
      curUser.status_akun = true;
      await userRepo.save(curUser);
      await verifAkunRepo.remove(verifAkun);
    } else {
      await userRepo.remove(curUser);
    }
    res.json({
      message: 'SUCCESS'
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const getVerifRequest: RequestHandler = async (req, res) => {
  if (!isAdmin(req.headers.authorization)) {
    res.status(403).json({
      message: 'You are not authorized to access this resource'
    })
    return;
  }
  try {
    const verifRequest = await verifRequestRepo.find({
      relations: ['user'],
      where: {
        status: 'pending'
      }
    });
    const payload: IResponse<IHistory[]> = {
      message: 'SUCCESS',
      data: verifRequest,
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message
    })
  }
}

export const postVerifRequest: RequestHandler = async (req, res) => {
  const { username, tipe_request, currency, nominal } = req.body;
  const user = getUsernameFromToken(req.headers.authorization);
  if (!isCustomer(req.headers.authorization)) {
    res.status(401).json({
      message: 'You must be logged in as customer'
    })
    return;
  }
  if (user != username) {
    res.status(401).json({
      message: 'You are not authorized to post this'
    })
    return;
  }
  try {
    const usr = await userRepo.findOne({
      where: {
        username
      }
    })
    if (!usr) {
      res.status(404).json({
        message: 'Specified user not found'
      })
      return;
    }
    const rate = await IDRRate(currency);
    if (rate === null) {
      res.status(500).json({
        message: 'Failed to get exchange rate'
      })
      return;
    }
    const newNominal = nominal * rate;
    if (tipe_request === 'pengurangan') {
      if (usr.saldo < newNominal) {
        res.status(400).json({
          message: 'Insufficient balance'
        })
        return;
      }
      usr.saldo -= newNominal;
    }
    const newHistory = new History();
    newHistory.user = usr;
    newHistory.tipe_transaksi = 'request';
    newHistory.tipe_util = tipe_request;
    newHistory.currency = currency;
    newHistory.nominal = nominal;
    newHistory.created_at = new Date();
    newHistory.status = 'pending';

    await userRepo.save(usr);
    await verifRequestRepo.save(newHistory);
    res.json({
      message: 'SUCCESS'
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const putVerifRequest: RequestHandler = async (req, res) => {
  const { id , isAccepted } = req.body;
  if (!isAdmin(req.headers.authorization)) {
    res.status(403).json({
      message: 'You are not authorized to access this resource'
    })
    return;
  }
  try {
    const verifRequest = await verifRequestRepo.findOne({
      relations: ['user'],
      where: {
        id_history: id
      }
    })
    if (!verifRequest) {
      res.status(404).json({
        message: 'Specified request not found'
      })
      return;
    }
    const curUser = verifRequest.user;
    const rate = await IDRRate(verifRequest.currency);
    if (rate === null) {
      res.status(500).json({
        message: "Failed to get exchange rate",
      })
      return;
    }
    const newNominal = rate * verifRequest.nominal;
    if (isAccepted) {
      if (verifRequest.tipe_util === 'penambahan') {
        curUser.saldo += newNominal;
      }
      verifRequest.status = 'accepted';
    } else {
      verifRequest.status = 'rejected';
      if (verifRequest.tipe_util === 'pengurangan') {
        curUser.saldo += newNominal
      }
    }
    await userRepo.save(curUser);
    await verifRequestRepo.save(verifRequest);
    res.json({
      message: "SUCCESS"
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}