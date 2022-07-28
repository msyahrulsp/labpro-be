import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToOne
} from 'typeorm';
import { VerifikasiAkun } from './VerifikasiAkun';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  nama: string;
  
  @Column()
  role: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  ktp: string;

  @Column({ nullable: true })
  norek: string;

  @Column({ nullable: true })
  saldo: number;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  status_akun: boolean;

  @OneToOne(
    () => VerifikasiAkun,
    verifikasi_akun => verifikasi_akun.user
  )
  verifikasi_akuns: VerifikasiAkun;
}