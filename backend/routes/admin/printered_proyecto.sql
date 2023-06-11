-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Jun 11, 2023 at 12:18 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `printered_proyecto`
--

-- --------------------------------------------------------

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contenido` text COLLATE utf8mb4_general_ci,
  `id_usuario` int DEFAULT NULL,
  `id_publicacion` int DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_publicacion` (`id_publicacion`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comentarios`
--

INSERT INTO `comentarios` (`id`, `contenido`, `id_usuario`, `id_publicacion`, `fecha_creacion`) VALUES
(1, 'precio?', 2, 1, '2023-06-01');

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
CREATE TABLE IF NOT EXISTS `estados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`id`, `nombre`) VALUES
(1, 'activo'),
(2, 'inactivo');

-- --------------------------------------------------------

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
CREATE TABLE IF NOT EXISTS `publicaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `contenido` text COLLATE utf8mb4_general_ci,
  `imagen_id` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `fecha_actualizacion` date DEFAULT NULL,
  `precio` decimal(6,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_estado` (`id_estado`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `publicaciones`
--

INSERT INTO `publicaciones` (`id`, `titulo`, `contenido`, `imagen_id`, `id_usuario`, `id_estado`, `fecha_creacion`, `fecha_actualizacion`, `precio`) VALUES
(22, 'prueba', 'descripcion prueba (ajustar descripcion por contenido)', 'pho58sh7zvky0ckxwsmo', 1, 1, '2023-06-08', '2023-06-10', '123.00'),
(19, 'ALF 3', 'no hay problema', 'ux9wbskdt0mhggayydtt', 1, 1, '2023-06-04', '2023-06-10', '123.00'),
(25, 'personas en la oscuridad', 'personas faro', 'bcumziakqqslmhx5xlaa', 1, 1, '2023-06-08', '2023-06-10', '400.00'),
(30, 'prueba con otra imagen', 'probando con otra imagen', 'mhahufijsrmsv7pk4ill', 2, 2, '2023-06-10', '2023-06-10', '44.00'),
(29, 'Prueba de otro usuario', 'probando con otro usuario', 'bbudn6egmwih8a2iaxet', 2, 2, '2023-06-10', '2023-06-10', '9999.99'),
(32, 'nuevamente cargo publicacion (titulo modificado)', 'prueba demostracion 2 (edición)', 'y8o2ye5yfthbxqp9hcpj', 2, 2, '2023-06-10', '2023-06-10', '11.25');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `nombre`) VALUES
(1, 'admin'),
(2, 'final');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apellido` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `id_rol` int DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  `username` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`),
  KEY `id_estado` (`id_estado`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `apellido`, `email`, `password`, `id_rol`, `id_estado`, `username`) VALUES
(1, 'Mauro', 'Cuquejo', 'mauro.cuquejo@printered.com', '81dc9bdb52d04dc20036dbd8313ed055', 1, 1, 'mauro'),
(2, 'Flavia', 'Ursino', 'flavia.ursino@printered.com', '81dc9bdb52d04dc20036dbd8313ed055', 2, 1, 'flavia'),
(4, 'mauro', 'toranzo', 'mtoranzo@printered.com', '202cb962ac59075b964b07152d234b70', 2, 1, 'mtoranzo');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
