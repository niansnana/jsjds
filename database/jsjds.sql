-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-04-06 17:54:12
-- 服务器版本： 8.0.12
-- PHP 版本： 5.6.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `jsjds`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` enum('1','2','3') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `mobile` varchar(11) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` tinyint(4) DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`, `gender`, `mobile`, `email`, `role_id`, `remember_token`, `status`, `avatar`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$gEVaqidAv/ziDWyVR4VLlOnnOMDtEDSg6Ewv8qkZbxBa4lXY1fmVS', '2', '17081398175', 'ppossimus@126.com', 1, '91y3PEKxBNZXCJZf68EtnoM11ox9ircBcHOmvaNlMfPpsettYk3kab6evdmC', '2', '/static/images/avatar.jpg', '2020-01-17 07:39:04', '2020-01-17 07:39:04'),
(2, 'corrupti.vel nini', '$2y$10$AM6Ljxrd3sG11QIiXCuS0.EM0RCmoQh1PBlBJYiw8wwvLeqDFwKXO', '2', '13969515526', 'tnulla@hotmail.com', 3, NULL, '2', '/storage/caa534c25545113a516d0d373f24e274eb42d905.png', '2020-01-17 07:39:04', '2020-01-18 07:41:41'),
(3, 'rcorporis', '$2y$10$ZEmEcNLTt5nT3wXJ4AyCXOzem.OIbr7H/XDZQdH2O.GxlcFuJHKBi', '3', '13163313337', 'ut66@sina.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:04', '2020-01-17 07:39:04'),
(4, 'pariatur_et', '$2y$10$QB390EsyVvu2PDv78ViyceB36QVTjZ0CQpo7d0d5NnGNVynXj4H8O', '3', '18673116162', 'provident.hic@163.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:04', '2020-01-17 07:39:04'),
(5, 'in_consequatur', '$2y$10$qgjdJ7qFswfm1SlRSrG3s.Q5xdavv79ciS1GF.AZgtkShfUJ5TJ4y', '2', '15200826472', 'vvoluptatibus@qq.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:04', '2020-01-17 07:39:04'),
(6, 'debitis75', '$2y$10$P//K5Pl1hyGJ/Zz6HadgAOYnFkcNXvDbGqhG4M2sfmD16G2lBjksG', '3', '18219128270', 'iure.ea@sina.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:04', '2020-01-17 07:39:04'),
(7, 'sequi.minus', '$2y$10$lsTpl7GXJslcai9LW67x5.cujio83w/FeQzUO5c7H5YJtqJy8O8sC', '2', '18378288760', 'fugiat_quis@hotmail.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(8, 'ynam', '$2y$10$Hwe28rPoSVl502ylQOdSiuBUgjQVKkKIgSGXaFnIscl9nJ.Mft68S', '1', '18433468651', 'officiis_molestiae@gmail.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(9, 'snatus', '$2y$10$2fdGZ6UzYQuh80IwcEOL7.kfdB1dkNaEQlU5ES34c317g1QVbIlaS', '1', '18962797073', 'sunt_velit@gmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(10, 'est_fugit', '$2y$10$26Ynek1BD16C6W8ikRQyeuzd2AFyzG8ZaZuBRg1vQVZE89S2BU/e2', '3', '17051771852', 'plibero@qq.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(11, 'eet', '$2y$10$GKqQ79vNYRWpGCWahXIL3uw/pvQRmpXIepsQgX9tlrO5MYkxtEY8W', '2', '18852484400', 'voluptatem.laborum@yahoo.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(12, 'rvoluptate', '$2y$10$/Mc.6fmAXsuxu71xfbuwROz99xDrsICXUbpWqJlw9YKjFhQFZisO2', '2', '18030504191', 'error77@sina.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(13, 'architecto13', '$2y$10$EBpqhfaOfnqbQS8z0xniSe90FjUMftrWqDRCfN4Nc7YGxd6gHGgGS', '2', '18244543272', 'eveniet98@qq.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(14, 'dolor.tempore', '$2y$10$VAtoQyxPiCCj44fCWpKxrudbKOomyBUTKN/x6IX/1ix0Stx0kN2iW', '3', '18862793877', 'fimpedit@126.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(15, 'cum.odit', '$2y$10$RMBY5u69JHblIBQ3F.WVH.ar9iTE/34DWeYsn/PqEtOr0qUhNY5yW', '2', '15713904337', 'accusamus66@sohu.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(16, 'molestiae.ut', '$2y$10$hjpl2WdZkNGC7SQc5d9hvOrUB04ViX.S5JTacgQo6W92kUac2muIy', '1', '17157801235', 'recusandae46@gmail.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(17, 'maiores53', '$2y$10$A5xb8qmHghGmhyI6gAt2YeTQ52NOmhTtsEviw2zaIeyaokNpMWeRe', '1', '15615845427', 'error_harum@sina.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(18, 'opraesentium', '$2y$10$2aYC56/Gufay3cOi2MGmHetl5phpjnH1wozKp2aN8v7mvJp.sUU86', '1', '17019093020', 'illo.accusamus@qq.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(19, 'consectetur15', '$2y$10$xDD0JheRKT78c8KrnBvdA.VwJxOVm4uX6egfFILOCbKeJxkgqEwAi', '1', '18880319994', 'non_laudantium@126.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(20, 'fiste', '$2y$10$N8JtWor31OCpagwfat8kyumaTAR9W7gQFqsQksNyfodvtMlkTXq0i', '1', '13781220228', 'accusantium02@gmail.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(21, 'quas.eos', '$2y$10$TNbQzxJUTIxM867uMDeRVuEYhkkx51q4rFaH5b/vkZU062LED8ofO', '3', '13671794490', 'illo.id@126.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:05', '2020-01-17 07:39:05'),
(22, 'quia_eveniet', '$2y$10$dER6TjYMDG0/qXQ9VKgmeOYUIrfrrzh5Z3JxCY7F/VhmECMLd4yza', '1', '15801634184', 'repellendus85@sina.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(23, 'nostrum57', '$2y$10$E8IzG0MroFi7pv.IZJGKM.xkWvGhUQ8IHM3Y.60DcDKmClAWpd6ti', '2', '17800359513', 'jfuga@gmail.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(24, 'omnis_atque', '$2y$10$9pkqXKgEdyJmQe.QUMCLHuKb7ElULR/1xrQ2GoGPStJgK989xpmmu', '2', '14559601781', 'at09@sohu.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(25, 'suscipit49', '$2y$10$JMpxNaZOa7q58vYViPo6Ge973gIN1fRxnkaf2nt53fc/be.uE0XrC', '1', '13735458375', 'hqui@126.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(26, 'consequatur.eum', '$2y$10$VZ2J.WJmLZK.aIQhDOqTP.mPk7qsoCjuiHdr4ehIN8Zp2uSzyWeeS', '3', '13324768151', 'voluptas.earum@126.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(27, 'accusamus_dolorem', '$2y$10$OfEbPRM3iwX36gIH9KJwCesBO/./pb7Uo42HWqXxcPCzXqx4m2UKq', '1', '17026417271', 'non41@gmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(28, 'avoluptatum', '$2y$10$YmdRcW38W7f/KuCPABVVwO4MKjlMdRPQ9soP/bLESpjc5ZCVXtA4W', '2', '15561783216', 'sit_aperiam@hotmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(29, 'gad', '$2y$10$zKCzbKq1ki9hJvc6bzEAouwDb013TsLJaeu05.Ydn8ndIE345wekS', '3', '13265485179', 'distinctio16@163.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(30, 'maxime83', '$2y$10$XZQu3HMqtRgdqNCuCNxNmu7IZWbkUJH2ApeZ87iFKxBQGNEnnbdNO', '3', '13822117396', 'et21@qq.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(31, 'rvitae', '$2y$10$OnEhDblAaKO0GW6zspD1LOzpPn1m3wNY5TiMX7OkESvp2fb0mJ4ri', '1', '17000945658', 'quis_temporibus@qq.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(32, 'quibusdam.quas', '$2y$10$eJ.bV4mlGwtke4xw7bQ2COZEiCElzI4Q.c.gUirYSbkwnhEk9DAyK', '3', '15338464803', 'soluta_illum@gmail.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(33, 'dolorem_aut', '$2y$10$qIhm.pijrLpja0k6uqn.A.vPHxFTN4IxLi2sWc0JO2eo0tKzWUR9m', '3', '15852734243', 'nobis_impedit@qq.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(34, 'tenetur.quia', '$2y$10$QGKAF0FPeOg4Boy1GsJw7.K00YCaw1zDMvSyaEG0BGLK78gjJMX.i', '2', '17823521982', 'lexpedita@sina.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(35, 'expedita00', '$2y$10$E3MeKXteteV6s0FpwTZNgur6WPpkFXOBIPrvRXcwctFtjsFZjFlEW', '3', '15275779006', 'repellat.quo@hotmail.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(36, 'est.ducimus', '$2y$10$ZVpMcBYDQHUdl4tnaep5w.e1GNjCyAiYCG0zC3TssRYdO./pdyfFC', '1', '13916046324', 'sit83@sina.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(37, 'quibusdam90', '$2y$10$zoARSlNf7DlUzawCTQn8FOo5U8ypxAQch9aWl8/hYFhZLFpd92FRS', '1', '13447757921', 'quis73@hotmail.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:06', '2020-01-17 07:39:06'),
(38, 'excepturi.doloremque', '$2y$10$bkvqQzAXJxrd//zew4eM/e2x3xd9PY4OftqqPUeKWgZ360.xa3KzO', '1', '15188402734', 'cumque24@sohu.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(39, 'eum42', '$2y$10$BRVT0De41IRNssRgxrUxU.Jyz0nuxGYemvPjbTOzl/b8ZbHmCQIf.', '1', '13164695677', 'gomnis@sina.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(40, 'natus_ut', '$2y$10$2ELC.EXiIgouKhkCAsSq2.lSn97jeAQoCQ/21oGHjvraZAc3P07KO', '2', '17867046417', 'doloribus.excepturi@163.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(41, 'possimus30', '$2y$10$0uWwG24NRSqU8EeR4dnt5.PDTSCTmSglQNBZvZ5reMKMVFXzOMCOK', '1', '18548510459', 'ad_et@gmail.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(42, 'est_porro', '$2y$10$JutypQq9eT/5PBi0YAAWg.KzEE6IqVvo4waA5V4mCg/cBFtnt.3Bm', '1', '18344064386', 'atque.est@yahoo.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(43, 'libero_facilis', '$2y$10$Us1I96591o4n0DvgsXQ4AejKOKl7qJLmheVSZgM8XEaEYzPnkLK/m', '3', '13577858637', 'eos_libero@gmail.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(44, 'eatque', '$2y$10$BYVhzGXiSgq61E5/2/HPzOAHZiFzNjoqdvQP7lOqTu9HrPbOGdfea', '2', '18909748297', 'est.et@163.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(45, 'corrupti_et', '$2y$10$dHX2IAOhTwBbhcJdMMn0vO3IM94.0bG1zKaM2/B5Mrn2/LAjLETfe', '2', '18770669592', 'eporro@163.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(46, 'gamet', '$2y$10$sfmTZZg1yV5VeQ/dqcTiweh0ennGokf6iEYD4AixfRJfX/GZtswr6', '3', '13097551251', 'sit_amet@yahoo.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(47, 'gdolore', '$2y$10$tPu9YzzuvcR0bolLCZBmIOHtoPC03HEEDWqctJFEkJjeqVDeBzT7e', '2', '17753537610', 'jexplicabo@sohu.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(48, 'sint_minus', '$2y$10$XboaUBjzGE8NhjfmMlbLe.zSO2WA/x5IF..wgMnKA.otuSVUIsIoC', '3', '15951083189', 'fmagni@126.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(49, 'aliquam25', '$2y$10$dbsi6pI55aEDSwae8e6Yo.3NJv6r45QWMqoLRB7nZHtC23QYkFCwq', '2', '17091351573', 'jnatus@hotmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(50, 'vel_aut', '$2y$10$YHPhOkrLamHuxlv4PtKSWu5OH5Y1JDX6mbsGxeTtnoelwsL1Jn8JO', '2', '13356440661', 'et_commodi@yahoo.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(51, 'kmaxime', '$2y$10$5KNGZV3lVmXIYwOmltqnjeQi5AqKD9fXxaxFQJB3IDcLKjAiqbqma', '3', '17190681066', 'nfuga@qq.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(52, 'ipsa_omnis', '$2y$10$tv5lXKoLGW5EfQ98b574AOqISZr5hAMM6r5ZOAYn2pQpz7MV/TxbK', '3', '13919407588', 'veniam_recusandae@gmail.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:07', '2020-01-17 07:39:07'),
(53, 'jullam', '$2y$10$hKd1wYpi1Pp/CTL4iEZTyeQokVMsr41g.OQuoOp8Gdbtd7QbRz9qq', '2', '18709697695', 'msit@sohu.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(54, 'labore.aliquid', '$2y$10$BAWyrmOZk2m9XmIcLefugOJVOnMsRjcjOb9szQ5InMd4h1owMtzji', '2', '18652547117', 'lvoluptatem@hotmail.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(55, 'dreiciendis', '$2y$10$yTMwtHzgFbAt90ZDZmwQYeXj8KotnzFMoX6nSiZA/D.uaS9rNNZ/m', '2', '15372725047', 'afugiat@163.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(56, 'illo.sequi', '$2y$10$glC8om0JChVQJEa0YvYsKeH4kVv1vabQSDTI.Tbwf70ouj/tvwrS2', '2', '17101837226', 'sit09@126.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(57, 'ca', '$2y$10$HPMZlJWVF6wHaIllIjV80.J5VVbLny1yS.mroXrLpMPnnf2nA/Iq.', '1', '13557689989', 'consectetur.autem@sina.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(58, 'aspernatur20', '$2y$10$75yNNGoTS7huL2j4zP.QHOArpzUifQhBMkNTkzNNT8axLZuhVJ9w6', '3', '13712893275', 'non.tenetur@hotmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(59, 'dducimus', '$2y$10$D6ZEoyIj2Xijwm35QO8L4u5jDwijhgTal9XgwCUx3XiW5YDQl6x9u', '3', '18749841455', 'nulla.voluptas@hotmail.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(60, 'cumque.dignissimos', '$2y$10$iyTNYJhqa2Mb/Q9VOoxegO7ogC4vsr38q2Q6qnvYbit0/8CXeUsrG', '2', '18905810598', 'qui.et@126.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(61, 'libero86', '$2y$10$bG4LrbrdIQJZTJPwUUd8MOPA1xnViRIOOrX6ITBE8XSfR1jEQAweK', '1', '17050579690', 'minus19@yahoo.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(62, 'voluptatem24', '$2y$10$zW26lyNUhsaX5UTbDpiXIeitZTW2sEKw8LX16b3fs77QMFh38mdIe', '2', '13603883599', 'optio_voluptas@sina.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(63, 'hea', '$2y$10$yfesK/uoA1N4sWDbtO.TdOvTxOgj6gysQh4Jf7XNBCTcQyvuLE3Cq', '2', '17016091687', 'eatque@126.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(64, 'saepe.corporis', '$2y$10$BG1mBqRLmLHhF5K4.AUoa.zkcMyF3xisAOyonhm9wgT5lxvZO5cPC', '1', '13246512311', 'aut77@qq.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(65, 'et.tempora', '$2y$10$WcDxYyXXgexND.nyNf.7Qu448w.Brj315m9/7M96HXHhNlCLU.0KS', '1', '13335453857', 'dolores_labore@163.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(66, 'dolores_fugiat', '$2y$10$m3cDnogoDJ90iWbFqppxdeQc5.Yyqns2tl68vfIWqvIBrUnll9vs2', '2', '15263531571', 'quisquam46@gmail.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(67, 'pariatur42', '$2y$10$21rFWU1fnRZghIXFC5HCa.vKTWQAkpjbX9DHtWk8.pjDdFvKeoWyu', '1', '14782546885', 'ipsum07@163.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(68, 'vvoluptas', '$2y$10$EKXlnAisrsc32JonFsO/9e/qm2jiK26A5L9ArbKpc7v17ySa3CuEq', '2', '17089955535', 'yofficiis@sina.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:08', '2020-01-17 07:39:08'),
(69, 'billo', '$2y$10$VV3zEK0kKcxQgna30kgGE.URzBnTvoc2Iq9BkfTjjgYoXRjt.3Gca', '3', '15747361852', 'doloribus93@qq.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(70, 'in.laborum', '$2y$10$c.IKSN2WaLLLBjWRPM1nfetGpj.4L3ykg.T3UPP.hquuyL34vrSlC', '1', '13228372911', 'perferendis41@yahoo.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(71, 'velit40', '$2y$10$T3e9f2ZcFrkIVTnRUPp1UOnnrb0bR7CPdX68J27hNY2FsvIgJIcfW', '2', '13859689752', 'ratione_corporis@qq.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(72, 'corporis58', '$2y$10$l1CSzXGRcV0PTcKFL/GkOO1tiYRpenHo96GXB/P5u6nA7B4H0flte', '1', '13847456044', 'ead@qq.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(73, 'sequi66', '$2y$10$BUC.lxWoqTSUliMcn.OWEeaySISPrrZdDBSuyEveTOafNVjWVgqyS', '3', '18742712092', 'aut.ex@qq.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(74, 'corporis.quibusdam', '$2y$10$v1aWdES8qRo9OZITHXNrXuVWN8bbp2Ht7JCOrg9s58b1gpgiS/p9i', '1', '15073057046', 'asperiores_non@163.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(75, 'gexpedita', '$2y$10$tSzLrQA9wkKqGdTTi6/y7OnwOma1dWGQzBCcJgRib8iN4ZvgkVMFS', '1', '13432874287', 'sit_voluptas@126.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(76, 'et.praesentium', '$2y$10$zdwdu8x0UHs/9IJHjeKuje0Ia6AhYFnI94ex.1J4f8RJ98i7FMT5e', '3', '15213294153', 'et.saepe@hotmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(77, 'praesentium_deleniti', '$2y$10$XxKEnwrhVtVW6ewQ1dfeU.WYuzAGdDbglShUhLWlmBvmCTSuG28Mu', '3', '18254839013', 'ipsam_dolorum@qq.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(78, 'nostrum.voluptates', '$2y$10$qtCgts6DEx4L1UK5nDKEIuXL6/asYX4UaOSkz1YZnailyhjgvvIZ.', '2', '13436978979', 'iquia@sina.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(79, 'autem_eaque', '$2y$10$yaRK1BogsKAdI9JuVAWnr.5aHaq3qSyMbPJV6l2l7hHkEG8Cae2Ce', '3', '14535452588', 'gincidunt@yahoo.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(80, 'consequatur_tenetur', '$2y$10$UA9FZ0g4YrBUj3x8dOE9wO1r7ZQyOchQxpqFcRbOwgOjo8DEj3Gjq', '1', '13531711286', 'edolorem@sohu.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(81, 'voluptatibus.ut', '$2y$10$v8N.7LpjxllzSv2MefrS7e4WIVh2jyQ0Ff/Q36ezm6JO./5JsZNw2', '2', '13516368484', 'non_ut@yahoo.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(82, 'gfugit', '$2y$10$GH6ZiQco89rfiY4JzQKW3ON7IIYhbA1dX9SYgxbjLohGqWBN54daa', '1', '17078051981', 'quia.exercitationem@126.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(83, 'fasperiores', '$2y$10$PPCz.7Mka3AMZdMVR5Y/cuvEUAEpFPHwoVNhWd3U4dlGmryIQ.Dia', '1', '18255602149', 'jmolestias@qq.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(84, 'est22', '$2y$10$JKXRN48kyILP/c06PK3KPe2nrifBNDASnwjS6HBrNvv5N2KyxxWR.', '3', '18195278679', 'xreprehenderit@qq.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:09', '2020-01-17 07:39:09'),
(85, 'provident.ipsa', '$2y$10$PIs.L2E6gZ8TPMjs9X90.O/N6RqEY98J/QkpDa7jzs62hFIgBsf1y', '3', '18865891671', 'ea_est@gmail.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(86, 'cid', '$2y$10$FyinexoVRlvIsI7StD3jC.JdQdgsJJbOlrb0ubZdhvSKFzQ7qhr.q', '2', '13373716042', 'officia.dolorem@qq.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(87, 'ipsam.quos', '$2y$10$RkzG0ae.wtidDi8djZW1x.v9VcdLwgrGKVpJuO8UtEm8x6sXUtbI2', '2', '13438984142', 'qui.aut@sohu.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(88, 'iste.et', '$2y$10$cMB5G27g6FZYNPsY8pfOGeNBEfCly8Y4FJCA29a5vQR73Q9yqK69u', '1', '13765686743', 'atque_est@sina.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(89, 'molestias_sit', '$2y$10$GqU4Yo5fhJ2bQNyKsr7yfuEILpOEx.Obv7YaX1q7hxJ7W7P2lAouS', '2', '13943093039', 'nihil_aut@163.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(90, 'aut_veniam', '$2y$10$kVtPt7a2XiylAGu15jqAme6eh3Aa4ZfWTiR.io5O1A65p7D5txsi.', '3', '13590822421', 'laudantium_aliquid@163.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(91, 'error.quia', '$2y$10$k3am6Fs9MQ3OCmQzbaf/Pes3Wc2XsB5vSTf0PxDSWBXKBclR1aCbK', '3', '13998261802', 'zaccusantium@sohu.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(92, 'plaudantium', '$2y$10$5vtPfWsAfA7wDTMqhHq3Tu0hWbQNMex/Psf1.dlpE1jRaohG9emK2', '1', '18545207787', 'velit_recusandae@sina.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(93, 'quam17', '$2y$10$SKaxn2QIlx8uKn.eFlhuX.YD5Iv3IdlxruVY7NsxXXrUA5t76aEci', '1', '17197526175', 'ut.voluptatem@yahoo.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(94, 'xsunt', '$2y$10$MKkA1k7/FrS71ue2qA7qceXysZxG7CmxufLzJW6PC2QMFC6F8Cu.W', '1', '15598156398', 'aut67@gmail.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(95, 'magni_rerum', '$2y$10$U8n2PBztrW.D9wS3UeQcpOaB5Il3dKLNlG/7d94dgyE9pyAn/MncW', '1', '15845389416', 'velit_recusandae@qq.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(96, 'eos.qui', '$2y$10$ffyoCwqK17Xf0onEJuHhuuYARfeekkUMQwFqg6x5UTH8wZqU.kU4O', '2', '17070576686', 'gblanditiis@126.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(97, 'soluta_fugit', '$2y$10$pakE1FbOiMj45SnOK6xHhuu/YfzmNOWfU8xQGTezFisor8FfzmSsu', '1', '15203658766', 'lneque@qq.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(98, 'keius', '$2y$10$g4W3UVjkIyV3G2NuYK8pZO4bX7WSbNFtiF6GzN3CoWPXnBlvoj13.', '1', '13642423257', 'debitis.explicabo@gmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-17 07:39:10'),
(99, 'est93', '$2y$10$l8kVIEdZ28u.OmonprMl0ePKOEZaGY6BxTrtpUtTfkH/Ui6DCXLE.', '1', '15034888133', 'in_quaerat@hotmail.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:10', '2020-01-19 12:26:27'),
(100, 'officia_voluptatem', '$2y$10$ScKRHd8Cy6Rh/x9BAnmdNuf4WS8BQYmIzhsLdMAcRPlXiWgmZ/uZG', '1', '18625825126', 'consequatur40@sina.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-17 07:39:11', '2020-01-19 12:26:01'),
(114, 'dolorem_provident', '$2y$10$zLLtHrm1sbAvHCW.eLzxvOd4bh87vvMwd3GYNCNieLV3.my04S2yq', '3', '15590960616', 'tut@sohu.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(112, 'uasperiores', '$2y$10$Q31t0d0zPoXEDEMQPDQ1SeUaiQA98O4D6lP6WUvTqeYnmdyTr8zhu', '3', '13463753208', 'est.saepe@qq.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(113, 'in29', '$2y$10$QSeSyeRsFBQJ4iVwqTlY6.Do1Hj8a25cy6c.yP6zc3.SKN88FbWjy', '1', '18377568533', 'jfuga@hotmail.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(111, 'nesciunt.ea', '$2y$10$ZQdjWtSujbVehOmvfigGVuW8DnAXiFhvymU4ASLnbWbwKNIp9qeqG', '2', '15037557202', 'qeum@sina.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(110, 'ad.deserunt', '$2y$10$TF0Yzs/FWcZYjhiwrMXpMetdn.ZuBnRzkAcG/H0QaospM5ncM.qae', '1', '15320236348', 'vitae.enim@hotmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(115, 'ut_culpa', '$2y$10$W0m.h0lEzLUf0oI8XNmXRuKr4Rhiw/iVCTr6RIHbNMuJDmX3nOxX.', '1', '17054156570', 'qui88@hotmail.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(116, 'eos38', '$2y$10$qBesrscW0UrYs94PxNFule6YIjkPDy8YSQ5rUtJ0A8ibpPeTfVgq2', '3', '17621969203', 'voluptatem.qui@sina.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(117, 'jtenetur', '$2y$10$8gapRi1HFkr/F1WrjS22.eQsXgXy0gHfNDpw5unAATm4OmcFRdeSS', '2', '17692530196', 'esse.repellat@sohu.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(118, 'dolorum.nam', '$2y$10$Sn1PYXkAB6hTunSM9mEvR.il9hN1LHUjgsoF1OYsuxq54oduMkxny', '3', '17084251728', 'culpa.molestiae@sohu.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:18', '2020-01-20 06:24:18'),
(119, 'at87', '$2y$10$MWOe4L7HHvHWMEo/UB438eVkZ3uOljaM0YYcrFGrtyXDp/CtdpysW', '1', '15786903276', 'dvoluptas@126.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(120, 'voluptas92', '$2y$10$gewQnTWwWs07g/v5/BuFP.bn2o3h7dUw5SNndhEqybCk2Vdohssa2', '3', '13281249659', 'mnon@163.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(121, 'non72', '$2y$10$7BzxZf84Ldd6VbjaqsYHROSrgGQhsGDxMCVdqONJ/IfbKyqcNu6K6', '1', '17622083090', 'ea.molestias@126.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(122, 'libero16', '$2y$10$maD9KkStXnY0cKBQFRV2e.LUUC8WJt6tzj1Qje82x7ONT2mCU49Hi', '2', '18575355196', 'beatae.est@hotmail.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(123, 'umolestiae', '$2y$10$A1S045XSp.MeOBUR4sgXQ.jQgCXkugEjqGF4f9TwPIZ1weHrwDJxq', '3', '18221885659', 'consequatur.temporibus@qq.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(124, 'vquia', '$2y$10$usiz4UL9hZ/SY2o1AKr.MedHT24zVyJumMBk0VtYLFTk4pcHMpim.', '1', '15301256225', 'qui66@gmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(125, 'dolorem.ullam', '$2y$10$00Uuzp9I0UET6ON2RsCk1uVJP.iKz0GCyhEAPqqjPzLpi190UCkKm', '1', '17057738737', 'labore.esse@163.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(126, 'sint57', '$2y$10$TgnlFYyBNo2ubHhT1LB2ru4fENIA4p9DVTZtgmcv/ixSBcWIRP.H6', '3', '18933589193', 'error43@sina.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(127, 'cum.eligendi', '$2y$10$1QJKOpX7itqFtpIcZo82puAFZ3fBef1hKaGIgzQqLZMYYAYkUyA8G', '1', '18264580599', 'ut_fuga@yahoo.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(128, 'et.est', '$2y$10$uF6VIC4i6DG/W0un.9vzbuZkLaitA/TBdv/j5.Mal0MyBhzOFjXX.', '3', '13683517840', 'riusto@qq.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(129, 'officiis_est', '$2y$10$FNnzazMmoOdu6XotLnpISudIC3tTudU.gICXBFr4NRwXFYwu4mJ0O', '3', '17195846564', 'at_nihil@yahoo.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(130, 'voluptatem_sapiente', '$2y$10$bsZt9YPDLyXlJ4.Qp1sVweXfzF8I1AnFl.sKJ298l2DpntSO1i9we', '2', '17004706734', 'ut51@sina.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(131, 'explicabo.ad', '$2y$10$8VRGOFJVlCgQZY2CBuGRpeVM8eovpgxt8WjFxaUieO4wEr5rAdvTS', '3', '17186185927', 'ea_in@hotmail.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(132, 'afacere', '$2y$10$X5fVuiO4ns8j0MWVnQLvAes6GxAKDZ6aaR7kvVkYkxlB5z1nZMTN.', '2', '14725868465', 'ut_iste@yahoo.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(133, 'aut_animi', '$2y$10$aFtSf.6cfx7GPoovztoEcu8fwzh6NGfnVgj56Kk8A2.y50WHjMl1i', '2', '17189162133', 'tempora89@sohu.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(134, 'repellendus74', '$2y$10$Sr0/H6zHbdVxDrwCat3F7O8ffNCVbfwHo6iPFlP1pHTw3RDwkanVm', '1', '15587580669', 'repudiandae43@hotmail.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:19', '2020-01-20 06:24:19'),
(135, 'wvoluptas', '$2y$10$.4jFuTNI6U/0wpinxcf9ZeuX1ObSmwT4y0bV5MM0HIIpp0iFocj0O', '3', '18613982252', 'tempora97@yahoo.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(136, 'sed90', '$2y$10$RUvaARH.tABaKPb43YZOeO2OK/2TGR1pEGvcGw4UlGe6MPHJa3Gni', '2', '17185030408', 'neque.omnis@hotmail.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(137, 'dignissimos.voluptas', '$2y$10$GLombokKn96ZAhnknV8A9.wdFR3MGO1.HchXUMRPeD6YTU5YZwJ7.', '1', '13256046753', 'zvoluptatibus@qq.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(138, 'leum', '$2y$10$Az8QT5V3O2UsPhya24DXkeNEY/3SiWOPQGgHntA1H5YjzZ4UVvg2m', '3', '13350451404', 'omnis.ipsam@sina.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(139, 'facere.qui', '$2y$10$nOfg3AT4kVbtzLR6hqN4/eCFRSDaECXE9InXIMkfMtpjsqsE0k4re', '3', '15801763661', 'quos67@sohu.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(140, 'dolorem.nostrum', '$2y$10$95pRKY1RV5GdswGQtO00TezfZ3585W0P9BgfEUZ7R.SOO.GbgkH0O', '3', '17194924462', 'oeveniet@163.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(141, 'ea.rerum', '$2y$10$t/1/TIeUkrX/RykXr013UeoValYqiHaxaql4Jj4k/MegPecCWKfXO', '3', '18449299272', 'est49@126.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(142, 'cporro', '$2y$10$TiVcE9CCqIH4GBJ/UbWNXO/g.c9MqIRwZvMbrIYm.kORT6kcU/I2C', '1', '13868509118', 'odit_repellat@qq.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(143, 'csit', '$2y$10$OQuFm1nL2dHpmIELvKW4kOlykNXWWs4DIcVihKGig8NQK.NasP8ZW', '1', '14778708857', 'quas.voluptas@hotmail.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(144, 'nquibusdam', '$2y$10$d318CDEDuEXH/j2eCnPXN.zB.9EGptEcrV5hv/oiCud7NzoDenNCa', '1', '18623367095', 'jdoloremque@163.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(145, 'fvero', '$2y$10$VUSDzbxtthY2zaS.8Lk0h.sKjmJMLTafPSeovE5wdvsOrEuqBQc8y', '2', '17137120346', 'consequatur.accusamus@gmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(146, 'animi_nihil', '$2y$10$lnlvSZNmfce7bts91oFxM.HUVOps6jSGGn2ukgtI.3W0s/7Q8qimu', '2', '15657182620', 'jeaque@yahoo.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(147, 'omnis61', '$2y$10$MRJt2tr8zH7HSu9GpiSAGu3HTW8bDyrUNE9zbnaB0wyqd81okB0EW', '3', '17135210522', 'culpa.id@126.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(148, 'et_est', '$2y$10$NP4V84gjqyi.IEAxvg42h.oudVMT2udoXgB5VGggIVqSJGeeo3Lz6', '1', '15128308670', 'ullam.voluptatem@sina.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(149, 'modi_adipisci', '$2y$10$TXJKX9lJNIQzvpax8e.tsOTtEnQWQXR8cWzrV8zaeLkUZit5sLHOG', '3', '13384180013', 'eum.pariatur@qq.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:20', '2020-01-20 06:24:20'),
(150, 'at13', '$2y$10$09Y6cWF4fjvtexNNgTDeE.92Lc5GyQ.ZygIo5ec3/JErWOI6GgqUa', '2', '14591261951', 'recusandae.adipisci@sina.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(151, 'molestiae.dicta', '$2y$10$N8ILYsAsCjm1zlLb9VDn2eFjRtHoekxeini9mElZmPzfBexDPLTha', '2', '13149521914', 'udeleniti@126.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(152, 'vitae91', '$2y$10$8nypNRyAfgbR3njL1F2L/ObyzqwcFuX8wCZ33NmhKHQjr1JjrUV9W', '1', '15381912062', 'yomnis@gmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(153, 'enim_labore', '$2y$10$YT/pJsnse7fKe5Wek3JPce.hkyAgAi/mEfLHuXi2Egr3jDNXf1yki', '1', '14782941568', 'consectetur.iste@126.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(154, 'warchitecto', '$2y$10$kZgVRRxYy/lmVz4I3IX/J.smc9lGQzpf9HCe0D.AOPbKkaluFYs3a', '2', '17180577805', 'vitae43@sohu.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(155, 'yvoluptas', '$2y$10$9YfShB2Rh3rFCqBQiHoJkOSByJ7MWpY/juLxqh1PRS8gbT.JlzRHC', '3', '18173433235', 'odit_numquam@163.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(156, 'nostrum77', '$2y$10$kSNaCaee786kmXc1JSCs7uJDvYjZ0nzgEIGlOEiTsm4MURid.XZTW', '2', '18656434460', 'quia_quo@163.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(157, 'iste.officiis', '$2y$10$L4lpemkNntAO5NpRkRAA7OXwedwCUbo1IJtz/OP8bqhSkvxeB6Nqy', '3', '13261720025', 'quae.illo@qq.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(158, 'corrupti.minus', '$2y$10$5lYmbe75L3dpubUU3OdVXuLHwzflKLGM0lVYvw4mf4cIWEET0ghwi', '2', '13297193676', 'adolores@sohu.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(159, 'mrerum', '$2y$10$l5q4Gm66Hyq64yc79EhHle9P.ubs0yj8TZHnhpf574ShagUVcZOP6', '2', '17730230958', 'dignissimos.quasi@gmail.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(160, 'error98', '$2y$10$N/3W6Hf9MLeBdq2I4oHAXeSYgEKGWJ2gjjQfsnPW7UpwlqtXBa0RG', '3', '15841204376', 'saepe.fuga@qq.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(161, 'impedit.voluptatibus', '$2y$10$59TJmG4cPO9NEEdBaid7Xu2TrbZ41o5VWFelaVcogwQDpt69pl/MK', '2', '17006406803', 'grecusandae@hotmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(162, 'enim.dicta', '$2y$10$TIqaStxXoXRJpZ/ENn9OzO0qfnY8jO8J/HO6R6KTd.gLVxRxV02Ke', '3', '15940131922', 'animi56@163.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(163, 'qui.non', '$2y$10$jUo7tNRgg89DBwpmtwqZ9.WkuWmEGsmFfKXrTtzBt2a2EbAWL8p5W', '3', '13548729715', 'officia41@sina.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(164, 'daut', '$2y$10$WBEJBK0.s/htDbRbSZrVWuIFTHc34I/h/FXbR2qBiqg8kfklxG.C.', '2', '17002371827', 'maxime.sit@yahoo.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(165, 'iullam', '$2y$10$GfSZopTGeZSNi2S8IbCMDuGkzpsU5Uucy0bHDYMQI1Q.IYfy/NFGu', '1', '15860572406', 'temporibus_assumenda@qq.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:21', '2020-01-20 06:24:21'),
(166, 'autem66', '$2y$10$/sv5S36c/uP3c8K3bcnfGOwhIKvTrcLWVmCzn.zI7o2Q1PWvp3JxG', '3', '13669623312', 'consequuntur_corporis@yahoo.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(167, 'corporis22', '$2y$10$RgnrQh6Qgl.yUSrS9pdPNuvJfPlRRhRTuBs4OpIKaL7ivJEmhzuea', '2', '13381115605', 'labore.officiis@163.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(168, 'fuga.labore', '$2y$10$FDrkymDUMeDKnOL2jzCmBuxK8kQR1EezbRYmdKdpvo/ijivp3qugG', '3', '17008763343', 'repellat52@126.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(169, 'aliquam_et', '$2y$10$29giGjsPKJJ93ym/evLlme0tksEKOasOE5wWswSnZ.3twcPwsBnAO', '3', '18996383608', 'cexplicabo@sohu.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(170, 'distinctio.voluptate', '$2y$10$qD1e0QUzNTuOwu5Avp.C9OPL0lPlU1dk2irkigaGBZ6S6mrk0cVFe', '2', '15027012917', 'consequatur87@qq.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(171, 'rquod', '$2y$10$reJT8aoNY34V0xSrZOUX5.bQQg47K4JYeNHZvUsSkaTgq/NjJpRAC', '1', '17015631641', 'ipsa83@gmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(172, 'oautem', '$2y$10$F5Vn.YA7II8GQsbHLYB6VupTAzvYZfc45FEg7DPyrrhUnTy8Vy58m', '2', '15324623553', 'cum94@gmail.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(173, 'explicabo_fugit', '$2y$10$zOKWFtk0oyT8lDGk1m.vsOJuspKaNbwfiqv8Nz46EduH4Cnqdl762', '1', '17180359679', 'animi.animi@126.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(174, 'non93', '$2y$10$u/0yM3dKcxgxvfrVkgmKbu1cCPEb3XkrONWGk3JZBmmnD4yqSZewC', '2', '18574186354', 'sit.dignissimos@sina.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(175, 'dolores.voluptatum', '$2y$10$jrwxwchV00w.qnJ4pTIJReGVgLg.m4KZr7l/I0ipafrxsPMZTcvm2', '1', '18194592353', 'usapiente@gmail.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(176, 'aut_repellat', '$2y$10$Y/k68HYcsuXYH7LO9avzgOK.sPSh/4A9fUgJDV08nZDOAuRxlEmFi', '2', '13267029249', 'harum_quaerat@qq.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(177, 'aperiam.tempora', '$2y$10$fLXU8AMv7LpxTnEF7LNzJuWhlFg/RRYMBNQJb49e0U64G9iyb3CGy', '2', '18333411451', 'recusandae_nam@hotmail.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(178, 'vmolestiae', '$2y$10$OCPMj78gcwI6a/5ptpyy6.hqH4YMT6hjx0scWNn5.BcUdAw0tGxvi', '2', '15684666753', 'laboriosam.rerum@sohu.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(179, 'dolores.asperiores', '$2y$10$QmvTEgErYSbtHjvW3KDk3ehsqIZbHSX0VnAXjS8BSq8TVnzJohH7a', '3', '17156216862', 'dharum@sohu.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(180, 'culpa_dignissimos', '$2y$10$fOxztSbVAxTFBk1BMISIh.TYTXcRDidQHckB43F6l93EMb42tQyWm', '3', '13051405523', 'et_ut@hotmail.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(181, 'commodi.nobis', '$2y$10$/lQo3whK/lzb2GOWqQzBPeh1f9DsIz9bU2qAkyJk.6F8DY9L9Nczm', '2', '17623071136', 'nesciunt01@163.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:22', '2020-01-20 06:24:22'),
(182, 'dtotam', '$2y$10$u42/lEi5F80Ws1SCpjSrz.M0ws4UK9rmQT3TogtVgpzHIcol9f5kS', '1', '15399472076', 'optio_sed@sina.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(183, 'autem.ut', '$2y$10$Ykkgpz9I03j4IFiv6AF30OagRgm7Zq52sARXz3S/aCmHPl7xYCIDe', '2', '18915397490', 'id.laudantium@gmail.com', 4, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(184, 'quo_porro', '$2y$10$eSox/lI5bfzC1PzrKg9PB.haPBoln3j/1lOIeXf0y9H8C0.T.x1pS', '2', '18320103479', 'quo22@qq.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(185, 'molestiae.debitis', '$2y$10$EQS6bmIrIpSTJJ/t697Mn.Q1nUZRYI1sJ6GFMJbs/VZY74zNYyB2u', '1', '15540030996', 'omnis_adipisci@gmail.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(186, 'pariatur_rem', '$2y$10$LzDalxStUwCI49SDxKv6SOK.4/aW5vuq4DAAdCWQs3FnySCzYouDG', '3', '17194166480', 'quos_magnam@163.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(187, 'qui_voluptatibus', '$2y$10$fWkqUsaKsz/h/EJVyLjeXuxVOwBW0zeb1tFa6hRwweDkbwDnNlXme', '1', '13295085269', 'consequatur.et@sohu.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(188, 'itaque_dolore', '$2y$10$4ALcCzZV6LxU6k0wjlPC.OqHa546HxN.WicCUTyJcqrgU7H5u7f8G', '1', '17089694485', 'blanditiis.animi@sohu.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(189, 'facilis.in', '$2y$10$CRMY2a3rlkWWFpSrQrh0qur/uXeaoqJhEdJpwEIDRMclhSfJYvux2', '2', '14725159192', 'est_labore@sohu.com', 4, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(190, 'quod.culpa', '$2y$10$N5yiJYPduvjayKp5KAT34.bTPCLL9x/eM4JS3TnxxrbHJc8eJ4qVq', '3', '17186014607', 'laudantium94@gmail.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(191, 'sed.excepturi', '$2y$10$39GbQoGuoMxihDUVo.b.yeYqYXOmWHnTNZKiz/l5khn50XOCck7d.', '3', '13560926720', 'at_voluptatem@126.com', 3, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(192, 'nulla_autem', '$2y$10$xbR4AEoh54HPasYyiLiOKe8PBjWqdh72qf0/z9M9..duh5oSuEDS2', '2', '18790416659', 'sequi_voluptas@qq.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(193, 'eveniet_est', '$2y$10$raX3lkL6A46kZe7Y1Cfeyu5AfLhvCJPqwOgI0WVu8W3HzeqoCdkU6', '1', '15002240943', 'yet@yahoo.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(194, 'eligendi_fugit', '$2y$10$qXOFPvL8Q9YriGc1nE46JeBrDFOFpQN.UTlVz4Q/pSC28B35eZ0e.', '3', '17188710932', 'yveritatis@yahoo.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(195, 'est_necessitatibus', '$2y$10$DjPxD7VDaG7gqDvGrj4FcOxmJMBJaSdtdqO1gLNzoWzX3obSy.97m', '3', '17014924783', 'voluptas.perferendis@126.com', 1, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(196, 'est_ut', '$2y$10$t1qqUsZNf56NrBR6BO0VuuH2BUkqbD8Zz7gSg5.4xY4yNKXMiHsmi', '1', '18795007182', 'knisi@qq.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:23', '2020-01-20 06:24:23'),
(197, 'rem.nostrum', '$2y$10$ns13jKWNLGswR7h5oOUf3.PEYnOVBBlROvkS6l/d6ldQKh8O6nAPu', '2', '18762019247', 'rem32@qq.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(198, 'non.doloribus', '$2y$10$ao6sSU8ZWrhrrrbGFl35deDGnJN1S00/XA1coWAlGj9T8Re0haXJe', '2', '18339036479', 'ab.ea@sohu.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(199, 'sunt.voluptatum', '$2y$10$UfVq6Ym4Wzi/kJ52f3I7sOtfi7aq.NOvJFHy1dNHTbr5h/QqQOFli', '1', '15062222676', 'et.assumenda@126.com', 3, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(200, 'dolores.suscipit', '$2y$10$jfKKEVwzuTYt1xz4SHB66eGqB.3YzBoujeiBCKnSYvDLlq0GcZ6Ia', '1', '15027230844', 'iexplicabo@yahoo.com', 5, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(201, 'consequuntur.earum', '$2y$10$o4aGMcdhSBX2PsqEMbjGDODdk3QNwSoyGC21PvRgkyVicRsMBe/XG', '3', '18007557031', 'sequi12@qq.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(202, 'autem.et', '$2y$10$OfJt5cx1OPse9BmDrkh0burckIs18ej8816uKVRo3dAxL9wQks3Ta', '2', '17053334510', 'dignissimos.natus@163.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(203, 'cum_illo', '$2y$10$TSLnzYe/OZ7f1wY0QU.E7u8AUQVPGBBUIf43xd4BU3bbWwTXRMMta', '3', '17009485239', 'xdoloremque@gmail.com', 2, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(204, 'magni_cum', '$2y$10$3BOyHfXIassS4qwrZBs8mOmzOAMyZZh.E.LM2xUUjKIq9GITSfu.i', '2', '13343194526', 'quas_a@126.com', 6, NULL, '1', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(205, 'adipisci27', '$2y$10$lajH/DhgFC3mnEax1pZO1.oMCbAGJXSEUoowdna7A0ZGL7Hr24KnC', '3', '15768158934', 'nisi50@126.com', 1, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(206, 'qsed', '$2y$10$5FI7tFqdwFcvViD5QgMQ4Oi6ubkpxSg/RzTaKetTcVQnlTH0V1OKC', '3', '15064907096', 'perspiciatis.quaerat@163.com', 5, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(207, 'quaerat90', '$2y$10$3048KGNl3FU/qMgBosy.RuPtJxX/VnutJ/mKz2kOEMKmAQ1bUU.Sq', '3', '18594683528', 'nut@hotmail.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(208, 'consectetur_minus', '$2y$10$QUGrV5U67J6YLXpUpennfuKb/L/HSNiUClUbvfx37Sy6HHuiMTfCS', '1', '13553791257', 'bitaque@hotmail.com', 6, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24'),
(209, 'placeat_perspiciatis', '$2y$10$A31SIcBU9.R0MGQylRl/.eEVtTOHXbRx8e7W7YzGUCirtMUt7xu0G', '2', '15973346252', 'saut@qq.com', 2, NULL, '2', '/static/images/avatar.jpg', '2020-01-20 06:24:24', '2020-01-20 06:24:24');

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE `article` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_id` int(11) NOT NULL DEFAULT '1',
  `class_type` enum('0','1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `sort` int(11) NOT NULL,
  `status` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2',
  `views` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `author`, `keywords`, `avatar`, `file_url`, `description`, `content`, `link`, `class_id`, `class_type`, `sort`, `status`, `views`, `created_at`, `updated_at`) VALUES
