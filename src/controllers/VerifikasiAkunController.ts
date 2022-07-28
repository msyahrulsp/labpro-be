import { VerifikasiAkun } from '../models/VerifikasiAkun';
import { database } from '../database';
import { RequestHandler } from 'express';

const repo = database.getRepository(VerifikasiAkun);

export const getVerif: RequestHandler = async (_, res) => {
  try {
    const verif = await repo.find({
      relations: ['user']
    });
    res.status(200).json(verif)
  } catch (err) {
    res.status(400).send({
      message: err,
    })
  }
}