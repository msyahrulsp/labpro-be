import { Express } from 'express'
import { getVerifAkun, getVerifRequest, putVerifAkun, putVerifRequest, postVerifRequest } from './controllers/VerifikasiController';
import { loginHandler, userDataHandler, registerHandler } from './controllers/AuthController';
import { getUser } from './controllers/UserController';
import { getSelfHistory } from './controllers/HistoryController';
import { transferHandler } from './controllers/TransferController';

// Black magic
const multer = require('multer');
const path = require('path');
const validExt: string[] = ['.jpg', '.jpeg', 'png'];
const fileFilter = (req: any, file: any, cb: any) => {
  const fileSize = parseInt(req.headers["content-length"]);
  if (validExt.indexOf(path.extname(file.originalname)) === -1) {
    return cb(null, false);
  }
  if (fileSize >= 2097152) return cb(null, false);
  cb(null, true);
}
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, './public/images');
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, req.body.username + path.extname(file.originalname));
  }
})
const upload = multer({ storage: storage, fileFilter: fileFilter });

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.status(200).json({
      message: 'API is Working'
    })
  })
  app.route('/login').post(loginHandler);
  app.route('/login').get(userDataHandler);
  app.route('/register').post(upload.single('ktp'), registerHandler);
  app.route('/transfer').post(transferHandler);
  app.route('/verification/accounts').get(getVerifAkun);
  app.route('/verification/accounts').put(putVerifAkun);
  app.route('/verification/requests').get(getVerifRequest);
  app.route('/verification/requests').post(postVerifRequest);
  app.route('/verification/requests').put(putVerifRequest);
  app.route('/history/:username').get(getSelfHistory);
  app.route('/users').get(getUser);
  app.route('*').get((_, res) => {
    res.status(404).json({
      message: 'Path Not Found'
    })
  })
}

export default routes;