import { VerifikasiAkun } from "../models/VerifikasiAkun";
import { database } from '../database';

const repo = database.getRepository(VerifikasiAkun);

export const getVerif = async () => {
  try {
    const users = await repo.find({
      relations: ['user']
    });
    return users;
  } catch (err) {
    console.log(err)
    return [];
  }
}