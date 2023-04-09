-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3366
-- Generation Time: Apr 09, 2023 at 06:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mycommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `administradores`
--

CREATE TABLE `administradores` (
  `id` int(10) UNSIGNED NOT NULL,
  `annosExperiencia` tinyint(3) UNSIGNED NOT NULL,
  `regionId` int(10) UNSIGNED NOT NULL,
  `usuario_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Tabla maestra de administradores';

-- --------------------------------------------------------

--
-- Table structure for table `categorias`
--

CREATE TABLE `categorias` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `id` int(10) UNSIGNED NOT NULL,
  `edad` tinyint(3) UNSIGNED NOT NULL,
  `baneado` enum('0','1') NOT NULL DEFAULT '0' COMMENT '''0'' = No Baneado. ''1'' = Baneado',
  `usuario_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

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
-- Table structure for table `regiones`
--

CREATE TABLE `regiones` (
  `id` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `regiones`
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
-- Table structure for table `tiendas`
--

CREATE TABLE `tiendas` (
  `id` int(10) UNSIGNED NOT NULL,
  `RIF` int(10) UNSIGNED NOT NULL,
  `regionId` int(10) UNSIGNED NOT NULL,
  `status` enum('0','1','2','3') NOT NULL DEFAULT '0' COMMENT '''0'' = En espera. ''1'' = Aceptada. ''2'' = Rechazada. ''3'' = Eliminada/Baneada',
  `usuario_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `contrasenna` varchar(45) NOT NULL,
  `tipo_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios_tipos`
--

CREATE TABLE `usuarios_tipos` (
  `id` int(10) UNSIGNED NOT NULL,
  `descripcion` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuarios_tipos`
--

INSERT INTO `usuarios_tipos` (`id`, `descripcion`) VALUES
(1, 'CLIENTE'),
(2, 'TIENDA'),
(3, 'ADMINISTRADOR');

-- --------------------------------------------------------

--
-- Table structure for table `ventas_cabecera`
--

CREATE TABLE `ventas_cabecera` (
  `id` int(10) UNSIGNED NOT NULL,
  `fecha` date NOT NULL,
  `cliente_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Cabecera de ventas';

-- --------------------------------------------------------

--
-- Table structure for table `ventas_detalle`
--

CREATE TABLE `ventas_detalle` (
  `id` int(11) NOT NULL,
  `ventas_cabecera_id` int(10) UNSIGNED NOT NULL,
  `producto_id` int(10) UNSIGNED NOT NULL,
  `cantidad` int(10) UNSIGNED NOT NULL,
  `precio` decimal(10,2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Administrador_UsuarioIdIndex` (`usuario_id`),
  ADD KEY `FK_administrador_region_idx` (`regionId`),
  ADD KEY `usuarioid` (`usuario_id`);

--
-- Indexes for table `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_cliente_usuario_idx` (`usuario_id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_producto_categoria_idx` (`categoria_id`),
  ADD KEY `FK_producto_tienda_idx` (`tienda_id`);

--
-- Indexes for table `regiones`
--
ALTER TABLE `regiones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiendas`
--
ALTER TABLE `tiendas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Tienda_RIF_UNIQUE` (`RIF`),
  ADD KEY `FK_tienda_usuario_idx` (`usuario_id`),
  ADD KEY `FK_tienda_region_idx` (`regionId`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`),
  ADD KEY `FK_usuario_tipo_idx` (`tipo_id`);

--
-- Indexes for table `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ventas_cabecera`
--
ALTER TABLE `ventas_cabecera`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ventacab_cliente_idx` (`cliente_id`);

--
-- Indexes for table `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ventasdet_producto_idx` (`producto_id`),
  ADD KEY `FK_ventasdet_cabecera_idx` (`ventas_cabecera_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `regiones`
--
ALTER TABLE `regiones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `tiendas`
--
ALTER TABLE `tiendas`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios_tipos`
--
ALTER TABLE `usuarios_tipos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ventas_cabecera`
--
ALTER TABLE `ventas_cabecera`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administradores`
--
ALTER TABLE `administradores`
  ADD CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `administradores_ibfk_2` FOREIGN KEY (`regionId`) REFERENCES `regiones` (`id`);

--
-- Constraints for table `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`tienda_id`) REFERENCES `tiendas` (`id`);

--
-- Constraints for table `tiendas`
--
ALTER TABLE `tiendas`
  ADD CONSTRAINT `tiendas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `tiendas_ibfk_2` FOREIGN KEY (`regionId`) REFERENCES `regiones` (`id`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`tipo_id`) REFERENCES `usuarios_tipos` (`id`);

--
-- Constraints for table `ventas_cabecera`
--
ALTER TABLE `ventas_cabecera`
  ADD CONSTRAINT `ventas_cabecera_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);

--
-- Constraints for table `ventas_detalle`
--
ALTER TABLE `ventas_detalle`
  ADD CONSTRAINT `ventas_detalle_ibfk_1` FOREIGN KEY (`ventas_cabecera_id`) REFERENCES `ventas_cabecera` (`id`),
  ADD CONSTRAINT `ventas_detalle_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
