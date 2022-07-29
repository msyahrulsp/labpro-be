import { RequestHandler } from "express";
import { database } from "../database";
import { User } from "../models/User";
import { History } from "../models/History";
import { getUsernameFromToken } from "../middlewares/Token";

const userRepo = database.getRepository(User);
const historyRepo = database.getRepository(History);

export const transferHandler: RequestHandler = async (req, res) => {
  const user = getUsernameFromToken(req.headers.authorization);
  const { username, norek, currency, nominal  } = req.body;
  if (user !== username) {
    res.json({
      message: "You must be logged in to transfer",
    })
    return;
  }
  try {
    const userDest = await userRepo.findOne({
      where: {
        norek
      }
    })
    if (!userDest) {
      res.json({
        message: "No user found with this account number",
      })
      return;
    }
    if (!userDest.status_akun) {
      res.json({
        message: "User account is not verified",
      })
      return;
    }
    const userSource = await userRepo.findOne({
      where: {
        username
      }
    })
    if (!userSource || !userSource.status_akun) {
      res.json({
        message: "No user found with this username",
      })
      return;
    }
    const newHistory = new History();
    newHistory.user = userSource;
    newHistory.tipe_transaksi = 'transfer';
    newHistory.tipe_util = `${userDest.nama} (${userDest.norek})`;
    newHistory.nominal = nominal;
    newHistory.currency = currency;
    newHistory.created_at = new Date();
    newHistory.status = 'success';

    // panggil exchange
    userDest.saldo += nominal;
    userSource.saldo -= nominal;
    await userRepo.save(userDest);
    await userRepo.save(userSource);
    await historyRepo.save(newHistory);
    res.json({
      message: "SUCCESS",
    })
  } catch (err: any) {
    res.json({
      message: err.message,
    })
  } 
}