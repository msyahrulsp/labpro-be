import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nama: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  ktp: string;

  @Column({ nullable: true })
  norek: string;

  @Column({ nullable: true })
  saldo: number;

  @CreateDateColumn()
  date: Date;

  @Column()
  status: boolean;
}