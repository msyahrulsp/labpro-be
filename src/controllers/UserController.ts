import { User } from "../models/User";
import database from '../database';

const repo = database.getRepository(User);

export const getUser = async () => {
  try {
    const users = await repo.find();
    return users;
  } catch (err) {
    console.log(err)
    return [];
  }
}