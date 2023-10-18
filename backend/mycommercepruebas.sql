CREATE DATABASE  IF NOT EXISTS `mycommercepruebas` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mycommercepruebas`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: mycommercepruebas
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned NOT NULL,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `imagen` text COLLATE utf8mb4_general_ci NOT NULL,
  `nivel_privilegio` enum('0','1','2') COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '0=bajo, 1=medio, 2=alto',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_id_UNIQUE` (`usuario_id`),
  CONSTRAINT `usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
INSERT INTO `administradores` VALUES (1,68,'Mario Castaneda','','2');
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (4,'Agricultura'),(5,'Alimentos y Bebidas'),(6,'Animales y Mascotas'),(7,'Antigüedades y Colecciones'),(8,'Arte'),(9,'Bebés'),(10,'Belleza'),(11,'Vehículos'),(12,'Teléfonos'),(13,'Computación'),(14,'Construcción'),(15,'Deportes'),(16,'Electrodomésticos'),(17,'Electrónica'),(18,'Herramientas'),(19,'Muebles'),(20,'Industria'),(21,'Inmuebles'),(22,'Instrumentos Musicales'),(23,'Juegos y Juguetes'),(24,'Libros, Revistas y cómics'),(25,'Música, Películas y Series'),(26,'Fiestas'),(27,'Joyería'),(28,'Ropa'),(29,'Servicios'),(30,'Otros');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `usuario_id` int unsigned NOT NULL,
  `nombre` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `imagen` text COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id_idx` (`usuario_id`),
  KEY `usuario_idfk_idx` (`usuario_id`),
  CONSTRAINT `usuario_idfk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='clientes se refiere a cliente de la página, no denota situación de comprador o vendedor';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (16,41,'otroPerroNegro','http://localhost:3000/file-1692124111046.png','2023-08-12 15:13:38','2023-08-15 18:28:31'),(17,42,'otroPerroBlanco','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-13 21:05:05','2023-08-13 21:05:05'),(18,43,'otroPerroNaranja','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-13 21:14:03','2023-08-13 21:14:03'),(19,44,'aguasoso','http://localhost:3000/file-1691962244184.jpg','2023-08-13 21:27:03','2023-08-13 21:30:44'),(20,45,'otroPerroAzul','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-14 20:29:06','2023-08-14 20:29:06'),(21,46,'otroPerroVerde','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-14 20:43:31','2023-08-14 20:43:31'),(22,47,'otroPerroMorado','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-14 21:11:53','2023-08-14 21:11:53'),(23,48,'otroPerr','http://localhost:3000/file-1692050727853.jpeg','2023-08-14 21:23:38','2023-08-14 22:05:27'),(24,49,'otroPerros','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-14 21:37:00','2023-08-14 21:37:00'),(25,50,'tienda123','http://localhost:3000/file-1692485093233.jpg','2023-08-14 22:00:41','2023-08-19 22:44:53'),(26,51,'otroPerro','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-15 01:45:48','2023-08-15 01:45:48'),(27,52,'otroPerrososo','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-15 01:47:30','2023-08-15 01:47:30'),(28,53,'tiendaza','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-15 01:55:22','2023-08-15 01:55:22'),(29,54,'tiendazasosa','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-15 02:00:09','2023-08-15 02:00:09'),(30,55,'Andrew','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-15 18:16:56','2023-08-15 18:16:56'),(31,56,'elpepeetesech','http://localhost:3000/file-1692298155806.jpg','2023-08-17 18:49:09','2023-08-17 18:49:15'),(32,57,'pepinillazo','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-17 20:40:03','2023-08-17 20:40:03'),(33,58,'pepino1234567','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 00:45:26','2023-09-27 01:19:43'),(34,59,'pepinazo','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 01:23:32','2023-09-27 01:23:32'),(35,60,'desactivado','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 01:31:22','2023-09-27 01:31:22'),(36,61,'desactivado1','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 02:02:07','2023-09-27 02:02:07'),(37,62,'editartienda','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 02:39:19','2023-09-27 02:39:19'),(38,63,'pepitaso','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 05:09:19','2023-09-27 05:09:19'),(39,64,'nuevaTienda','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-27 06:18:37','2023-09-27 06:18:37'),(40,65,'nuevopepino','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-30 18:10:58','2023-09-30 18:10:58'),(41,66,'nuevopepino2','http://localhost:3000/file-1696115833258.jpg','2023-09-30 18:13:35','2023-09-30 23:17:13'),(42,67,'tiendaparaadmin','http://localhost:3000/file-1697592042654.jpeg','2023-10-07 22:30:58','2023-10-18 01:20:42'),(43,69,'torpasos','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 19:59:27','2023-10-08 19:59:27'),(44,70,'pepinote','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:18:14','2023-10-08 20:18:14'),(45,71,'pepinazote','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:28:13','2023-10-08 20:28:13'),(46,72,'pepinazote234','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:37:09','2023-10-08 20:37:09'),(47,73,'cabezachoto','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:37:34','2023-10-08 20:37:34'),(48,74,'popiniza','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:45:21','2023-10-08 20:45:21'),(49,75,'tupapaentanga','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:48:38','2023-10-08 20:48:38'),(50,76,'tumamaentanga','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-08 20:49:45','2023-10-08 20:49:45'),(51,77,'potaxios','http://localhost:3000/DefaultProfilePicture.jpeg','2023-10-18 01:23:53','2023-10-18 01:23:53');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones`
