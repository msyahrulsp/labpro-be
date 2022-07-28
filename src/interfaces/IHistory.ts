import { IUser } from "./IUser";

export interface IHistory {
  id_history: number;
  user?: IUser;
  tipe_transaksi: string;
  tipe_util: string;
  nominal: number;
  currency: string;
  created_at: Date;
  status: string;
}