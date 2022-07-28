import { User } from '../models/User';
import { database } from '../database';
import { RequestHandler } from 'express';

const repo = database.getRepository(User);

export const getUser: RequestHandler = async (_, res) => {
  try {
    const users = await repo.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).send({
      message: err,
    })
  }
}