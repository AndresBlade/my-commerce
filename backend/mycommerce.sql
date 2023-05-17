-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3366
-- Tiempo de generación: 17-05-2023 a las 05:04:59
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mycommerce`
--
CREATE DATABASE IF NOT EXISTS `mycommerce` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `mycommerce`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

DROP TABLE IF EXISTS `categorias`;
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `descripcion`) VALUES
(4, 'Agricultura'),
(5, 'Alimentos y Bebidas'),
(6, 'Animales y Mascotas'),
(7, 'Antigüedades y Colecciones'),
(8, 'Arte'),
(9, 'Bebés'),
(10, 'Belleza'),
(11, 'Vehículos'),
(12, 'Teléfonos'),
(13, 'Computación'),
(14, 'Construcción'),
(15, 'Deportes'),
(16, 'Electrodomésticos'),
(17, 'Electrónica'),
(18, 'Herramientas'),
(19, 'Muebles'),
(20, 'Industria'),
(21, 'Inmuebles'),
(22, 'Instrumentos Musicales'),
(23, 'Juegos y Juguetes'),
(24, 'Libros, Revistas y cómics'),
(25, 'Música, Películas y Series'),
(26, 'Fiestas'),
(27, 'Joyería'),
(28, 'Ropa'),
(29, 'Servicios'),
(30, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL,
  `categoria_id` tinyint(3) UNSIGNED DEFAULT NULL,
  `tienda_id` int(10) UNSIGNED NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagenes` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_producto_categoria_idx` (`categoria_id`),
  KEY `FK_producto_tienda_idx` (`tienda_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `categoria_id`, `tienda_id`, `descripcion`, `imagenes`, `createdAt`, `updatedAt`) VALUES
