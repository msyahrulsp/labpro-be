import { RequestHandler } from "express";
import { database } from "../database";
import { User } from "../models/User";
import { History } from "../models/History";
import { getUsernameFromToken } from "../middlewares/Token";
import { IDRRate } from "../middlewares/Currency";
import { currencyList } from "../util/symbols";

const userRepo = database.getRepository(User);
const historyRepo = database.getRepository(History);

export const transferHandler: RequestHandler = async (req, res) => {
  const user = getUsernameFromToken(req.headers.authorization);
  const { username, norek, currency, nominal  } = req.body;
  if (user !== username) {
    res.status(400).json({
      message: "You must be logged in to transfer",
    })
    return;
  }
  if (!currencyList.includes(currency)) {
    res.status(400).json({
      message: "Invalid currency",
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
      res.status(404).json({
        message: "No user found with this account number",
      })
      return;
    }
    if (!userDest.status_akun) {
      res.status(401).json({
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
      res.status(404).json({
        message: "No user found with this username",
      })
      return;
    }
    if (userSource.norek === userDest.norek) {
      res.status(400).json({
        message: "You cannot transfer to your own account",
      })
      return;
    }

    const rate = await IDRRate(currency);
    if (rate === null) {
      res.status(500).json({
        message: "Failed to get exchange rate",
      })
      return;
    } 
    const newNominal = rate * nominal;
    if (userSource.saldo < newNominal) {
      res.status(400).json({
        message: "Insufficient balance",
      })
      return;
    }
    userDest.saldo += newNominal;
    userSource.saldo -= newNominal;

    const newHistory = new History();
    newHistory.user = userSource;
    newHistory.tipe_transaksi = 'transfer';
    newHistory.tipe_util = `${userDest.nama} (${userDest.norek})`;
    newHistory.nominal = nominal;
    newHistory.currency = currency;
    newHistory.created_at = new Date();
    newHistory.status = 'success';
    await userRepo.save(userDest);
    await userRepo.save(userSource);
    await historyRepo.save(newHistory);
    res.json({
      message: "SUCCESS",
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  } 
}