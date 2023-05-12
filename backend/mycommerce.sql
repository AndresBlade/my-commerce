-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-05-2023 a las 04:26:41
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
CREATE TABLE `categorias` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
CREATE TABLE `productos` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL,
  `categoria_id` tinyint(3) UNSIGNED DEFAULT NULL,
  `tienda_id` int(10) UNSIGNED NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagenes` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `categoria_id`, `tienda_id`, `descripcion`, `imagenes`, `createdAt`, `updatedAt`) VALUES
(3, 'Short', '8.00', 28, 17823182, 'Short de caballero', 'http://localhost:3000/file-1683504282852.png http://localhost:3000/file-1683504282854.png http://localhost:3000/file-1683504282855.png', '2023-05-08 00:04:42', '2023-05-08 00:04:42'),
(4, 'Camisa', '6.00', 28, 17823182, 'Short de caballero', 'http://localhost:3000/file-1683517005657.png http://localhost:3000/file-1683517005663.png http://localhost:3000/file-1683517005664.png', '2023-05-08 03:36:45', '2023-05-08 03:36:45'),
(5, 'Juguetes', '12.00', 23, 12823282, 'Juguetes de niños', 'http://localhost:3000/file-1683565353943.png http://localhost:3000/file-1683565353946.png http://localhost:3000/file-1683565353947.png', '2023-05-08 17:02:33', '2023-05-08 17:02:33'),
(6, 'Buñuelos', '11.00', 23, 12823282, 'Buñuelos ricos', 'http://localhost:3000/file-1683566709842.png http://localhost:3000/file-1683566709844.png http://localhost:3000/file-1683566709845.png', '2023-05-08 17:25:09', '2023-05-08 17:25:09');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `regiones`
--

DROP TABLE IF EXISTS `regiones`;
CREATE TABLE `regiones` (
  `id` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
CREATE TABLE `tiendas` (
  `RIF` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `imagen` text NOT NULL,
  `status` enum('0','1','2','3') NOT NULL DEFAULT '0' COMMENT '''0'' = En espera. ''1'' = Aceptada. ''2'' = Rechazada. ''3'' = Eliminada/Baneada',
  `cliente_id` int(11) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`RIF`, `nombre`, `imagen`, `status`, `cliente_id`, `createdAt`, `updatedAt`) VALUES
(11823282, 'segundaTienda', 'http://localhost:3000/file-1683566264850.jpg', '0', 15, '2023-05-08 17:17:44', '2023-05-08 17:17:44'),
(12823282, 'TiendaDeLoquito', 'http://localhost:3000/file-1683565199504.jpg', '0', 15, '2023-05-08 16:59:59', '2023-05-08 16:59:59'),
(17823182, 'Grows', 'http://localhost:3000/file-1683500567082.jpg', '0', 14, '2023-05-07 23:02:47', '2023-05-07 23:02:47'),
(17823282, 'Pantallero', 'http://localhost:3000/file-1683508356574.jpg', '0', 14, '2023-05-08 01:12:36', '2023-05-08 01:12:36'),
(21823282, 'terceraTienda', 'http://localhost:3000/file-1683566652324.jpg', '0', 15, '2023-05-08 17:24:12', '2023-05-08 17:24:12'),
(31823282, 'cuartaTienda', 'http://localhost:3000/file-1683567310002.jpg', '0', 15, '2023-05-08 17:35:10', '2023-05-08 17:35:10'),
(51823282, 'quintaTienda', 'http://localhost:3000/file-1683567323659.jpg', '0', 15, '2023-05-08 17:35:23', '2023-05-08 17:35:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiendas_regiones`
--

