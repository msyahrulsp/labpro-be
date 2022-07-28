import { Express } from 'express'
import { getUser } from './controllers/UserController';
import { getVerif } from './controllers/VerifikasiAkunController';

const routes = (app: Express) => {
  app.route('/').get((_, res) => {
    res.status(200).json({
      message: 'API is Working',
    })
  })
  app.route('/user').get(getUser);
  app.route('/verifikasi').get(getVerif);
}

export default routes;