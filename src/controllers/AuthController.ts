import { database } from "../database";
import { User } from "../models/User";
import { RequestHandler } from "express";
import { IResponse } from "../interfaces/IResponse";
import env from "../env";
import { VerifikasiAkun } from "../models/VerifikasiAkun";

const userRepo = database.getRepository(User);
const verifRepo = database.getRepository(VerifikasiAkun);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

export const loginHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.findOne({
      where: {
        username
      }
    })
    if (!user || (user && !bcrypt.compareSync(password, user.password))) {
      res.status(400).json({
        message: "Username or Password is incorrect",
      })
      return;
    }
    if (!user.status_akun) {
      res.status(401).json({
        message: "Account has not been verified",
      })
      return;
    }
    const token = jwt.sign({ user }, env.JWT_SECRET)
    const payload: IResponse<string> = {
      message: 'SUCCESS',
      data: token
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const registerHandler: RequestHandler = async (req, res) => {
  const { nama, username, password, ktp } = req.body;
  try {
    const user = await userRepo.findOne({
      where: {
        username
      }
    })
    if (user) {
      res.status(400).json({
        message: "Username already exists",
      })
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User();
    newUser.nama = nama;
    newUser.role = 'customer';
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.ktp = ktp;
    newUser.norek = '111'+Math.random().toString().slice(2,9);
    newUser.saldo = 0;
    newUser.created_at = new Date();
    newUser.status_akun = false;
    await userRepo.save(newUser);
    
    const newVerif = new VerifikasiAkun();
    newVerif.user = newUser;
    newVerif.created_at = new Date();
    await verifRepo.save(newVerif);

    res.json({
      message: "SUCCESS",
    })
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}