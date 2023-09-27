CREATE DATABASE  IF NOT EXISTS `mycommercepruebas` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mycommercepruebas`;
-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mycommercepruebas
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

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
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nivel_privilegio` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0' COMMENT '0=bajo, 1=medio, 2=alto',
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
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `imagen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `usuario_id_idx` (`usuario_id`),
  KEY `usuario_idfk_idx` (`usuario_id`),
  CONSTRAINT `usuario_idfk` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='clientes se refiere a cliente de la página, no denota situación de comprador o vendedor';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (16,41,'Torpasio','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-22 00:02:32','2023-09-22 04:14:46'),(17,42,'Torpas1','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-25 06:35:01','2023-08-25 06:35:01'),(18,43,'Torpas2','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-25 06:35:52','2023-08-25 06:35:52'),(19,44,'Torpas3','http://localhost:3000/DefaultProfilePicture.jpeg','2023-08-29 02:22:30','2023-08-29 02:22:30'),(20,45,'desactivate','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-22 04:31:10','2023-09-22 04:31:10'),(21,46,'user','http://localhost:3000/DefaultProfilePicture.jpeg','2023-09-25 03:11:28','2023-09-25 03:11:28');
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
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `titulo` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '0 = no leido, 1 = leido',
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (37,'Ropa de perro',3.00,17,3040511000,'Ah saber q es','2023-08-25 06:18:28','2023-08-25 06:18:28',12,'0'),(38,'eliminar producto 1 tienda 1',3.00,17,102945349,'Eliminar esta mierda','2023-09-25 03:14:12','2023-09-25 03:23:44',12,'1'),(39,'eliminar producto 2 tienda 1',3.00,17,102945349,'Eliminar esta mierda 2','2023-09-25 03:14:32','2023-09-25 03:23:44',12,'1'),(40,'eliminar producto 1 tienda 2',3.00,17,202945349,'Eliminar esta mierda 1.2','2023-09-25 03:14:46','2023-09-25 03:23:44',12,'1'),(41,'eliminar producto 2 tienda 2',3.00,17,202945349,'Eliminar esta mierda 2.2','2023-09-25 03:15:05','2023-09-25 03:23:44',12,'1'),(42,'eliminar producto 1 tienda 3',3.00,17,302945349,'Eliminar esta mierda 1.3','2023-09-26 20:14:15','2023-09-26 20:18:30',12,'1'),(43,'eliminar producto 2 tienda 3',3.00,17,302945349,'Eliminar esta mierda 2.3','2023-09-26 20:14:28','2023-09-26 20:18:30',12,'1'),(44,'eliminar producto 3 tienda 3',3.00,17,302945349,'Eliminar esta mierda 3.3','2023-09-26 20:14:34','2023-09-26 20:18:30',12,'1');
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
  `ruta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `producto_id` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='las imagenes de cada producto';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_imagenes`
--

LOCK TABLES `productos_imagenes` WRITE;
/*!40000 ALTER TABLE `productos_imagenes` DISABLE KEYS */;
INSERT INTO `productos_imagenes` VALUES (45,37,'http://localhost:3000/file-1692944308381.png'),(46,37,'http://localhost:3000/file-1692944308560.png'),(47,37,'http://localhost:3000/file-1692944308566.png'),(48,37,'http://localhost:3000/file-1692944308568.png'),(49,38,'http://localhost:3000/file-1695611652195.png'),(50,38,'http://localhost:3000/file-1695611652207.jpg'),(51,38,'http://localhost:3000/file-1695611652209.jpg'),(52,38,'http://localhost:3000/file-1695611652211.jpg'),(53,39,'http://localhost:3000/file-1695611672817.png'),(54,39,'http://localhost:3000/file-1695611672825.jpg'),(55,39,'http://localhost:3000/file-1695611672826.jpg'),(56,39,'http://localhost:3000/file-1695611672827.jpg'),(57,40,'http://localhost:3000/file-1695611686663.png'),(58,40,'http://localhost:3000/file-1695611686694.jpg'),(59,40,'http://localhost:3000/file-1695611686714.jpg'),(60,40,'http://localhost:3000/file-1695611686725.jpg'),(61,41,'http://localhost:3000/file-1695611705855.png'),(62,41,'http://localhost:3000/file-1695611705857.jpg'),(63,41,'http://localhost:3000/file-1695611705858.jpg'),(64,41,'http://localhost:3000/file-1695611705860.jpg'),(65,42,'http://localhost:3000/file-1695759255509.png'),(66,42,'http://localhost:3000/file-1695759255512.jpg'),(67,42,'http://localhost:3000/file-1695759255513.jpg'),(68,42,'http://localhost:3000/file-1695759255521.jpg'),(69,43,'http://localhost:3000/file-1695759268121.png'),(70,43,'http://localhost:3000/file-1695759268123.jpg'),(71,43,'http://localhost:3000/file-1695759268124.jpg'),(72,43,'http://localhost:3000/file-1695759268128.jpg'),(73,44,'http://localhost:3000/file-1695759274172.png'),(74,44,'http://localhost:3000/file-1695759274178.jpg'),(75,44,'http://localhost:3000/file-1695759274179.jpg'),(76,44,'http://localhost:3000/file-1695759274185.jpg');
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
INSERT INTO `tiendas` VALUES (102945349,'Eliminar1','http://localhost:3000/file-1695611579962.png','2',21,'2023-09-25 03:13:00','2023-09-25 03:23:44','eliminar esta tienda numero 1',0.00),(202945349,'Eliminar2','http://localhost:3000/file-1695611590981.png','2',21,'2023-09-25 03:13:10','2023-09-25 03:23:44','eliminar esta tienda numero 2',0.00),(302945349,'No eliminar','http://localhost:3000/file-1695764169108.png','2',16,'2023-09-26 20:13:43','2023-09-26 21:36:09','Esta tienda ya no se elimina',0.00),(3040511000,'Grows','http://localhost:3000/file-1692944179528.png','0',16,'2023-08-25 06:16:19','2023-08-25 06:16:19','Tienda de moda de alta calidad ',0.00);
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
INSERT INTO `tiendas_regiones` VALUES (102945349,8),(102945349,17),(102945349,18),(202945349,8),(202945349,17),(202945349,18),(302945349,8),(302945349,17),(302945349,18),(3040511000,8),(3040511000,17),(3040511000,18);
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (41,'Torpasio@gmail.com','$2a$10$5.5k71CWWJAAg2WlODlpTOf8xMshWSgeqNzdIwt1PoqGb/jyn93z2',1,'2023-08-22 00:02:32','2023-09-22 04:25:59','0'),(42,'Torpas1@gmail.com','$2a$10$579DIKOoVCs4xL6sgSbCTu7DHodeIrXPbjncnquGXR32It4ThhRjy',1,'2023-08-25 06:35:01','2023-08-25 06:35:01','0'),(43,'Torpas2@gmail.com','$2a$10$WPKbyIPSALTgmJFdmXqiVu5jHD41Z24o5JyKaF6GKhcoIVdhT0zxW',1,'2023-08-25 06:35:52','2023-08-25 06:35:52','0'),(44,'Torpas3@gmail.com','$2a$10$JCwPfaGzL6o6kNE1F1PaQeMEva4Jei8/6YcmfxUG1d4Cva4S9DQPu',1,'2023-08-29 02:22:30','2023-08-29 02:22:30','0'),(45,'desactivate@gmail.com','$2a$10$W/zoN5cNv6BJ5VlUuQBcnO6nMJQxHM0pmen3YLQWw24u2C1HJ3f7O',1,'2023-09-22 04:31:10','2023-09-22 04:35:07','1'),(46,'user@gmail.com','$2a$10$olkzPP2NzM8n6294PPT6kOeKAgJy1CY4POfDLd6PvyPm.W9T39Hom',1,'2023-09-25 03:11:28','2023-09-25 03:23:44','1');
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
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3 COMMENT='Cabecera de ventas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_cabeceras`
--

LOCK TABLES `ventas_cabeceras` WRITE;
/*!40000 ALTER TABLE `ventas_cabeceras` DISABLE KEYS */;
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

-- Dump completed on 2023-09-26 21:33:20
