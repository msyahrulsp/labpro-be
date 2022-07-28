import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column
} from "typeorm";
import { User } from './User';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id_history: number;

  @ManyToOne(
    () => User,
    user => user.id_user,
    { cascade: true }
  )
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  tipe_transaksi: string;

  @Column()
  tipe_util: string;

  @Column()
  nominal: number;

  @Column()
  currency: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  status: string;
}