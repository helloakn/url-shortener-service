CREATE TABLE `tblShortenedURL` (
  `id` int NOT NULL AUTO_INCREMENT,
  `short_code` varchar(25) NOT NULL,
  `url` varchar(45) NOT NULL,
  `expiration_date_time` datetime NOT NULL,
  `hitcount` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);
