CREATE DATABASE `bnmo`;

DROP TABLE IF EXISTS `bnmo`.`user`;
CREATE TABLE `bnmo`.`user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(25) NOT NULL,
  `role` varchar(8) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `ktp` varchar(1000) DEFAULT NULL,
  `norek` varchar(50) DEFAULT NULL,
  `saldo` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `statusAkun` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
);
INSERT INTO `bnmo`.`user`
  VALUES (1,'Admin','admin','admin','admin',NULL,NULL,NULL,'2022-07-28',NULL),
  (2,'Budi','customer','customer','customer',NULL,'12345678',1000000,'2022-07-28',1),
  (3,'M Syahrul SP','customer','13520161','13520161',NULL,'87654321',1000000,'2022-07-28',1);

DROP TABLE IF EXISTS `bnmo`.`history`;
CREATE TABLE `bnmo`.`history` (
  `id_history` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tipe_transaksi` varchar(8) NOT NULL,
  `tipe_util` varchar(50) NOT NULL,
  `nominal` int(11) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `created_at` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_history`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
);

DROP TABLE IF EXISTS `bnmo`.`verifikasi_akun`;
CREATE TABLE `bnmo`.`verifikasi_akun` (
  `id_verifikasi_history` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_verifikasi_history`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `verifikasi_akun_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
);

DROP TABLE IF EXISTS `bnmo`.`verifikasi_request`;
CREATE TABLE `bnmo`.`verifikasi_request` (
  `id_verifikasi_request` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `created_at` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_verifikasi_request`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `verifikasi_request_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
);