/*
SQLyog Community Edition- MySQL GUI v7.5 Beta1
MySQL - 5.1.30-community-log : Database - fanglr
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

/*Table structure for table `auth` */

CREATE TABLE `auth` (
  `OpenID` char(255) COLLATE utf8_bin NOT NULL,
  `UserID` int(11) NOT NULL,
  PRIMARY KEY (`OpenID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `auth` */

/*Table structure for table `user` */

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `Username` char(32) COLLATE utf8_bin NOT NULL,
  `Avatar` varchar(255) COLLATE utf8_bin NOT NULL,
  `Language` char(8) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;