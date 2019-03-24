# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.24)
# Database: letour_db
# Generation Time: 2019-03-24 17:56:04 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table race
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race`;

CREATE TABLE `race` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET latin1 NOT NULL,
  `year` int(11) DEFAULT NULL,
  `distance_km` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `race` WRITE;
/*!40000 ALTER TABLE `race` DISABLE KEYS */;

INSERT INTO `race` (`id`, `name`, `year`, `distance_km`)
VALUES
	(1,'Tour de France',2018,3351);

/*!40000 ALTER TABLE `race` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table race_result_type
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_result_type`;

CREATE TABLE `race_result_type` (
  `race_result_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `result_type` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`race_result_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `race_result_type` WRITE;
/*!40000 ALTER TABLE `race_result_type` DISABLE KEYS */;

INSERT INTO `race_result_type` (`race_result_type_id`, `result_type`)
VALUES
	(1,'stage rank'),
	(2,'overall rank');

/*!40000 ALTER TABLE `race_result_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table race_results
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_results`;

CREATE TABLE `race_results` (
  `result_id` int(11) NOT NULL AUTO_INCREMENT,
  `stage_id` int(11) NOT NULL,
  `race_result_type_id` int(11) NOT NULL,
  `ranking` int(11) NOT NULL,
  `rider_id` int(11) NOT NULL,
  `rider_time` varchar(10) DEFAULT NULL,
  `rider_bonus` varchar(10) DEFAULT NULL,
  `rider_points` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`result_id`),
  KEY `rider_id` (`rider_id`),
  KEY `stage_id` (`stage_id`),
  KEY `race_result_type_id` (`race_result_type_id`),
  CONSTRAINT `race_results_ibfk_1` FOREIGN KEY (`rider_id`) REFERENCES `race_starters` (`rider_id`),
  CONSTRAINT `race_results_ibfk_2` FOREIGN KEY (`stage_id`) REFERENCES `race_stages` (`stage_id`),
  CONSTRAINT `race_results_ibfk_3` FOREIGN KEY (`race_result_type_id`) REFERENCES `race_result_type` (`race_result_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table race_stages
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_stages`;

CREATE TABLE `race_stages` (
  `stage_id` int(11) NOT NULL,
  `stage_date` date DEFAULT NULL,
  `stage_start` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `stage_finish` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `stage_distance` int(11) DEFAULT NULL,
  `stage_type` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `race_id` int(10) NOT NULL,
  PRIMARY KEY (`stage_id`),
  KEY `race_id` (`race_id`),
  CONSTRAINT `race_stages_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `race_stages` WRITE;
/*!40000 ALTER TABLE `race_stages` DISABLE KEYS */;

INSERT INTO `race_stages` (`stage_id`, `stage_date`, `stage_start`, `stage_finish`, `stage_distance`, `stage_type`, `race_id`)
VALUES
	(1,'2018-07-07','Noirmoutier-en-l\'Île','Fontenay-le-Comte',201,'Flat stage',1),
	(2,'2018-07-08','Mouilleron-Saint-Germain','La Roche-sur-Yon',183,'Flat stage',1),
	(3,'2018-07-09','Cholet','Cholet',36,'Team time trial',1),
	(4,'2018-07-10','La Baule','Sarzeau',195,'Flat stage',1),
	(5,'2018-07-11','Lorient','Quimper',205,'Hilly stage',1),
	(6,'2018-07-12','Brest','Mûr-de-Bretagne',181,'Hilly stage',1),
	(7,'2018-07-13','Fougères','Chartres',231,'Flat stage',1),
	(8,'2018-07-14','Dreux','Amiens',181,'Flat stage',1),
	(9,'2018-07-15','Arras','Roubaix',157,'Hilly stage',1),
	(10,'2018-07-17','Annecy','Le Grand-Bornand',159,'Mountain stage',1),
	(11,'2018-07-18','Albertville','La Rosière',109,'Mountain stage',1),
	(12,'2018-07-19','Bourg-Saint-Maurice','Alpe d\'Huez',176,'Mountain stage',1),
	(13,'2018-07-20','Le Bourg-d\'Oisans','Valence',170,'Flat stage',1),
	(14,'2018-07-21','Saint-Paul-Trois-Châteaux','Mende',188,'Hilly stage',1),
	(15,'2018-07-22','Millau','Carcassonne',182,'Hilly stage',1),
	(16,'2018-07-24','Carcassonne to Bagnères-de-Luchon','',218,'Mountain',1),
	(17,'2018-07-25','Bagnères-de-Luchon','Saint-Lary-Soulan (Col de Portet)',65,'Mountain stage',1),
	(18,'2018-07-26','Trie-sur-Baïse','Pau',171,'Flat',1),
	(19,'2018-07-27','Lourdes','Laruns',201,'Mountain stage',1),
	(20,'2018-07-28','Saint-Pée-sur-Nivelle','Espelette',31,'Individual time trial',1),
	(21,'2018-07-29','Houilles','Paris (Champs-Élysées)',116,'Flat stage',1);

/*!40000 ALTER TABLE `race_stages` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table race_starters
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_starters`;

CREATE TABLE `race_starters` (
  `rider_id` int(11) NOT NULL,
  `rider_name` varchar(255) DEFAULT NULL,
  `rider_country` varchar(255) DEFAULT NULL,
  `rider_team` varchar(255) DEFAULT NULL,
  `rider_age` int(11) DEFAULT NULL,
  `race_id` int(11) DEFAULT '1',
  PRIMARY KEY (`rider_id`),
  KEY `race_id` (`race_id`),
  CONSTRAINT `race_starters_ibfk_1` FOREIGN KEY (`race_id`) REFERENCES `race` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `race_starters` WRITE;
/*!40000 ALTER TABLE `race_starters` DISABLE KEYS */;

INSERT INTO `race_starters` (`rider_id`, `rider_name`, `rider_country`, `rider_team`, `rider_age`, `race_id`)
VALUES
	(1,'Chris Froome','Great Britain','Team Sky',33,1),
	(2,'Egan Bernal','Colombia','Team Sky',21,1),
	(3,'Jonathan Castroviejo','Spain','Team Sky',31,1),
	(4,'Michal Kwiatkowski','Poland','Team Sky',28,1),
	(5,'Gianni Moscon','Italy','Team Sky',24,1),
	(6,'Wout Poels','Netherlands','Team Sky',30,1),
	(7,'Luke Rowe','Great Britain','Team Sky',28,1),
	(8,'Geraint Thomas','Great Britain','Team Sky',32,1),
	(11,'Rigoberto Urán','Colombia','EF Education First-Drapac p/b Cannondale',31,1),
	(12,'Simon Clarke','Australia','EF Education First-Drapac p/b Cannondale',31,1),
	(13,'Lawson Craddock','United States','EF Education First-Drapac p/b Cannondale',26,1),
	(14,'Daniel Felipe Martínez','Colombia','EF Education First-Drapac p/b Cannondale',22,1),
	(15,'Taylor Phinney','United States','EF Education First-Drapac p/b Cannondale',28,1),
	(16,'Pierre Rolland','France','EF Education First-Drapac p/b Cannondale',31,1),
	(17,'Tom Scully','New Zealand','EF Education First-Drapac p/b Cannondale',28,1),
	(18,'Sep Vanmarcke','Belgium','EF Education First-Drapac p/b Cannondale',29,1),
	(21,'Romain Bardet','France','AG2R La Mondiale',27,1),
	(22,'Silvan Dillier','Switzerland','AG2R La Mondiale',27,1),
	(23,'Axel Domont','France','AG2R La Mondiale',27,1),
	(24,'Mathias Frank','Switzerland','AG2R La Mondiale',31,1),
	(25,'Tony Gallopin','France','AG2R La Mondiale',30,1),
	(26,'Pierre Latour','France','AG2R La Mondiale',24,1),
	(27,'Oliver Naesen','Belgium','AG2R La Mondiale',27,1),
	(28,'Alexis Vuillermoz','France','AG2R La Mondiale',30,1),
	(31,'Michael Matthews','Australia','Team Sunweb',27,1),
	(32,'Tom Dumoulin','Netherlands','Team Sunweb',27,1),
	(33,'Nikias Arndt','Germany','Team Sunweb',26,1),
	(34,'Simon Geschke','Germany','Team Sunweb',32,1),
	(35,'Chad Haga','United States','Team Sunweb',29,1),
	(36,'Søren Kragh Andersen','Denmark','Team Sunweb',23,1),
	(37,'Laurens Ten Dam','Netherlands','Team Sunweb',37,1),
	(38,'Edward Theuns','Belgium','Team Sunweb',27,1),
	(41,'Warren Barguil','France','Fortuneo-Samsic',26,1),
	(42,'Maxime Bouet','France','Fortuneo-Samsic',31,1),
	(43,'Élie Gesbert','France','Fortuneo-Samsic',23,1),
	(44,'Romain Hardy','France','Fortuneo-Samsic',29,1),
	(45,'Kevin Ledanois','France','Fortuneo-Samsic',24,1),
	(46,'Amaël Moinard','France','Fortuneo-Samsic',36,1),
	(47,'Laurent Pichon','France','Fortuneo-Samsic',31,1),
	(48,'Florian Vachon','France','Fortuneo-Samsic',33,1),
	(51,'Vincenzo Nibali','Italy','Bahrain-Merida',33,1),
	(52,'Sonny Colbrelli','Italy','Bahrain-Merida',28,1),
	(53,'Heinrich Haussler','Australia','Bahrain-Merida',34,1),
	(54,'Gorka Izagirre','Spain','Bahrain-Merida',30,1),
	(55,'Ion Izagirre','Spain','Bahrain-Merida',29,1),
	(56,'Kristijan Koren','Slovenia','Bahrain-Merida',31,1),
	(57,'Franco Pellizotti','Italy','Bahrain-Merida',40,1),
	(58,'Domenico Pozzovivo','Italy','Bahrain-Merida',35,1),
	(61,'Adam Yates','Great Britain','Mitchelton-Scott',25,1),
	(62,'Jack Bauer','New Zealand','Mitchelton-Scott',33,1),
	(63,'Luke Durbridge','Australia','Mitchelton-Scott',27,1),
	(64,'Mathew Hayman','Australia','Mitchelton-Scott',40,1),
	(65,'Michael Hepburn','Australia','Mitchelton-Scott',26,1),
	(66,'Damien Howson','Australia','Mitchelton-Scott',25,1),
	(67,'Daryl Impey','South Africa','Mitchelton-Scott',31,1),
	(68,'Mikel Nieve','Spain','Mitchelton-Scott',34,1),
	(71,'Nairo Quintana','Colombia','Movistar Team',28,1),
	(72,'Andrey Amador','Costa Rica','Movistar Team',31,1),
	(73,'Daniele Bennati','Italy','Movistar Team',37,1),
	(74,'Imanol Erviti','Spain','Movistar Team',34,1),
	(75,'Mikel Landa','Spain','Movistar Team',28,1),
	(76,'José Joaquín Rojas','Spain','Movistar Team',33,1),
	(77,'Marc Soler','Spain','Movistar Team',24,1),
	(78,'Alejandro Valverde','Spain','Movistar Team',38,1),
	(81,'Richie Porte','Australia','BMC Racing Team',33,1),
	(82,'Patrick Bevin','New Zealand','BMC Racing Team',27,1),
	(83,'Damiano Caruso','Italy','BMC Racing Team',30,1),
	(84,'Simon Gerrans','Australia','BMC Racing Team',38,1),
	(85,'Stefan Küng','Switzerland','BMC Racing Team',24,1),
	(86,'Michael Schär','Switzerland','BMC Racing Team',31,1),
	(87,'Greg Van Avermaet','Belgium','BMC Racing Team',33,1),
	(88,'Tejay Van Garderen','United States','BMC Racing Team',29,1),
	(91,'Daniel Martin','Ireland','UAE Team Emirates',31,1),
	(92,'Darwin Atapuma','Colombia','UAE Team Emirates',30,1),
	(93,'Kristijan Ðurasek','Croatia','UAE Team Emirates',30,1),
	(94,'Roberto Ferrari','Italy','UAE Team Emirates',35,1),
	(95,'Alexander Kristoff','Norway','UAE Team Emirates',31,1),
	(96,'Marco Marcato','Italy','UAE Team Emirates',34,1),
	(97,'Rory Sutherland','Australia','UAE Team Emirates',36,1),
	(98,'Oliviero Troia','Italy','UAE Team Emirates',23,1),
	(101,'Julian Alaphilippe','France','Quick-Step Floors',26,1),
	(102,'Tim Declercq','Belgium','Quick-Step Floors',29,1),
	(103,'Fernando Gaviria','Colombia','Quick-Step Floors',23,1),
	(104,'Philippe Gilbert','Belgium','Quick-Step Floors',36,1),
	(105,'Bob Jungels','Luxembourg','Quick-Step Floors',25,1),
	(106,'Yves Lampaert','Belgium','Quick-Step Floors',27,1),
	(107,'Maximiliano Richeze','Argentina','Quick-Step Floors',35,1),
	(108,'Niki Terpstra','Netherlands','Quick-Step Floors',34,1),
	(111,'Peter Sagan','Slovakia','Bora-Hansgrohe',28,1),
	(112,'Maciej Bodnar','Poland','Bora-Hansgrohe',33,1),
	(113,'Marcus Burghardt','Germany','Bora-Hansgrohe',35,1),
	(114,'Rafal Majka','Poland','Bora-Hansgrohe',28,1),
	(115,'Gregor Mühlberger','Austria','Bora-Hansgrohe',24,1),
	(116,'Daniel Oss','Italy','Bora-Hansgrohe',31,1),
	(117,'Pawel Poljanski','Poland','Bora-Hansgrohe',28,1),
	(118,'Lukas Pöstlberger','Austria','Bora-Hansgrohe',26,1),
	(121,'Jakob Fuglsang','Denmark','Astana',33,1),
	(122,'Omar Fraile','Spain','Astana',27,1),
	(123,'Dmitriy Gruzdev','Kazakhstan','Astana',32,1),
	(124,'Jesper Hansen','Denmark','Astana',27,1),
	(125,'Tanel Kangert','Estonia','Astana',31,1),
	(126,'Magnus Cort Nielsen','Denmark','Astana',25,1),
	(127,'Luis León Sánchez','Spain','Astana',34,1),
	(128,'Michael Valgren','Denmark','Astana',26,1),
	(131,'Mark Cavendish','Great Britain','Team Dimension Data',33,1),
	(132,'Edvald Boasson Hagen','Norway','Team Dimension Data',31,1),
	(133,'Reinardt Janse Van Rensburg','South Africa','Team Dimension Data',29,1),
	(134,'Serge Pauwels','Belgium','Team Dimension Data',34,1),
	(135,'Mark Renshaw','Australia','Team Dimension Data',35,1),
	(136,'Tom-Jelte Slagter','Netherlands','Team Dimension Data',29,1),
	(137,'Jay Thomson','South Africa','Team Dimension Data',32,1),
	(138,'Julien Vermote','Belgium','Team Dimension Data',28,1),
	(141,'Ilnur Zakarin','Russia','Team Katusha-Alpecin',28,1),
	(142,'Ian Boswell','United States','Team Katusha-Alpecin',27,1),
	(143,'Robert Kiserlovski','Croatia','Team Katusha-Alpecin',31,1),
	(144,'Marcel Kittel','Germany','Team Katusha-Alpecin',30,1),
	(145,'Pavel Kochetkov','Russia','Team Katusha-Alpecin',32,1),
	(146,'Tony Martin','Germany','Team Katusha-Alpecin',33,1),
	(147,'Nils Politt','Germany','Team Katusha-Alpecin',24,1),
	(148,'Rick Zabel','Germany','Team Katusha-Alpecin',24,1),
	(151,'Arnaud Démare','France','Groupama-FDJ',26,1),
	(152,'David Gaudu','France','Groupama-FDJ',21,1),
	(153,'Jacopo Guarnieri','Italy','Groupama-FDJ',30,1),
	(154,'Olivier Le Gac','France','Groupama-FDJ',24,1),
	(155,'Tobias Ludvigsson','Sweden','Groupama-FDJ',27,1),
	(156,'Rudy Molard','France','Groupama-FDJ',28,1),
	(157,'Ramon Sinkeldam','Netherlands','Groupama-FDJ',29,1),
	(158,'Arthur Vichot','France','Groupama-FDJ',29,1),
	(161,'Steven Kruijswijk','Netherlands','LottoNL-Jumbo',31,1),
	(162,'Robert Gesink','Netherlands','LottoNL-Jumbo',32,1),
	(163,'Dylan Groenewegen','Netherlands','LottoNL-Jumbo',25,1),
	(164,'Amund Grøndahl Jansen ','Norway','LottoNL-Jumbo',24,1),
	(165,'Paul Martens','Germany','LottoNL-Jumbo',34,1),
	(166,'Primoz Roglic','Slovenia','LottoNL-Jumbo',28,1),
	(167,'Timo Roosen','Netherlands','LottoNL-Jumbo',25,1),
	(168,'Antwan Tolhoek','Netherlands','LottoNL-Jumbo',24,1),
	(171,'André Greipel','Germany','Lotto-Soudal',35,1),
	(172,'Tiesj Benoot','Belgium','Lotto-Soudal',24,1),
	(173,'Jasper De Buyst','Belgium','Lotto-Soudal',24,1),
	(174,'Thomas De Gendt','Belgium','Lotto-Soudal',31,1),
	(175,'Jens Keukeleire','Belgium','Lotto-Soudal',29,1),
	(176,'Tomasz Marczynski','Poland','Lotto-Soudal',34,1),
	(177,'Marcel Sieberg','Germany','Lotto-Soudal',36,1),
	(178,'Jelle Vanendert','Belgium','Lotto-Soudal',33,1),
	(181,'Lilian Calmejane','France','Direct Énergie',25,1),
	(182,'Thomas Boudat','France','Direct Énergie',24,1),
	(183,'Sylvain Chavanel','France','Direct Énergie',39,1),
	(184,'Jérôme Cousin','France','Direct Énergie',29,1),
	(185,'Damien Gaudin','France','Direct Énergie',31,1),
	(186,'Fabien Grellier','France','Direct Énergie',23,1),
	(187,'Romain Sicard','France','Direct Énergie',30,1),
	(188,'Rein Taaramäe','Estonia','Direct Énergie',31,1),
	(191,'Bauke Mollema','Netherlands','Trek-Segafredo',31,1),
	(192,'Julien Bernard','France','Trek-Segafredo',26,1),
	(193,'Koen De Kort','Netherlands','Trek-Segafredo',35,1),
	(194,'John Degenkolb','Germany','Trek-Segafredo',29,1),
	(195,'Michael Gogl','Austria','Trek-Segafredo',24,1),
	(196,'Tsgabu Grmay','Ethiopia','Trek-Segafredo',26,1),
	(197,'Toms Skujins','Latvia','Trek-Segafredo',27,1),
	(198,'Jasper Stuyven','Belgium','Trek-Segafredo',26,1),
	(201,'Christophe Laporte','France','Cofidis',25,1),
	(202,'Dimitri Claeys','Belgium','Cofidis',31,1),
	(203,'Nicolas Edet','France','Cofidis',30,1),
	(204,'Jesús Herrada','Spain','Cofidis',27,1),
	(205,'Daniel Navarro','Spain','Cofidis',34,1),
	(206,'Anthony Perez','France','Cofidis',27,1),
	(207,'Julien Simon','France','Cofidis',32,1),
	(208,'Anthony Turgis','France','Cofidis',24,1),
	(211,'Guillaume Martin','France','Wanty-Groupe Gobert',25,1),
	(212,'Thomas Degand','Belgium','Wanty-Groupe Gobert',32,1),
	(213,'Timothy Dupont','Belgium','Wanty-Groupe Gobert',30,1),
	(214,'Marco Minnaard','Netherlands','Wanty-Groupe Gobert',29,1),
	(215,'Yoann Offredo','France','Wanty-Groupe Gobert',31,1),
	(216,'Andrea Pasqualon','Italy','Wanty-Groupe Gobert',30,1),
	(217,'Dion Smith','New Zealand','Wanty-Groupe Gobert',25,1),
	(218,'Guillaume Van Keirsbulck','Belgium','Wanty-Groupe Gobert',27,1);

/*!40000 ALTER TABLE `race_starters` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table race_teams
# ------------------------------------------------------------

DROP TABLE IF EXISTS `race_teams`;

CREATE TABLE `race_teams` (
  `team_id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(255) NOT NULL,
  `team_country` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`team_id`),
  CONSTRAINT `race_teams_ibfk_1` FOREIGN KEY (`team_id`) REFERENCES `race` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
