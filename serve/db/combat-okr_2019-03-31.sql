# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: combat-okr
# Generation Time: 2019-03-31 15:46:03 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `keyresult`;

CREATE TABLE `keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `objective_id` int(11) DEFAULT NULL COMMENT '关联的目标 id',
  `title` varchar(255) DEFAULT NULL COMMENT '成就名称',
  `status` int(11) DEFAULT NULL COMMENT '状态：0-未完成，1-完成 ',
  `created_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `finished_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `keyresult` WRITE;
/*!40000 ALTER TABLE `keyresult` DISABLE KEYS */;

INSERT INTO `keyresult` (`id`, `objective_id`, `title`, `status`, `created_time`, `finished_time`)
VALUES
	(31,13,'打开速度快 30%',0,'2019-03-31 20:31:25',NULL),
	(32,13,'感知上也很快',1,'2019-03-31 20:31:25','2019-03-31 20:32:57');

/*!40000 ALTER TABLE `keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table objective
# ------------------------------------------------------------

DROP TABLE IF EXISTS `objective`;

CREATE TABLE `objective` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户 id',
  `title` varchar(255) DEFAULT NULL COMMENT '目标',
  `status` int(11) DEFAULT '0' COMMENT '状态：0-未完成，1-完成 ',
  `created_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `finished_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `objective` WRITE;
/*!40000 ALTER TABLE `objective` DISABLE KEYS */;

INSERT INTO `objective` (`id`, `user_id`, `title`, `status`, `created_time`, `finished_time`)
VALUES
	(13,1,'我想让网站打开速度快一些',0,'2019-03-31 20:31:25',NULL);

/*!40000 ALTER TABLE `objective` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo`;

CREATE TABLE `todo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL COMMENT '用户 id',
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `status` int(11) DEFAULT NULL COMMENT '状态：0-未完成，1-完成 ',
  `created_time` timestamp NULL DEFAULT NULL COMMENT '创建时间',
  `finished_time` timestamp NULL DEFAULT NULL COMMENT '完成时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `todo` WRITE;
/*!40000 ALTER TABLE `todo` DISABLE KEYS */;

INSERT INTO `todo` (`id`, `user_id`, `title`, `status`, `created_time`, `finished_time`)
VALUES
	(11,1,'图片资源压缩和代理',0,'2019-03-31 20:29:15',NULL),
	(12,1,'JavaScript 代码压缩',0,'2019-03-31 20:29:21',NULL),
	(13,1,'替换提及较大的资源库',0,'2019-03-31 20:29:27',NULL),
	(14,1,'添加 Loading',1,'2019-03-31 20:31:34','2019-03-31 20:32:49');

/*!40000 ALTER TABLE `todo` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table todo_keyresult
# ------------------------------------------------------------

DROP TABLE IF EXISTS `todo_keyresult`;

CREATE TABLE `todo_keyresult` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `todo_id` int(11) DEFAULT NULL COMMENT 'todo id',
  `keyresult_id` int(11) DEFAULT NULL COMMENT 'keyresult id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `todo_keyresult` WRITE;
/*!40000 ALTER TABLE `todo_keyresult` DISABLE KEYS */;

INSERT INTO `todo_keyresult` (`id`, `todo_id`, `keyresult_id`)
VALUES
	(24,14,32),
	(25,13,31),
	(26,12,31),
	(29,11,31);

/*!40000 ALTER TABLE `todo_keyresult` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) DEFAULT NULL,
  `union_id` varchar(255) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `open_id`, `union_id`, `created_time`)
VALUES
	(1,'o3V8Y42qHoT92lbVC8iLPcuX4q-Q',NULL,NULL),
	(2,'o3V8Y42qHoT2lbVC8iLPcuX4q-Q',NULL,NULL),
	(3,'o3V8Y42qHoT92lbVC8iLcuX4q-Q',NULL,NULL);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