--

DROP TABLE IF EXISTS `notificaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `titulo` varchar(90) COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones`
--

LOCK TABLES `notificaciones` WRITE;
/*!40000 ALTER TABLE `notificaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notificaciones_usuarios`
--

DROP TABLE IF EXISTS `notificaciones_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificaciones_usuarios` (
  `notificacion_id` int NOT NULL,
  `usuario_id` int unsigned NOT NULL,
  `status` enum('0','1') COLLATE utf8mb4_general_ci NOT NULL COMMENT '0 = no leido, 1 = leido',
  PRIMARY KEY (`notificacion_id`,`usuario_id`),
  KEY `usuarioid_idx` (`usuario_id`),
  CONSTRAINT `notificacionid` FOREIGN KEY (`notificacion_id`) REFERENCES `notificaciones` (`id`),
  CONSTRAINT `usuarioid` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificaciones_usuarios`
--

LOCK TABLES `notificaciones_usuarios` WRITE;
/*!40000 ALTER TABLE `notificaciones_usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `notificaciones_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,2) unsigned NOT NULL,
  `categoria_id` tinyint unsigned DEFAULT NULL,
  `tienda_id` int unsigned NOT NULL,
  `descripcion` text,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cantidad` int unsigned NOT NULL,
  `status` enum('0','1') NOT NULL COMMENT '0 = activo. 1 = inactivo',
  PRIMARY KEY (`id`),
  KEY `FK_producto_categoria_idx` (`categoria_id`),
  KEY `FK_producto_tienda_idx` (`tienda_id`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`RIF`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (36,'Collares de perros',6.00,17,1252580444,'collares para perros perrones','2023-08-17 15:42:20','2023-08-17 15:42:20',12,'0'),(37,'Caldo de Pollo',999.00,7,1252580444,'Caldo de Pollo Caldo de Pollo Caldo de Pollo Caldo de Pollo Caldo de Pollo','2023-08-17 18:42:25','2023-08-17 20:40:17',11,'0'),(38,'Caldo de pollas',154.00,7,1252580444,'Caldo de pollas Caldo de pollas Caldo de pollas Caldo de pollas Caldo de pollas','2023-08-17 18:44:08','2023-08-18 00:59:35',10,'0'),(39,'Aguas',1234.00,20,123456777,'Aguasasdfasdfas fa sdfasdfa sdfa sdfasdfasdfasdf asd fadf sdf','2023-09-27 02:41:26','2023-09-27 06:36:41',12,'1'),(40,'Agua de mi palo',10.00,7,127001002,'Agua de mi palo Agua de mi palo Agua de mi palo Agua de mi palo Agua de mi palo','2023-09-27 05:27:43','2023-09-27 05:27:43',12,'0'),(41,'Andrés se sse s ese',0.00,4,127001002,'Andrés se sse s ese Andrés se sse s ese Andrés se sse s ese Andrés se sse s ese','2023-09-27 05:40:00','2023-09-27 05:40:00',12,'0'),(42,'el pepe etesech',1.00,4,127001002,'asdf sdfasdfasdf asdf asdfa sdf asdf asdf','2023-09-27 05:57:02','2023-09-27 05:57:02',12,'0');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_imagenes`
--

DROP TABLE IF EXISTS `productos_imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_imagenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `producto_id` int unsigned DEFAULT NULL,
  `ruta` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='las imagenes de cada producto';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_imagenes`
--

LOCK TABLES `productos_imagenes` WRITE;
/*!40000 ALTER TABLE `productos_imagenes` DISABLE KEYS */;
INSERT INTO `productos_imagenes` VALUES (45,36,'http://localhost:3000/file-1692286940636.jpeg'),(46,36,'http://localhost:3000/file-1692286940649.jpg'),(47,36,'http://localhost:3000/file-1692286940651.jpg'),(48,37,'http://localhost:3000/file-1692297745200.jpg'),(49,37,'http://localhost:3000/file-1692297745201.jpg'),(50,37,'http://localhost:3000/file-1692297745202.jpg'),(51,37,'http://localhost:3000/file-1692297745203.jpg'),(52,38,'http://localhost:3000/file-1692297848801.jpg'),(53,38,'http://localhost:3000/file-1692297848824.jpg'),(54,38,'http://localhost:3000/file-1692297848827.jpg'),(55,38,'http://localhost:3000/file-1692297848833.png'),(56,39,'http://localhost:3000/file-1695782486658.jpg'),(57,39,'http://localhost:3000/file-1695782486659.jpg'),(58,39,'http://localhost:3000/file-1695782486663.jpg'),(59,40,'http://localhost:3000/file-1695792463347.jpg'),(60,41,'http://localhost:3000/file-1695793200946.jpg'),(61,42,'http://localhost:3000/file-1695794222075.jpg');
/*!40000 ALTER TABLE `productos_imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regiones`
--

DROP TABLE IF EXISTS `regiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regiones` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regiones`
--

LOCK TABLES `regiones` WRITE;
/*!40000 ALTER TABLE `regiones` DISABLE KEYS */;
INSERT INTO `regiones` VALUES (4,'Amazonas'),(5,'Anzoátegui'),(6,'Apure'),(7,'Aragua'),(8,'Barinas'),(9,'Bolívar'),(10,'Carabobo'),(11,'Cojedes'),(12,'Delta Amacuro'),(13,'Dependencias Federales'),(14,'Distrito Federal'),(15,'Falcón'),(16,'Guárico'),(17,'Lara'),(18,'Mérida'),(19,'Miranda'),(20,'Monagas'),(21,'Nueva Esparta'),(22,'Portuguesa'),(23,'Sucre'),(24,'Táchira'),(25,'Trujillo'),(26,'Vargas'),(27,'Yaracuy'),(28,'Zulia');
/*!40000 ALTER TABLE `regiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiendas`
--

DROP TABLE IF EXISTS `tiendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiendas` (
  `RIF` int unsigned NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `imagen` text NOT NULL,
  `status` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '''0'' = En espera. ''1'' = Aceptada. ''2'' = Eliminada/Baneada',
  `cliente_id` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descripcion` text NOT NULL,
  `saldo` decimal(10,2) NOT NULL,
  PRIMARY KEY (`RIF`),
  KEY `cliente_id_idx` (`cliente_id`),
  CONSTRAINT `cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiendas`
--

LOCK TABLES `tiendas` WRITE;
/*!40000 ALTER TABLE `tiendas` DISABLE KEYS */;
INSERT INTO `tiendas` VALUES (109284659,'el pepe ete sech potaxio','http://localhost:3000/file-1697592126182.jpg','1',42,'2023-10-18 01:22:06','2023-10-18 01:27:25','el pepe ete sech potaxio el pepe ete sech potaxio el pepe ete sech potaxio el pepe ete sech potaxio el pepe ete sech potaxio',0.00),(111111110,'Tienda de Drogas','http://localhost:3000/file-1692124564806.jpg','1',16,'2023-08-15 18:36:04','2023-10-08 19:14:17','Tienda de Drogas es una tienda que se encarga de vender drogas',0.00),(123456666,'tienda desactivada','http://localhost:3000/file-1695778415637.jpg','1',35,'2023-09-27 01:33:35','2023-10-08 19:20:49','tienda desactivada tienda desactivada tienda desactivada tienda desactivada',0.00),(123456777,'Tienda a editar','http://localhost:3000/file-1695782383459.jpg','2',37,'2023-09-27 02:39:43','2023-09-27 06:36:41','Tienda a editar Tienda a editar Tienda a editar Tienda a editar',0.00),(123456789,'andresblade','http://localhost:3000/file-1696100492521.jpg','2',40,'2023-09-30 19:01:32','2023-09-30 23:04:49','asdf asdfasdfasdf asdfasdfas asdf asdf asdf sdf asdf asd',0.00),(124141242,'Aguas del desierto','http://localhost:3000/file-1692298185839.jpg','1',31,'2023-08-17 18:49:45','2023-10-08 19:20:59','Aguas del desierto Aguas del desierto Aguas del desierto Aguas del desierto Aguas del desierto',0.00),(125258014,'Tienda de perros','http://localhost:3000/file-1692064223148.jpg','2',27,'2023-08-15 01:50:23','2023-10-08 19:45:55','La mejor tienda de perros del mundo',0.00),(127001001,'Andrés Arrieche ','http://localhost:3000/file-1695791383797.jpg','2',38,'2023-09-27 05:09:43','2023-09-27 05:15:43','Andrés Arrieche  Andrés Arrieche  Andrés Arrieche  Andrés Arrieche  Andrés Arrieche ',0.00),(127001002,'Cesar martinez','http://localhost:3000/file-1695791408863.jpg','1',38,'2023-09-27 05:10:08','2023-09-27 05:10:08','Cesar martinez Cesar martinez Cesar martinez Cesar martinez',0.00),(127127178,'tu puta madre','http://localhost:3000/file-1695795565432.jpg','1',39,'2023-09-27 06:19:25','2023-09-27 06:25:18',' tu hermanda tu hermanda tu hermanda tu hermanda',0.00),(128000111,'andresblade','http://localhost:3000/file-1695794251677.jpg','1',38,'2023-09-27 05:57:31','2023-09-27 05:57:31','fasd fasd fasdfasdfasdf adf asdfasdf sdfsdfsadfa sf asdfa',0.00),(140140140,'rose mary','http://localhost:3000/file-1695796679674.png','2',37,'2023-09-27 06:37:32','2023-10-08 20:03:09','te pintaron pajaritos en el aire. no se q i te lo creiste',0.00),(282828282,'paraguas de dios','http://localhost:3000/file-1696795434302.jpg','1',37,'2023-10-08 20:03:54','2023-10-08 20:06:49','paraguas de diosparaguas de diosparaguas de diosparaguas de diosparaguas de diosparaguas de diosparaguas de diosparaguas de diosparaguas de dios',0.00),(659659679,'nuevopepino','http://localhost:3000/file-1696101604372.jpg','2',40,'2023-09-30 19:19:26','2023-09-30 23:04:49','Esta es una descripción real y verídica de los sucesos que me ocurrieron a causa de la caida de chavez',0.00),(700100200,'asdff a ad adf asdf df s fa','http://localhost:3000/file-1692210671268.jpg','1',25,'2023-08-16 18:31:11','2023-10-08 19:51:08','asdff a ad adf asdf df s fa asdff a ad adf asdf df s fa asdff a ad adf asdf df s fa',0.00),(700100204,'asdff a ad adf asdf df s fa','http://localhost:3000/file-1692210955306.jpg','2',25,'2023-08-16 18:35:55','2023-10-08 19:52:39','asdff a ad adf asdf df s fa asdff a ad adf asdf df s fa asdff a ad adf asdf df s fa',0.00),(800900100,'Agua de mojas morines campeones','http://localhost:3000/file-1692210170951.jpg','1',25,'2023-08-16 18:22:51','2023-10-08 19:52:49','Agua de mojas morines campeones Agua de mojas morines campeones Agua de mojas morines campeones',0.00),(999999999,'Tienda de venta de compras','http://localhost:3000/file-1692124941146.jpg','1',16,'2023-08-15 18:42:21','2023-10-08 19:52:41','Tienda de venta de compras es algo que no sirve para nada',0.00),(1252580443,'Tienda de perros','http://localhost:3000/file-1692123486460.jpg','1',30,'2023-08-15 18:18:06','2023-10-08 19:52:42','La mejor tienda de perros del mundo',0.00),(1252580444,'Tienda de perros','http://localhost:3000/file-1692052236676.jpg','2',25,'2023-08-14 22:30:36','2023-10-08 19:52:43','La mejor tienda de perros del mundo',1307.00),(1929394957,'el pepe ete sech potaxio potaxioso','http://localhost:3000/file-1697592190807.jpg','1',42,'2023-10-18 01:23:10','2023-10-18 01:27:19','el pepe ete sech potaxio el pepe ete sech potaxio el pepe ete sech potaxio',0.00);
/*!40000 ALTER TABLE `tiendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiendas_regiones`
--

DROP TABLE IF EXISTS `tiendas_regiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiendas_regiones` (
  `tienda_id` int unsigned NOT NULL,
  `region_id` int unsigned NOT NULL,
  PRIMARY KEY (`tienda_id`,`region_id`),
  KEY `tienda_id` (`tienda_id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `tiendas_regiones_ibfk_2` FOREIGN KEY (`region_id`) REFERENCES `regiones` (`id`),
  CONSTRAINT `tiendas_regiones_ibfk_3` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`RIF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiendas_regiones`
--

LOCK TABLES `tiendas_regiones` WRITE;
/*!40000 ALTER TABLE `tiendas_regiones` DISABLE KEYS */;
INSERT INTO `tiendas_regiones` VALUES (109284659,15),(109284659,19),(111111110,15),(111111110,22),(123456666,15),(123456666,20),(123456789,15),(123456789,19),(124141242,15),(124141242,21),(125258014,8),(125258014,17),(125258014,18),(127001001,15),(127001001,20),(127001002,15),(127001002,22),(127127178,15),(128000111,15),(128000111,22),(140140140,15),(282828282,15),(282828282,20),(659659679,15),(700100200,15),(700100200,23),(700100204,15),(700100204,23),(800900100,15),(800900100,20),(999999999,15),(999999999,28),(1252580443,8),(1252580443,17),(1252580443,18),(1252580444,8),(1252580444,17),(1252580444,18),(1929394957,15),(1929394957,19);
/*!40000 ALTER TABLE `tiendas_regiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `correo` varchar(250) NOT NULL,
  `contrasenna` varchar(60) NOT NULL,
  `tipo_id` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1','2') NOT NULL COMMENT '0 = activo. 1 = inactivo. 2 = baneado',
  PRIMARY KEY (`id`),
  KEY `FK_usuario_tipo_idx` (`tipo_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `usuarios_tipos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (41,'otroPerroNegro@gmail.com','$2a$10$6DNdDuIG5IU93YzasRcZSeZji3ez8KYVvIuoUrTWzFW3d0uOT.0bC',1,'2023-08-12 15:13:38','2023-08-12 15:13:38','0'),(42,'otroPerroBlanco@gmail.com','$2a$10$QCrONrVtc7742.OevR/N3O6PV3xcDrsOp.nzsxHusZDzLZFriz1tC',1,'2023-08-13 21:05:05','2023-08-13 21:05:05','0'),(43,'otroPerroNaranja@gmail.com','$2a$10$W.ASTJvC8VR7TQ4pHXpbmuI9ASq5sgwp3/c5cHMMSEnT4BpKEPukK',1,'2023-08-13 21:14:03','2023-08-13 21:14:03','0'),(44,'aguasoso@gmail.com','$2a$10$nAHyu30xpf15rsXKTbWSauV0IY24dRm8L3o7xXiBgrcHy9cuzsani',1,'2023-08-13 21:27:03','2023-08-13 21:27:03','0'),(45,'otroPerroAzul@gmail.com','$2a$10$wQalWp6MOM5oakxXSDAKcOSBUqwJN46LmtOsJMwy3C9FI1hO/zsva',1,'2023-08-14 20:29:06','2023-08-14 20:29:06','0'),(46,'otroPerroVerde@gmail.com','$2a$10$j/c5TqcVM4HzBITRqXcbyevWBZ63rdL1/P55ry0ZIIe/JjN6XOMAu',1,'2023-08-14 20:43:30','2023-08-14 20:43:30','0'),(47,'otroPerroMorado@gmail.com','$2a$10$lY.9sZz0mE.0jw5PysPqWuqqa3QQTi1FljCF0nuB1vsQZWcjAk3I.',1,'2023-08-14 21:11:53','2023-08-14 21:11:53','0'),(48,'otroPerr@gmail.com','$2a$10$ikS0FqupHO3w8Agr2ua/D.1IVMrYlVlv0y6kZMooD.StcoLPlmD52',1,'2023-08-14 21:23:38','2023-08-14 21:23:38','0'),(49,'otrosPerro@gmail.com','$2a$10$YBO9bXIWOLxNlaVgH/.ZTe3iZFaDmqn4dPgfjT8gvyhOU7Mu8GHyC',1,'2023-08-14 21:37:00','2023-08-14 21:37:00','0'),(50,'tienda12345@gmail.com','$2a$10$gao9jt33gbzI7DQENWyRg.cwMJgZgxIfp.8VO8xxs0MRnmtbfPdJe',1,'2023-08-14 22:00:41','2023-09-27 00:12:19','0'),(51,'otroPerro@gmail.com','$2a$10$WOuYB4UNVOHqqGmrLk9IWO/EZWfooAL2g3V7sEizi5InT/PKQgt9a',1,'2023-08-15 01:45:48','2023-08-15 01:45:48','0'),(52,'otroPerrososo@gmail.com','$2a$10$SbwlWrCmenY35YYP/am05.cDW9SHYGA1FUKQR1pz3ivWXu/suOrfS',1,'2023-08-15 01:47:30','2023-08-15 01:47:30','0'),(53,'tiendaza@gmail.com','$2a$10$A6/5VBB/wtAqdmDdUHN.juM22QUYkyfqYwkAruobBfP5qRgx3svTO',1,'2023-08-15 01:55:22','2023-08-15 01:55:22','0'),(54,'tiendazasosa@gmail.com','$2a$10$ANXMW7WE5WGqB8u6Tc3uXeJaNU0je.iMdSgJSLV46xJ24p8KKaSJu',1,'2023-08-15 02:00:09','2023-08-15 02:00:09','0'),(55,'Andrew@gmail.com','$2a$10$L.7AFu244tZLjeHOjLqcE.vbtwC3.P7kzYU/.xKj2.a8HS/9d3yd6',1,'2023-08-15 18:16:56','2023-08-15 18:16:56','0'),(56,'elpepeetesech@gmail.com','$2a$10$XkQU/aRbDlStzH1.grTTjuECyA5Xu/s6WjTAwuxdCsVwHsw5eHuk.',1,'2023-08-17 18:49:09','2023-08-17 18:49:09','0'),(57,'pepinillazo@gmail.com','$2a$10$tVg4xIJTp/5bgVv.hS4LduURJyHe45IukdwqAdIGvU0qOMTu0OTEe',1,'2023-08-17 20:40:03','2023-09-23 22:42:28','0'),(58,'pepino123@gmail.com','$2a$10$3DRBNw32J7/wEgx6yZMn6uKZrPYxCOmNpynuz.nmT/AS4nTg7D4Iy',1,'2023-09-27 00:45:26','2023-09-27 00:45:30','0'),(59,'pepinazo@gmail.com','$2a$10$p6ebXv.1sMrCPkP6Mo8L9.C6K5I0IbH4yWFTF9JuxWEb0wW2kqdiG',1,'2023-09-27 01:23:32','2023-09-27 01:30:26','1'),(60,'desactivado@gmail.com','$2a$10$wuM/69hHeqycanNIXeY4s..Nfc8MrXcmWDS9FUQravq6IEU0nUSXC',1,'2023-09-27 01:31:22','2023-09-27 01:31:59','1'),(61,'desactivado1@gmail.com','$2a$10$vChim8R2Lf.nAyhtktF58.kqUYjDGdF0bTwyZGeEWrJ/9SQSYog22',1,'2023-09-27 02:02:07','2023-09-27 02:03:40','1'),(62,'editartienda@gmail.com','$2a$10$Cu8Do6Moym4hsA2SGMV49uWMUkMI5s8hjdZnZNTM9/RfA7U.epnra',1,'2023-09-27 02:39:19','2023-09-27 02:39:19','0'),(63,'pepitasos@gmail.com','$2a$10$vA5j5mdRclHc39rVizdou.pfG.PnNQHSOIx4Ru8Q.DxoozYSIlbnS',1,'2023-09-27 05:09:19','2023-09-27 05:28:10','0'),(64,'nuevaTienda@gmail.com','$2a$10$r7gySvKf90skZGOrz661OO4YRX5kAsGQQwj1nxskYaZQ.OxlTikm2',1,'2023-09-27 06:18:37','2023-09-27 06:18:37','0'),(65,'nuevopepino@gmail.com','$2a$10$lZGJv1NNcB.yReGqVMjUIOWTmVtuCI6Pc.a7Api/BGDT1vV3t1eKa',1,'2023-09-30 18:10:58','2023-09-30 23:04:49','1'),(66,'nuevopepino2@gmail.com','$2a$10$yqGGK38smuAkNVJDL45/e.e.mc0mBupNg1Isw5keduZF5BpUPL6Gy',1,'2023-09-30 18:13:35','2023-09-30 18:13:35','0'),(67,'tiendaparaadmin@gmail.com','$2a$10$ZQvoccigKbYnsnbF2VH9dehn4j9p0EC2fJSwdlSg/1JDntXRv9oNa',1,'2023-10-07 22:30:58','2023-10-07 22:30:58','0'),(68,'tiendaparaadmin2@gmail.com','$2a$10$ZQvoccigKbYnsnbF2VH9dehn4j9p0EC2fJSwdlSg/1JDntXRv9oNa',2,'2023-10-07 22:30:58','2023-10-07 22:30:58','0'),(69,'torpasos@gmail.com','$2a$10$x3/uTzUBFdhEvLFO1NDtJ.BDEDhnsYQsgw/WOME99rXcO.OGmk1Lu',1,'2023-10-08 19:59:27','2023-10-08 19:59:27','0'),(70,'pepinote@gmail.coom','$2a$10$qfnEDw9ahpbBeP7pJu.wfOYRacfgd/UfS3kcGuV7o3mu3GLtRuxCu',1,'2023-10-08 20:18:14','2023-10-08 20:18:14','0'),(71,'pepinazote@gmail.com','$2a$10$k9th353AfkU1Rl2z9YdlLeyqBvmysGA9XffDC2wk7jXq573sif3Ii',1,'2023-10-08 20:28:13','2023-10-08 20:28:13','0'),(72,'pepinazote234@gmail.com','$2a$10$454YUjoxr/m/1tu3WMlj/OKWr7kBGN74D7H2KH1GIrfxwyWlULe/m',1,'2023-10-08 20:37:09','2023-10-08 20:37:09','0'),(73,'cabezachoto@gmail.com','$2a$10$UaHUPI241.m1BT05H/Kwr.tVdFzb2kVE62KjddQx/4x2Q7u8wlta2',1,'2023-10-08 20:37:34','2023-10-08 20:37:34','0'),(74,'popiniza@gmail.com','$2a$10$sG//au27OVwCpwuLSyAJQexanJ2aYteAkjCXwsTbaljvQSU28cwAS',1,'2023-10-08 20:45:21','2023-10-08 20:45:21','0'),(75,'tupapaentanga@gmail.com','$2a$10$0mYKfV8DnLlT0VJzJGPid.23g.VVl5e5x5wPNyXUpwM34QYa6cDLu',1,'2023-10-08 20:48:38','2023-10-08 20:48:38','0'),(76,'tumamaentanga@gmail.com','$2a$10$yDNV4XRlBkbyxOXcqV9cHuNn6sZ1.4VvlE9flbpDxHQREj2e0phJG',1,'2023-10-08 20:49:45','2023-10-08 20:49:45','0'),(77,'potaxios@gmail.com','$2a$10$gGGEeDt81VYaeOCoHv9fPO0xwHv5vvpLaHCaZo.89.7dNUiVZHdgm',1,'2023-10-18 01:23:53','2023-10-18 01:23:53','0');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_tipos`
--

DROP TABLE IF EXISTS `usuarios_tipos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_tipos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_tipos`
--

LOCK TABLES `usuarios_tipos` WRITE;
/*!40000 ALTER TABLE `usuarios_tipos` DISABLE KEYS */;
INSERT INTO `usuarios_tipos` VALUES (1,'CLIENTE'),(2,'ADMINISTRADOR');
/*!40000 ALTER TABLE `usuarios_tipos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_cabeceras`
--

DROP TABLE IF EXISTS `ventas_cabeceras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas_cabeceras` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cliente_idfk_idx` (`cliente_id`),
  KEY `cliente_idfkfk_idx` (`cliente_id`),
  CONSTRAINT `cliente_idfkfk` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3 COMMENT='Cabecera de ventas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_cabeceras`
--

LOCK TABLES `ventas_cabeceras` WRITE;
/*!40000 ALTER TABLE `ventas_cabeceras` DISABLE KEYS */;
INSERT INTO `ventas_cabeceras` VALUES (61,32,'2023-08-17 20:40:17','2023-08-17 20:40:17'),(62,32,'2023-08-17 20:50:40','2023-08-17 20:50:40'),(63,32,'2023-08-18 00:59:35','2023-08-18 00:59:35');
/*!40000 ALTER TABLE `ventas_cabeceras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas_detalles`
--

DROP TABLE IF EXISTS `ventas_detalles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas_detalles` (
  `producto_id` int unsigned NOT NULL,
  `ventas_cabecera_id` int NOT NULL,
  `cantidad` int unsigned NOT NULL,
  `precio` decimal(10,2) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`producto_id`,`ventas_cabecera_id`),
  KEY `FK_ventasdet_producto_idx` (`producto_id`),
  KEY `ventas_cabeceras_id_idx` (`ventas_cabecera_id`),
  CONSTRAINT `ventas_cabeceras_id` FOREIGN KEY (`ventas_cabecera_id`) REFERENCES `ventas_cabeceras` (`id`),
  CONSTRAINT `ventas_detalles_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_detalles`
--

LOCK TABLES `ventas_detalles` WRITE;
/*!40000 ALTER TABLE `ventas_detalles` DISABLE KEYS */;
INSERT INTO `ventas_detalles` VALUES (37,61,1,999.00,'2023-08-17 20:40:17','2023-08-17 20:40:17'),(38,62,1,154.00,'2023-08-17 20:50:40','2023-08-17 20:50:40'),(38,63,1,154.00,'2023-08-18 00:59:35','2023-08-18 00:59:35');
/*!40000 ALTER TABLE `ventas_detalles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-17 21:38:13
