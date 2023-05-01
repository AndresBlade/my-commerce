-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-05-2023 a las 00:31:29
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
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `RIF` varchar(15) NOT NULL,
  `regionId` int(10) UNSIGNED NOT NULL,
  `status` enum('0','1','2','3') DEFAULT '0' COMMENT '''0'' = En espera. ''1'' = Aceptada. ''2'' = Rechazada. ''3'' = Eliminada/Baneada',
  `usuario_id` int(10) UNSIGNED DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `tiendas`
--

INSERT INTO `tiendas` (`id`, `nombre`, `RIF`, `regionId`, `status`, `usuario_id`, `createdAt`, `updatedAt`) VALUES
(2, 'Grows', 'J-123456789', 17, '0', 1, '2023-05-01 15:02:06', '2023-05-01 15:02:06'),
(3, 'Doctor Pantalla', 'J-17823182', 17, '0', 2, '2023-05-01 21:49:52', '2023-05-01 21:49:52');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `correo` varchar(250) NOT NULL,
  `contrasenna` varchar(60) NOT NULL,
  `tipo_id` int(10) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `contrasenna`, `tipo_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', '$2b$10$MVgsWvoPyM91rY5HjSebiOULTr1p0QduI79j3HznDDEtf1mtHoMCK', 2, '2023-05-01 03:12:57', '2023-05-01 03:12:57'),
(2, 'Torpas', 'torpas.jimenez@example.com', '$2b$10$kSgzRPYROepAkiHUwPtgPOPA7uDMBG34e4.1jjPuBLpFVCKXD6NHe', 1, '2023-05-01 21:48:56', '2023-05-01 21:48:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_tienda`
--

DROP TABLE IF EXISTS `usuarios_tienda`;
CREATE TABLE `usuarios_tienda` (
  `id` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL,
  `tienda_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
-- Estructura de tabla para la tabla `ventas_cabecera`
--

DROP TABLE IF EXISTS `ventas_cabecera`;
CREATE TABLE `ventas_cabecera` (
  `id` int(10) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `cliente_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Cabecera de ventas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_detalle`
--

DROP TABLE IF EXISTS `ventas_detalle`;
CREATE TABLE `ventas_detalle` (
  `id` int(11) NOT NULL,
  `ventas_cabecera_id` int(10) UNSIGNED NOT NULL,
  `producto_id` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tienda_RIF_UNIQUE` (`RIF`),
  ADD KEY `FK_tienda_usuario_idx` (`usuario_id`),
  ADD KEY `FK_tienda_region_idx` (`regionId`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  ADD KEY `FK_usuario_tipo_idx` (`tipo_id`);

--
-- Indices de la tabla `usuarios_tienda`
--
ALTER TABLE `usuarios_tienda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `tienda_id` (`tienda_id`);

--
-- Indices de la tabla `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas_cabecera`
--
ALTER TABLE `ventas_cabecera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ventacab_cliente_idx` (`cliente_id`);

--
-- Indices de la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ventasdet_producto_idx` (`producto_id`),
  ADD KEY `FK_ventasdet_cabecera_idx` (`ventas_cabecera_id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios_tienda`
--
ALTER TABLE `usuarios_tienda`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ventas_cabecera`
--
ALTER TABLE `ventas_cabecera`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`);

--
-- Filtros para la tabla `tiendas`
--
ALTER TABLE `tiendas`
  ADD CONSTRAINT `tiendas_ibfk_2` FOREIGN KEY (`regionId`) REFERENCES `regiones` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `usuarios_tipos` (`id`);

--
-- Filtros para la tabla `usuarios_tienda`
--
ALTER TABLE `usuarios_tienda`
  ADD CONSTRAINT `usuarios_tienda_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `usuarios_tienda_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`);

--
-- Filtros para la tabla `ventas_cabecera`
--
ALTER TABLE `ventas_cabecera`
  ADD CONSTRAINT `ventas_cabecera_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD CONSTRAINT `ventas_detalle_ibfk_1` FOREIGN KEY (`ventas_cabecera_id`) REFERENCES `ventas_cabecera` (`id`),
  ADD CONSTRAINT `ventas_detalle_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
