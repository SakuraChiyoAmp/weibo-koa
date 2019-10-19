/*
 Navicat Premium Data Transfer

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80013
 Source Host           : localhost:3305
 Source Schema         : hanjia

 Target Server Type    : MySQL
 Target Server Version : 80013
 File Encoding         : 65001

 Date: 19/10/2019 21:17:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for focus
-- ----------------------------
DROP TABLE IF EXISTS `focus`;
CREATE TABLE `focus`  (
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `OtherUserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `FocusFlag` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of focus
-- ----------------------------
INSERT INTO `focus` VALUES ('a', 'b', '1');
INSERT INTO `focus` VALUES ('b', 'c', '1');
INSERT INTO `focus` VALUES ('b', 'd', '1');
INSERT INTO `focus` VALUES ('b', 'e', '1');
INSERT INTO `focus` VALUES ('c', 'b', '1');
INSERT INTO `focus` VALUES ('d', 'b', '1');
INSERT INTO `focus` VALUES ('我', '被关注的人', '0');
INSERT INTO `focus` VALUES ('a', 'c', '0');

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('userA', 17, 'passworda');
INSERT INTO `user` VALUES ('userB', 19, 'passwordB');
INSERT INTO `user` VALUES ('userC', 20, 'passwordC');

-- ----------------------------
-- Table structure for userinfo
-- ----------------------------
DROP TABLE IF EXISTS `userinfo`;
CREATE TABLE `userinfo`  (
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `HeadImage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of userinfo
-- ----------------------------
INSERT INTO `userinfo` VALUES ('UserA', 'PasswordA', 'xxx');
INSERT INTO `userinfo` VALUES ('b', 'b', 'http://localhost:3000/1568376888289.jpg');
INSERT INTO `userinfo` VALUES ('a', 'a', 'http://localhost:3000/1568376888289.jpg');
INSERT INTO `userinfo` VALUES ('c', 'c', 'http://localhost:3000/1568376888289.jpg');
INSERT INTO `userinfo` VALUES ('d', 'd', 'http://localhost:3000/1568376888289.jpg');
INSERT INTO `userinfo` VALUES ('e', 'e', 'http://localhost:3000/1568376888289.jpg');
INSERT INTO `userinfo` VALUES ('f', 'f', 'http://localhost:3000/1568523900113.jpg');
INSERT INTO `userinfo` VALUES ('q', 'q', 'http://localhost:3000/1568524078112.jpg');
INSERT INTO `userinfo` VALUES ('w', 'w', 'http://localhost:3000/1568524099279.jpg');
INSERT INTO `userinfo` VALUES ('x', 'x', 'http://localhost:3000/1568524168360.jpg');
INSERT INTO `userinfo` VALUES ('t', 't', 'http://localhost:3000/1570542261766.jpg');
INSERT INTO `userinfo` VALUES ('undefined', 'undefined', 'http://localhost:3000/1570542644988.jpg');
INSERT INTO `userinfo` VALUES ('wq', 'wq', 'http://localhost:3000/1570542995325.jpg');
INSERT INTO `userinfo` VALUES ('asd', 'asd', 'http://localhost:3000/1571461194779.jpg');
INSERT INTO `userinfo` VALUES ('qwe', 'qwe', 'http://localhost:3000/1571461286268.docx');
INSERT INTO `userinfo` VALUES ('ert', 'ert', 'http://localhost:3000/1571461304195.jpg');

-- ----------------------------
-- Table structure for weibo
-- ----------------------------
DROP TABLE IF EXISTS `weibo`;
CREATE TABLE `weibo`  (
  `WeiboId` int(255) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ZanCount` int(255) DEFAULT NULL,
  `Content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`WeiboId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 258 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of weibo
-- ----------------------------
INSERT INTO `weibo` VALUES (1, 'b', 3, '2', '1');
INSERT INTO `weibo` VALUES (2, 'b', 109, '2', '2');
INSERT INTO `weibo` VALUES (3, 'b', 4, '3', '3');
INSERT INTO `weibo` VALUES (4, 'b', 1, '12', '2');
INSERT INTO `weibo` VALUES (5, 'b', 1, '12', '3123');
INSERT INTO `weibo` VALUES (253, 'a', 1, '1微博1', '1568730702881');
INSERT INTO `weibo` VALUES (254, 'd', 0, '1测试微博', '1568730752141');
INSERT INTO `weibo` VALUES (255, 'a', 1, '微博1', '1570623191770');
INSERT INTO `weibo` VALUES (256, 'a', 1000, 'qwer', '1570623326071');
INSERT INTO `weibo` VALUES (257, 'ert', 0, '阿斯顿发', '1571461490209');

-- ----------------------------
-- Table structure for weibocomment
-- ----------------------------
DROP TABLE IF EXISTS `weibocomment`;
CREATE TABLE `weibocomment`  (
  `WeiboId` int(255) NOT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Comment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of weibocomment
-- ----------------------------
INSERT INTO `weibocomment` VALUES (2, 'b', 'ojojoi');
INSERT INTO `weibocomment` VALUES (1, 'a', 'asd');
INSERT INTO `weibocomment` VALUES (1, 'b', 'fff');
INSERT INTO `weibocomment` VALUES (1, 'c', 'asdf');
INSERT INTO `weibocomment` VALUES (1, 'c', '测试评论');
INSERT INTO `weibocomment` VALUES (2, 'a', 'dsadf');
INSERT INTO `weibocomment` VALUES (2, 'a', 'e');
INSERT INTO `weibocomment` VALUES (2, 'a', '12');
INSERT INTO `weibocomment` VALUES (2, 'a', '12');
INSERT INTO `weibocomment` VALUES (2, 'a', '12');
INSERT INTO `weibocomment` VALUES (2, 'a', '12');
INSERT INTO `weibocomment` VALUES (2, 'a', 'asdfa');
INSERT INTO `weibocomment` VALUES (2, 'a', 'eqerw');
INSERT INTO `weibocomment` VALUES (2, 'a', 'r3');
INSERT INTO `weibocomment` VALUES (3, 'a', 'd');
INSERT INTO `weibocomment` VALUES (3, 'a', 'qewr');
INSERT INTO `weibocomment` VALUES (3, 'a', 'r');
INSERT INTO `weibocomment` VALUES (3, 'a', 're');
INSERT INTO `weibocomment` VALUES (3, 'a', 'reqwer');
INSERT INTO `weibocomment` VALUES (3, 'a', 'qwer');
INSERT INTO `weibocomment` VALUES (3, 'a', 'gh');
INSERT INTO `weibocomment` VALUES (3, 'a', 'r');
INSERT INTO `weibocomment` VALUES (1, 'a', 'asdf');
INSERT INTO `weibocomment` VALUES (1, 'a', 'qwerqewrqr');
INSERT INTO `weibocomment` VALUES (4, 'a', '22');
INSERT INTO `weibocomment` VALUES (3, 'a', 'asdfasdf');

-- ----------------------------
-- Table structure for weiboimage
-- ----------------------------
DROP TABLE IF EXISTS `weiboimage`;
CREATE TABLE `weiboimage`  (
  `WeiboId` int(255) NOT NULL,
  `Url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of weiboimage
-- ----------------------------
INSERT INTO `weiboimage` VALUES (1, 'http://localhost:3000/1.jpg');
INSERT INTO `weiboimage` VALUES (1, 'http://localhost:3000/1.jpg');
INSERT INTO `weiboimage` VALUES (2, 'http://localhost:3000/2.jpg');
INSERT INTO `weiboimage` VALUES (2, 'http://localhost:3000/3.jpg');
INSERT INTO `weiboimage` VALUES (3, 'http://localhost:3000/4.jpg');
INSERT INTO `weiboimage` VALUES (3, 'http://localhost:3000/5.jpg');
INSERT INTO `weiboimage` VALUES (1324, '1567682471277.jpg');
INSERT INTO `weiboimage` VALUES (1234, '1567682471297.jpg');
INSERT INTO `weiboimage` VALUES (1234, '1568255691273.jpg');
INSERT INTO `weiboimage` VALUES (1324, '1568255691309.jpg');
INSERT INTO `weiboimage` VALUES (1324, '1568266862376.jpg');
INSERT INTO `weiboimage` VALUES (1324, '1568266862378.jpg');
INSERT INTO `weiboimage` VALUES (232, '1568386092980.jpg');
INSERT INTO `weiboimage` VALUES (232, '1568386092982.jpg');
INSERT INTO `weiboimage` VALUES (233, '1568388047584.jpg');
INSERT INTO `weiboimage` VALUES (233, '1568388047615.jpg');
INSERT INTO `weiboimage` VALUES (234, '1568388189180.jpg');
INSERT INTO `weiboimage` VALUES (234, '1568388189208.jpg');
INSERT INTO `weiboimage` VALUES (235, '1568388284231.jpg');
INSERT INTO `weiboimage` VALUES (235, '1568388284258.jpg');
INSERT INTO `weiboimage` VALUES (236, '1568388353044.jpg');
INSERT INTO `weiboimage` VALUES (236, '1568388353071.jpg');
INSERT INTO `weiboimage` VALUES (237, '1568388400487.jpg');
INSERT INTO `weiboimage` VALUES (237, '1568388400511.jpg');
INSERT INTO `weiboimage` VALUES (238, '1568388466029.jpg');
INSERT INTO `weiboimage` VALUES (238, '1568388466062.jpg');
INSERT INTO `weiboimage` VALUES (239, '1568388505976.jpg');
INSERT INTO `weiboimage` VALUES (239, '1568388506000.jpg');
INSERT INTO `weiboimage` VALUES (240, '1568440570553.jpg');
INSERT INTO `weiboimage` VALUES (240, '1568440570623.jpg');
INSERT INTO `weiboimage` VALUES (241, '1568440712096.jpg');
INSERT INTO `weiboimage` VALUES (241, '1568440712119.jpg');
INSERT INTO `weiboimage` VALUES (242, '1568440901095.jpg');
INSERT INTO `weiboimage` VALUES (242, '1568440901121.jpg');
INSERT INTO `weiboimage` VALUES (243, '1568440975796.jpg');
INSERT INTO `weiboimage` VALUES (243, '1568440975822.jpg');
INSERT INTO `weiboimage` VALUES (244, '1568441170773.jpg');
INSERT INTO `weiboimage` VALUES (244, '1568441170802.jpg');
INSERT INTO `weiboimage` VALUES (245, '1568441292429.jpg');
INSERT INTO `weiboimage` VALUES (245, '1568441292490.jpg');
INSERT INTO `weiboimage` VALUES (246, '1568441409732.jpg');
INSERT INTO `weiboimage` VALUES (246, '1568441409757.jpg');
INSERT INTO `weiboimage` VALUES (247, '1568441470812.jpg');
INSERT INTO `weiboimage` VALUES (247, '1568441470837.jpg');
INSERT INTO `weiboimage` VALUES (248, '1568448896229.jpg');
INSERT INTO `weiboimage` VALUES (248, '1568448896263.jpg');
INSERT INTO `weiboimage` VALUES (252, 'http://localhost:3000/1568530811831.jpg');
INSERT INTO `weiboimage` VALUES (252, 'http://localhost:3000/1568530811970.jpg');
INSERT INTO `weiboimage` VALUES (253, 'http://localhost:3000/1568730702650.jpg');
INSERT INTO `weiboimage` VALUES (253, 'http://localhost:3000/1568730702861.jpg');
INSERT INTO `weiboimage` VALUES (254, 'http://localhost:3000/1568730752061.jpg');
INSERT INTO `weiboimage` VALUES (254, 'http://localhost:3000/1568730752115.jpg');
INSERT INTO `weiboimage` VALUES (255, 'http://localhost:3000/1570623191315.jpg');
INSERT INTO `weiboimage` VALUES (255, 'http://localhost:3000/1570623191662.jpg');
INSERT INTO `weiboimage` VALUES (255, 'http://localhost:3000/1570623191681.jpg');
INSERT INTO `weiboimage` VALUES (255, 'http://localhost:3000/1570623191682.jpg');
INSERT INTO `weiboimage` VALUES (255, 'http://localhost:3000/1570623191719.jpg');
INSERT INTO `weiboimage` VALUES (256, 'http://localhost:3000/1570623325971.jpg');
INSERT INTO `weiboimage` VALUES (256, 'http://localhost:3000/1570623326006.jpg');
INSERT INTO `weiboimage` VALUES (257, 'http://localhost:3000/1571461490078.jpg');

-- ----------------------------
-- Table structure for zan
-- ----------------------------
DROP TABLE IF EXISTS `zan`;
CREATE TABLE `zan`  (
  `WeiboId` int(255) NOT NULL,
  `UserName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ZanFlag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of zan
-- ----------------------------
INSERT INTO `zan` VALUES (1, 'b', '1');
INSERT INTO `zan` VALUES (1, 'a', '1');
INSERT INTO `zan` VALUES (2, 'a', '0');
INSERT INTO `zan` VALUES (3, 'a', '0');
INSERT INTO `zan` VALUES (1, 'c', '0');
INSERT INTO `zan` VALUES (255, 'a', '1');
INSERT INTO `zan` VALUES (256, 'a', '1');
INSERT INTO `zan` VALUES (253, 'a', '1');
INSERT INTO `zan` VALUES (5, 'a', '1');
INSERT INTO `zan` VALUES (4, 'a', '1');

SET FOREIGN_KEY_CHECKS = 1;
