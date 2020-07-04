-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2020-02-15 12:51:28
-- 服务器版本： 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `foods`
--

-- --------------------------------------------------------

--
-- 表的结构 `foods`
--

CREATE TABLE IF NOT EXISTS `foods` (
  `fid` int(11) NOT NULL,
  `poster` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `fdetails` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sid` int(10) NOT NULL,
  PRIMARY KEY (`fid`),
  KEY `sid` (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `foods`
--

INSERT INTO `foods` (`fid`, `poster`, `title`, `fdetails`, `price`, `sid`) VALUES
(0, '../../images/foods/bd.jpg', '美味快餐', '猪排、时蔬、米饭', '21.00', 1),
(1, '../../images/foods/qzd.jpg', '肥牛套餐', '肥牛、时蔬、米饭、煎鸡蛋', '36.00', 1),
(2, '../../images/foods/qdy.jpg', '日式秋刀鱼定食', '秋刀鱼、时蔬、米饭', '45.00', 5);

-- --------------------------------------------------------

--
-- 表的结构 `item`
--

CREATE TABLE IF NOT EXISTS `item` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `oid` int(10) NOT NULL,
  `foodTitle` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `num` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `oid` (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `item`
--

INSERT INTO `item` (`id`, `oid`, `foodTitle`, `num`) VALUES
(1, 1, '美味快餐', 2),
(2, 1, '肥牛套餐', 1);

-- --------------------------------------------------------

--
-- 替换视图以便查看 `itemfoods`
--
CREATE TABLE IF NOT EXISTS `itemfoods` (
`oid` int(10)
,`title` varchar(100)
,`poster` varchar(200)
,`fdetails` varchar(100)
,`price` varchar(10)
,`num` int(10)
);
-- --------------------------------------------------------

--
-- 表的结构 `order`
--

CREATE TABLE IF NOT EXISTS `order` (
  `oid` int(10) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopTitle` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `allNum` int(10) NOT NULL,
  `allPrice` float NOT NULL,
  `time` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `order`
--

INSERT INTO `order` (`oid`, `nickName`, `shopTitle`, `allNum`, `allPrice`, `time`) VALUES
(1, 'test', '缘来聚快餐', 3, 78, '2020-02-07 20:46:43');

-- --------------------------------------------------------

--
-- 表的结构 `shop`
--

CREATE TABLE IF NOT EXISTS `shop` (
  `sid` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `sales` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `poster` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `priceperson` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `shop`
--

INSERT INTO `shop` (`sid`, `title`, `sales`, `poster`, `priceperson`) VALUES
(1, '缘来聚快餐', '月售5289', '../../images/foods/bd.jpg', '人均21元'),
(2, '飘香水果蛋糕店', '月售896', '../../images/foods/dg.jpg', '人均108元'),
(3, '好味道披萨', '月售1581', '../../images/foods/ps.jpg', '人均56元'),
(4, '一点点奶茶光大店', '月售8912', '../../images/foods/nc.jpg', '人均12元'),
(5, '美味日料光启城店', '月售1234', '../../images/foods/qdy.jpg', '人均22元');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `nickName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tel` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cardNum` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `nickName` (`nickName`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`uid`, `nickName`, `tel`, `cardNum`, `address`) VALUES
(1, 'test', '12345678901', '11111111111', 'xx路xx号');

-- --------------------------------------------------------

--
-- 视图结构 `itemfoods`
--
DROP TABLE IF EXISTS `itemfoods`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `itemfoods` AS select `b`.`oid` AS `oid`,`a`.`title` AS `title`,`a`.`poster` AS `poster`,`a`.`fdetails` AS `fdetails`,`a`.`price` AS `price`,`b`.`num` AS `num` from (`foods` `a` join `item` `b`) where (`b`.`foodTitle` = `a`.`title`);

--
-- 限制导出的表
--

--
-- 限制表 `foods`
--
ALTER TABLE `foods`
  ADD CONSTRAINT `shop_foods_FK` FOREIGN KEY (`sid`) REFERENCES `shop` (`sid`);

--
-- 限制表 `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `order_item_FK` FOREIGN KEY (`oid`) REFERENCES `order` (`oid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
