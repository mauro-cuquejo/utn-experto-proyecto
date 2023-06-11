-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: printered_proyecto
-- ------------------------------------------------------
-- Server version	8.0.31
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!50503 SET NAMES utf8 */
;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;

/*!40103 SET TIME_ZONE='+00:00' */
;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

CREATE DATABASE `printered_proyecto`
/*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */
/*!80016 DEFAULT ENCRYPTION='N' */
;

--
-- Table structure for table `comentarios`
--
DROP TABLE IF EXISTS `comentarios`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `comentarios` (
    `id` int NOT NULL AUTO_INCREMENT,
    `contenido` text COLLATE utf8mb4_general_ci,
    `id_usuario` int DEFAULT NULL,
    `id_publicacion` int DEFAULT NULL,
    `fecha_creacion` date DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `id_publicacion` (`id_publicacion`),
    KEY `id_usuario` (`id_usuario`)
) ENGINE = MyISAM AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `comentarios`
--
LOCK TABLES `comentarios` WRITE;

/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */
;

INSERT INTO
    `comentarios`
VALUES
    (1, 'precio?', 2, 1, '2023-06-01');

/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `estados`
--
DROP TABLE IF EXISTS `estados`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `estados` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `estados`
--
LOCK TABLES `estados` WRITE;

/*!40000 ALTER TABLE `estados` DISABLE KEYS */
;

INSERT INTO
    `estados`
VALUES
    (1, 'activo'),
    (2, 'inactivo');

/*!40000 ALTER TABLE `estados` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `publicaciones`
--
DROP TABLE IF EXISTS `publicaciones`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `publicaciones` (
    `id` int NOT NULL AUTO_INCREMENT,
    `titulo` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `contenido` text COLLATE utf8mb4_general_ci,
    `imagen_id` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `id_usuario` int DEFAULT NULL,
    `id_estado` int DEFAULT NULL,
    `fecha_creacion` date DEFAULT NULL,
    `fecha_actualizacion` date DEFAULT NULL,
    `precio` decimal(6, 2) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `id_usuario` (`id_usuario`),
    KEY `id_estado` (`id_estado`)
) ENGINE = MyISAM AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `publicaciones`
--
LOCK TABLES `publicaciones` WRITE;

/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */
;

INSERT INTO
    `publicaciones`
VALUES
    (
        22,
        'prueba',
        'descripcion prueba (ajustar descripcion por contenido)',
        'pho58sh7zvky0ckxwsmo',
        1,
        1,
        '2023-06-08',
        '2023-06-10',
        123.00
    ),
    (
        19,
        'ALF 3',
        'no hay problema',
        'ux9wbskdt0mhggayydtt',
        1,
        1,
        '2023-06-04',
        '2023-06-10',
        123.00
    ),
    (
        25,
        'personas en la oscuridad',
        'personas faro',
        'bcumziakqqslmhx5xlaa',
        1,
        1,
        '2023-06-08',
        '2023-06-10',
        400.00
    ),
    (
        30,
        'prueba con otra imagen',
        'probando con otra imagen',
        'mhahufijsrmsv7pk4ill',
        2,
        2,
        '2023-06-10',
        '2023-06-10',
        44.00
    ),
    (
        29,
        'Prueba de otro usuario',
        'probando con otro usuario',
        'bbudn6egmwih8a2iaxet',
        2,
        2,
        '2023-06-10',
        '2023-06-10',
        9999.99
    ),
    (
        32,
        'nuevamente cargo publicacion (titulo modificado)',
        'prueba demostracion 2 (edición)',
        'y8o2ye5yfthbxqp9hcpj',
        2,
        2,
        '2023-06-10',
        '2023-06-10',
        11.25
    );

/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `roles`
--
DROP TABLE IF EXISTS `roles`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = MyISAM AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `roles`
--
LOCK TABLES `roles` WRITE;

/*!40000 ALTER TABLE `roles` DISABLE KEYS */
;

INSERT INTO
    `roles`
VALUES
    (1, 'admin'),
    (2, 'final');

/*!40000 ALTER TABLE `roles` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--
DROP TABLE IF EXISTS `usuarios`;

/*!40101 SET @saved_cs_client     = @@character_set_client */
;

/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `usuarios` (
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
) ENGINE = MyISAM AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `usuarios`
--
LOCK TABLES `usuarios` WRITE;

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */
;

INSERT INTO
    `usuarios`
VALUES
    (
        1,
        'Mauro',
        'Cuquejo',
        'mauro.cuquejo@printered.com',
        '81dc9bdb52d04dc20036dbd8313ed055',
        1,
        1,
        'mauro'
    ),
    (
        2,
        'Flavia',
        'Ursino',
        'flavia.ursino@printered.com',
        '81dc9bdb52d04dc20036dbd8313ed055',
        2,
        1,
        'flavia'
    ),
    (
        4,
        'mauro',
        'toranzo',
        'mtoranzo@printered.com',
        '202cb962ac59075b964b07152d234b70',
        2,
        1,
        'mtoranzo'
    );

/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */
;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2023-06-10 23:25:01