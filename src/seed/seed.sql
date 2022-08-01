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
  `created_at` datetime DEFAULT NULL,
  `status_akun` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_user`)
);

INSERT INTO `bnmo`.`user` (`nama`, `username`, `password`, `role`, `created_at`, `status_akun`)
  VALUES ('Mr Admin','admin','$2a$10$yxbCU4qZ2g0CX/uRKDvxkuoExx6UQjKf0zDjlDzZAd.IHR6BaBqZy','admin','2022-07-28 19-00-00', 1);

INSERT INTO `bnmo`.`user` (`nama`, `role`, `username`, `password`, `ktp`, `norek`, `saldo`, `created_at`, `status_akun`)
  VALUES
    ('Bimo','customer','customer','$2a$10$cQIm5VpVrPgjXG6E8lTm3O0tzxOAvJhQRXLGcbDhg4U0daUIsClMu',NULL,'1111234567',1000000,'2022-07-28 19-00-00',1),
    ('M Syahrul SP','customer','13520161','$2a$10$nprHYjJ9tmCvmW81jNCpSOr7tC/niA9p06gzjc/LNmsO.P7B9leYe','13520161.jpg','1117654321',1000000,'2022-07-28 19-00-00',1),
    ('Piye Kabare','customer','piyekabare', '$2a$10$KOKjzci6oBlnuAPSSHLn1.iJCuXSRIMwJc377P73AJATiP.fqxNe2','piyekabare.png','1114285106',0,'2022-07-28 14-21-32',0);

DROP TABLE IF EXISTS `bnmo`.`history`;
CREATE TABLE `bnmo`.`history` (
  `id_history` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `tipe_transaksi` varchar(8) NOT NULL,
  `tipe_util` varchar(50) NOT NULL,
  `nominal` int(11) NOT NULL,
  `currency` varchar(5) NOT NULL,
  `created_at` datetime NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_history`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `history_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
  ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `bnmo`.`history` (`id_user`, `tipe_transaksi`, `tipe_util`, `nominal`, `currency`, `created_at`, `status`)
  VALUES
    (2, 'request', 'penambahan', 100, 'USD', '2022-07-28 19-00-00', 'accepted'),
    (2, 'request', 'pengurangan', 50, 'USD', '2022-07-28 19-00-00', 'pending'),
    (2, 'request', 'penambahan', 2000, 'EUR', '2022-07-28 19-00-00', 'rejected'),
    (2, 'transfer', 'M Syahrul SP (1117654321)', 100, 'GBP', '2022-07-29 20-00-00', 'success');

DROP TABLE IF EXISTS `bnmo`.`verifikasi_akun`;
CREATE TABLE `bnmo`.`verifikasi_akun` (
  `id_verifikasi_akun` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id_verifikasi_akun`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `verifikasi_akun_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
  ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO `bnmo`.`verifikasi_akun` (`id_user`, `created_at`)
  VALUES
    (4, '2022-07-28 14-21-32');