(14, 'Shorts', '8.00', 28, 30178530, 'Short individual unicolor con cuerda de ajuste y doble bolsillo', 'http://localhost:3000/file-1684290854488.png http://localhost:3000/file-1684290854494.png http://localhost:3000/file-1684290854508.png http://localhost:3000/file-1684290854518.png', '2023-05-17 02:34:14', '2023-05-17 02:34:14'),
(15, 'Conjunto Short Camisa', '20.00', 28, 30178530, 'Short estampado con paisajes junto con camisa blanca de Grows', 'http://localhost:3000/file-1684290980569.png http://localhost:3000/file-1684290980575.png http://localhost:3000/file-1684290980587.png', '2023-05-17 02:36:20', '2023-05-17 02:36:20'),
(16, 'Intel Core I3th ', '65.00', 13, 30405110, ' 10th Generation Intel Core i3 Processor - 4 Cores; 8 Threads - 4.30 GHz Max Turbo Frequency, 3.60 GHz Processor Base Frequency - 6 MB Intel Smart Cache', 'http://localhost:3000/file-1684291354642.jpg', '2023-05-17 02:42:34', '2023-05-17 02:42:34'),
(17, 'OLOy DDR4 RAM', '45.00', 13, 30405110, 'DDR4 2x8GB UDIMM, total 16 GB - Frequency : 3200 MHz CL16-20-20-38 - 1.35V UDIMM (Intel XMP 2.0 Automated Overclocking Technology) - Lifetime Warranty - Compatible with Intel and AMD', 'http://localhost:3000/file-1684291416682.jpg', '2023-05-17 02:43:36', '2023-05-17 02:43:36'),
(18, 'Race Mouse Bungee', '15.00', 13, 30405110, 'Soporte para cable de Mouse', 'http://localhost:3000/file-1684291474634.jpg', '2023-05-17 02:44:34', '2023-05-17 02:44:34'),
(19, 'Aretes Roach', '1000.00', 27, 30266948, 'Aretes con forma de esposas de plata', 'http://localhost:3000/file-1684292010423.png', '2023-05-17 02:53:30', '2023-05-17 02:53:30'),
(20, 'Anillo Don Roach', '500.00', 27, 30266948, 'Anillo clásico de plata Don Roach', 'http://localhost:3000/file-1684292053177.jpg', '2023-05-17 02:54:13', '2023-05-17 02:54:13'),
(21, 'Dije Solitario', '800.00', 27, 30266948, 'Dije solitario de plata Don Roach', 'http://localhost:3000/file-1684292126654.png', '2023-05-17 02:55:26', '2023-05-17 02:55:26'),
(22, 'Toyota Hilux', '10000.00', 11, 30396149, 'Toyota Hilux 2021 Motor 3.5L alta revolución', 'http://localhost:3000/file-1684292401109.jpg', '2023-05-17 03:00:01', '2023-05-17 03:00:01'),
(23, 'Toyota Fortuner', '15000.00', 11, 30396149, 'Toyota Fortuner 5 asientos 4 puertas techo descapotable', 'http://localhost:3000/file-1684292449515.jpg', '2023-05-17 03:00:49', '2023-05-17 03:00:49'),
(24, 'Toyota Ford Runner', '20000.00', 11, 30396149, 'Toyota Ford runner edición especial con 3 cauchos de repuesto', 'http://localhost:3000/file-1684292489533.jpg', '2023-05-17 03:01:29', '2023-05-17 03:01:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

DROP TABLE IF EXISTS `regiones`;
CREATE TABLE IF NOT EXISTS `regiones` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `regiones`
--

INSERT INTO `regiones` (`id`, `descripcion`) VALUES
(4, 'Amazonas'),
(5, 'Anzoátegui'),
(6, 'Apure'),
(7, 'Aragua'),
(8, 'Barinas'),
(9, 'Bolívar'),
(10, 'Carabobo'),
(11, 'Cojedes'),
(12, 'Delta Amacuro'),
(13, 'Dependencias Federales'),
(14, 'Distrito Federal'),
(15, 'Falcón'),
(16, 'Guárico'),
(17, 'Lara'),
(18, 'Mérida'),
(19, 'Miranda'),
(20, 'Monagas'),
(21, 'Nueva Esparta'),
(22, 'Portuguesa'),
(23, 'Sucre'),
(24, 'Táchira'),
(25, 'Trujillo'),
(26, 'Vargas'),
(27, 'Yaracuy'),
(28, 'Zulia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas`
--

DROP TABLE IF EXISTS `tiendas`;
CREATE TABLE IF NOT EXISTS `tiendas` (
  `RIF` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `imagen` text NOT NULL,
  `status` enum('0','1','2','3') NOT NULL DEFAULT '0' COMMENT '''0'' = En espera. ''1'' = Aceptada. ''2'' = Rechazada. ''3'' = Eliminada/Baneada',
  `cliente_id` int(11) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `descripcion` text NOT NULL,
  PRIMARY KEY (`RIF`),
  KEY `cliente_id` (`cliente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`RIF`, `nombre`, `imagen`, `status`, `cliente_id`, `createdAt`, `updatedAt`, `descripcion`) VALUES
(30178530, 'Grows', 'http://localhost:3000/file-1684290716409.jpg', '0', 18, '2023-05-17 02:31:56', '2023-05-17 02:31:56', 'Vendemos shorts y camisas al por menor'),
(30266948, 'Don Roach', 'http://localhost:3000/file-1684291861560.jpg', '0', 19, '2023-05-17 02:51:01', '2023-05-17 02:51:01', 'Tienda dedicada a la venta de joyería y productos de alhaja'),
(30396149, 'IUJOCars', 'http://localhost:3000/file-1684292300246.jpg', '0', 19, '2023-05-17 02:58:20', '2023-05-17 02:58:20', 'Nos dedicamos a la venta de vehiculos de primera calidad y años recientes'),
(30405110, 'MiGolilla', 'http://localhost:3000/file-1684290503712.png', '0', 18, '2023-05-17 02:28:23', '2023-05-17 02:28:23', 'Venta de aparatos electrónicos, gadgets y accesorios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas_regiones`
--

DROP TABLE IF EXISTS `tiendas_regiones`;
CREATE TABLE IF NOT EXISTS `tiendas_regiones` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `tienda_id` int(10) UNSIGNED NOT NULL,
  `region_id` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tienda_id` (`tienda_id`),
  KEY `region_id` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasenna` varchar(60) NOT NULL,
  `imagen` text DEFAULT NULL,
  `tipo_id` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  KEY `FK_usuario_tipo_idx` (`tipo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasenna`, `imagen`, `tipo_id`, `createdAt`, `updatedAt`) VALUES
(18, 'tienda123', 'tienda123@gmail.com', '$2b$10$tVKj2UHCsSnNQTPrqv4jlOuJBoRn4CjPhpY1qhhPjPpaESJ5RY.S2', 'http://localhost:3000/file-1684291276057.jpg', 2, '2023-05-17 02:24:38', '2023-05-17 02:41:16'),
(19, 'joyeria123', 'joyeria123@gmail.com', '$2b$10$/CcdVeJIhTYyt/VHfSdZe.GlXdG9EVCgDPDpj8Gv34ykAF9vBBXge', 'http://localhost:3000/file-1684291715670.jpg', 2, '2023-05-17 02:47:27', '2023-05-17 02:58:20'),
(20, 'usuario123', 'usuario123@gmail.com', '$2b$10$OmMGz226v0efsx8M7SnC6unBzazNAajbiB2fm7ZrDkH3fLAbFA8mm', NULL, 1, '2023-05-17 03:03:07', '2023-05-17 03:03:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tipos`
--

DROP TABLE IF EXISTS `usuarios_tipos`;
CREATE TABLE IF NOT EXISTS `usuarios_tipos` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios_tipos`
--

INSERT INTO `usuarios_tipos` (`id`, `descripcion`) VALUES
(1, 'CLIENTE'),
(2, 'TIENDA'),
(3, 'ADMINISTRADOR');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_cabeceras`
--

DROP TABLE IF EXISTS `ventas_cabeceras`;
CREATE TABLE IF NOT EXISTS `ventas_cabeceras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cliente_id` int(10) UNSIGNED NOT NULL,
  `ventas_detalles_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_ventacab_cliente_idx` (`cliente_id`),
  KEY `ventas_detalle_id` (`ventas_detalles_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Cabecera de ventas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_detalles`
--

DROP TABLE IF EXISTS `ventas_detalles`;
CREATE TABLE IF NOT EXISTS `ventas_detalles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `FK_ventasdet_producto_idx` (`producto_id`),
  KEY `id` (`id`),
  KEY `id_2` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_tiendas`
--

DROP TABLE IF EXISTS `ventas_tiendas`;
CREATE TABLE IF NOT EXISTS `ventas_tiendas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tienda_id` int(11) UNSIGNED NOT NULL,
  `venta_cabecera_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `id` (`id`),
  KEY `tienda_id` (`tienda_id`,`venta_cabecera_id`),
  KEY `id_2` (`id`),
  KEY `venta_cabecera_id` (`venta_cabecera_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`RIF`);

--
-- Filtros para la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD CONSTRAINT `tiendas_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `tiendas_regiones`
--
ALTER TABLE `tiendas_regiones`
  ADD CONSTRAINT `tiendas_regiones_ibfk_2` FOREIGN KEY (`region_id`) REFERENCES `regiones` (`id`),
  ADD CONSTRAINT `tiendas_regiones_ibfk_3` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`RIF`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `usuarios_tipos` (`id`);

--
-- Filtros para la tabla `ventas_cabeceras`
--
ALTER TABLE `ventas_cabeceras`
  ADD CONSTRAINT `ventas_cabeceras_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `ventas_cabeceras_ibfk_2` FOREIGN KEY (`ventas_detalles_id`) REFERENCES `ventas_detalles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `ventas_detalles`
--
ALTER TABLE `ventas_detalles`
  ADD CONSTRAINT `ventas_detalles_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `ventas_tiendas`
--
ALTER TABLE `ventas_tiendas`
  ADD CONSTRAINT `ventas_Tiendas_ibfk_1` FOREIGN KEY (`venta_cabecera_id`) REFERENCES `ventas_cabeceras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ventas_Tiendas_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`RIF`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
