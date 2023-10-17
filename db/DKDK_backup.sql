-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (arm64)
--
-- Host: localhost    Database: DKDK
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `status` int DEFAULT '1',
  `create_at` timestamp NULL DEFAULT (now()),
  `delete_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food_types`
--

DROP TABLE IF EXISTS `food_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(10) NOT NULL,
  `create_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_types`
--

LOCK TABLES `food_types` WRITE;
/*!40000 ALTER TABLE `food_types` DISABLE KEYS */;
INSERT INTO `food_types` VALUES (1,'밥','2023-10-16 03:52:46'),(2,'국','2023-10-16 03:52:46'),(3,'메인1','2023-10-16 03:53:11'),(4,'메인2','2023-10-16 03:53:11'),(5,'반찬','2023-10-16 03:53:17');
/*!40000 ALTER TABLE `food_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foods`
--

DROP TABLE IF EXISTS `foods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meal_plan_id` int NOT NULL,
  `type_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `kcal` int NOT NULL,
  `weight` int NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meal_plan_id` (`meal_plan_id`),
  KEY `type_id` (`type_id`),
  CONSTRAINT `foods_ibfk_1` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `foods_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `food_types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foods`
--

LOCK TABLES `foods` WRITE;
/*!40000 ALTER TABLE `foods` DISABLE KEYS */;
INSERT INTO `foods` VALUES (181,1,1,'보리밥',200,140,'https://www.shutterstock.com/image-photo/boiled-barley-porridge-260nw-443425225.jpg'),(182,1,2,'아욱된장국',55,50,'https://t1.daumcdn.net/cfile/tistory/99E20C3F5C95C0CB04'),(183,1,3,'조기구이',61,50,'https://imagescdn.gettyimagesbank.com/500/201811/a11201062.jpg'),(184,1,4,'새송이장조림',47,42,'https://recipe1.ezmember.co.kr/cache/recipe/2018/11/21/f582c0c609202a83704bf0a551abc2ed1.jpg'),(185,1,5,'배추김치',11,25,'https://live.staticflickr.com/7397/12424258875_92bc3c8bf0_b.jpg'),(186,2,1,'현미밥',200,140,'https://images.gettyimageskorea.com/t500/06/510/mbrf22006510.jpg'),(187,2,2,'모시조개탕',36,120,'https://resources.fourfree.com/fhome/cook/266/front.jpg'),(188,2,3,'두부샐러드',80,60,'https://resources.fourfree.com/fhome/cook/7378/front.jpg'),(189,2,4,'시금치나물',50,70,'https://recipe1.ezmember.co.kr/cache/recipe/2015/12/21/4b18778769ccdab54b57d7ddbc753f501.jpg'),(190,2,5,'깍두기',20,70,'https://t1.daumcdn.net/cfile/tistory/146A08224C8EB01919'),(191,3,1,'쌀밥',200,140,'https://m.segye.com/content/image/2021/01/28/20210128517067.jpg'),(192,3,2,'설렁탕',92,60,'https://img.siksinhot.com/place/1490148898171237.jpg'),(193,3,3,'새우채소볶음',60,70,'https://t1.daumcdn.net/cfile/tistory/9975914A5E3583FE24'),(194,3,4,'냉잡채',133,35,'https://recipe1.ezmember.co.kr/cache/recipe/2022/11/26/cf30fd4459ef3735062bd2b70f0905901.jpg'),(195,3,5,'배추김치',11,25,'https://live.staticflickr.com/7397/12424258875_92bc3c8bf0_b.jpg'),(196,4,1,'현미밥',200,140,'https://images.gettyimageskorea.com/t500/06/510/mbrf22006510.jpg'),(197,4,2,'북어국',40,21,'https://recipe1.ezmember.co.kr/cache/recipe/2015/08/28/063e49b67f71ff7d5af76749c711ec14.jpg'),(198,4,3,'두부스테이크',200,95,'https://media.istockphoto.com/id/877009490/photo/tofu-steak-with-snow-peas-and-rocket-salad.jpg?s=612x612&w=0&k=20&c=Vr4GS7880MtVK55lYlTR53QquK11_jlEC8XaHEn7F2U='),(199,4,4,'버섯찹채',75,75,'https://recipe1.ezmember.co.kr/cache/recipe/2021/02/05/0e1a87e488e52af7b0182ec842ba69761.jpg'),(200,4,5,'오이소박이',15,60,'https://imagescdn.gettyimagesbank.com/500/201708/jv10929087.jpg'),(201,5,1,'수수밥',200,140,'https://mblogthumb-phinf.pstatic.net/20160729_117/hansalim_14697622684164WOAb_JPEG/image_9259080761469762236440.jpg?type=w800'),(202,5,2,'시금치된장국',6,50,'https://blog.kakaocdn.net/dn/b2YFDR/btq0iWKVoET/UljsXJ4KMl52pLqnt66owK/img.jpg'),(203,5,3,'닭조림',80,50,'https://t1.daumcdn.net/cfile/tistory/113F29424FD13F812A'),(204,5,4,'곤약채소조림',37,67,'https://i.pinimg.com/474x/d0/27/1d/d0271d99cbb7f730fe4594e96ab041b3.jpg'),(205,5,5,'총각김치',16,43,'https://blog.kakaocdn.net/dn/bozgjG/btr8J0MgXfE/JzGUkdWvLnP33HeKCF23mk/img.jpg'),(206,6,1,'콩밥',200,140,'https://mono.aks.ac.kr/s/media/72/726b7938-5884-4dba-ac01-2e6b6d7008af.jpg?preset=page'),(207,6,2,'미역오이냉국',6,21,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCuOJGOWF2BqHjIpl3R_xPEfQUz3rlvuxdg&usqp=CAU'),(208,6,3,'쇠고기수육',65,50,'https://imagescdn.gettyimagesbank.com/500/201709/jv10980674.jpg'),(209,6,4,'채소쌈',20,70,'https://png.pngtree.com/thumb_back/fw800/background/20230926/pngtree-red-and-green-leaf-lettuce-image_13359406.jpg'),(210,6,5,'배추김치',11,25,'https://live.staticflickr.com/7397/12424258875_92bc3c8bf0_b.jpg'),(211,7,1,'보리밥',235,140,'https://www.shutterstock.com/image-photo/boiled-barley-porridge-260nw-443425225.jpg'),(212,7,2,'미역쇠고기국',35,12,'https://musicbroshop.com/data/goods/1/2021/01/966_2021011214075916.jpg'),(213,7,3,'메추리알장조림',80,40,'https://www.sumifoodmall.com/shopimages/jayeonmall/012001000064.jpg?1610588512'),(214,7,4,'오이초무침',30,70,'https://thumb.photo-ac.com/2e/2e3e43f04dd6572f85afa411aa314a1a_t.jpeg'),(215,7,5,'마늘종 볶음',40,25,'https://recipe1.ezmember.co.kr/cache/recipe/2022/05/11/fd985061d3f340cc9fa6a1aa33fcbd2c1.jpg'),(216,8,1,'오곡밥',235,140,'https://t1.daumcdn.net/cfile/tistory/112365474D54EB7E32'),(217,8,2,'근대된장국',30,20,'https://recipe1.ezmember.co.kr/cache/recipe/2020/10/29/13a4f07dfc7fb847463c2fd50742417a1.jpg'),(218,8,3,'북어찜',80,15,'https://i.ytimg.com/vi/5xBviWSAEbs/maxresdefault.jpg'),(219,8,4,'닭고기데리야끼',80,70,'https://homecuisine.co.kr/files/attach/images/140/284/071/c1e05b890c6ec40cf71502961c56d561.JPG'),(220,8,5,'깻잎나물',25,20,'https://t1.daumcdn.net/cfile/tistory/999557405B5C314320'),(221,9,1,'흑미밥',235,140,'https://t1.daumcdn.net/cfile/tistory/225A7234588DA0060D'),(222,9,2,'버섯맑은국',30,20,'https://t1.daumcdn.net/cfile/tistory/99A2CB425E68E80C1B'),(223,9,3,'제육볶음',85,75,'https://cdn.oasis.co.kr:48581/product/65162/thumb/thumb_6516275a25fa5-81f5-436a-b2a9-a6aeeb2b48f1.jpg'),(224,9,3,'꽁치구이',80,50,'https://oasisproduct.cdn.ntruss.com/57678/detail/detail_57678_1_7ed9222b-e9b3-45ea-bcd1-bcb2a84e7e78.jpg'),(225,9,5,'숙주나물',30,70,'https://recipe1.ezmember.co.kr/cache/recipe/2021/03/12/c3b3923e09daef86bc64806acb4fd5381.jpg'),(226,10,1,'완두콩밥',245,140,'https://recipe1.ezmember.co.kr/cache/recipe/2015/08/19/4da3e417fd3f0f181f27f9946bda0ca0.jpg'),(227,10,2,'부추양지탕',50,22,'https://www.busan.com/nas/data/content/image/2016/06/29/20160629000216_0.jpg'),(228,10,3,'조기구이',80,50,'https://qi-o.qoo10cdn.com/goods_image_big/0/6/2/4/6988890624b_l.jpg'),(229,10,4,'우엉조림',45,25,'https://t1.daumcdn.net/cfile/tistory/2752C14458CA948602'),(230,10,5,'참나물',30,20,'https://recipe1.ezmember.co.kr/cache/recipe/2020/10/03/3c25a18acf4c971e413cb08f1cd8f3161.jpg'),(231,11,1,'흑미밥',300,210,'https://t1.daumcdn.net/cfile/tistory/225A7234588DA0060D'),(232,11,2,'쇠고기무국',445,70,'https://recipe1.ezmember.co.kr/cache/recipe/2022/09/02/6db4d266c97d4a7107749fa4421c5d771.jpg'),(233,11,3,'조기구이',96,80,'https://imagescdn.gettyimagesbank.com/500/201811/a11201062.jpg'),(234,11,4,'상추겉절이',38,45,'https://recipe1.ezmember.co.kr/cache/recipe/2023/06/09/744f9eb9cb7e0804d7b5bc3718b5d1971.jpg'),(235,11,5,'멸치볶음',85,15,'https://recipe1.ezmember.co.kr/cache/recipe/2022/09/02/6db4d266c97d4a7107749fa4421c5d771.jpg'),(236,12,1,'오곡밥',235,140,'https://t1.daumcdn.net/cfile/tistory/112365474D54EB7E32'),(237,12,2,'오이냉국',15,35,'https://recipe1.ezmember.co.kr/cache/recipe/2017/06/11/d64e5156a51fa9a385787fb16d753ac11.jpg'),(238,12,3,'쇠고기사태찜',80,75,'https://yulmama.com/upload/product/%EC%82%AC%ED%83%9C%EC%B0%9C_%EC%99%84%EC%A1%B0%EB%A6%AC2.jpg'),(239,12,4,'두부조림',80,80,'https://recipe1.ezmember.co.kr/cache/recipe/2018/09/05/606226d1117ac08d9fb9ca190a499d0a1.jpg'),(240,12,5,'피망잡채',30,30,'https://olive.tokyo/wp-content/uploads/2020/12/IMG_1941-1-1024x768.jpg'),(241,13,1,'보리밥',300,210,'https://www.shutterstock.com/image-photo/boiled-barley-porridge-260nw-443425225.jpg'),(242,13,2,'얼갈이배추국',20,40,'https://recipe1.ezmember.co.kr/cache/recipe/2015/05/22/d8957608ec189c718456f13a7de7eada1.jpg'),(243,13,3,'임연수구이',80,50,'https://recipe1.ezmember.co.kr/cache/recipe/2016/12/07/e8c6b9958d6bc1bdbab061818e7a88dd1.jpg'),(244,13,4,'도라지나물',23,50,'https://recipe1.ezmember.co.kr/cache/recipe/2020/01/22/31d1697df7cac8acfc3787a61ee59db21.jpg'),(245,13,5,'취나물',20,25,'https://recipe1.ezmember.co.kr/cache/recipe/2016/03/07/2c6ac22076e92846d10d505dc56fb7651.jpg'),(246,14,1,'오곡밥',300,210,'https://t1.daumcdn.net/cfile/tistory/112365474D54EB7E32'),(247,14,2,'콩나물국',30,20,'https://recipe1.ezmember.co.kr/cache/recipe/2018/10/21/b1a3f537aadca6e12f45b21aaca2a7981.jpg'),(248,14,3,'너비아니',80,60,'https://recipe1.ezmember.co.kr/cache/recipe/2015/06/09/cff7804d2b1e82c46fdf7ce06ad245bf.jpg'),(249,14,4,'멸치볶음',60,15,'https://recipe1.ezmember.co.kr/cache/recipe/2015/12/14/36a05746ceec6cea6320d121ecbd7c581.jpg'),(250,14,5,'김무침',25,2,'https://recipe1.ezmember.co.kr/cache/recipe/2021/01/05/7e1060f5cfc3148b6c0479cda91f0b261.jpg'),(251,15,1,'흑미밥',300,210,'https://t1.daumcdn.net/cfile/tistory/225A7234588DA0060D'),(252,15,2,'청국장찌개',45,30,'https://recipe1.ezmember.co.kr/cache/recipe/2015/04/04/4576246cba1b75f3dc4b213bad319f0c1.jpg'),(253,15,3,'양미리조림',55,50,'https://recipe1.ezmember.co.kr/cache/recipe/2023/02/14/10d2d6820addfd6aca6293eccb76954e1.jpg'),(254,15,4,'달걀당근찜',80,55,'https://previews.123rf.com/images/rissystory/rissystory1611/rissystory161100204/65583259-%EC%95%BC%EC%B1%84-%EB%8B%B9%EA%B7%BC%EA%B3%BC-%EA%B3%84%EB%9E%80-%EC%B0%9C.jpg'),(255,15,5,'상추겉절이',20,70,'https://recipe1.ezmember.co.kr/cache/recipe/2023/06/09/744f9eb9cb7e0804d7b5bc3718b5d1971.jpg'),(256,16,1,'완두콩밥',310,210,'https://recipe1.ezmember.co.kr/cache/recipe/2015/05/26/66fa726c548ef867e6b56aa0cd4f919d1.jpg'),(257,16,2,'쇠고기미역국',20,25,'https://recipe1.ezmember.co.kr/cache/recipe/2015/05/26/babf7c52eb268dc1f2649fa632b4ada51.jpg'),(258,16,3,'새우볶음',60,50,'https://t1.daumcdn.net/cfile/tistory/9977AE495E9CD18D13'),(259,16,4,'양송이볶음',25,25,'https://recipe1.ezmember.co.kr/cache/recipe/2017/05/16/d6c637f6c9246888001566d28e2acb551.jpg'),(260,16,5,'꽈리고추찜',25,20,'https://view01.wemep.co.kr/wmp-product/8/021/1037490218/1037490218.jpg'),(261,17,1,'쌀밥',300,210,'https://m.segye.com/content/image/2021/01/28/20210128517067.jpg'),(262,17,2,'꽃게된장찌개',60,85,'https://recipe1.ezmember.co.kr/cache/recipe/2016/09/19/fd1c8b95108b6a9bd4d150d3ba08f8d31.jpg'),(263,17,3,'두부구이',85,80,'https://recipe1.ezmember.co.kr/cache/recipe/2015/05/21/1b30f21c7165405cb14d53ba5521da411.jpg'),(264,17,4,'가지볶음',25,70,'https://recipe1.ezmember.co.kr/cache/recipe/2019/08/21/f51404dc513ccc76be4b5668f5dd350b1.jpg'),(265,17,5,'양파초절이',20,50,'https://blog.kakaocdn.net/dn/bV92dq/btq3LUu8ouH/hIP0BCz0C8XqkUWOKxPvK1/img.jpg'),(266,18,1,'오곡밥',300,210,'https://t1.daumcdn.net/cfile/tistory/112365474D54EB7E32'),(267,18,2,'우거지국',20,20,'https://recipe1.ezmember.co.kr/cache/recipe/2019/02/11/8a2257f1eaae6d8938b9d99660c27e571.jpg'),(268,18,3,'장산적',80,60,'https://t1.daumcdn.net/cfile/tistory/246C273F53F6B3DE09'),(269,18,4,'병어구이',80,75,'https://recipe1.ezmember.co.kr/cache/board/2012/03/21/b4f2d8fbd3f07d9aa059c50622fec1cd.jpg'),(270,18,5,'월과채',25,45,'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99A87533599F80C11C');
/*!40000 ALTER TABLE `foods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  `create_at` timestamp NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meal_plans`
--

DROP TABLE IF EXISTS `meal_plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meal_plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `grade` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meal_plans`
--

LOCK TABLES `meal_plans` WRITE;
/*!40000 ALTER TABLE `meal_plans` DISABLE KEYS */;
INSERT INTO `meal_plans` VALUES (1,1400),(2,1400),(3,1400),(4,1400),(5,1400),(6,1400),(7,1600),(8,1600),(9,1600),(10,1600),(11,1600),(12,1600),(13,1800),(14,1800),(15,1800),(16,1800),(17,1800),(18,1800);
/*!40000 ALTER TABLE `meal_plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '1',
  `create_at` timestamp NULL DEFAULT (now()),
  `delete_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trainer_id` int NOT NULL,
  `available_area` varchar(50) DEFAULT NULL,
  `available_time` varchar(50) DEFAULT NULL,
  `category_name` varchar(255) NOT NULL,
  `term` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `content` text NOT NULL,
  `status` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT (now()),
  `delete_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pt_orders`
--

DROP TABLE IF EXISTS `pt_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pt_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `buyer_user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_user_id` (`buyer_user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pt_orders_ibfk_1` FOREIGN KEY (`buyer_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `pt_orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pt_orders`
--

LOCK TABLES `pt_orders` WRITE;
/*!40000 ALTER TABLE `pt_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `pt_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(128) NOT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20231013060706'),('20231013060927'),('20231013061848'),('20231013062009'),('20231013062044'),('20231013062216'),('20231013062415'),('20231013062459'),('20231013062749'),('20231013085144'),('20231013085225'),('20231013085334'),('20231013085412'),('20231013085521'),('20231013085624'),('20231016070702'),('20231016074624');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_orders`
--

DROP TABLE IF EXISTS `sub_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sub_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `end_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `sub_id` (`sub_id`),
  CONSTRAINT `sub_orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `sub_orders_ibfk_2` FOREIGN KEY (`sub_id`) REFERENCES `subscriptions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_orders`
--

LOCK TABLES `sub_orders` WRITE;
/*!40000 ALTER TABLE `sub_orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `sub_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL,
  `term` int DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `specialized` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `specialized` (`specialized`),
  CONSTRAINT `trainers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `trainers_ibfk_2` FOREIGN KEY (`specialized`) REFERENCES `workout_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
INSERT INTO `trainers` VALUES (1,5,1),(2,6,2),(3,7,3);
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(50) DEFAULT NULL,
  `kakao_id` int DEFAULT NULL,
  `naver_id` int DEFAULT NULL,
  `birthday` varchar(10) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `user_type` int DEFAULT NULL,
  `height` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `interested_workout` int DEFAULT NULL,
  `workout_load` int DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  KEY `interested_workout` (`interested_workout`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`interested_workout`) REFERENCES `workout_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'혀누',12345,NULL,'1993-09-22','2',10,1,180.00,80.00,2,3,'https://img.etnews.com/news/article/2022/09/27/article_27171514593025.jpg','2023-09-29 15:00:00'),(2,'동언',12346,NULL,'1993-09-23','1',10,1,180.00,80.00,1,1,'https://files.slack.com/files-tmb/TH0U6FBTN-F060CJLN12B-95a6f4ed74/dd98b65e-0e26-4cb4-abba-e146314854d5_1_201_a_720.jpg','2023-09-29 15:00:00'),(3,'승원',12347,NULL,'1993-09-24','1',10,1,180.00,80.00,3,2,'https://img.hankyung.com/photo/202107/BF.27088159.1.jpg','2023-09-29 15:00:00'),(4,'동훈',12348,NULL,'1993-09-25','1',10,1,180.00,80.00,1,1,'https://files.slack.com/files-tmb/TH0U6FBTN-F060CJN1MN3-a3cf1741ed/6111c20a-6c43-43c5-b27e-67dd0aab7a32_1_201_a_720.jpg','2023-09-29 15:00:00'),(5,'헬트',12349,NULL,'1990-09-26','1',10,2,180.00,90.00,1,1,'https://ilyo.co.kr/contents/article/images/2021/1106/1636205536400261.jpg','2023-09-30 15:00:00'),(6,'필테',12350,NULL,'1992-09-27','2',10,2,170.00,55.00,2,1,'https://cdn.imweb.me/thumbnail/20211015/02ac1173bcd72.png','2023-10-01 15:00:00'),(7,'요가',12351,NULL,'1991-09-28','2',10,2,165.00,50.00,3,1,'https://cdn.senmoney.co.kr/news/photo/202204/12337_12129_4533.jpg','2023-10-02 15:00:00');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_categories`
--

DROP TABLE IF EXISTS `workout_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_categories`
--

LOCK TABLES `workout_categories` WRITE;
/*!40000 ALTER TABLE `workout_categories` DISABLE KEYS */;
INSERT INTO `workout_categories` VALUES (1,'헬스'),(2,'필라테스'),(3,'요가');
/*!40000 ALTER TABLE `workout_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workout_records`
--

DROP TABLE IF EXISTS `workout_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workout_records` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `water_content` int DEFAULT NULL,
  `workout_time` decimal(10,2) DEFAULT NULL,
  `current_weight` decimal(10,2) DEFAULT NULL,
  `muscle_mass` decimal(10,2) DEFAULT NULL,
  `body_fat` decimal(10,2) DEFAULT NULL,
  `max_heartrate` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT (now()),
  `category_id` int DEFAULT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `Repetition` varchar(50) DEFAULT NULL,
  `Set` int DEFAULT NULL,
  `img_url` varchar(256) DEFAULT NULL,
  `Column7` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `workout_records_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workout_records`
--

LOCK TABLES `workout_records` WRITE;
/*!40000 ALTER TABLE `workout_records` DISABLE KEYS */;
INSERT INTO `workout_records` VALUES (59,1,50,1.00,75.00,32.00,25.00,150,'2023-10-01 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(60,1,52,1.50,76.00,32.00,25.00,147,'2023-10-03 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(61,1,53,2.00,79.00,33.00,26.00,100,'2023-10-05 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(62,1,54,1.00,78.00,33.00,26.00,120,'2023-10-07 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(63,1,55,1.00,78.00,32.00,27.00,150,'2023-10-08 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(64,1,54,2.00,79.00,32.00,27.00,147,'2023-10-09 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(65,1,55,1.50,80.00,32.00,27.00,100,'2023-10-10 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(66,2,26,1.00,80.10,32.10,27.61,170,'2023-10-01 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(67,2,25,1.00,79.40,32.00,27.61,188,'2023-10-03 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(68,2,26,0.50,80.00,32.00,27.10,150,'2023-10-05 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(69,2,25,1.50,79.10,32.20,27.00,180,'2023-10-07 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(70,2,25,1.00,79.00,32.20,27.30,187,'2023-10-08 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(71,2,24,1.00,78.70,32.30,27.00,188,'2023-10-09 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(72,2,24,1.00,78.70,32.30,26.90,183,'2023-10-10 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(73,3,26,0.50,82.30,33.00,40.10,169,'2023-09-30 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(74,3,24,1.00,81.20,34.00,41.87,187,'2023-10-01 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(75,3,23,0.50,80.00,35.00,43.75,149,'2023-10-02 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(76,3,22,1.00,79.00,38.00,48.10,181,'2023-10-03 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(77,3,21,1.50,76.00,39.00,51.32,186,'2023-10-04 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(78,3,27,1.00,73.00,40.00,54.79,183,'2023-10-05 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(79,3,30,1.00,71.00,41.00,57.75,182,'2023-10-06 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(80,3,30,2.00,71.00,41.00,57.75,182,'2023-10-06 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(81,4,38,0.50,82.60,32.10,32.10,170,'2023-09-30 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(82,4,38,1.00,82.50,32.00,32.00,188,'2023-09-30 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(83,4,38,0.50,82.10,32.00,32.30,150,'2023-10-02 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(84,4,38,1.50,81.40,32.20,31.90,180,'2023-10-03 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(85,4,38,1.00,81.90,32.20,31.70,187,'2023-10-04 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(86,4,36,1.00,81.80,32.30,31.70,188,'2023-10-06 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL),(87,4,35,2.00,81.50,32.30,31.60,183,'2023-10-06 15:00:00',NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `workout_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workouts`
--

DROP TABLE IF EXISTS `workouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workouts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `repetition` varchar(10) NOT NULL,
  `set` int NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `Column7` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `workouts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `workout_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workouts`
--

LOCK TABLES `workouts` WRITE;
/*!40000 ALTER TABLE `workouts` DISABLE KEYS */;
INSERT INTO `workouts` VALUES (1,1,'Shoulder Press','20회',5,'https://img.freepik.com/free-vector/shoulder-press-demostration_1133-394.jpg?w=1480&t=st=1697004762~exp=1697005362~hmac=5e6555c186dea55775556a06de2b5400e13c87c015de0b831e6db6a50b31291b',NULL),(2,1,'Lateral Raise','20회',5,'https://img.freepik.com/free-vector/shoulder-lateral-raise-demostration_1133-375.jpg?w=1480&t=st=1697004870~exp=1697005470~hmac=af5ea8adeed2640e5beb19b4da35564662f63cb133d7234bd93030a750277c5a',NULL),(3,1,'Front Raise','20회',5,'https://img.freepik.com/free-photo/young-man-making-sport-exercises-home_1328-3066.jpg?w=826&t=st=1697005173~exp=1697005773~hmac=d81cb5701e8daf6b3be1b8ed2a18e1777bd96734b6db6268534799725a1b6c25',NULL),(4,1,'Pull Up','10회',3,'https://img.freepik.com/free-vector/sport-gym-background-with-people-training_23-2147794038.jpg?w=1480&t=st=1697005436~exp=1697006036~hmac=c616c639337f473c78d7ece5ad93e330d747da6d0069503fc04f84c7928e521c',NULL),(5,1,'Lat Pulldown','20회',3,'https://img.freepik.com/free-photo/gym-handsome-man-during-workout_144627-6231.jpg?w=826&t=st=1697005552~exp=1697006152~hmac=1dedd01996e6153890822915fb285608f1d0326828f4eb079b944fa970ff7e3e',NULL),(6,1,'Dumbbell Row','20회',4,'https://img.freepik.com/free-photo/beautiful-young-woman-doing-exercise-with-dumbbell_23-2147827496.jpg?w=1480&t=st=1697005722~exp=1697006322~hmac=7932e8d228c963f581bb961c2cc863a75c9d25c63728cde3bbdb496dd2bd6d4c',NULL),(7,1,'Deadlift','10회',4,'https://img.freepik.com/free-photo/muscular-build-man-making-effort-while-weightlifting-during-cross-training-gym_637285-2488.jpg?w=1480&t=st=1697005928~exp=1697006528~hmac=f514ef82a53e59132025e8af7d3ea90aa2dd9d710ae83e609c1fa01305121f4a',NULL),(8,1,'Push Up','12회',5,'https://img.freepik.com/free-photo/concentrated-young-sportsman-make-sport-exercises_171337-7738.jpg?w=1800&t=st=1697006031~exp=1697006631~hmac=3286a645f8d539acc282e4ea8e4eb2f20f0fb19a87ffafe8aa12e8410f95902e',NULL),(9,1,'Dumbbell Press','12회',4,'https://img.freepik.com/free-photo/young-fit-man-training-bodybuilding_23-2149552267.jpg?w=1800&t=st=1697006153~exp=1697006753~hmac=eb2126a5e37e49eaa2ec500db244c23d89c827928c4bfcaa80d5717fbcd6d3af',NULL),(10,1,'Barbell Bench Press','12회',4,'https://img.freepik.com/free-photo/man-workingout-local-gym_93675-129483.jpg?w=1800&t=st=1697006219~exp=1697006819~hmac=269c6eda01edac8e8168b12db19f373bcde6ff0ec420b48f45d47b3a17eca911',NULL),(11,1,'Incline Push Up','12회',4,'https://img.freepik.com/free-photo/handsome-man-working-push-ups-gym-sport-exercises_639032-2636.jpg?w=1800&t=st=1697006366~exp=1697006966~hmac=0ac49a5c0c076de7a0d6e85d2a423f0695ac2dc90639526e4cd3969bdd7efd48',NULL),(12,1,'Barbell Curls','12회',4,'https://img.freepik.com/free-photo/portrait-muscular-motivated-shirtless-male-bodybuilder_171337-4580.jpg?w=1380&t=st=1697006534~exp=1697007134~hmac=46f3a5fa265cd7716ebbf7ae7bfe2c3e26859bf336652841132b19f2fd4dfbe0',NULL),(13,1,'Dumbbell Curls','12회',4,'https://img.freepik.com/free-photo/young-concentrated-athlete-woman-doing-exercises-with-dumbbell_171337-13925.jpg?w=1380&t=st=1697006690~exp=1697007290~hmac=953d90d67b49270a66c8539335341dcc05f120a7ca0b2fbf81d2422512815b6f',NULL),(14,1,'Triceps Kickback','12회',4,'https://img.freepik.com/free-photo/profile-view-young-woman-sporty-outfit-recording-video-her-fitness-blog_662251-2448.jpg?w=1380&t=st=1697006813~exp=1697007413~hmac=83a4a185d54ce8aa3b8c2ea85f1a525d43c24f21e81c9ac9ab9933b0b4ace0e4',NULL),(15,1,'Tricep Reverse Pushdown','12회',4,'https://img.freepik.com/free-photo/athletic-blonde-woman-sportswear-doing-exercise-triceps-crossover-machine-gym_613910-6554.jpg?w=826&t=st=1697006993~exp=1697007593~hmac=ef7990504291e41e771aff0bdb9edc190c5688b636bcbda37240ee2aea047864',NULL),(16,1,'Dips','12회',4,'https://img.freepik.com/free-photo/woman-posing-parallel-bars-gym_651396-278.jpg?w=826&t=st=1697007050~exp=1697007650~hmac=fe6dfa1ad983be9ee9c02534231a38562c3a02d5a2f0a0a7a6bceec82c407405',NULL),(17,1,'Squates','10회',4,'https://mblogthumb-phinf.pstatic.net/MjAxODA3MDNfMzQg/MDAxNTMwNTkyMTAwNjM4.ZdziLbCGcS7Kln8vG4P4XY0hUW3_7Q2-6_boR7CDFHAg.UcCTUPHnWmDIfsd8IQS1VO47-i2_5zB1jBud3OgwFZAg.PNG.kuexolove/4.png?type=w800',NULL),(18,1,'Dumbbell Squats','10회',4,'https://cdn.maxq.kr/news/photo/202209/9960_17381_1736.jpg',NULL),(19,1,'Lunge','20회',4,'https://newsimg.hankookilbo.com/cms/articlerelease/2021/04/09/acc0302e-51ac-4770-8089-e8bc8748eda4.jpg',NULL),(20,1,'Jump Lunge','20회',4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyR2Dsu7iY-YyKRj_jqaYPtFpsqB19O3f77r5OzR_2iTcTJQamq-aDNtPfcxxpMxttMnE&usqp=CAU',NULL),(21,1,'Dumbbell Lunge','20회',4,'https://mblogthumb-phinf.pstatic.net/MjAxNzAzMTVfMjUx/MDAxNDg5NTc5OTUxMDY5.QgSN4MDBgEFyv3pfx5i9Iddzft3Z4qqowfpGyL7PoiYg.Yy13BHBz6ktkgwoZOgK0gh9bN9gDonmO2RdnpxQp83sg.JPEG.bodyflower/%EB%8D%A4%EB%B2%A8%EB%9F%B0%EC%A7%80.jpg?type=w800',NULL),(22,1,'Barbell Lunge','20회',4,'https://img2.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202105/21/muscleandfitness/20210521212231289cyii.jpg',NULL),(23,1,'Sibe Lunge','20회',4,'https://post-phinf.pstatic.net/MjAxODAyMDlfMjU3/MDAxNTE4MTM3OTI5MTQ2.B1odPryZb4VscNH-nDRlQF6BuSOIZzS9h2obb6DMpksg.1DgCpunHpHcC1V4Bg4489NTdTq1xv1U-WEEv5jeRqecg.JPEG/8.jpg?type=w800_q75',NULL),(24,1,'Forward Lunge','20회',4,'https://mblogthumb-phinf.pstatic.net/20141208_155/jjun0600_1418024854071AHAfl_JPEG/new-lunges-02.jpg?type=w420',NULL),(25,1,'Backward Lunge','20회',4,'https://mblogthumb-phinf.pstatic.net/MjAxOTA3MzBfMTA0/MDAxNTY0NDY1NDY2MzA5.iCelSGML7eFM9IHdASHukwcNYdYkA4FDQSi567m17LIg.8c1TNqAOSEG4ClmqKlqMFoMxLk0pUKAkarPBMG6DBXwg.JPEG.sadsilent001/image_7342593751467782215604-1.jpg?type=w800',NULL),(26,1,'Walking Lunge','20회',4,'https://blog.kakaocdn.net/dn/cTtIDV/btqF9buA5Qp/6jbSMD6wcPUxCo9bxeKLN0/img.jpg',NULL),(27,1,'Leg press','12회',4,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjxpUnFcDcic0EqYLP3-rqH1Zzsyn9EzUQ4w&usqp=CAU',NULL),(28,1,'Leg Extension','12회',4,'https://blog.kakaocdn.net/dn/bN2drd/btr8T48isTZ/VScltgruH7DTIPXcTuPMAK/img.png',NULL),(29,1,'Leg Curl','12회',4,'https://static.strengthlevel.com/images/illustrations/lying-leg-curl-1000x1000.jpg',NULL),(30,1,'Calf Raise','30회',2,'https://i.ytimg.com/vi/42yy_Em_bQg/hq720_2.jpg?sqp=-oaymwEYCJUDENAFSFryq4qpAwoIARUAAIhC0AEB&rs=AOn4CLBN74AudGms7llWqqff46x32S_xtA',NULL),(31,2,'Jack Knife','5초',5,'https://images.pexels.com/photos/1375883/pexels-photo-1375883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(32,2,'Reformer Stretch','10초',3,'https://images.pexels.com/photos/5473894/pexels-photo-5473894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(33,2,'Swan Dive','5초',5,'https://images.pexels.com/photos/5473893/pexels-photo-5473893.jpeg',NULL),(34,2,'Side Kick','3회',5,'https://images.pexels.com/photos/5473900/pexels-photo-5473900.jpeg',NULL),(35,2,'Lunge Stretch','5초',5,'https://images.pexels.com/photos/9304858/pexels-photo-9304858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(36,2,'Shoulder Bridge','5회',5,'https://images.pexels.com/photos/9288101/pexels-photo-9288101.jpeg',NULL),(37,2,'Teaser','3회',5,'https://images.pexels.com/photos/6111587/pexels-photo-6111587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(38,2,'Arm Walk','5회',5,'https://images.pexels.com/photos/6111616/pexels-photo-6111616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(39,2,'Side Plank','10회',5,'https://images.pexels.com/photos/3822187/pexels-photo-3822187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(40,2,'Cadillac Stretching','10초',5,'https://images.pexels.com/photos/6111580/pexels-photo-6111580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(41,2,'Barrel Side Bend','5초',5,'https://images.pexels.com/photos/18074996/pexels-photo-18074996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',NULL),(42,2,'Single Straight Leg Stretch','20초',3,'https://images.pilatesanytime.com/2014/07/24/large_exercises_14707_PA3202-53737.jpg',NULL),(43,2,'Mermaid','20초',3,'https://cdn.koreahealthlog.com/news/photo/201103/8128_3219_2310.jpg',NULL),(44,2,'Thigh Stretch','10초',3,'https://mblogthumb-phinf.pstatic.net/MjAyMzAxMTBfMjYx/MDAxNjczMzUwMzgzMjk3.FcD906KL6ZWNcKtqj_kmUd-YBLs4FNiqt3fEI1O0A6Eg.fA860-LLLnd0FdkW-nyNxxQ1dE12Y66QLPbsOw3lcp0g.JPEG.jptshop/ThighStretch2O.jpg?type=w800',NULL),(45,2,'Roll Up','5회',3,'https://us.123rf.com/450wm/charlesmasters/charlesmasters1203/charlesmasters120300025/12771255-%ED%95%84%EB%9D%BC%ED%85%8C%EC%8A%A4-%EC%88%9C%EC%9C%84-%EB%A1%A4%EC%97%85.jpg?ver=6',NULL),(46,2,'Roll Over','10초',5,'https://mblogthumb-phinf.pstatic.net/MjAxODEwMzBfMTYw/MDAxNTQwODk0MDIyNjk4.MZlemXOKLx_GL1_dOPxU2hiSNuWSugmoYJxgdwNAM8Ug.SGCN70_EDbi4jJ9H8wCAzbk24629nv1F4bqJCvlq50sg.JPEG.fly2143/%EB%A1%A4%EC%98%A4%EB%B2%84.jpg?type=w800',NULL),(47,2,'Roll Down','3회',3,'https://mblogthumb-phinf.pstatic.net/MjAxODAyMDZfMjc1/MDAxNTE3ODk4NzE4MTc3.LJddSqF7GWyswxWQFHhXpYKtPPFkhoNbgWBoEbhoSZYg.vYJJcCYlhAtcNzbcS4uCXFSe893Rd7JVSZmq9P2t_SQg.JPEG.sbwphs1/image_5400068491517898624822.jpg?type=w800',NULL),(48,2,'Saw','5초',3,'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTRfMTg3/MDAxNTg5NDY3Mjg2NzMx.bTT6ilXTGbPDV6bBbIhTYwlzyiVLJFZFkZGUrK9ybeog.SAiXvWl1sUdmA6ce0B9Ib89I78yIRauwe7aQHjdUpWAg.JPEG.exholic/%EC%8F%98%EC%9A%B0_%EC%9E%90%EC%84%B8.jpg?type=w800',NULL),(49,2,'Spin Twist','5초',5,'https://i.ytimg.com/vi/PPFkp7Aa3Rg/maxresdefault.jpg',NULL),(50,2,'Leg Pull Front','5회',3,'https://pilatesineast.files.wordpress.com/2017/01/ahme-leg-pul-front-mc.jpg',NULL),(51,3,'Big Toe','30초',2,'https://pixahive.com/wp-content/uploads/2021/02/Padangusthasana-Big-Toe-Pose-356579-pixahive.jpg',NULL),(52,3,'Bird of Paradise','30초',2,'https://images.pexels.com/photos/7222374/pexels-photo-7222374.jpeg',NULL),(53,3,'Stnding Foot Behind the Head','20초',2,'https://images.pexels.com/photos/7447220/pexels-photo-7447220.jpeg',NULL),(54,3,'Standing Foot to Head','20초',2,'https://pixahive.com/wp-content/uploads/2020/10/Standing-Split-Trivikramasana-166430-pixahive.jpg',NULL),(55,3,'Warrior 1','30초',2,'https://pixahive.com/wp-content/uploads/2021/02/Virabhadrasana-Warrior-Pose-357464-pixahive.jpg',NULL),(56,3,'Warrior 2','30초',2,'https://upload.wikimedia.org/wikipedia/commons/1/1d/Virabhadrasana_II_-_Warrior_II_Pose.jpg',NULL),(57,3,'Warrior 3','30초',2,'https://upload.wikimedia.org/wikipedia/commons/4/45/Virabhadrasana_III_from_back.jpg',NULL),(58,3,'Wide Legged Forward Bend 1','30초',2,'https://images.pexels.com/photos/6454068/pexels-photo-6454068.jpeg',NULL),(59,3,'Boat Pose','30초',3,'https://pixahive.com/wp-content/uploads/2021/02/Navasana-Boat-Pose-356616-pixahive.jpg',NULL),(60,3,'Seated Forward Bend I ','30초',3,'https://pixahive.com/wp-content/uploads/2021/02/Paschimottanasana-Seated-Forward-Bend-357035-pixahive.jpg',NULL),(61,3,'Standing Bow','20초',2,'https://live.staticflickr.com/65535/49381372278_986cf4f598_b.jpg',NULL),(62,3,'Standing Foot Behind the Head','30초',3,'https://live.staticflickr.com/208/500755042_f8965dcb90_b.jpg',NULL),(63,3,'Revolved Bird of Paradise','30초',2,'https://live.staticflickr.com/2875/8862543033_9738f36986_z.jpg',NULL),(64,3,'Forearm Balance','20초',1,'https://live.staticflickr.com/3557/3561388911_3d7b8ebcf4_b.jpg',NULL),(65,3,'Noose','20초',2,'https://live.staticflickr.com/5091/5445768199_5ea47aaa23_b.jpg',NULL);
/*!40000 ALTER TABLE `workouts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-16 17:35:54
