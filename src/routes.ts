import { Express } from 'express'
import { getHistroy } from './controllers/HistoryController';
import { getAllUser } from './controllers/UserController';
import { getVerifAkun } from './controllers/VerifikasiAkunController';
import { loginHandler } from './controllers/AuthController';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.status(200).json({
      message: 'API is Working',
      data: []
    })
  })
  app.route('/login').post(loginHandler);
  app.route('/register').post();
  app.route('/transfer').post();
  app.route('/verifikasi/akun').get(getVerifAkun);
  app.route('/verifikasi/request').get(getHistroy);
  app.route('/history').get();
  app.route('/history/:username').get();
  app.route('/history').post();
  app.route('/users').get(getAllUser);
  app.route('*').get((_, res) => {
    res.status(404).json({
      message: 'Path Not Found',
      data: []
    })
  })
}

export default routes;