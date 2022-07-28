import { IUser } from "./IUser";

export interface IVerifikasiAkun {
  id_verifikasi_akun: number;
  user?: IUser;
  created_at: Date;
}