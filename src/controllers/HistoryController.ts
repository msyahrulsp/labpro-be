import { History } from '../models/History';
import { database } from '../database';
import { RequestHandler } from 'express';

const repo = database.getRepository(History);

export const getHistroy: RequestHandler = async (_, res) => {
  try {
    const hist = await repo.find({
      relations: ['user']
    })
    res.status(200).json(hist)
  } catch (err) {
    res.status(400).send({
      message: err,
    })
  }
}