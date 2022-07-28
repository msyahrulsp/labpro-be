import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class VerifikasiAkun {
  @PrimaryGeneratedColumn()
  id_verifikasi_akun: number;

  @OneToOne(
    () => User,
    user => user.id_user,
    { cascade: true}
  )
  @JoinColumn({ name: 'id_user' })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}