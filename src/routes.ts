import { Express } from 'express'
import { getHistroy } from './controllers/HistoryController';
import { getUser } from './controllers/UserController';
import { getVerifAkun } from './controllers/VerifikasiAkunController';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.status(200).json({
      message: 'API is Working',
    })
  })
  app.route('/user').get(getUser);
  app.route('/verifikasi/akun').get(getVerifAkun);
  app.route('/verifikasi/request').get(getHistroy);
}

export default routes;