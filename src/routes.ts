import { Express } from 'express'
import { getVerifAkun, getVerifRequest, putVerifAkun, putVerifRequest, postVerifRequest } from './controllers/VerifikasiController';
import { loginHandler, userDataHandler, registerHandler } from './controllers/AuthController';
import { getUser } from './controllers/UserController';
import { getSelfHistory } from './controllers/HistoryController';
import { transferHandler } from './controllers/TransferController';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.status(200).json({
      message: 'API is Working'
    })
  })
  app.route('/login').post(loginHandler);
  app.route('/login').get(userDataHandler);
  app.route('/register').post(registerHandler);
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