(1, 'Autem dolore maiores quis dolorum aspernatur.', 'Barbara Kovacek', 'debitis', '/static/images/news.jpg', 'N/A', 'Voluptates minima optio.', 'Aperiam repellendus qui voluptate temporibus qui amet. Minus sint numquam quod accusamus. Deleniti quasi qui quo sit omnis ipsum. Consequatur est adipisci et asperiores aperiam.', '#', 2, '0', 28, '1', 368, '2020-01-20 08:51:50', '2020-01-24 07:55:38'),
(2, 'Molestiae esse dignissimos esse saepe. Ad quidem iure aliquid tempora a pariatur qui aut.', 'Bernice Ruecker V', 'excepturi', '/static/images/news.jpg', 'N/A', 'Sed deserunt blanditiis.', 'Ex amet sapiente ea recusandae nulla quasi repellendus et. Tenetur itaque non in dignissimos quia. Maxime odio voluptate labore repellat facere.', '#', 3, '0', 12, '2', 170, '2020-01-20 08:51:50', '2020-01-24 07:55:17'),
(3, 'Deserunt rerum hic magni non voluptatem.', 'Kaela Yost', 'consequatur', '/static/images/news.jpg', 'N/A', 'Magnam ipsum laboriosam.', 'Placeat accusamus odit accusantium facere earum sit similique. Non voluptatem necessitatibus sint modi non quia delectus. Natus labore doloribus dolorum.', '#', 5, '1', 21, '2', 168, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(4, 'Error blanditiis dicta optio velit placeat enim exercitationem.', 'Meta Brakus', 'reprehenderit', '/static/images/news.jpg', 'N/A', 'Dolorem quo et.', 'Et facilis provident voluptas voluptatem itaque vitae. Ipsum ut impedit eum non. Quas fuga sapiente aspernatur tempore aliquam eaque.', '#', 4, '0', 46, '2', 376, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(5, 'Quos deserunt perferendis neque corrupti ipsum dolorem.', 'Linnie Macejkovic', 'sunt', '/static/images/news.jpg', 'N/A', 'Fugit quidem in.', 'Animi laboriosam quaerat voluptas qui aut qui voluptas. Explicabo odio neque quibusdam molestiae ducimus. Culpa officia error delectus tempora sed.', '#', 4, '2', 33, '2', 308, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(6, 'A quos deleniti sapiente dolorem nam sint accusantium.', 'Dr. Hollis Koch DDS', 'tempore', '/static/images/news.jpg', 'N/A', 'Qui et.', 'Distinctio voluptatem nobis eos ut vitae. Enim et consectetur reprehenderit. Ullam earum eveniet possimus voluptatum itaque. Et iste facere et placeat delectus tempore dicta molestias.', '#', 2, '1', 40, '1', 181, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(7, 'Earum rerum illo aut blanditiis quidem. Sequi a harum rerum est voluptatibus.', 'Myriam Schmeler', 'eum', '/static/images/news.jpg', 'N/A', 'Aperiam quod ipsa.', 'Enim sunt aliquid optio. Accusamus unde veniam ex vel et excepturi. Cum aspernatur quis at iure excepturi ab. Et beatae maiores ut qui repellat exercitationem.', '#', 3, '0', 32, '1', 112, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(8, 'Hic voluptas sed neque fugit corrupti eligendi sint. Aut culpa qui cum error ipsam.', 'Mack Swift DVM', 'expedita', '/static/images/news.jpg', 'N/A', 'Laborum sit.', 'Commodi minima velit eos repudiandae. Consequuntur consequatur id cupiditate dicta beatae et ullam. Ipsum eius recusandae aut fugit ea cumque.', '#', 5, '2', 42, '2', 229, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(9, 'Beatae ratione nostrum qui.', 'Mrs. Freida Wuckert', 'voluptas', '/static/images/news.jpg', 'N/A', 'Temporibus vitae sequi.', 'Quis eos animi vel totam qui deleniti veniam eaque. Laborum repudiandae placeat dolorem eveniet aut. Voluptatem maxime quia sunt possimus.', '#', 4, '0', 18, '1', 472, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(10, 'Occaecati atque dolores ad natus et. Architecto ut hic amet voluptas cumque.', 'Gay Bins', 'illo', '/static/images/news.jpg', 'N/A', 'Impedit quos.', 'Id iure ea sapiente omnis cupiditate accusamus pariatur et. Velit sint in veritatis excepturi.', '#', 2, '0', 5, '2', 324, '2020-01-20 08:51:50', '2020-01-24 06:49:16'),
(11, 'Voluptatem aut maxime distinctio. Eos porro quasi ut ipsam omnis dolores quod.', 'Milton Schinner', 'ab', '/static/images/news.jpg', 'N/A', 'Ea voluptas quis.', 'Laboriosam porro non consectetur. Dolores id ea aut expedita.', '#', 4, '1', 17, '2', 455, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(12, 'Id esse ut nisi deserunt et distinctio.', 'Juwan Buckridge', 'earum', '/static/images/news.jpg', 'N/A', 'Soluta deleniti ut.', 'Voluptates velit dolorem illo atque ex tempora eos. Officiis voluptatibus sunt quibusdam omnis vel. Enim est voluptatem impedit quibusdam voluptatem et.', '#', 4, '2', 49, '2', 427, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(13, 'Eum mollitia vitae ut qui. Officia libero sed incidunt dolore dignissimos.', 'Jeanette Steuber', 'rerum', '/static/images/news.jpg', 'N/A', 'Laboriosam et.', 'Commodi dolores error ea ut sit. Officiis saepe veritatis in voluptas autem rem dolore dolores. Consequuntur repudiandae eius error consequatur doloribus non sit asperiores.', '#', 2, '1', 35, '1', 269, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(14, 'Quos cupiditate quo molestiae.', 'Marco Prosacco I', 'dolores', '/static/images/news.jpg', 'N/A', 'Quis sit tenetur.', 'Aliquid incidunt repellat magni perspiciatis. Temporibus facilis nemo voluptas omnis dolorem. Modi ipsam velit quaerat quasi.', '#', 4, '0', 15, '1', 369, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(15, 'Voluptas voluptatem qui dolores. Numquam pariatur totam rerum sed dolorem facere perspiciatis accusamus.', 'Nicola Gutmann II', 'dolorem', '/static/images/news.jpg', 'N/A', 'Ut culpa quos.', 'Enim numquam est sed iusto praesentium rerum. In placeat reprehenderit similique et nihil quia suscipit.', '#', 3, '1', 25, '1', 196, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(16, 'Rem impedit sint quo modi in sint minus. Temporibus asperiores a qui itaque deserunt repudiandae aut.', 'Nicolette Eichmann', 'voluptatem', '/static/images/news.jpg', 'N/A', 'Impedit pariatur delectus.', 'Enim eum sed deleniti quae dolorem sit. Aut sint natus consequatur officia numquam autem ut dolorem. Et sed molestias dicta eos sed quo inventore ipsa. Ut autem voluptatibus quae.', '#', 4, '2', 50, '2', 146, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(17, 'Aliquid maxime omnis molestiae ducimus sint quis asperiores.', 'Alexandria Klocko MD', 'similique', '/static/images/news.jpg', 'N/A', 'Ab possimus.', 'Ut necessitatibus similique expedita quaerat. Autem consequatur ea quod odit enim illum laboriosam. Adipisci molestiae esse aliquid qui illum eius eum.', '#', 6, '0', 22, '1', 72, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(18, 'Nisi perferendis maiores qui laudantium.', 'Jamil Bednar MD', 'nihil', '/static/images/news.jpg', 'N/A', 'Dolor ab.', 'Deserunt quisquam soluta voluptatibus architecto alias. Sint corporis maiores tempore quo sint aut.', '#', 3, '1', 44, '1', 211, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(19, 'Voluptatem qui mollitia et tempora quas qui.', 'Prof. George Dibbert II', 'inventore', '/static/images/news.jpg', 'N/A', 'Et consequatur.', 'Asperiores alias sunt perferendis sit architecto sit aspernatur ipsa. Dolore omnis voluptatem placeat omnis aspernatur praesentium et laboriosam. Vitae molestiae vel minus minima.', '#', 4, '2', 21, '1', 286, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(20, 'Reiciendis est quis praesentium omnis vel voluptas.', 'Deja Casper', 'et', '/static/images/news.jpg', 'N/A', 'Nesciunt quod id.', 'A delectus ducimus accusamus recusandae culpa in impedit quos. Cum possimus delectus eum repudiandae id. Ut quo sed hic provident. Ex et rerum sunt reprehenderit saepe non cum velit.', '#', 2, '0', 8, '2', 112, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(21, 'Necessitatibus ut saepe natus pariatur et voluptas.', 'Bobby Larkin', 'dolor', '/static/images/news.jpg', 'N/A', 'Expedita molestias sed.', 'Quisquam consectetur harum minus. Ut at fugiat hic et beatae ab. Debitis est provident voluptatibus nemo veritatis omnis vel. Eos excepturi et ullam quam corporis.', '#', 2, '0', 27, '1', 197, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(22, 'Ut id qui in dolorem voluptatem odit quasi. Sed nulla nulla aut.', 'Daisha Robel', 'fugiat', '/static/images/news.jpg', 'N/A', 'Inventore ad.', 'Reprehenderit error accusamus ut culpa quia. Sed ut similique id distinctio sit commodi. Ut aut nulla eaque corrupti. Aliquid asperiores qui est commodi tempore ipsum perferendis.', '#', 6, '2', 9, '2', 52, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(23, 'Repellat tempora magnam non asperiores optio sit quis.', 'Justina Hauck', 'nesciunt', '/static/images/news.jpg', 'N/A', 'Deleniti animi.', 'Voluptatum et et sed deserunt ullam sunt veniam. Qui nisi tempora neque qui rerum natus.', '#', 6, '1', 50, '2', 194, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(24, 'Exercitationem maiores et quis aut hic consectetur placeat quas. Consequatur quaerat et nesciunt velit dolorum.', 'Joanne Rolfson', 'ipsa', '/static/images/news.jpg', 'N/A', 'Dolor error explicabo.', 'Odit ut ut voluptates aut minima quibusdam ducimus nam. Magnam nesciunt explicabo non occaecati. Cupiditate at velit voluptas consectetur dicta dolorem autem. Modi quasi eum sed optio.', '#', 5, '2', 45, '1', 77, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(25, 'Aliquam nihil labore voluptatem suscipit quia rerum.', 'Demarcus VonRueden', 'suscipit', '/static/images/news.jpg', 'N/A', 'Quam illo quos.', 'Enim quia amet ducimus blanditiis. Temporibus sunt eaque veritatis non eaque.', '#', 2, '2', 4, '2', 300, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(26, 'Minima aut aut placeat sed voluptatem consectetur eos.', 'Dr. Rosanna Bartoletti', 'consequatur', '/static/images/news.jpg', 'N/A', 'Et est eos.', 'Voluptates nisi eum dignissimos quis officia optio sint. Nihil consequatur sint tempora optio harum. Consectetur ut autem corrupti blanditiis aspernatur.', '#', 6, '0', 28, '2', 290, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(28, 'Sequi recusandae odit ut velit perspiciatis qui. Inventore ab laboriosam suscipit facere quidem.', 'Roma Price V', 'ut', '/static/images/news.jpg', 'N/A', 'Libero voluptatem.', 'Inventore at quae quae consequatur. Aut rerum sunt nulla labore maxime quia vitae. Ratione assumenda quaerat molestiae esse.', '#', 2, '0', 2, '2', 380, '2020-01-20 08:51:50', '2020-01-25 05:56:28'),
(29, 'Eveniet illo voluptas consequuntur est repellendus minus.', 'Jesse Ledner', 'explicabo', '/static/images/news.jpg', 'N/A', 'Sequi velit.', 'Repudiandae eos aperiam rerum quis et impedit. Magnam fugit voluptas sit eos rerum qui nulla.', '#', 6, '1', 33, '1', 266, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(30, 'Totam est commodi eius ipsum possimus cupiditate non deserunt. Repellendus atque et saepe beatae praesentium nisi ex.', 'Annie Kunze', 'perferendis', '/static/images/news.jpg', 'N/A', 'Rerum et odio.', 'Ut sint commodi consequatur sunt quia. Earum inventore atque minima veritatis eius eos. Aspernatur est molestiae et aperiam laudantium velit. Occaecati provident ut dicta rerum non sed ipsum.', '#', 4, '2', 38, '2', 116, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(31, 'Omnis eaque maiores magni quis eveniet ipsam. Doloremque odit perferendis voluptate deserunt ea cumque.', 'Eden Gutkowski', 'nam', '/static/images/news.jpg', 'N/A', 'Quo praesentium libero.', 'Minima enim ut voluptate recusandae sit quis. Alias perspiciatis neque est similique. Autem doloribus quas et fuga distinctio rerum. Explicabo saepe quia ut sint et ipsum.', '#', 6, '0', 37, '1', 289, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(32, 'Sint repudiandae voluptate qui aperiam ab.', 'Giovanny Prohaska', 'est', '/static/images/news.jpg', 'N/A', 'Similique quia voluptas.', 'Facilis ipsam illo earum minima nesciunt. Quis magni alias eum occaecati unde sed sit. Odio saepe neque soluta necessitatibus.', '#', 4, '1', 5, '2', 106, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(33, 'Culpa impedit dolores assumenda sit.', 'Dr. Sandra Funk', 'rerum', '/static/images/news.jpg', 'N/A', 'Qui commodi error.', 'Hic deserunt nisi enim et dolorum. Placeat velit quia mollitia quisquam. Laboriosam vitae earum culpa exercitationem autem facere.', '#', 3, '0', 33, '1', 438, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(34, 'Et optio perferendis officiis aperiam tenetur et tempora. Delectus ut blanditiis voluptates qui excepturi consectetur.', 'Arjun Sawayn', 'praesentium', '/static/images/news.jpg', 'N/A', 'Est totam.', 'Reiciendis quibusdam blanditiis excepturi earum. Itaque quasi inventore et quaerat eligendi est. In id adipisci error sit illo. Ut similique tempora sapiente nostrum minus quia.', '#', 4, '0', 31, '2', 447, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(35, 'Illum et molestias quo ut repellendus. Sint enim suscipit ut excepturi iure tempora.', 'Marlon Torphy', 'ipsam', '/static/images/news.jpg', 'N/A', 'Eum sed.', 'Ut et accusantium est beatae facilis doloremque. Dolorum sit non iusto perferendis quo occaecati non. Voluptas ut similique similique veritatis tenetur iste illum. Quaerat non adipisci debitis qui.', '#', 4, '1', 17, '2', 142, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(36, 'Id voluptatem officiis velit temporibus ut omnis itaque. Delectus sed reiciendis dignissimos aliquam.', 'Mr. Ethel O\'Reilly I', 'molestiae', '/static/images/news.jpg', 'N/A', 'Sit sequi et.', 'Illo perspiciatis incidunt aperiam quo rem consequuntur qui. Quasi quidem id doloribus et et voluptatem a. Libero aut rerum et officiis velit.', '#', 6, '0', 45, '2', 387, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(37, 'At possimus adipisci cumque assumenda deleniti vitae maiores.', 'Roberta Gerhold', 'sed', '/static/images/news.jpg', 'N/A', 'Ut veniam.', 'Non enim veniam eum nesciunt laudantium adipisci. Dolore ut est porro adipisci necessitatibus. Non quibusdam odio et provident nihil. Ut culpa quis magnam impedit commodi exercitationem aut.', '#', 2, '2', 24, '2', 119, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(38, 'Assumenda aut nemo earum qui magnam.', 'Jacinthe Brekke', 'facere', '/static/images/news.jpg', 'N/A', 'Quo officia.', 'Reprehenderit adipisci et nisi ex itaque. Vero molestiae voluptatibus voluptatem dolores voluptatibus occaecati non. Velit libero reiciendis explicabo quasi occaecati.', '#', 3, '0', 40, '2', 231, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(39, 'Quo beatae sit dolorum voluptatem. Maiores nesciunt eius quidem laboriosam.', 'Mr. Akeem Muller PhD', 'tempora', '/static/images/news.jpg', 'N/A', 'Repellendus maxime assumenda.', 'Corrupti exercitationem consequatur dolores debitis excepturi. Ab hic aut reprehenderit et impedit. In blanditiis error qui ad. Et perferendis quis rerum.', '#', 3, '0', 30, '1', 200, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(40, 'Est sit autem reiciendis velit et. Repudiandae distinctio ducimus quasi sapiente ipsum eius soluta enim.', 'Camila Hand', 'qui', '/static/images/news.jpg', 'N/A', 'Nam ea.', 'Qui necessitatibus voluptatem minima est consequatur placeat soluta pariatur. Aut ducimus id quos. Quam enim vero quia quis. Quo aliquid quae qui beatae quisquam quaerat et.', '#', 5, '0', 18, '2', 118, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(41, 'Autem ut temporibus rem autem.', 'Grady Harris', 'ratione', '/static/images/news.jpg', 'N/A', 'Et ipsam qui.', 'Aut officia autem voluptas sed. Et et fugiat rem et itaque autem. Quod consequatur ipsam et tempora est facilis. Vero et a dolorum ex iure aut.', '#', 2, '2', 14, '1', 219, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(42, 'Enim quo mollitia aut architecto est tempora. Ad non voluptatem recusandae sapiente.', 'Germaine Greenholt', 'odio', '/static/images/news.jpg', 'N/A', 'Qui possimus rerum.', 'Est quidem in dolor eum. Ut sit quia magnam nihil autem et. Ea amet molestias quod ut exercitationem aut architecto. Nisi facilis aut aut atque. Optio eius harum sed provident.', '#', 2, '1', 11, '1', 365, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(43, 'Est dolorum illum ex quia. In quasi voluptate et et quia perspiciatis.', 'Lucas Leffler PhD', 'ratione', '/static/images/news.jpg', 'N/A', 'Voluptatibus libero.', 'Fugit suscipit repellat dolor cum. Dolorum deserunt dolor praesentium quia. Fugiat rerum et earum sed.', '#', 2, '1', 19, '1', 343, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(44, 'Voluptas recusandae illo iste nesciunt aut aut ea et. Ad deserunt ea sit occaecati non.', 'Dock Schuppe', 'est', '/static/images/news.jpg', 'N/A', 'Necessitatibus voluptatibus.', 'Sed delectus natus sed hic culpa animi. Suscipit nisi quis libero modi voluptatibus. Quia dolorem quia et corrupti beatae nisi.', '#', 3, '2', 40, '1', 222, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(45, 'Odit voluptatem neque in illo non quia sint. Minima molestiae quos eveniet nesciunt.', 'Fay Beier V', 'in', '/static/images/news.jpg', 'N/A', 'Consequatur magnam incidunt.', 'Est beatae ullam ut nam sit itaque. Hic vel voluptatum perferendis dolor id earum. Aut nihil libero in neque. Voluptatem hic est quasi quisquam nihil.', '#', 3, '0', 21, '1', 131, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(46, 'Adipisci et neque eos est temporibus omnis delectus animi. Labore modi quae et voluptas provident voluptatibus odio.', 'Prof. Coralie Fay', 'qui', '/static/images/news.jpg', 'N/A', 'Alias dolorem.', 'Officiis voluptatum laboriosam dolor libero praesentium iste. Odit officia nemo consequatur molestiae.', '#', 4, '2', 12, '2', 242, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(47, 'Vitae atque quia voluptatem eligendi deleniti. Dignissimos voluptas perspiciatis et non quis.', 'Mrs. Imogene Fadel', 'quas', '/static/images/news.jpg', 'N/A', 'Modi tenetur.', 'Dolore est quis quos mollitia a nesciunt. Animi illum animi omnis illum aliquam. Quasi voluptatem dolorem unde et qui deserunt. Odit cupiditate rerum et laborum ratione officiis repudiandae.', '#', 2, '1', 18, '1', 180, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(48, 'Fugit ea doloribus natus dolor magnam corrupti.', 'Mr. Devonte Satterfield', 'ratione', '/static/images/news.jpg', 'N/A', 'Aut eos ut.', 'Doloribus velit aperiam suscipit omnis cumque qui sed. Enim iusto placeat aut consequuntur. Itaque consectetur iusto beatae voluptatem ut.', '#', 3, '2', 14, '1', 322, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(49, 'Ut asperiores eos sapiente ducimus.', 'Bert Wuckert', 'tempore', '/static/images/news.jpg', 'N/A', 'Voluptas magni quia.', 'Dolorem perspiciatis excepturi aut sed sequi ex quia. Nesciunt nobis consequatur omnis sequi. Velit suscipit odit non nihil.', '#', 3, '0', 11, '1', 260, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(50, 'In qui est in sed similique. Sint cum eos et debitis.', 'Justice Hayes PhD', 'numquam', '/static/images/news.jpg', 'N/A', 'Non tempore.', 'Harum modi natus dolores non consectetur ducimus. Et ea aut in et vel. Impedit laudantium corrupti soluta est rem neque ea. Dicta eaque ullam explicabo accusantium.', '#', 2, '1', 18, '2', 132, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(51, 'Alias ullam est illo inventore eius non architecto. Ea perspiciatis recusandae necessitatibus.', 'Haylee DuBuque MD', 'voluptatem', '/static/images/news.jpg', 'N/A', 'Exercitationem porro ducimus.', 'Sed ut ut ea minima reiciendis minus occaecati. Numquam aliquam sit aut fugit totam rerum est. Non qui voluptatibus cum reprehenderit non modi.', '#', 2, '1', 41, '1', 451, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(52, 'Magni est aliquid accusamus est quis. Enim non at qui quos ad fuga officia.', 'Delaney Gorczany Jr.', 'rerum', '/static/images/news.jpg', 'N/A', 'Omnis quibusdam ipsum.', 'Consectetur aliquam rerum et alias. Earum qui animi ipsa tenetur officia doloribus. Ut dolores hic ut modi quisquam doloremque et. Excepturi eum quia tenetur culpa.', '#', 6, '1', 28, '1', 169, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(53, 'Vel ut laborum eos quia eos eum optio. Reiciendis aut dolore consectetur hic qui mollitia.', 'Dee Jenkins', 'aut', '/static/images/news.jpg', 'N/A', 'Dolores earum.', 'Possimus voluptatem in sint. Est eaque nostrum qui doloremque accusamus est. Repellat hic deleniti error odio.', '#', 2, '2', 19, '1', 299, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(54, 'Magni rerum odio at. Voluptatibus officia aut dolorum nam voluptas non.', 'Dr. Luna West', 'iure', '/static/images/news.jpg', 'N/A', 'Accusamus molestiae.', 'Illo ea sapiente recusandae. Hic dolorem tempora architecto eius consequuntur error. Et tempora omnis dolor. Aperiam ea beatae suscipit et dolorum aut.', '#', 4, '0', 35, '1', 244, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(55, 'Accusamus earum distinctio nam temporibus. Modi impedit aliquid et officia quo iusto.', 'Dr. Vivien Carroll V', 'cupiditate', '/static/images/news.jpg', 'N/A', 'Accusantium eos.', 'Earum eos debitis ut voluptatum magni nemo. Animi vel vero ut alias quaerat. Neque et est veritatis.', '#', 3, '2', 36, '2', 226, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(56, 'Omnis exercitationem non placeat aut sunt dolores. Et minima temporibus sint atque.', 'Justen Padberg', 'omnis', '/static/images/news.jpg', 'N/A', 'Minus odio distinctio.', 'Ducimus rerum error dicta blanditiis atque aut. Repudiandae et totam facere sit sit voluptatibus. Non expedita magnam et ipsam nesciunt.', '#', 2, '2', 17, '1', 150, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(57, 'Qui ut sed aut esse voluptas praesentium voluptatum. Officiis atque modi dolor ut dicta.', 'Prof. Edison Harvey DVM', 'ea', '/static/images/news.jpg', 'N/A', 'Totam animi.', 'Et blanditiis voluptas aut autem quisquam repellendus eos est. Ipsa sint eos qui ipsum maxime hic vel. Vel ullam eum eos sed voluptatem repellat.', '#', 2, '1', 28, '1', 434, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(58, 'Id quibusdam commodi tempora autem aspernatur cum sunt. Doloribus optio illum magnam dignissimos consequuntur omnis.', 'Emerson Dickinson II', 'dolor', '/static/images/news.jpg', 'N/A', 'Hic id.', 'Provident repellat repellat quia eligendi omnis voluptas. Quae fuga ut doloribus. Voluptas omnis qui culpa qui laudantium illo. Illum rerum occaecati qui voluptatibus.', '#', 5, '2', 18, '2', 147, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(59, 'Pariatur voluptas inventore dolor nihil eveniet deserunt architecto. Commodi nisi amet rem commodi explicabo.', 'Prof. Isadore Daniel V', 'nostrum', '/static/images/news.jpg', 'N/A', 'Aut necessitatibus error.', 'Occaecati eligendi dolorum sequi inventore maxime. Quia vel non omnis. At rem occaecati alias. Eum repellendus nemo porro tempore consequatur ipsam vel soluta.', '#', 2, '2', 25, '2', 225, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(60, 'Est illo incidunt quidem. Voluptates voluptatem iure eum voluptate minus quidem.', 'Sandra Beer', 'error', '/static/images/news.jpg', 'N/A', 'Natus inventore et.', 'Soluta temporibus voluptatum corporis quos. Consequatur cumque quo sed qui. Illum atque vel qui quia. Corrupti voluptate et alias.', '#', 6, '1', 44, '2', 385, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(61, 'Delectus aspernatur impedit sapiente ducimus occaecati dolor saepe.', 'Silas Eichmann II', 'hic', '/static/images/news.jpg', 'N/A', 'Voluptates aut.', 'Repellendus modi unde sed corporis libero possimus voluptatem. Accusamus quas expedita odio nesciunt. Quo tempora nisi a optio non. In dicta quia enim.', '#', 2, '0', 32, '2', 459, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(62, 'Cum dolor eligendi dignissimos omnis. Animi dolores perferendis odio id blanditiis tempore.', 'Fanny Schiller', 'iste', '/static/images/news.jpg', 'N/A', 'Quia omnis.', 'Unde qui eaque reprehenderit eos dolor. Dolores id soluta excepturi dolor. Esse rerum enim nihil.', '#', 6, '1', 36, '1', 162, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(63, 'Nisi tenetur odio et expedita est. Maiores non est repellendus voluptatem enim recusandae.', 'Ms. Pink Kub', 'voluptas', '/static/images/news.jpg', 'N/A', 'Modi accusantium.', 'Et eaque omnis aut sed. Accusamus nihil doloribus quia. Ullam doloribus ut voluptatum mollitia et veritatis. Consectetur voluptas dolorem quia porro.', '#', 3, '2', 39, '2', 475, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(64, 'Nemo quaerat sunt consequatur expedita aut aut. Tenetur et et exercitationem qui omnis voluptatem et.', 'Katharina Satterfield', 'quasi', '/static/images/news.jpg', 'N/A', 'Occaecati qui.', 'Enim dolores nemo illum magnam. Et quod sit porro. Quo dolores voluptatum sint et cum.', '#', 3, '0', 21, '1', 217, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(65, 'Nulla est incidunt esse aspernatur ut est quis velit.', 'Chyna Bins', 'porro', '/static/images/news.jpg', 'N/A', 'Alias ex.', 'Et ea tenetur error sequi blanditiis. Odio earum magni et harum. Ut et eos corrupti rerum fugit. Enim reprehenderit est quas.', '#', 2, '0', 32, '2', 349, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(66, 'Iste sapiente sapiente qui est dolorem excepturi aut. Quod cum asperiores et cumque fugiat eos.', 'Alberto Fay', 'ut', '/static/images/news.jpg', 'N/A', 'Eaque molestiae recusandae.', 'Praesentium mollitia dicta temporibus eligendi. Illo accusamus enim adipisci quia distinctio omnis. Ut voluptatum beatae consequatur ducimus consequuntur.', '#', 3, '1', 47, '1', 338, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(67, 'Velit delectus consectetur voluptate numquam. Nemo est ut impedit ratione earum soluta.', 'Mr. Monroe Jerde I', 'neque', '/static/images/news.jpg', 'N/A', 'Aliquid nam.', 'Quos natus expedita aut vel aut rerum illo. Incidunt debitis sequi quaerat neque. In ab nulla ad voluptatem ea eum aut. Culpa ipsa sed placeat sunt suscipit repudiandae. Ipsa debitis quod est ut.', '#', 4, '2', 14, '2', 129, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(68, 'Itaque quia qui impedit molestiae enim fuga. Dolore omnis reiciendis maiores temporibus dolorem quos.', 'Edwina Trantow', 'ab', '/static/images/news.jpg', 'N/A', 'Rerum est ab.', 'Placeat ut quod iste itaque alias rem. Necessitatibus et aperiam sed voluptatum ex. Voluptatibus excepturi non repudiandae sed laudantium assumenda. Voluptatem enim et voluptas qui architecto.', '#', 4, '2', 10, '2', 319, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(69, 'Veritatis et eveniet iste provident et qui non autem. Assumenda magni omnis qui reprehenderit quia ut.', 'Nola Schimmel', 'enim', '/static/images/news.jpg', 'N/A', 'Dolores et.', 'Id dolorem sit autem itaque. Deserunt voluptates libero voluptas est quia. Quo autem id dicta modi. Ad ut porro nisi et excepturi suscipit quod.', '#', 6, '2', 36, '1', 204, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(70, 'Voluptas aut voluptatem reprehenderit aut recusandae dolore.', 'Richard Abshire', 'voluptates', '/static/images/news.jpg', 'N/A', 'Porro cumque.', 'Fugiat iste sunt impedit ut repudiandae sed magnam. Neque libero et non maxime a dolore dolore. Beatae minima ex et odit aliquam minus. Dolorem excepturi accusantium ea alias aliquid.', '#', 4, '1', 22, '1', 371, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(71, 'Animi qui eligendi commodi est.', 'Mr. Jeremy Hegmann IV', 'nemo', '/static/images/news.jpg', 'N/A', 'Et fugiat quam.', 'Dolor quia aliquam ipsa voluptas voluptas dicta dolor. Minima dignissimos ex suscipit. Deserunt modi praesentium quia aut. Voluptate doloribus officiis accusamus quia qui.', '#', 5, '2', 12, '1', 158, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(72, 'Quas esse sed facilis sunt reprehenderit. Necessitatibus accusamus earum vitae modi.', 'Fabian Hintz', 'alias', '/static/images/news.jpg', 'N/A', 'Minus ut vel.', 'Consequatur est ipsam non laudantium impedit. Neque dolore amet laborum mollitia iste modi sapiente. Possimus occaecati est optio eos. Recusandae voluptate vel sunt.', '#', 3, '2', 27, '1', 67, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(73, 'Explicabo saepe tempore incidunt sed voluptas. Aut placeat nesciunt assumenda necessitatibus numquam id.', 'Bethel Rempel', 'facere', '/static/images/news.jpg', 'N/A', 'Et ea voluptas.', 'Voluptatem odio iure ea quidem. Reiciendis inventore vel voluptatem delectus enim assumenda tenetur. Reiciendis velit esse alias sapiente repellendus.', '#', 2, '0', 37, '2', 446, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(74, 'Exercitationem eum est ratione labore consequatur iusto. Optio iste ullam soluta dolores fugit vitae culpa.', 'Eryn Miller', 'pariatur', '/static/images/news.jpg', 'N/A', 'Tempore explicabo.', 'Tempora laudantium quis qui temporibus qui aliquam dolor odio. Sed neque aut in incidunt repellat possimus numquam. Eveniet assumenda saepe est et.', '#', 2, '0', 44, '2', 226, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(75, 'Accusantium sed magni unde qui nemo. Magnam non rerum dolorum est et explicabo ullam.', 'Marisol Hettinger PhD', 'aut', '/static/images/news.jpg', 'N/A', 'Adipisci totam deserunt.', 'Sint numquam autem in dolores. Tempore cum nihil aut adipisci. Nobis ullam sit voluptate quae ducimus ut non distinctio. Quam dolorum minima voluptatem totam qui rerum quisquam fugit.', '#', 4, '0', 7, '2', 333, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(76, 'Rerum et nemo nihil assumenda.', 'Adrien Hahn', 'pariatur', '/static/images/news.jpg', 'N/A', 'Ipsam beatae.', 'Consequuntur ab aliquam alias et in officia et. Quaerat rem blanditiis eligendi aut et sed. Repudiandae accusantium et enim quia inventore temporibus beatae.', '#', 6, '2', 31, '2', 56, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(77, 'Aspernatur exercitationem culpa non consequatur.', 'Al Kshlerin', 'asperiores', '/static/images/news.jpg', 'N/A', 'Rerum sit aliquam.', 'Maiores culpa earum dolorem eum iusto iure et. Totam inventore officia et blanditiis qui. Saepe sed eaque ea ut fuga exercitationem unde.', '#', 2, '2', 29, '2', 422, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(78, 'Delectus neque culpa quisquam necessitatibus ullam architecto.', 'Mr. Curt Schimmel V', 'fuga', '/static/images/news.jpg', 'N/A', 'Recusandae necessitatibus.', 'Minus vel rerum minima et minus error ex. Quod et dolorum hic quidem delectus. Aspernatur alias praesentium voluptatum in reprehenderit in ratione.', '#', 2, '2', 49, '1', 231, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(79, 'Et neque libero maxime autem voluptatem.', 'Dortha Welch', 'qui', '/static/images/news.jpg', 'N/A', 'Est quia.', 'Ut voluptatem qui quis cupiditate. Dicta sit voluptas sint. Dolores accusamus aut quia ut delectus.', '#', 2, '0', 3, '1', 136, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(80, 'Minima nesciunt facere quia eveniet. Tenetur aut tempora aut aut quia voluptatibus et.', 'Mr. Jaron Rice II', 'adipisci', '/static/images/news.jpg', 'N/A', 'Dolor maiores.', 'Dolores reprehenderit tempora dolores eum. Nesciunt temporibus et recusandae et sunt rem. Consequatur architecto itaque eos qui qui. Vero itaque sunt ut repellendus qui labore.', '#', 4, '0', 28, '2', 99, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(81, 'Dolorem velit est voluptatem quibusdam quam perspiciatis. Accusantium doloremque tenetur dicta est quasi odit dolor fuga.', 'Saige Gibson', 'illo', '/static/images/news.jpg', 'N/A', 'Hic reiciendis.', 'Similique quo dignissimos quam. Non suscipit quia fugit laboriosam rem sed. Atque dignissimos nostrum aliquid sed iste nihil quaerat. Ea repudiandae qui facere at ut sit est.', '#', 2, '0', 43, '2', 237, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(82, 'Vitae nihil sequi voluptate qui quo repellat omnis.', 'Prof. Dino Bruen Sr.', 'aut', '/static/images/news.jpg', 'N/A', 'Delectus consectetur iste.', 'Quas et nemo ab sunt. Velit ut quis voluptatum. Aut dolores officia cum facilis. Neque dolorem qui magni.', '#', 5, '1', 32, '1', 235, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(83, 'Placeat quis sint temporibus ipsam et.', 'Prof. Ernestine Lemke II', 'iusto', '/static/images/news.jpg', 'N/A', 'Et harum.', 'Quasi earum aut sed at quia porro aperiam est. Unde dicta soluta excepturi optio. Sunt nulla quis quibusdam eos expedita dolorum. Eaque saepe quaerat et eveniet.', '#', 5, '0', 27, '1', 268, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(84, 'Qui voluptatem dolorum sit ut nihil est.', 'Marvin Stanton', 'libero', '/static/images/news.jpg', 'N/A', 'Repudiandae ut doloribus.', 'Debitis voluptatem totam voluptatem ipsum dolor sapiente. Nam quia earum voluptatem et quia culpa atque. Vel ipsum voluptate ipsum et necessitatibus libero.', '#', 6, '1', 31, '2', 307, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(85, 'Ab ut perferendis quia commodi optio nostrum vel. Sed vero beatae dolores et qui.', 'Eldred Boyer Jr.', 'consectetur', '/static/images/news.jpg', 'N/A', 'Error ut pariatur.', 'Vel esse voluptas sed reprehenderit. Vero consequatur ut nesciunt deserunt qui a pariatur quia. Magnam natus sit officiis porro sint enim esse.', '#', 2, '2', 2, '1', 425, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(86, 'Provident corrupti et a sed.', 'Carlo Keebler DDS', 'molestiae', '/static/images/news.jpg', 'N/A', 'In laborum explicabo.', 'Est aut incidunt qui laboriosam. Et omnis enim quod labore sed blanditiis.', '#', 2, '1', 16, '2', 201, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(87, 'Aliquam soluta non iure.', 'Alayna Jaskolski Sr.', 'voluptas', '/static/images/news.jpg', 'N/A', 'Aut deserunt.', 'Architecto sapiente ut optio distinctio modi sapiente qui. Voluptatum eos voluptas iusto incidunt dicta quae accusamus. Illo quasi sint quia laboriosam nostrum. Sunt culpa voluptatibus totam error.', '#', 5, '1', 35, '2', 365, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(88, 'Veniam eos explicabo culpa odit rerum sequi.', 'Mr. Kevon Rau', 'quidem', '/static/images/news.jpg', 'N/A', 'Eveniet sint.', 'Dolor veniam nisi dolore nulla sit quia. At modi repellendus maiores vel. Perferendis quo quod rerum vitae voluptate quidem accusantium reprehenderit.', '#', 5, '0', 18, '1', 327, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(89, 'Optio consequatur enim aut.', 'Dr. Mitchell Miller', 'quas', '/static/images/news.jpg', 'N/A', 'Soluta consequuntur.', 'Debitis et qui quae quia. Ut est vel dolorum minima omnis. Ipsam porro debitis qui. Nisi nostrum ut doloremque laborum reiciendis expedita enim.', '#', 6, '0', 36, '1', 417, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(90, 'Incidunt voluptas in est consequatur aspernatur. Et id rerum repudiandae incidunt incidunt adipisci at provident.', 'Magdalena Bode', 'aut', '/static/images/news.jpg', 'N/A', 'Quidem sint.', 'Est labore est sit ea voluptas similique. Pariatur est autem quaerat molestias velit sed eligendi. Quo ea voluptas est voluptatem sunt sed.', '#', 3, '0', 19, '2', 439, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(91, 'Laborum et et ducimus.', 'Nelda Cassin', 'eum', '/static/images/news.jpg', 'N/A', 'Neque tenetur.', 'Laborum fugiat vel sit tempore sint. Saepe quibusdam minus dicta laborum. Libero dolor consequatur est perspiciatis ut. Et aut laborum magni exercitationem maxime voluptatem mollitia hic.', '#', 5, '0', 12, '2', 440, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(92, 'Et repellendus consequuntur eum enim. Molestiae sint magnam consequatur alias commodi optio ipsa.', 'Kaci Mitchell', 'optio', '/static/images/news.jpg', 'N/A', 'Dolorum quo quia.', 'Expedita ipsum vero nisi rem eaque et est dolorum. Sit at ut alias molestiae explicabo. Ab quaerat quia nostrum perspiciatis labore reiciendis.', '#', 4, '1', 23, '1', 188, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(93, 'Est illum natus tempore vel.', 'Cassie Friesen Jr.', 'ut', '/static/images/news.jpg', 'N/A', 'Error culpa ea.', 'Ea aliquid consequatur omnis consequatur. Ut deserunt et amet minus fuga ab illum.', '#', 6, '0', 10, '2', 233, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(94, 'Corrupti eos et sit et. Voluptates eius sunt aliquid est fugiat.', 'Prof. Lauriane Wiegand Jr.', 'aspernatur', '/static/images/news.jpg', 'N/A', 'Non inventore iusto.', 'Voluptas et non est. Nisi ut aut amet distinctio. Tempore voluptatem est at consequuntur architecto sed aperiam nesciunt.', '#', 2, '0', 13, '2', 333, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(95, 'Iusto nulla quos sit error voluptate eos.', 'Kraig Leffler', 'aut', '/static/images/news.jpg', 'N/A', 'A officiis.', 'Deserunt numquam deserunt harum. Non facilis corporis magni ab praesentium eum sint. Magni doloribus voluptas eum iusto. Animi rerum incidunt numquam eveniet.', '#', 5, '2', 30, '1', 469, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(96, 'At asperiores ab quas. Nihil suscipit architecto odit incidunt.', 'Jaime Bartoletti', 'dignissimos', '/static/images/news.jpg', 'N/A', 'Aliquid excepturi autem.', 'Debitis saepe ut autem reiciendis. Perferendis sed voluptas et hic est consequuntur fugiat. Enim voluptatem exercitationem laudantium aperiam.', '#', 4, '0', 48, '1', 308, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(97, 'Maiores distinctio explicabo rerum illo itaque animi.', 'Miss Asia Champlin', 'voluptates', '/static/images/news.jpg', 'N/A', 'Sit amet.', 'Dolor et ipsa sit repudiandae corrupti. Alias odio et consequuntur et at itaque fugiat. Dignissimos molestiae tenetur reprehenderit dolore totam architecto exercitationem.', '#', 5, '2', 43, '1', 369, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(98, 'Quas officia voluptatem reprehenderit. Ea in quisquam eos illum.', 'Karlee Jaskolski', 'numquam', '/static/images/news.jpg', 'N/A', 'Unde exercitationem accusamus.', 'Eum ut aperiam quia hic. Dolor atque esse est repellat aliquam et sit molestias. Qui praesentium totam in voluptates. Adipisci nihil nulla nihil numquam eum.', '#', 3, '1', 43, '2', 214, '2020-01-20 08:51:50', '2020-01-20 08:51:50'),
(221, '举办第十一届蓝桥杯视觉艺术设计赛的通知', 'nian', '今日热点', '/storage/9ec461d60d46ff736228c71e3a79d5b4bfba17c0.jpg', NULL, NULL, NULL, NULL, 8, '0', 1, '2', 0, '2020-01-24 04:56:33', '2020-01-24 04:56:33'),
(222, '第十一届蓝桥杯电子类省赛(桂林站)师资培训会的通知', 'nian', '今日热点', '/storage/e926f265e46275d8c772317735d6ea5753a44d2d.jpg', NULL, NULL, NULL, NULL, 8, '0', 2, '2', 4, '2020-01-24 05:00:01', '2020-01-24 06:56:01'),
(227, '12312', '123', '12312', NULL, NULL, '123123', '<p>1231231231123</p><p>12312312</p><p><br></p><p><br></p><p>12312312312</p><p><br></p><p>123123</p>', '12312', 2, '0', 21312, '2', 0, '2020-01-24 08:54:16', '2020-01-24 08:54:16'),
(224, 'asfsafsafsfasfas', 'asfasf', 'asfas', NULL, NULL, 'afasf', NULL, 'asfas', 2, '0', 0, '2', 0, '2020-01-24 08:23:13', '2020-01-24 08:23:13');

-- --------------------------------------------------------

--
-- 表的结构 `article_class`
--

CREATE TABLE `article_class` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_type` enum('0','1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `show_in_nav` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `article_class`
--

INSERT INTO `article_class` (`id`, `class_name`, `link_url`, `class_type`, `show_in_nav`) VALUES
(2, '通知公告', '/article/notice', '1', 1),
(3, '大赛新闻', '/article/news', '1', 1),
(4, '组织机构', NULL, '1', 1),
(5, '作品分类', NULL, '1', 1),
(6, '国赛速递', NULL, '1', 1),
(7, '往届信息', NULL, '1', 1),
(8, '焦点幻灯片', NULL, '1', 0),
(1, '首页', '/', '1', 1);

-- --------------------------------------------------------

--
-- 表的结构 `auth`
--

CREATE TABLE `auth` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `auth_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `controller` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(30) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pid` tinyint(4) NOT NULL,
  `is_nav` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `auth`
--

INSERT INTO `auth` (`id`, `auth_name`, `controller`, `action`, `pid`, `is_nav`, `created_at`, `updated_at`) VALUES
(1, '管理员管理', 'AdminController', 'index', 0, '1', '2020-01-19 05:41:45', '2020-01-19 05:41:48'),
(2, '文章管理', 'ArticleController', 'index', 0, '1', '2020-01-19 05:42:04', '2020-01-19 05:42:06'),
(3, '文章添加', 'ArticleController', 'add', 2, '1', '2020-01-19 06:01:56', '2020-01-19 06:01:58'),
(4, '管理员添加', 'AdminController', 'add', 1, '1', '2020-01-19 06:01:52', '2020-01-19 06:01:54'),
(5, '管理员删除', 'AdminController', 'delete', 1, '1', '2020-01-19 06:02:40', '2020-01-19 06:02:41'),
(6, '管理员修改', 'AdminController', 'update', 1, '1', '2020-01-19 06:02:35', '2020-01-19 06:02:37'),
(8, '图片管理', 'ImageController', 'index', 0, '1', NULL, NULL),
(9, '文章修改', 'ArticleController', 'add', 2, '2', NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `config`
--

CREATE TABLE `config` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `site_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `site_copy` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `site_record` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_fax` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_skill` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `config`
--

INSERT INTO `config` (`id`, `site_name`, `site_url`, `avatar`, `site_keywords`, `site_description`, `site_copy`, `site_record`, `company_name`, `company_address`, `company_fax`, `company_phone`, `company_email`, `company_contact`, `company_skill`, `created_at`, `updated_at`) VALUES
(1, 'www.jsj.cn', 'www.jsj.cn', '/storage/ff384ca6b8ab748c99a290a55e3d7c254af019c8.png', '计算机', 'aaaa', 'NIAN', '京ICP000000号', '工业和信息化部人才交流中心', '北京市海淀区万寿路27号工业和信息化部大院8号楼10层', '99999941', '4006-588-662', 'lanqiao@lanqiao.org', '010-68208626 liyp@lanqiao.org', '国信蓝桥教育科技（北京）股份有限公司', NULL, '2020-01-23 07:38:03');

-- --------------------------------------------------------

--
-- 表的结构 `friend`
--

CREATE TABLE `friend` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `class_id` int(11) NOT NULL DEFAULT '1',
  `status` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `friend`
--

INSERT INTO `friend` (`id`, `title`, `description`, `avatar`, `url`, `class_id`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kika', 'Architecto officiis et et in illum quo. Tenetur est ut non ullam corporis nesciunt numquam. Eum eius reiciendis quae ea consequatur. Aspernatur consequatur tempore doloremque tenetur adipisci sint.', '/storage/9b507f94b3fc54e57726b3a73a393ef1c482cc8e.jpg', '#', 4, '2', '2020-01-23 05:05:08', '2020-01-24 06:38:03'),
(2, '赛欢网', 'Ut in quia error quod cumque. Et nostrum iure laboriosam. Voluptatem voluptatem commodi quos alias provident quae alias.', '/static/images/friendLink.png', '#', 1, '2', '2020-01-23 05:05:08', '2020-01-24 06:01:16'),
(3, '北方工业大学', '信息工程学院', '/storage/49866f9d7399665d345ad8e1ce63b6ca92c118d3.png', '#', 3, '2', '2020-01-23 05:05:08', '2020-01-24 06:12:40'),
(56, '北京工业大学', '软件学院', '/storage/baa478ba9f3ae3845af2fd2d6429ddb47f552183.png', '#', 3, '2', '2020-01-24 06:13:36', '2020-01-24 06:13:36'),
(4, 'Et aut alias nemo quod laborum consequuntur tempore.', 'Accusamus tenetur et nostrum debitis dolorum dolores ea. Est qui a fugit corrupti ut qui. Quo rerum inventore ad voluptatum. Dolores soluta voluptas molestiae quaerat repellat corporis at.', '/static/images/friendLink.png', '#', 6, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(5, '同程艺龙', 'Deserunt ipsum eveniet distinctio voluptatem voluptas expedita exercitationem. Ipsam omnis magnam quos non illum velit. Accusamus deleniti et quod alias dolorem ut. Laboriosam qui delectus nihil voluptatem corporis sit commodi.', '/storage/7b88e5db248bfa278a1fb1819de976c74bca9002.jpg', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:35:58'),
(6, 'SuGon', 'Totam dolor quae quod quisquam dolor ut animi in. Ducimus assumenda excepturi id quia qui. Facilis aliquid labore non sed alias aspernatur dolores nisi. Nihil amet occaecati aut nostrum.', '/storage/84013152e39c1a7cd15a823f562b9f605dea473a.jpg', '#', 4, '2', '2020-01-23 05:05:08', '2020-01-24 06:37:49'),
(7, 'Sequi voluptates temporibus aliquid minus aspernatur exercitationem sunt.', 'Inventore veniam minus quis et voluptates doloribus est. Ut architecto maiores quae est odio labore commodi.', '/static/images/friendLink.png', '#', 6, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(8, '便利', 'Et ut molestias non omnis in itaque. Impedit velit adipisci explicabo odio aut voluptatibus ut. Qui voluptates ut ut rem optio voluptates quidem ex.', '/storage/e6bf5f696cf4830c58a2358d9c3e822090bc5272.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:35:39'),
(9, '京北方', 'Ut omnis assumenda eius. Quae iusto asperiores cumque numquam. Laudantium assumenda in facere illo ut est laborum.', '/storage/e3323f204032c8081de3ed8cf35d9822478db260.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:35:21'),
(10, '去大赛网', 'Rerum corporis eum natus similique corrupti cumque. Ut quidem eveniet dolorem molestiae ratione quia eum. Consectetur voluptas quaerat alias ipsam quasi quo quaerat. Exercitationem eveniet et aliquam dolore repudiandae optio consequatur.', '/static/images/friendLink.png', '#', 1, '1', '2020-01-23 05:05:08', '2020-01-24 06:01:07'),
(11, '朋友', 'Veniam hic suscipit dolorum iure odit quaerat repellendus. Est iusto enim sed deserunt nulla perferendis ut. Tempore repudiandae id nam saepe omnis. Culpa id ut voluptas mollitia ullam.', '/storage/6f9714826c372538ccaef42c602369fbdee1d746.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:32:05'),
(12, '赛氪', 'Ut enim aspernatur eveniet aut impedit autem. Aliquam eaque culpa quos iure laborum sed quasi sint. Perspiciatis molestias possimus pariatur amet perferendis.', '/static/images/friendLink.png', '#', 1, '1', '2020-01-23 05:05:08', '2020-01-24 06:00:53'),
(13, '北京交通大学', '软件学院', '/storage/0bb412af0741970c144ad4d6ed2dc526cfe0cbd2.png', '#', 3, '2', '2020-01-23 05:05:08', '2020-01-24 06:12:16'),
(14, 'Quo rerum quis velit vitae omnis explicabo qui.', 'Officiis a at numquam rem officiis. Fugit repellat id molestiae ipsam perspiciatis repellat. Eos nemo blanditiis perferendis molestiae at. Libero ipsa aut distinctio praesentium.', '/static/images/friendLink.png', '#', 6, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(15, '太极', 'Aperiam enim explicabo numquam quia aut. Et reiciendis impedit consequuntur quod vero possimus. Culpa doloribus earum maxime unde voluptate.', '/storage/638c956ee6810294eb713ab17b99a760c8dee3ef.jpg', '#', 4, '2', '2020-01-23 05:05:08', '2020-01-24 06:37:37'),
(16, 'Numquam ut quo molestias autem vitae neque.', 'Quisquam ut quia rerum perspiciatis id voluptatem. Ut laboriosam perferendis ut facilis facilis saepe possimus. Quia et et omnis tempore. Est adipisci est veniam.', '/static/images/friendLink.png', '#', 5, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(17, 'Non provident dicta consequuntur quia.', 'Voluptatem officiis dolores maxime ipsa. Eum quibusdam magnam dolore aut sint cumque delectus. Quidem rem nihil quibusdam culpa itaque possimus. Aut autem suscipit cupiditate quia. Inventore deleniti sit ipsa accusamus quibusdam.', '/static/images/friendLink.png', '#', 5, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(18, 'Beatae libero dolores sit perferendis.', 'Omnis molestiae qui rerum in et. Cupiditate occaecati facilis rerum dolor magni accusamus deserunt. Quam quo possimus sit est.', '/static/images/friendLink.png', '#', 5, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(19, '完美世界', 'Suscipit consectetur placeat harum aut sed ut. In perspiciatis eius omnis velit. Non et necessitatibus reprehenderit. Delectus qui dolorem asperiores sit voluptas iusto ab quisquam.', '/storage/7c9506898fc4cb31c711ca7670aaf8ccda70a2be.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:31:50'),
(20, 'Earum dolore aut veniam aut eius sequi.', 'Sed officia illo et vero sit. Et quae et deserunt qui consequuntur odit eos. Eum enim mollitia quaerat earum aperiam facere.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(21, '云之声', 'Occaecati odio quo voluptates sunt autem natus magni libero. Qui expedita aut aliquam quam ex aut. Eos quo dolore ex autem iste.', '/storage/9f70ef896922eed589e6595c5a52601de732b892.png', '#', 4, '1', '2020-01-23 05:05:08', '2020-01-24 06:37:26'),
(22, 'Explicabo omnis molestiae nihil iusto minima.', 'Unde placeat eveniet commodi laborum doloremque qui totam. Nemo veritatis omnis quidem est voluptatem quisquam hic. Ullam enim accusantium qui qui quos corporis. Tempora in soluta commodi alias et.', '/static/images/friendLink.png', '#', 6, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(23, 'Modi accusamus recusandae laborum mollitia porro.', 'Et laudantium distinctio cupiditate error voluptatibus possimus velit eius. Voluptatem aut corrupti alias temporibus aliquam. Officia quibusdam ex laudantium consectetur quaerat quos qui. Ut laboriosam ab rem.', '/static/images/friendLink.png', '#', 6, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(24, '畅游', 'Sequi officia accusamus necessitatibus corrupti. Ad est architecto delectus distinctio et accusamus velit consectetur. Fugit et pariatur consequatur dolor natus. Autem doloribus harum ea esse. Nostrum quia sit libero voluptas.', '/storage/2750396fb90bd5d4835efd6ba90170333000623e.jpg', '#', 4, '2', '2020-01-23 05:05:08', '2020-01-24 06:37:10'),
(25, 'Cumque nobis voluptas facere autem ipsa mollitia.', 'Autem accusantium fugiat possimus. Consequuntur occaecati enim odit dolor magni consequatur. Laboriosam illum maxime consequatur fugit.', '/static/images/friendLink.png', '#', 6, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(26, '文思海辉', 'Ducimus delectus cumque et rerum eaque repudiandae et. Ea excepturi repellendus velit quam aut ea. Possimus ratione eos qui qui illo minus vero. Quis excepturi asperiores atque ea.', '/storage/e2c75f511b90bb853e84392aef77bf8cb2f7e239.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:31:35'),
(27, '西南大学', '计算机与信息科学学院', '/storage/b7cf24e6db577cbc3663d2dd994f080be3752f6f.png', '#', 3, '2', '2020-01-23 05:05:08', '2020-01-24 06:11:48'),
(28, '设计赛', 'Et perspiciatis aliquam voluptas voluptas omnis nostrum praesentium. Nemo quia eius aliquam libero magnam est. Recusandae repudiandae quia voluptate laborum labore. Illo ut facere voluptas consectetur facilis. Et laborum placeat ipsa id in labore sed dese', '/static/images/friendLink.png', '#', 1, '2', '2020-01-23 05:05:08', '2020-01-24 06:00:48'),
(29, '同方鼎欣', 'Asperiores ex aut et officiis sequi quaerat et. Eos omnis rem in odio placeat voluptates.', '/storage/354ce535d902f48a2d17eb5c2a9522672ff9155d.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:30:11'),
(30, 'DTEC', 'Ratione deleniti perspiciatis id. Eveniet iure repellat omnis ut impedit aut. Officiis non in velit dolorem consequatur.', '/storage/9ac2fb95ea4558ad3076236c779701d8b81dd041.png', '#', 2, '1', '2020-01-23 05:05:08', '2020-01-24 06:29:38'),
(31, 'Explicabo ad soluta aliquam assumenda provident voluptatibus vel vero.', 'Non quo dignissimos inventore. Suscipit dolorum accusamus ullam asperiores quo facere eligendi at.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(32, 'Incidunt alias soluta ad.', 'Reiciendis dicta delectus porro incidunt error incidunt. Error est eligendi voluptates et perferendis voluptas deserunt. Maiores exercitationem quis dolores ea sit.', '/static/images/friendLink.png', '#', 6, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(33, 'Quaerat nulla voluptatem et amet.', 'Saepe ut eum est necessitatibus at. Voluptates neque minus cumque itaque. Vel ipsa recusandae tenetur minima odio dolore architecto. Iure voluptatem unde est dolore illo.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(34, '华南理工大学', '软件学院', '/storage/c58b088ae562ee6716ac750f7032d60aeb6e2673.png', '#', 3, '2', '2020-01-23 05:05:08', '2020-01-24 06:11:28'),
(35, 'Perferendis in id itaque corporis doloremque.', 'Minus nam omnis sunt neque magni accusamus aspernatur. Perspiciatis harum et iste rerum eos est. Assumenda tenetur est laboriosam explicabo voluptates sunt aperiam.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(36, '映客', 'Sapiente iste aut id quo accusantium est aut. Id molestias ex aliquid quos voluptas placeat. Libero neque non adipisci consequuntur omnis distinctio asperiores. Fugiat impedit excepturi mollitia eos. Necessitatibus minus voluptatem ad similique ipsum dolo', '/storage/8a3e0de8ca861b9d8817bc5e7a1dcaab06eb3594.jpg', '#', 4, '2', '2020-01-23 05:05:08', '2020-01-24 06:36:58'),
(37, '北京科技大学', '计算机与通信工程学院', '/storage/cd1f7d617c2832793770d5df4d33d6133073ea92.png', '#', 3, '2', '2020-01-23 05:05:08', '2020-01-24 06:11:00'),
(38, '方正', 'Cumque est recusandae quaerat qui dolor. Neque cum officia perferendis. Harum omnis occaecati commodi aut qui ut.', '/storage/fdc048b03da911aa00d41a91fd45988ae191004d.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:29:15'),
(39, '阿帕比', 'Mollitia fugiat velit hic ut quia fugiat velit. Quis deleniti perferendis neque et. Ea adipisci sint hic qui voluptatem doloremque ut earum.', '/storage/35e23562ccb8893d7a1a6f4e645ad6f34edfb5bb.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:28:52'),
(40, 'Doloribus unde iste eligendi blanditiis voluptate consequuntur ea.', 'Saepe reprehenderit id natus. Eaque repudiandae et et. Possimus neque autem aspernatur at. Temporibus aut beatae aut ipsum harum.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(41, 'Et eligendi repellat aperiam dicta repellat libero.', 'Molestias minima dolores iste distinctio impedit perferendis. Et quis perferendis alias et minus iure rerum. Rerum pariatur et et error consequatur.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(42, '北京大学', '软件与微电子学院', '/storage/94406e0b5c655fb25fb6e15da72f6bfb1d812442.png', '#', 3, '2', '2020-01-23 05:05:08', '2020-01-24 06:10:32'),
(43, 'In dolorem sunt et iusto praesentium.', 'Voluptatem eos maxime voluptatem fuga inventore. Est sint deleniti ea.', '/static/images/friendLink.png', '#', 6, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(44, 'Quod delectus et commodi voluptas unde magnam.', 'Accusamus quia est voluptatem. Maxime quia assumenda porro dolorum et maxime. Rerum temporibus ad non reiciendis nesciunt.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(45, 'Quam dignissimos est nihil sed sapiente id culpa.', 'Illum ut maiores placeat velit suscipit. Quidem maxime sequi accusamus modi quibusdam. Ut nihil dolorum sapiente eligendi et. Ea fugiat id non aliquid.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(46, '百度', 'Quia asperiores hic omnis maiores saepe. Recusandae et deleniti beatae numquam ducimus sequi. Sint ex eaque rem aut ea ullam. Repudiandae possimus autem quidem eligendi doloribus.', '/storage/88805b7af0e0f8a56b0d7bb447e3901b583905e7.png', '#', 2, '2', '2020-01-23 05:05:08', '2020-01-24 06:27:21'),
(47, '藍橋カップ日本大会', 'Est est repudiandae quibusdam quo et eius est. Et numquam nemo sed aliquid ut iusto.', '/static/images/friendLink.png', '#', 1, '2', '2020-01-23 05:05:08', '2020-01-24 05:59:45'),
(48, 'Omnis quo perspiciatis maiores.', 'Sit laboriosam nemo fugit possimus sit. Laudantium itaque id suscipit. Impedit commodi et voluptates vero nemo tenetur.', '/static/images/friendLink.png', '#', 5, '2', '2020-01-23 05:05:08', '2020-01-23 05:05:08'),
(49, '小鹏', 'Voluptatem provident qui libero sunt ut eum in. Dolores aspernatur dolor natus et accusamus atque eos praesentium. Beatae quas illo maiores incidunt delectus sit. Excepturi alias ducimus provident voluptatum.', '/storage/65cdd257278579c479bd3ecbc347e6831ac153ab.jpg', '#', 4, '2', '2020-01-23 05:05:08', '2020-01-24 06:36:45'),
(50, 'Ab ut natus earum officia quas.', 'Esse ab praesentium nihil ea officiis. In recusandae ratione molestiae aperiam aut alias. Delectus quidem et ad tenetur.', '/static/images/friendLink.png', '#', 6, '1', '2020-01-23 05:05:08', '2020-01-23 05:05:08');

-- --------------------------------------------------------

--
-- 表的结构 `friend_class`
--

CREATE TABLE `friend_class` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `class_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `class_type` enum('1','2') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `friend_class`
--

INSERT INTO `friend_class` (`id`, `class_name`, `class_type`) VALUES
(1, '友情链接', '2'),
(2, '就业绿色通道', '2'),
(3, '保研院校', '2'),
(4, '支持机构', '2'),
(5, '其他', '2'),
(6, '今日热点', '2');

-- --------------------------------------------------------

--
-- 表的结构 `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2020_01_17_145846_create_admin_table', 1),
(2, '2020_01_18_095133_create_role_table', 2),
(3, '2020_01_18_095245_create_auth_table', 2),
(4, '2020_01_20_133922_create_article_table', 3),
(5, '2020_01_20_140311_create_article_class_table', 4),
(6, '2020_01_23_122420_create_friend_table', 5),
(7, '2020_01_23_131322_create_friend_class_table', 6),
(8, '2020_01_23_144012_create_config_table', 7);

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

CREATE TABLE `role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_ids` text COLLATE utf8mb4_unicode_ci,
  `auth_ac` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `role_name`, `auth_ids`, `auth_ac`, `created_at`, `updated_at`) VALUES
(1, '超级管理员', '1,4,5,6,2,3,9', 'articlecontroller@add,admincontroller@add,admincontroller@delete,admincontroller@update,articlecontroller@add', '2020-01-18 07:57:01', '2020-01-19 08:28:38'),
(2, '管理员', '1,4,5,6', 'admincontroller@add,admincontroller@delete,admincontroller@update', '2020-01-18 07:57:07', '2020-01-19 13:32:31'),
(3, '测试一号', NULL, NULL, '2020-01-18 07:57:13', '2020-01-18 07:57:16'),
(4, '测试二号', NULL, NULL, '2020-01-18 07:57:18', '2020-01-18 07:57:20'),
(5, '测试三号', NULL, NULL, '2020-01-18 07:57:24', '2020-01-18 07:57:22'),
(6, '测试四号', NULL, NULL, '2020-01-18 07:57:26', '2020-01-18 07:57:28'),
(13, '测试五号002', NULL, NULL, NULL, '2020-01-22 06:08:50');

--
-- 转储表的索引
--

--
-- 表的索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `article_class`
--
ALTER TABLE `article_class`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `config`
--
ALTER TABLE `config`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `friend`
--
ALTER TABLE `friend`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `friend_class`
--
ALTER TABLE `friend_class`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=312;

--
-- 使用表AUTO_INCREMENT `article`
--
ALTER TABLE `article`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=228;

--
-- 使用表AUTO_INCREMENT `article_class`
--
ALTER TABLE `article_class`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `auth`
--
ALTER TABLE `auth`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `config`
--
ALTER TABLE `config`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `friend`
--
ALTER TABLE `friend`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- 使用表AUTO_INCREMENT `friend_class`
--
ALTER TABLE `friend_class`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用表AUTO_INCREMENT `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
