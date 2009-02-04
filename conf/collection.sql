/*
SQLyog Community Edition- MySQL GUI v7.15 
MySQL - 5.1.30-community-log : Database - fanglr
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`fanglr` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `fanglr`;

/*Table structure for table `collection` */

DROP TABLE IF EXISTS `collection`;

CREATE TABLE `collection` (
  `Username` char(32) NOT NULL,
  `Pane` int(1) NOT NULL,
  `Idx` int(11) NOT NULL,
  `ItemID` char(32) NOT NULL,
  PRIMARY KEY (`Username`,`Pane`,`Idx`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

/*Data for the table `collection` */

insert  into `collection`(`Username`,`Pane`,`Idx`,`ItemID`) values ('beetlefeet',1,0,'B001BXA9CE');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
