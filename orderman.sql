/*
 Navicat Premium Data Transfer

 Source Server         : aliyun
 Source Server Type    : MySQL
 Source Server Version : 50729
 Source Host           : 47.93.231.181:3306
 Source Schema         : orderman

 Target Server Type    : MySQL
 Target Server Version : 50729
 File Encoding         : 65001

 Date: 20/05/2020 21:50:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities`  (
  `activities_id` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `commodities` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `seller_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `pic_url` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `introduction` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`activities_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activities
-- ----------------------------

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart`  (
  `user_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `seller_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `commodities_id` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`, `seller_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for commodities
-- ----------------------------
DROP TABLE IF EXISTS `commodities`;
CREATE TABLE `commodities`  (
  `commodity_id` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `img_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `commodity_price` float(10, 2) NOT NULL,
  `commodity_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `seller_uuid` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `commodity_introduction` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sales` tinyint(10) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`commodity_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of commodities
-- ----------------------------
INSERT INTO `commodities` VALUES ('0852df151da44e1ab28c5466c66c9a33', 'a0817c3f37744137a4ea8808eb1db46d.png', 18.00, '狠霸王鸡堡', 'ea7674b2ffdc428186edf1aeebdc77b6', '选用两块藤椒风味的整块鸡胸排，外脆里嫩，搭配麻辣藤椒酱和奶香浓郁的芝士片，微辣鲜香，夹入三层芝麻面包中，给你大满足！', 0000000000);
INSERT INTO `commodities` VALUES ('1cd43689cb944d7a8b2d6954129a75c2', 'c80524607a09401cb1a010444fd3b895.jpg', 12.50, '吮指原味鸡', 'b1c9bacf5fd34803b942776ea60c1dbf', '营养，美味，吮鸡', 0000000000);
INSERT INTO `commodities` VALUES ('21e5a1fd9acf46e98bf67127c85c3bcf', '21d22b0745bd494c96fdae4a3bf46241.png', 9.00, '卡曼橘果泡饮', 'ea7674b2ffdc428186edf1aeebdc77b6', '富含抗氧化物-维生素C和果酸的卡曼橘果粒，搭配气泡十足的雪碧，成就新鲜有料的汉堡王春季主打饮料。', 0000000000);
INSERT INTO `commodities` VALUES ('3063b37b8d964372a158b89c3ed6a606', 'c86c6bb7d092444fb10301a8aee0b0a7.jpg', 39.00, '五味小食拼盘(榴莲鸡块)', 'b1c9bacf5fd34803b942776ea60c1dbf', '拼盘含： 新奥尔良烤翅2块+劲爆鸡米花(小)1份+薯条(小)1份+榴莲爆浆鸡块(4块)+拼盘小食1份', 0000000001);
INSERT INTO `commodities` VALUES ('33c853e0570f466889c72ab293d8fd59', '52c54056f9ac43329526f06257a560c1.png', 10.00, '麦乐鸡 (5块)', 'cca928b4741840c1a55431e7a78e5566', '严格挑选优质鸡肉，秘制蘸酱，精密控制火侯，锁住肉汁和香味，令外面金黄酥脆，内在鲜嫩多汁。', 0000000000);
INSERT INTO `commodities` VALUES ('4c119acf43eb4dd8964aaed71f7d004a', 'b5686c79d0c048ce8df3cd5fe69a124a.png', 22.00, '经典安格斯厚牛堡原味/天椒', 'ea7674b2ffdc428186edf1aeebdc77b6', '内含鲜嫩多汁、肉香丰盈的安格斯牛肉，伴随着红酒洋葱酱和黑椒酱，一块奶香四溢的车打芝士覆盖其上，新鲜的生菜带来清脆的口感，这所有经典的好风味，由两块口感松软的黄油面包包裹，融合成一口口牛味十足的体验。', 0000000002);
INSERT INTO `commodities` VALUES ('500443a576ff4fe8899b32f74804b313', 'f70b9864a28842d28ec930e9cec948d2.png', 13.00, '新地（巧克力/草莓）', 'ea7674b2ffdc428186edf1aeebdc77b6', '巧克力新地浓郁香醇的巧克力酱，配以清甜浓香的香草冰淇淋，陶醉享受就在此刻！草莓新地酸甜可口草莓果酱，融合清甜浓香的香草冰淇淋，“小鲜莓”特质一触即发！', 0000000001);
INSERT INTO `commodities` VALUES ('5a4d50c35fdd4963b912689baf98a426', '4e20443ca1ad46b295d4bbfd99e0408c.jpg', 16.50, '老北京香辣鸭肉卷', 'b1c9bacf5fd34803b942776ea60c1dbf', '肯德基老北京香辣鸭肉卷，售价16.5元。', 0000000001);
INSERT INTO `commodities` VALUES ('6a53a4703f2746d7917fe33edefd1372', '280e5cff40e0451c84ddb88ed78afdd7.jpg', 26.00, '港式烧味脆皮大鸡腿饭', 'b1c9bacf5fd34803b942776ea60c1dbf', '肯德基港式烧味脆皮大鸡腿饭，售价26元/份。', 0000000002);
INSERT INTO `commodities` VALUES ('709fae8b81fb4624841a62b9b37eea89', '50d1b98c068e4a8e81f2dcf9d5affe5c.png', 22.00, '培根牛肉堡', 'ea7674b2ffdc428186edf1aeebdc77b6', '两层由100%纯牛肉制成的牛肉饼，经过真正火烤后肉香四溢，搭配多达6片的喷香培根，隔层夹入的四片车达芝士在热情的肉饼和培根之间释放浓郁奶香，顶部再毫不吝啬地浇上一层BBQ酱汁及一层蛋黄酱，夹入弹性十足的芝麻面包', 0000000000);
INSERT INTO `commodities` VALUES ('746d55aced5d431db6068c0a26d0bc95', '575811cac1aa4fe4904b59b87ac9466e.png', 15.00, '双层吉士汉堡', 'cca928b4741840c1a55431e7a78e5566', '百分百纯牛肉与双层香软芝士融为一体，加上松软面包及美味酱料，两倍滋味诱惑，无人能挡！', 0000000000);
INSERT INTO `commodities` VALUES ('7b57cd7e33a0438993b70405a05be57a', 'c82641bd7e294a7694727aaa156dbbfa.png', 18.00, '巨无霸', 'cca928b4741840c1a55431e7a78e5566', '两块百分百纯牛肉，搭配洒有鲜芝麻的松软面包、清新爽口的生菜、洋葱和酸黄瓜，以及香滑顺口的芝士与美味酱汁，多层次口感的极致美味体验，只在麦当劳！', 0000000000);
INSERT INTO `commodities` VALUES ('acc1710dc3e04a68b2d44107f97919c5', '90ae18c295464e738ffd38052e359a60.jpg', 18.00, '嫩牛五方', 'b1c9bacf5fd34803b942776ea60c1dbf', '肯德基2019年3月25日起嫩牛五方经典回归，全国限量1000万份，售完即止。\n\n嫩牛五方售价18元。', 0000000000);
INSERT INTO `commodities` VALUES ('b181ed6401594e3ebf88a88a71f8297b', '6c2f9cf846b444a3a65edc64fd639fe0.png', 10.50, '薯条', 'cca928b4741840c1a55431e7a78e5566', '精选优质土豆，表面微脆，内里绵软，美味无人能挡！', 0000000001);
INSERT INTO `commodities` VALUES ('b3329a639d6345c296428543ec70bd38', '268630cded8e4b1e9eb6edb583edc43d.png', 9.00, '鸡腿', 'ea7674b2ffdc428186edf1aeebdc77b6', '嘎嘣脆', 0000000000);
INSERT INTO `commodities` VALUES ('bd8cc932e7954bd3947f95a9022690c4', 'e5a43bfe29b34691b56e0f745195411a.png', 11.00, '王道椒香鸡腿', 'ea7674b2ffdc428186edf1aeebdc77b6', '汉堡王中国精心研发的王道美味！精选优质鸡腿肉，鲜嫩饱满。历经多种香料悉心腌制，浓郁的椒香带来诱人风味。酥脆的外皮，紧实的肉质，口感直击味蕾深处。', 0000000000);
INSERT INTO `commodities` VALUES ('be84a698234d408cb1084d134d3882f1', '04b71f91e42043fbb0a80f1d68170f70.png', 11.00, '薯霸王', 'ea7674b2ffdc428186edf1aeebdc77b6', '更粗更出味！精选优质薯条，外脆内酥，根根粗壮，金黄色泽，持久热度造就汉堡王的明星薯霸王！', 0000000000);
INSERT INTO `commodities` VALUES ('cc0f7bc1f45f4df2870f3f6ebc900d53', '3b10e744159b443d81dce809c0d89fbb.png', 12.50, '奥利奥麦旋风', 'cca928b4741840c1a55431e7a78e5566', '冰淇淋的香滑与奥利奥饼干的香酥融为一体，创造无限新奇滋味。', 0000000002);
INSERT INTO `commodities` VALUES ('dde0d675ac104ab7ab0834c75fdea012', '47b85d94800c417798768225c16d8cc9.png', 12.00, '麦香鸡', 'cca928b4741840c1a55431e7a78e5566', '清脆爽口的生菜，给你植物纤维；金黄酥脆的鸡肉则来自精心培育的优质嫩鸡。营养配搭，让你多一个好滋味的健康选择。', 0000000001);
INSERT INTO `commodities` VALUES ('e2db166006944298b4cf5f73926def71', '01113978f0c041a499f21ffd081aa4c6.png', 17.00, '火烤猪肉蛋全麦卷', 'ea7674b2ffdc428186edf1aeebdc77b6', '健康全麦面饼，卷上100%火烤猪肉饼，搭配现煎太阳蛋，美味营养带来活力一整天！', 0000000001);

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `order_id` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `order_status` tinyint(1) NOT NULL,
  `commodities` varchar(1024) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `spend` int(255) NOT NULL,
  `seller_uuid` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `create_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
  `mod_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`order_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('0873b008027b44c5afd9bc132300b5cc', 2, '709fae8b81fb4624841a62b9b37eea89:1,500443a576ff4fe8899b32f74804b313:1,be84a698234d408cb1084d134d3882f1:1,', 44, 'ea7674b2ffdc428186edf1aeebdc77b6', 'ziong123', '2020-04-29 15:06:11', '2020-05-18 03:13:09');
INSERT INTO `orders` VALUES ('3fbb158ebd434e5b8d290c337e562cbc', 2, '709fae8b81fb4624841a62b9b37eea89:1,0852df151da44e1ab28c5466c66c9a33:1,21e5a1fd9acf46e98bf67127c85c3bcf:1,500443a576ff4fe8899b32f74804b313:2,', 73, 'ea7674b2ffdc428186edf1aeebdc77b6', 'ziong123', '2020-04-29 16:04:02', '2020-04-30 18:53:55');
INSERT INTO `orders` VALUES ('59daf8e232ae41bcb0f62883459f2ac2', 2, '4c119acf43eb4dd8964aaed71f7d004a:1,e2db166006944298b4cf5f73926def71:1,', 39, 'ea7674b2ffdc428186edf1aeebdc77b6', 'ziong123', '2020-05-17 21:11:04', '2020-05-17 22:09:06');
INSERT INTO `orders` VALUES ('66cb4d055d6149d3a4b73d43c5f0f883', 3, '709fae8b81fb4624841a62b9b37eea89:1,0852df151da44e1ab28c5466c66c9a33:1,21e5a1fd9acf46e98bf67127c85c3bcf:1,500443a576ff4fe8899b32f74804b313:2,', 73, 'ea7674b2ffdc428186edf1aeebdc77b6', 'ziong123', '2020-04-29 16:03:48', '2020-04-29 16:07:13');
INSERT INTO `orders` VALUES ('715cf05d1a674daab514c97749f95dd5', 2, '500443a576ff4fe8899b32f74804b313:1,4c119acf43eb4dd8964aaed71f7d004a:1,', 35, 'ea7674b2ffdc428186edf1aeebdc77b6', 'ziong123', '2020-05-04 20:38:02', '2020-05-18 04:27:45');
INSERT INTO `orders` VALUES ('b6dfb0d556044dae8389aaaa1313dc13', 1, 'acc1710dc3e04a68b2d44107f97919c5:1,6a53a4703f2746d7917fe33edefd1372:1,3063b37b8d964372a158b89c3ed6a606:1,', 83, 'b1c9bacf5fd34803b942776ea60c1dbf', 'ziong123', '2020-04-30 18:52:41', '2020-04-30 18:52:41');
INSERT INTO `orders` VALUES ('c234cfec5c934538bb9fd0d47fd556f1', 2, '5a4d50c35fdd4963b912689baf98a426:1,3063b37b8d964372a158b89c3ed6a606:1,6a53a4703f2746d7917fe33edefd1372:2,', 107, 'b1c9bacf5fd34803b942776ea60c1dbf', 'ziong123', '2020-05-18 03:09:22', '2020-05-18 03:09:31');
INSERT INTO `orders` VALUES ('ebb36e6822ba427b9acd304de4489c4e', 1, 'dde0d675ac104ab7ab0834c75fdea012:1,b181ed6401594e3ebf88a88a71f8297b:1,cc0f7bc1f45f4df2870f3f6ebc900d53:2,', 46, 'cca928b4741840c1a55431e7a78e5566', 'ziong123', '2020-05-18 03:12:47', '2020-05-18 03:12:47');

-- ----------------------------
-- Table structure for sellers
-- ----------------------------
DROP TABLE IF EXISTS `sellers`;
CREATE TABLE `sellers`  (
  `seller_id` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `seller_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `seller_uuid` char(32) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `img_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `seller_introduction` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `sales` tinyint(10) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000000000,
  PRIMARY KEY (`seller_id`, `seller_uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sellers
-- ----------------------------
INSERT INTO `sellers` VALUES ('seller001', 'KFC', '123123', 'b1c9bacf5fd34803b942776ea60c1dbf', 'd8fee5cbe7284cd28622d72e37525ac8.jpg', '肯德基，是美国跨国连锁餐厅之一，也是世界第二大速食及最大炸鸡连锁企业', 0000000002);
INSERT INTO `sellers` VALUES ('seller002', '麦当劳（金拱门）', '123123', 'cca928b4741840c1a55431e7a78e5566', 'd69cda6b7bb045cfb7d0c3df6c115a37.jpg', '麦当劳（McDonald\'s）是全球大型跨国连锁餐厅', 0000000001);
INSERT INTO `sellers` VALUES ('seller003', 'burger king', '123123', 'ea7674b2ffdc428186edf1aeebdc77b6', '567c45cde7ba4922b791831a968fc807.jpg', '全球快餐巨头', 0000000005);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `user_name` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`user_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('curryy', '123456');
INSERT INTO `users` VALUES ('hello123', '123123');
INSERT INTO `users` VALUES ('hello1234', '123123');
INSERT INTO `users` VALUES ('hello12345', '123123');
INSERT INTO `users` VALUES ('sim0000n', '123123');
INSERT INTO `users` VALUES ('test123', '123123');
INSERT INTO `users` VALUES ('username', '123123');
INSERT INTO `users` VALUES ('Ziong123', '123456');
INSERT INTO `users` VALUES ('Ziong1234', '123123');
INSERT INTO `users` VALUES ('zzzzzz', 'zzzzzz');

SET FOREIGN_KEY_CHECKS = 1;
