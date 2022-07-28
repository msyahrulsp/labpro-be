CREATE DATABASE `bnmo`;

DROP TABLE IF EXISTS `bnmo`.`user`;
CREATE TABLE `bnmo`.`user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `role` varchar(10) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` char(255) NOT NULL,
  `ktp` varchar(100) DEFAULT NULL,
  `norek` varchar(50) DEFAULT NULL,
  `saldo` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `status_akun` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
);

INSERT INTO `bnmo`.`user` (`nama`, `username`, `password`, `role`, `created_at`)
  VALUES (12345,"admin",'admin','admin','2022-07-28');

INSERT INTO `bnmo`.`user` (`nama`, `role`, `username`, `password`, `norek`, `saldo`, `created_at`, `status_akun`)
  VALUES
    ("Bimo",'customer','customer','customer','12345678',1000000,'2022-07-28',1),
    ("M Syahrul SP","customer",'13520161','13520161','87654321',1000000,'2022-07-28',0);

DROP TABLE IF EXISTS `bnmo`.`history`;
CREATE TABLE `bnmo`.`history` (
  `id_history` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tipe_transaksi` varchar(8) NOT NULL,
  `tipe_util` varchar(50) NOT NULL,
  `nominal` int(11) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `created_at` date NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_history`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
);

INSERT INTO `bnmo`.`history` (`id_user`, `tipe_transaksi`, `tipe_util`, `nominal`, `currency`, `created_at`, `status`)
  VALUES
    (2, 'request', 'penarikan', 200000, 'USD', '2022-07-28', 'success'),
    (2, 'request', 'pengurangan', 200000, 'USD', '2022-07-28', 'pending'),
    (2, 'transfer', '20ASDsa', 200000, 'IDR', '2022-07-28', 'pending');

DROP TABLE IF EXISTS `bnmo`.`verifikasi_akun`;
CREATE TABLE `bnmo`.`verifikasi_akun` (
  `id_verifikasi_akun` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id_verifikasi_akun`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `verifikasi_akun_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
);

INSERT INTO `bnmo`.`verifikasi_akun` (`id_user`, `created_at`)
  VALUES
    (3, '2022-07-28');