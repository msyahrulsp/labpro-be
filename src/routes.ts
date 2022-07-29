import { Express } from 'express'
import { getVerifAkun, getVerifRequest, getVerifRequestbyType } from './controllers/VerifikasiController';
import { loginHandler, registerHandler } from './controllers/AuthController';
import { getUser } from './controllers/UserController';
import { getSelfHistory } from './controllers/HistoryController';
import { transferHandler } from './controllers/TransferController';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.status(200).json({
      message: 'API is Working',
      data: []
    })
  })
  app.route('/login').post(loginHandler);
  app.route('/register').post(registerHandler);
  // TODO Belum di test
  app.route('/transfer').post(transferHandler);
  // TODO belum di implement
  app.route('/verification/accounts').get(getVerifAkun);
  app.route('/verification/requests').get(getVerifRequest);
  app.route('/verification/requests/:tipe').get(getVerifRequestbyType);
  //
  app.route('/history/:username').get(getSelfHistory);
  app.route('/users').get(getUser);
  app.route('*').get((_, res) => {
    res.status(404).json({
      message: 'Path Not Found',
      data: []
    })
  })
}

export default routes;