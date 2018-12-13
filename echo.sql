-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 13, 2018 at 02:41 PM
-- Server version: 5.5.60-MariaDB
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `echo`
--

-- --------------------------------------------------------

--
-- Table structure for table `album`
--

CREATE TABLE IF NOT EXISTS `album` (
  `albumId` int(11) NOT NULL,
  `albumName` char(100) NOT NULL,
  `coverImgId` int(11) DEFAULT NULL,
  `bandId` int(11) NOT NULL,
  `description` text
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Table structure for table `audioPost`
--

CREATE TABLE IF NOT EXISTS `audioPost` (
  `entityId` int(11) NOT NULL,
  `songId` int(11) NOT NULL,
  `text` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `band`
--

CREATE TABLE IF NOT EXISTS `band` (
  `bandId` int(11) NOT NULL,
  `bandName` char(100) NOT NULL,
  `description` text,
  `genreId` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=latin1;


--
-- Table structure for table `country`
--

CREATE TABLE IF NOT EXISTS `country` (
  `countryId` int(11) NOT NULL,
  `countryCode` varchar(2) NOT NULL DEFAULT '',
  `countryName` varchar(100) NOT NULL DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`countryId`, `countryCode`, `countryName`) VALUES
(1, 'AF', 'Afghanistan'),
(2, 'AL', 'Albania'),
(3, 'DZ', 'Algeria'),
(4, 'DS', 'American Samoa'),
(5, 'AD', 'Andorra'),
(6, 'AO', 'Angola'),
(7, 'AI', 'Anguilla'),
(8, 'AQ', 'Antarctica'),
(9, 'AG', 'Antigua and Barbuda'),
(10, 'AR', 'Argentina'),
(11, 'AM', 'Armenia'),
(12, 'AW', 'Aruba'),
(13, 'AU', 'Australia'),
(14, 'AT', 'Austria'),
(15, 'AZ', 'Azerbaijan'),
(16, 'BS', 'Bahamas'),
(17, 'BH', 'Bahrain'),
(18, 'BD', 'Bangladesh'),
(19, 'BB', 'Barbados'),
(20, 'BY', 'Belarus'),
(21, 'BE', 'Belgium'),
(22, 'BZ', 'Belize'),
(23, 'BJ', 'Benin'),
(24, 'BM', 'Bermuda'),
(25, 'BT', 'Bhutan'),
(26, 'BO', 'Bolivia'),
(27, 'BA', 'Bosnia and Herzegovina'),
(28, 'BW', 'Botswana'),
(29, 'BV', 'Bouvet Island'),
(30, 'BR', 'Brazil'),
(31, 'IO', 'British Indian Ocean Territory'),
(32, 'BN', 'Brunei Darussalam'),
(33, 'BG', 'Bulgaria'),
(34, 'BF', 'Burkina Faso'),
(35, 'BI', 'Burundi'),
(36, 'KH', 'Cambodia'),
(37, 'CM', 'Cameroon'),
(38, 'CA', 'Canada'),
(39, 'CV', 'Cape Verde'),
(40, 'KY', 'Cayman Islands'),
(41, 'CF', 'Central African Republic'),
(42, 'TD', 'Chad'),
(43, 'CL', 'Chile'),
(44, 'CN', 'China'),
(45, 'CX', 'Christmas Island'),
(46, 'CC', 'Cocos (Keeling) Islands'),
(47, 'CO', 'Colombia'),
(48, 'KM', 'Comoros'),
(49, 'CG', 'Congo'),
(50, 'CK', 'Cook Islands'),
(51, 'CR', 'Costa Rica'),
(52, 'HR', 'Croatia (Hrvatska)'),
(53, 'CU', 'Cuba'),
(54, 'CY', 'Cyprus'),
(55, 'CZ', 'Czech Republic'),
(56, 'DK', 'Denmark'),
(57, 'DJ', 'Djibouti'),
(58, 'DM', 'Dominica'),
(59, 'DO', 'Dominican Republic'),
(60, 'TP', 'East Timor'),
(61, 'EC', 'Ecuador'),
(62, 'EG', 'Egypt'),
(63, 'SV', 'El Salvador'),
(64, 'GQ', 'Equatorial Guinea'),
(65, 'ER', 'Eritrea'),
(66, 'EE', 'Estonia'),
(67, 'ET', 'Ethiopia'),
(68, 'FK', 'Falkland Islands (Malvinas)'),
(69, 'FO', 'Faroe Islands'),
(70, 'FJ', 'Fiji'),
(71, 'FI', 'Finland'),
(72, 'FR', 'France'),
(73, 'FX', 'France, Metropolitan'),
(74, 'GF', 'French Guiana'),
(75, 'PF', 'French Polynesia'),
(76, 'TF', 'French Southern Territories'),
(77, 'GA', 'Gabon'),
(78, 'GM', 'Gambia'),
(79, 'GE', 'Georgia'),
(80, 'DE', 'Germany'),
(81, 'GH', 'Ghana'),
(82, 'GI', 'Gibraltar'),
(83, 'GK', 'Guernsey'),
(84, 'GR', 'Greece'),
(85, 'GL', 'Greenland'),
(86, 'GD', 'Grenada'),
(87, 'GP', 'Guadeloupe'),
(88, 'GU', 'Guam'),
(89, 'GT', 'Guatemala'),
(90, 'GN', 'Guinea'),
(91, 'GW', 'Guinea-Bissau'),
(92, 'GY', 'Guyana'),
(93, 'HT', 'Haiti'),
(94, 'HM', 'Heard and Mc Donald Islands'),
(95, 'HN', 'Honduras'),
(96, 'HK', 'Hong Kong'),
(97, 'HU', 'Hungary'),
(98, 'IS', 'Iceland'),
(99, 'IN', 'India'),
(100, 'IM', 'Isle of Man'),
(101, 'ID', 'Indonesia'),
(102, 'IR', 'Iran (Islamic Republic of)'),
(103, 'IQ', 'Iraq'),
(104, 'IE', 'Ireland'),
(105, 'IL', 'Israel'),
(106, 'IT', 'Italy'),
(107, 'CI', 'Ivory Coast'),
(108, 'JE', 'Jersey'),
(109, 'JM', 'Jamaica'),
(110, 'JP', 'Japan'),
(111, 'JO', 'Jordan'),
(112, 'KZ', 'Kazakhstan'),
(113, 'KE', 'Kenya'),
(114, 'KI', 'Kiribati'),
(115, 'KP', 'Korea, Democratic People''s Republic of'),
(116, 'KR', 'Korea, Republic of'),
(117, 'XK', 'Kosovo'),
(118, 'KW', 'Kuwait'),
(119, 'KG', 'Kyrgyzstan'),
(120, 'LA', 'Lao People''s Democratic Republic'),
(121, 'LV', 'Latvia'),
(122, 'LB', 'Lebanon'),
(123, 'LS', 'Lesotho'),
(124, 'LR', 'Liberia'),
(125, 'LY', 'Libyan Arab Jamahiriya'),
(126, 'LI', 'Liechtenstein'),
(127, 'LT', 'Lithuania'),
(128, 'LU', 'Luxembourg'),
(129, 'MO', 'Macau'),
(130, 'MK', 'Macedonia'),
(131, 'MG', 'Madagascar'),
(132, 'MW', 'Malawi'),
(133, 'MY', 'Malaysia'),
(134, 'MV', 'Maldives'),
(135, 'ML', 'Mali'),
(136, 'MT', 'Malta'),
(137, 'MH', 'Marshall Islands'),
(138, 'MQ', 'Martinique'),
(139, 'MR', 'Mauritania'),
(140, 'MU', 'Mauritius'),
(141, 'TY', 'Mayotte'),
(142, 'MX', 'Mexico'),
(143, 'FM', 'Micronesia, Federated States of'),
(144, 'MD', 'Moldova, Republic of'),
(145, 'MC', 'Monaco'),
(146, 'MN', 'Mongolia'),
(147, 'ME', 'Montenegro'),
(148, 'MS', 'Montserrat'),
(149, 'MA', 'Morocco'),
(150, 'MZ', 'Mozambique'),
(151, 'MM', 'Myanmar'),
(152, 'NA', 'Namibia'),
(153, 'NR', 'Nauru'),
(154, 'NP', 'Nepal'),
(155, 'NL', 'Netherlands'),
(156, 'AN', 'Netherlands Antilles'),
(157, 'NC', 'New Caledonia'),
(158, 'NZ', 'New Zealand'),
(159, 'NI', 'Nicaragua'),
(160, 'NE', 'Niger'),
(161, 'NG', 'Nigeria'),
(162, 'NU', 'Niue'),
(163, 'NF', 'Norfolk Island'),
(164, 'MP', 'Northern Mariana Islands'),
(165, 'NO', 'Norway'),
(166, 'OM', 'Oman'),
(167, 'PK', 'Pakistan'),
(168, 'PW', 'Palau'),
(169, 'PS', 'Palestine'),
(170, 'PA', 'Panama'),
(171, 'PG', 'Papua New Guinea'),
(172, 'PY', 'Paraguay'),
(173, 'PE', 'Peru'),
(174, 'PH', 'Philippines'),
(175, 'PN', 'Pitcairn'),
(176, 'PL', 'Poland'),
(177, 'PT', 'Portugal'),
(178, 'PR', 'Puerto Rico'),
(179, 'QA', 'Qatar'),
(180, 'RE', 'Reunion'),
(181, 'RO', 'Romania'),
(182, 'RU', 'Russian Federation'),
(183, 'RW', 'Rwanda'),
(184, 'KN', 'Saint Kitts and Nevis'),
(185, 'LC', 'Saint Lucia'),
(186, 'VC', 'Saint Vincent and the Grenadines'),
(187, 'WS', 'Samoa'),
(188, 'SM', 'San Marino'),
(189, 'ST', 'Sao Tome and Principe'),
(190, 'SA', 'Saudi Arabia'),
(191, 'SN', 'Senegal'),
(192, 'RS', 'Serbia'),
(193, 'SC', 'Seychelles'),
(194, 'SL', 'Sierra Leone'),
(195, 'SG', 'Singapore'),
(196, 'SK', 'Slovakia'),
(197, 'SI', 'Slovenia'),
(198, 'SB', 'Solomon Islands'),
(199, 'SO', 'Somalia'),
(200, 'ZA', 'South Africa'),
(201, 'GS', 'South Georgia South Sandwich Islands'),
(202, 'SS', 'South Sudan'),
(203, 'ES', 'Spain'),
(204, 'LK', 'Sri Lanka'),
(205, 'SH', 'St. Helena'),
(206, 'PM', 'St. Pierre and Miquelon'),
(207, 'SD', 'Sudan'),
(208, 'SR', 'Suriname'),
(209, 'SJ', 'Svalbard and Jan Mayen Islands'),
(210, 'SZ', 'Swaziland'),
(211, 'SE', 'Sweden'),
(212, 'CH', 'Switzerland'),
(213, 'SY', 'Syrian Arab Republic'),
(214, 'TW', 'Taiwan'),
(215, 'TJ', 'Tajikistan'),
(216, 'TZ', 'Tanzania, United Republic of'),
(217, 'TH', 'Thailand'),
(218, 'TG', 'Togo'),
(219, 'TK', 'Tokelau'),
(220, 'TO', 'Tonga'),
(221, 'TT', 'Trinidad and Tobago'),
(222, 'TN', 'Tunisia'),
(223, 'TR', 'Turkey'),
(224, 'TM', 'Turkmenistan'),
(225, 'TC', 'Turks and Caicos Islands'),
(226, 'TV', 'Tuvalu'),
(227, 'UG', 'Uganda'),
(228, 'UA', 'Ukraine'),
(229, 'AE', 'United Arab Emirates'),
(230, 'GB', 'United Kingdom'),
(231, 'US', 'United States'),
(232, 'UM', 'United States minor outlying islands'),
(233, 'UY', 'Uruguay'),
(234, 'UZ', 'Uzbekistan'),
(235, 'VU', 'Vanuatu'),
(236, 'VA', 'Vatican City State'),
(237, 'VE', 'Venezuela'),
(238, 'VN', 'Vietnam'),
(239, 'VG', 'Virgin Islands (British)'),
(240, 'VI', 'Virgin Islands (U.S.)'),
(241, 'WF', 'Wallis and Futuna Islands'),
(242, 'EH', 'Western Sahara'),
(243, 'YE', 'Yemen'),
(244, 'ZR', 'Zaire'),
(245, 'ZM', 'Zambia'),
(246, 'ZW', 'Zimbabwe');

-- --------------------------------------------------------

--
-- Table structure for table `dislikedEntity`
--

CREATE TABLE IF NOT EXISTS `dislikedEntity` (
  `userId` int(11) NOT NULL,
  `entityId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `entity`
--

CREATE TABLE IF NOT EXISTS `entity` (
  `entityId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=534 DEFAULT CHARSET=latin1;


--
-- Table structure for table `entityComment`
--

CREATE TABLE IF NOT EXISTS `entityComment` (
  `commentId` int(11) NOT NULL,
  `entityId` int(11) NOT NULL,
  `comment` text NOT NULL,
  `parentCommentId` int(11) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=latin1;


--
-- Table structure for table `entityTag`
--

CREATE TABLE IF NOT EXISTS `entityTag` (
  `tagName` char(1) NOT NULL,
  `entityId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `following`
--

CREATE TABLE IF NOT EXISTS `following` (
  `followingUserId` int(11) NOT NULL,
  `followerUserId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Join Table\r\n';

-- --------------------------------------------------------

--
-- Table structure for table `genre`
--

CREATE TABLE IF NOT EXISTS `genre` (
  `genreId` int(11) NOT NULL,
  `genreName` char(100) NOT NULL,
  `parentGenreId` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genre`
--

INSERT INTO `genre` (`genreId`, `genreName`, `parentGenreId`) VALUES
(1, 'Test Genre', NULL),
(2, 'Alternative Rock', NULL),
(3, 'Ambient', NULL),
(4, 'Classical', NULL),
(5, 'Country', NULL),
(6, 'Dance & EDM', NULL),
(7, 'Dancehall', NULL),
(8, 'Deep House', NULL),
(9, 'Disco', NULL),
(10, 'Drum & Bass', NULL),
(11, 'Dubstep', NULL),
(12, 'Electronic', NULL),
(13, 'Folk', NULL),
(14, 'House', NULL),
(15, 'Indie', NULL),
(16, 'Jazz & Blues', NULL),
(17, 'Latin', NULL),
(18, 'Metal', NULL),
(19, 'Piano', NULL),
(20, 'Pop', NULL),
(21, 'R&B & Soul', NULL),
(22, 'Reggae', NULL),
(23, 'Rock', NULL),
(24, 'Soundtrack', NULL),
(25, 'Techno', NULL),
(26, 'Trance', NULL),
(27, 'World', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE IF NOT EXISTS `image` (
  `uploadId` int(11) NOT NULL,
  `title` char(100) NOT NULL,
  `description` text,
  `imageAlbulmId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `imageAlbum`
--

CREATE TABLE IF NOT EXISTS `imageAlbum` (
  `imageAlbulmId` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=latin1;


--
-- Table structure for table `imagePost`
--

CREATE TABLE IF NOT EXISTS `imagePost` (
  `entityId` int(11) NOT NULL,
  `imageAlbulmId` int(11) NOT NULL,
  `text` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `likedEntity`
--

CREATE TABLE IF NOT EXISTS `likedEntity` (
  `userId` int(11) NOT NULL,
  `entityId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `song`
--

CREATE TABLE IF NOT EXISTS `song` (
  `songId` int(11) NOT NULL,
  `title` char(100) NOT NULL,
  `genreId` int(11) NOT NULL,
  `uploadId` int(11) NOT NULL,
  `bandId` int(11) NOT NULL,
  `albumId` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;


--
-- Table structure for table `tag`
--

CREATE TABLE IF NOT EXISTS `tag` (
  `tagName` char(1) NOT NULL,
  `tagDescription` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `textPost`
--

CREATE TABLE IF NOT EXISTS `textPost` (
  `entityId` int(11) NOT NULL,
  `text` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `upload`
--

CREATE TABLE IF NOT EXISTS `upload` (
  `uploadId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `timestamp` datetime NOT NULL,
  `fileName` text NOT NULL,
  `filesize` int(11) NOT NULL,
  `thumbnail` text
) ENGINE=InnoDB AUTO_INCREMENT=363 DEFAULT CHARSET=latin1;


--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userId` int(11) NOT NULL,
  `username` char(32) NOT NULL,
  `password` text NOT NULL,
  `displayName` char(32) NOT NULL,
  `countryId` int(11) DEFAULT NULL,
  `city` char(100) NOT NULL,
  `bio` text,
  `email` char(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `profileImageId` int(11) DEFAULT NULL,
  `bandId` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=latin1;

--
-- Table structure for table `videoPost`
--

CREATE TABLE IF NOT EXISTS `videoPost` (
  `entityId` int(11) NOT NULL,
  `uploadId` int(11) NOT NULL,
  `text` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for table `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`albumId`),
  ADD KEY `fkIdx_263` (`bandId`),
  ADD KEY `fkIdx_266` (`coverImgId`);

--
-- Indexes for table `audioPost`
--
ALTER TABLE `audioPost`
  ADD PRIMARY KEY (`entityId`),
  ADD KEY `fkIdx_148` (`songId`),
  ADD KEY `fkIdx_97` (`entityId`);

--
-- Indexes for table `band`
--
ALTER TABLE `band`
  ADD PRIMARY KEY (`bandId`),
  ADD KEY `fkIdx_222` (`genreId`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`countryId`);

--
-- Indexes for table `dislikedEntity`
--
ALTER TABLE `dislikedEntity`
  ADD PRIMARY KEY (`userId`,`entityId`),
  ADD KEY `fkIdx_275` (`userId`),
  ADD KEY `fkIdx_278` (`entityId`);

--
-- Indexes for table `entity`
--
ALTER TABLE `entity`
  ADD PRIMARY KEY (`entityId`),
  ADD KEY `fkIdx_79` (`userId`);

--
-- Indexes for table `entityComment`
--
ALTER TABLE `entityComment`
  ADD PRIMARY KEY (`commentId`),
  ADD KEY `fkIdx_64` (`entityId`),
  ADD KEY `fkIdx_68` (`parentCommentId`),
  ADD KEY `fkIdx_71` (`userId`);

--
-- Indexes for table `entityTag`
--
ALTER TABLE `entityTag`
  ADD PRIMARY KEY (`tagName`,`entityId`),
  ADD KEY `fkIdx_159` (`tagName`),
  ADD KEY `fkIdx_162` (`entityId`),
  ADD KEY `fkIdx_166` (`userId`);

--
-- Indexes for table `following`
--
ALTER TABLE `following`
  ADD KEY `fkIdx_47` (`followingUserId`),
  ADD KEY `fkIdx_50` (`followerUserId`);

--
-- Indexes for table `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`genreId`),
  ADD KEY `fkIdx_134` (`parentGenreId`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`uploadId`),
  ADD KEY `fkIdx_192` (`imageAlbulmId`),
  ADD KEY `fkIdx_202` (`uploadId`);

--
-- Indexes for table `imageAlbum`
--
ALTER TABLE `imageAlbum`
  ADD PRIMARY KEY (`imageAlbulmId`);

--
-- Indexes for table `imagePost`
--
ALTER TABLE `imagePost`
  ADD PRIMARY KEY (`entityId`),
  ADD KEY `fkIdx_179` (`imageAlbulmId`),
  ADD KEY `fkIdx_75` (`entityId`);

--
-- Indexes for table `likedEntity`
--
ALTER TABLE `likedEntity`
  ADD PRIMARY KEY (`userId`,`entityId`),
  ADD KEY `fkIdx_55` (`userId`),
  ADD KEY `fkIdx_58` (`entityId`);

--
-- Indexes for table `song`
--
ALTER TABLE `song`
  ADD PRIMARY KEY (`songId`),
  ADD KEY `fkIdx_137` (`genreId`),
  ADD KEY `fkIdx_145` (`uploadId`),
  ADD KEY `fkIdx_209` (`bandId`),
  ADD KEY `fkIdx_269` (`albumId`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`tagName`);

--
-- Indexes for table `textPost`
--
ALTER TABLE `textPost`
  ADD PRIMARY KEY (`entityId`),
  ADD KEY `fkIdx_87` (`entityId`);

--
-- Indexes for table `upload`
--
ALTER TABLE `upload`
  ADD PRIMARY KEY (`uploadId`),
  ADD KEY `fkIdx_40` (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `userId` (`userId`,`username`,`email`),
  ADD KEY `countryId` (`countryId`),
  ADD KEY `bandId` (`bandId`),
  ADD KEY `user_ibfk_1` (`profileImageId`);

--
-- Indexes for table `videoPost`
--
ALTER TABLE `videoPost`
  ADD PRIMARY KEY (`entityId`),
  ADD KEY `fkIdx_117` (`uploadId`),
  ADD KEY `fkIdx_120` (`entityId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `album`
--
ALTER TABLE `album`
  MODIFY `albumId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `band`
--
ALTER TABLE `band`
  MODIFY `bandId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=42;
--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `countryId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=247;
--
-- AUTO_INCREMENT for table `entity`
--
ALTER TABLE `entity`
  MODIFY `entityId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=534;
--
-- AUTO_INCREMENT for table `entityComment`
--
ALTER TABLE `entityComment`
  MODIFY `commentId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=148;
--
-- AUTO_INCREMENT for table `genre`
--
ALTER TABLE `genre`
  MODIFY `genreId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `imageAlbum`
--
ALTER TABLE `imageAlbum`
  MODIFY `imageAlbulmId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=168;
--
-- AUTO_INCREMENT for table `song`
--
ALTER TABLE `song`
  MODIFY `songId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT for table `upload`
--
ALTER TABLE `upload`
  MODIFY `uploadId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=363;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=117;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `album`
--
ALTER TABLE `album`
  ADD CONSTRAINT `FK_263` FOREIGN KEY (`bandId`) REFERENCES `band` (`bandId`),
  ADD CONSTRAINT `FK_266` FOREIGN KEY (`coverImgId`) REFERENCES `upload` (`uploadId`);

--
-- Constraints for table `audioPost`
--
ALTER TABLE `audioPost`
  ADD CONSTRAINT `FK_97` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_148` FOREIGN KEY (`songId`) REFERENCES `song` (`songId`);

--
-- Constraints for table `band`
--
ALTER TABLE `band`
  ADD CONSTRAINT `FK_222` FOREIGN KEY (`genreId`) REFERENCES `genre` (`genreId`);

--
-- Constraints for table `dislikedEntity`
--
ALTER TABLE `dislikedEntity`
  ADD CONSTRAINT `FK_278` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_275` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `entity`
--
ALTER TABLE `entity`
  ADD CONSTRAINT `FK_79` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `entityComment`
--
ALTER TABLE `entityComment`
  ADD CONSTRAINT `FK_71` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_64` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `entityTag`
--
ALTER TABLE `entityTag`
  ADD CONSTRAINT `FK_159` FOREIGN KEY (`tagName`) REFERENCES `tag` (`tagName`),
  ADD CONSTRAINT `FK_162` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`),
  ADD CONSTRAINT `FK_166` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `following`
--
ALTER TABLE `following`
  ADD CONSTRAINT `FK_47` FOREIGN KEY (`followingUserId`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `FK_50` FOREIGN KEY (`followerUserId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `genre`
--
ALTER TABLE `genre`
  ADD CONSTRAINT `FK_134` FOREIGN KEY (`parentGenreId`) REFERENCES `genre` (`genreId`);

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `FK_192` FOREIGN KEY (`imageAlbulmId`) REFERENCES `imageAlbum` (`imageAlbulmId`),
  ADD CONSTRAINT `FK_202` FOREIGN KEY (`uploadId`) REFERENCES `upload` (`uploadId`);

--
-- Constraints for table `imagePost`
--
ALTER TABLE `imagePost`
  ADD CONSTRAINT `FK_75` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_179` FOREIGN KEY (`imageAlbulmId`) REFERENCES `imageAlbum` (`imageAlbulmId`);

--
-- Constraints for table `likedEntity`
--
ALTER TABLE `likedEntity`
  ADD CONSTRAINT `FK_58` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_55` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE;

--
-- Constraints for table `song`
--
ALTER TABLE `song`
  ADD CONSTRAINT `FK_137` FOREIGN KEY (`genreId`) REFERENCES `genre` (`genreId`),
  ADD CONSTRAINT `FK_145` FOREIGN KEY (`uploadId`) REFERENCES `upload` (`uploadId`),
  ADD CONSTRAINT `FK_209` FOREIGN KEY (`bandId`) REFERENCES `band` (`bandId`),
  ADD CONSTRAINT `FK_269` FOREIGN KEY (`albumId`) REFERENCES `album` (`albumId`);

--
-- Constraints for table `textPost`
--
ALTER TABLE `textPost`
  ADD CONSTRAINT `FK_87` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `upload`
--
ALTER TABLE `upload`
  ADD CONSTRAINT `FK_40` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`profileImageId`) REFERENCES `upload` (`uploadId`),
  ADD CONSTRAINT `user_ibfk_2` FOREIGN KEY (`countryId`) REFERENCES `country` (`countryId`),
  ADD CONSTRAINT `user_ibfk_3` FOREIGN KEY (`bandId`) REFERENCES `band` (`bandId`);

--
-- Constraints for table `videoPost`
--
ALTER TABLE `videoPost`
  ADD CONSTRAINT `FK_120` FOREIGN KEY (`entityId`) REFERENCES `entity` (`entityId`) ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_117` FOREIGN KEY (`uploadId`) REFERENCES `upload` (`uploadId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
