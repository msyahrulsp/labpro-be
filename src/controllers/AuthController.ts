import { database } from "../database";
import { User } from "../models/User";
import { RequestHandler } from "express";
import { IResponse } from "../interfaces/IResponse";
import env from "../env";
import { VerifikasiAkun } from "../models/VerifikasiAkun";
import { Not } from "typeorm";
import { getUserFromToken } from "../middlewares/Token";

const userRepo = database.getRepository(User);
const verifRepo = database.getRepository(VerifikasiAkun);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require('fs');

interface AuthProps {
  token?: string,
  user: User,
  listRek: string[]
}

export const loginHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userRepo.findOne({
      where: {
        username
      }
    })
    if (!user) {
      res.status(404).json({
        message: "No user found with that username",
      })
      return;
    }
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(400).json({
        message: "Username or Password is incorrect",
      })
      return;
    }
    if (!user.status_akun) {
      res.status(400).json({
        message: "Account has not been verified",
      })
      return;
    }
    const reks = await userRepo.find({
      select: {
        norek: true
      },
      where: {
        status_akun: true,
        username: Not(user.username)
      }
    })
    const rek = user.role === 'customer' ? (
      reks.map(({ norek }) => {
        return norek;
      })
    ) : []
    const token = jwt.sign({ user }, env.JWT_SECRET)
    const payload: IResponse<AuthProps> = {
      message: 'SUCCESS',
      data: {
        token,
        user,
        listRek: rek
      }
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  }
}

export const userDataHandler: RequestHandler = async (req, res) => {
  const user = getUserFromToken(req.headers.authorization);
  if (!user) {
    res.status(400).json({
      message: "Invalid token"
    })
    return;
  }
  try {
    const reks = await userRepo.find({
      select: {
        norek: true
      },
      where: {
        status_akun: true,
        username: Not(user.username)
      }
    })
    const rek = user.role === 'customer' ? (
      reks.map(({ norek }) => {
        return norek;
      })
    ) : []
    const payload: IResponse<AuthProps> = {
      message: 'SUCCESS',
      data: {
        user,
        listRek: rek
      }
    }
    res.json(payload);
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
    })
  } 
}

export const registerHandler: RequestHandler = async (req, res) => {
  const imageList: string[] = fs.readdirSync('./public/images');
  let existImage: boolean = false;
  let imageIdx: number = -1;
  for (let i = 0; i < imageList.length; i++) {
    if (imageList[i].includes(req.body.username)) {
      existImage = true;
      imageIdx = i;
      break;
    }
  }
  const { nama, username, password } = req.body;
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
    if (!existImage) {
      res.status(400).json({
        message: "KTP can only be .jpg, .jpeg, or .png and a maximum size of 2MB"
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
    newUser.ktp = imageList[imageIdx];
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