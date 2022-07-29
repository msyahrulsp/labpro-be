import { VerifikasiAkun } from '../models/VerifikasiAkun';
import { History } from '../models/History';
import { database } from '../database';
import { RequestHandler } from 'express';
import { IResponse } from '../interfaces/IResponse';
import { IVerifikasiAkun } from '../interfaces/IVerifikasiAkun';
import { IHistory } from '../interfaces/IHistory';
import { isAdmin } from '../middlewares/Token';
import { User } from '../models/User';

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
    if (isAccepted) {
      const curUser = verifRequest.user;
      // panggil exchange
      curUser.saldo += verifRequest.nominal;
      verifRequest.status = 'accepted';
      await userRepo.save(curUser);
      await verifRequestRepo.save(verifRequest);
    } else {
      verifRequest.status = 'rejected';
      await verifRequestRepo.save(verifRequest);
    }
    res.json({
      message: "SUCCESS"
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}