DROP TABLE IF EXISTS `tiendas_regiones`;
CREATE TABLE `tiendas_regiones` (
  `id` int(10) UNSIGNED NOT NULL,
  `tienda_id` int(10) UNSIGNED NOT NULL,
  `region_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasenna` varchar(60) NOT NULL,
  `imagen` text DEFAULT NULL,
  `tipo_id` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasenna`, `imagen`, `tipo_id`, `createdAt`, `updatedAt`) VALUES
(13, 'Torpasio', 'Torpasio@example.com', '30405110', 'http://localhost:3000/file-1683481403428.jpg', 1, '2023-05-07 01:54:18', '2023-05-07 17:43:23'),
(14, 'Loquito', 'Loquito@example.com', '$2b$10$qHkcaxLumMbspnQ0nb73/.zk6CIAzHJqaGqU513e2xdEk/zwmKoYK', NULL, 2, '2023-05-07 20:21:00', '2023-05-08 01:12:36'),
(15, 'Loquito49', 'loquito49@example.com', '$2b$10$3bdrRkdLT5T2Jr8jF7Fjpui.zSBzha/pMB41Gmj4V9nSqm61MlPQ2', NULL, 2, '2023-05-08 16:59:11', '2023-05-08 17:35:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tipos`
--

DROP TABLE IF EXISTS `usuarios_tipos`;
CREATE TABLE `usuarios_tipos` (
  `id` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
CREATE TABLE `ventas_cabeceras` (
  `id` int(11) NOT NULL,
  `cliente_id` int(10) UNSIGNED NOT NULL,
  `ventas_detalles_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Cabecera de ventas';

--
-- Volcado de datos para la tabla `ventas_cabeceras`
--

INSERT INTO `ventas_cabeceras` (`id`, `cliente_id`, `ventas_detalles_id`, `createdAt`, `updatedAt`) VALUES
(1, 15, 17, '2023-05-11 04:42:11', '2023-05-11 04:42:11'),
(2, 14, 18, '2023-05-11 04:51:03', '2023-05-11 04:51:03'),
(3, 15, 20, '2023-05-11 22:34:14', '2023-05-11 22:34:14'),
(4, 15, 21, '2023-05-11 22:36:20', '2023-05-11 22:36:20'),
(5, 15, 22, '2023-05-11 22:36:41', '2023-05-11 22:36:41'),
(6, 15, 23, '2023-05-11 23:59:11', '2023-05-11 23:59:11'),
(7, 15, 24, '2023-05-11 23:59:43', '2023-05-11 23:59:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_detalles`
--

DROP TABLE IF EXISTS `ventas_detalles`;
CREATE TABLE `ventas_detalles` (
  `id` int(11) NOT NULL,
  `producto_id` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ventas_detalles`
--

INSERT INTO `ventas_detalles` (`id`, `producto_id`, `cantidad`, `precio`, `createdAt`, `updatedAt`) VALUES
(6, 3, 2, '19.99', '2023-05-11 04:19:59', '2023-05-11 04:19:59'),
(7, 3, 2, '19.99', '2023-05-11 04:23:58', '2023-05-11 04:23:58'),
(8, 3, 2, '19.99', '2023-05-11 04:24:22', '2023-05-11 04:24:22'),
(9, 3, 2, '19.99', '2023-05-11 04:25:04', '2023-05-11 04:25:04'),
(10, 3, 2, '19.99', '2023-05-11 04:29:58', '2023-05-11 04:29:58'),
(11, 3, 2, '19.99', '2023-05-11 04:37:56', '2023-05-11 04:37:56'),
(12, 3, 2, '19.99', '2023-05-11 04:39:35', '2023-05-11 04:39:35'),
(13, 3, 2, '19.99', '2023-05-11 04:39:54', '2023-05-11 04:39:54'),
(14, 3, 2, '19.99', '2023-05-11 04:40:16', '2023-05-11 04:40:16'),
(15, 3, 2, '19.99', '2023-05-11 04:40:34', '2023-05-11 04:40:34'),
(16, 3, 2, '19.99', '2023-05-11 04:40:54', '2023-05-11 04:40:54'),
(17, 3, 2, '19.99', '2023-05-11 04:42:11', '2023-05-11 04:42:11'),
(18, 4, 1, '39.99', '2023-05-11 04:51:02', '2023-05-11 04:51:02'),
(19, 3, 1, '39.99', '2023-05-11 22:17:00', '2023-05-11 22:17:00'),
(20, 3, 1, '39.99', '2023-05-11 22:34:14', '2023-05-11 22:34:14'),
(21, 3, 1, '39.99', '2023-05-11 22:36:20', '2023-05-11 22:36:20'),
(22, 5, 1, '39.99', '2023-05-11 22:36:41', '2023-05-11 22:36:41'),
(23, 5, 1, '39.99', '2023-05-11 23:59:11', '2023-05-11 23:59:11'),
(24, 5, 1, '39.99', '2023-05-11 23:59:43', '2023-05-11 23:59:43');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_Tiendas`
--

DROP TABLE IF EXISTS `ventas_Tiendas`;
CREATE TABLE `ventas_Tiendas` (
  `id` int(11) NOT NULL,
  `tienda_id` int(11) UNSIGNED NOT NULL,
  `venta_cabecera_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ventas_Tiendas`
--

INSERT INTO `ventas_Tiendas` (`id`, `tienda_id`, `venta_cabecera_id`, `createdAt`, `updatedAt`) VALUES
(1, 12823282, 7, '2023-05-11 23:59:44', '2023-05-11 23:59:44');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_producto_categoria_idx` (`categoria_id`),
  ADD KEY `FK_producto_tienda_idx` (`tienda_id`);

--
-- Indices de la tabla `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`RIF`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `tiendas_regiones`
--
ALTER TABLE `tiendas_regiones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tienda_id` (`tienda_id`),
  ADD KEY `region_id` (`region_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  ADD KEY `FK_usuario_tipo_idx` (`tipo_id`);

--
-- Indices de la tabla `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas_cabeceras`
--
ALTER TABLE `ventas_cabeceras`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ventacab_cliente_idx` (`cliente_id`),
  ADD KEY `ventas_detalle_id` (`ventas_detalles_id`),
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `ventas_detalles`
--
ALTER TABLE `ventas_detalles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ventasdet_producto_idx` (`producto_id`),
  ADD KEY `id` (`id`),
  ADD KEY `id_2` (`id`);

--
-- Indices de la tabla `ventas_Tiendas`
--
ALTER TABLE `ventas_Tiendas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `tienda_id` (`tienda_id`,`venta_cabecera_id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `venta_cabecera_id` (`venta_cabecera_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tiendas_regiones`
--
ALTER TABLE `tiendas_regiones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas_cabeceras`
--
ALTER TABLE `ventas_cabeceras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ventas_detalles`
--
ALTER TABLE `ventas_detalles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `ventas_Tiendas`
--
ALTER TABLE `ventas_Tiendas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- Filtros para la tabla `ventas_Tiendas`
--
ALTER TABLE `ventas_Tiendas`
  ADD CONSTRAINT `ventas_Tiendas_ibfk_1` FOREIGN KEY (`venta_cabecera_id`) REFERENCES `ventas_cabeceras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ventas_Tiendas_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`RIF`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
