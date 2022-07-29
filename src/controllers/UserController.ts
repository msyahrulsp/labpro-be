import { User } from '../models/User';
import { database } from '../database';
import { RequestHandler } from 'express';
import { IResponse } from '../interfaces/IResponse';
import { IUser } from '../interfaces/IUser';
import { isAdmin } from '../middlewares/Token';

const repo = database.getRepository(User);;

export const getUser: RequestHandler = async (req, res) => {
  if (!isAdmin(req.headers.authorization)) {
    res.json({
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
    const response: IResponse<IUser[]> = {
      message: 'SUCCESS',
      data: users,
    }
    res.json(response);
  } catch (err: any) {
    res.json({
      message: err.message,
      data: []
    })
  }
}