import { User } from '../models/User';
import { database } from '../database';
import { RequestHandler } from 'express';
import { IResponse } from '../interfaces/IResponse';
import { IHistory } from '../interfaces/IHistory';
import { getUsernameFromToken } from '../middlewares/Token';

const repo = database.getRepository(User);

export const getSelfHistory: RequestHandler = async (req, res) => {
  const user = getUsernameFromToken(req.headers.authorization);
  const { username } = req.params;
  // admin gk perlu lha ya buat liat data orang
  if (user !== username) {
    res.status(401).json({
      message: "You are not authorized to access this data",
    })
    return;
  }
  try {
    const curUser = await repo.findOne({
      relations: ['history'],
      where: {
        username
      }
    })
    if (!curUser) {
      res.status(404).json({
        message: 'Specified user not found',
      })
      return;
    }
    const payload: IResponse<IHistory[]> = {
      message: 'SUCCESS',
      data: curUser.history
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}