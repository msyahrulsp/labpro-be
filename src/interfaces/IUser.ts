import { IHistory } from "./IHistory";
import { IVerifikasiAkun } from "./IVerifikasiAkun";

export interface IUser {
  id_user: number;
  nama: string;
  role: string;
  username: string;
  password: string;
  ktp?: string;
  norek?: string;
  saldo?: number;
  created_at?: Date;
  status_akun?: boolean;
  verifikasi_akun?: IVerifikasiAkun;
  history?: IHistory[];
}