import { User } from '../models/User';
import { database } from '../database';
import { RequestHandler } from 'express';
import { IResponse } from '../interfaces/IResponse';
import { IUser } from '../interfaces/IUser';
import { isAdmin } from '../util/token';

const repo = database.getRepository(User);;

export const getUser: RequestHandler = async (req, res) => {
  if (!isAdmin(req.headers.authorization)) {
    res.status(403).json({
      message: 'You are not authorized to access this resource'
    })
    return;
  }
  try {
    const users = await repo.find({
      where: {
        role: 'customer'
      }
    });
    const payload: IResponse<IUser[]> = {
      message: 'SUCCESS',
      data: users,
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message
    })
  }
}