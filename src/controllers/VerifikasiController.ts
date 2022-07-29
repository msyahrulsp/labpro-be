import { VerifikasiAkun } from '../models/VerifikasiAkun';
import { History } from '../models/History';
import { database } from '../database';
import { RequestHandler } from 'express';
import { IResponse } from '../interfaces/IResponse';
import { IVerifikasiAkun } from '../interfaces/IVerifikasiAkun';
import { IHistory } from '../interfaces/IHistory';

const verifAkunRepo = database.getRepository(VerifikasiAkun);
const verifRequestRepo = database.getRepository(History);

export const getVerifAkun: RequestHandler = async (_, res) => {
  try {
    const verifAkun = await verifAkunRepo.find();
    const payload: IResponse<IVerifikasiAkun[]> = {
      message: 'SUCCESS',
      data: verifAkun,
    }
    res.json(payload);
  } catch (err: any) {
    res.json({
      message: err.message,
    })
  }
}

export const getVerifRequest: RequestHandler = async (_, res) => {
  try {
    const verifRequest = await verifRequestRepo.find();
    const payload: IResponse<IHistory[]> = {
      message: 'SUCCESS',
      data: verifRequest,
    }
    res.json(payload);
  } catch (err: any) {
    res.json({
      message: err.message
    })
  }
}

export const getVerifRequestbyType: RequestHandler = async (req, res) => {
  const { tipe } = req.params;
  try {
    const verifRequest = await verifRequestRepo.find({
      where: {
        tipe_transaksi: tipe
      }
    });
    const payload: IResponse<IHistory[]> = {
      message: 'SUCCESS',
      data: verifRequest,
    }
    res.json(payload);
  } catch (err: any) {
    res.json({
      message: err.message
    })
  }
}