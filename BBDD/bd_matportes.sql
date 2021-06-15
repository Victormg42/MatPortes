-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2021 a las 11:42:32
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_matportes`
--
CREATE DATABASE IF NOT EXISTS `bd_matportes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bd_matportes`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_blog`
--

CREATE TABLE `tbl_blog` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `img_antes` varchar(255) NOT NULL,
  `img_despues` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_blog`
--

INSERT INTO `tbl_blog` (`id`, `titulo`, `descripcion`, `img_antes`, `img_despues`) VALUES
(2, 'r4ew', 'r3421', 'uploads/blog/YZQQWI37vhvh0LsrBFVK7EvdmV51EQMfRFKkCSg0.jpg', 'uploads/blog/Ac37r2MqbG9mnNzAaWgH7rRslnEc8t8hJlMfDrnf.png'),
(5, 'hols', 'esdwfgv', 'uploads/blog/RBuTWAE0O9JKiTx2yelBf30bqRCw10WAg296V3VT.jpg', 'uploads/blog/CcYm3uUbV5wNsnYzcJLNJhWieaDsWwxTK1Tuzn4r.jpg'),
(6, 'Prueba1', 'desc prueba1', 'uploads/blog/zYCVxWE8s2szAODVhMgwvLCOWoUTEpHgbttMErfp.jpg', 'uploads/blog/pLvyfl7Vr3gTkddtFk3m5S1CyTHkzV0cQNhXO5Xa.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_catalogo`
--

CREATE TABLE `tbl_catalogo` (
  `id` int(11) NOT NULL,
  `id_jerarquia` int(11) NOT NULL,
  `ruta_pdf` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_catalogo`
--

INSERT INTO `tbl_catalogo` (`id`, `id_jerarquia`, `ruta_pdf`, `nombre`) VALUES
(13, 3, 'uploads/uemYOhLDABCFrkmfYglmJFhoE1E0hx0rTMtGzBdk.pdf', 'Acabado Duragrain'),
(14, 3, 'uploads/YnFANrkX0DLHIDdv9sGgWRla3NagQTjCCNEAwceP.pdf', 'Puertas seccionales de garaje'),
(15, 3, 'uploads/ivWbpr5ij3LqN9SgDnJmxCXxmwLCqVAoVH07FV8X.pdf', 'Más seguridad para usted y su familia'),
(16, 8, 'uploads/CWPaDWFeM4YtlatA1IYLIWGysBoiXitDNNBdvoOT.pdf', 'Puertas de entrada Thermo65 / Thermo46'),
(17, 20, 'uploads/ISpcimF29vxevRNuXdeXYTH2DoF4nGezJ6we7gPb.pdf', 'Automatismos para puertas de garaje y portones de entrada'),
(18, 20, 'uploads/AIuEw7G3B6aiyntypkpcevry1zai09Ve3HUmm3Oq.pdf', 'Puertas seccionales laterales'),
(19, 29, 'uploads/8bzrm5qkNjsnu4S6yceW01I6KIiP1h0tWyGBQmgh.pdf', 'Puertas de garaje RollMatic'),
(20, 12, 'uploads/Vg1nWcoLhOaXel6vJqnPD4sG9ndcUzu7yb5RPVox.pdf', 'Puertas seccionales industriales'),
(21, 31, 'uploads/Dw7pcYSafQtROuQ4XIHcu2ikO51rGhe3EEryYxMH.pdf', 'Equipamientos de carga y descarga'),
(22, 32, 'uploads/HDfvSsH6ZGd4LCnu0vlBOftBU54U8CweP9PfZ1Av.pdf', 'Puertas de apertura rápida'),
(23, 32, 'uploads/dJ5R6qPx5tyCZCz30ZXI4fETTjyK1KJuathC4oDk.pdf', 'NOVEDAD: Puertas rápidas plegables'),
(24, 33, 'uploads/DjGiRLwjOdFM5IsRzYOW3Gf4sPeln8Nzg5n27MVJ.pdf', 'Puertas y rejas enrollables'),
(25, 33, 'uploads/Mymnb67dCyNfO6uKJgnBqoFPycjN30LQXXvhzcb3.pdf', 'Reja enrollable RollMatic'),
(26, 33, 'uploads/W2SYD37AP2a0LomMpO6VC1ToQgNtdv1WliKX5Q1g.pdf', 'NOVEDAD: Cierre para comercio ShopRoller SR'),
(33, 3, 'uploads/7yJRSg4lEUcLTx9lL6HzPlTRbhtTHDf4ZsoKwWMC.pdf', 'Automatismos para puertas de garaje y portones de entrada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_compartir_hoja`
--

CREATE TABLE `tbl_compartir_hoja` (
  `id` int(11) NOT NULL,
  `id_hoja_trabajo` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_hoja_trabajo`
--

CREATE TABLE `tbl_hoja_trabajo` (
  `id` int(11) NOT NULL,
  `id_tipo_cliente` int(11) DEFAULT NULL,
  `dni_cliente` varchar(9) DEFAULT NULL,
  `nombre_cliente` varchar(200) DEFAULT NULL,
  `apellido1_cliente` varchar(200) DEFAULT NULL,
  `apellido2_cliente` varchar(200) DEFAULT NULL,
  `nombre_empresa` varchar(200) DEFAULT NULL,
  `fecha_guardado` datetime DEFAULT NULL,
  `fecha_ultima_modificacion` datetime DEFAULT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `CP` char(5) DEFAULT NULL,
  `ciudad` varchar(200) DEFAULT NULL,
  `provincia` varchar(200) DEFAULT NULL,
  `telefono` char(9) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `id_tipo_trabajo` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `tiempo_total` time DEFAULT NULL,
  `id_empleado_propietario` int(11) DEFAULT NULL,
  `precio_total` decimal(20,2) DEFAULT NULL,
  `url_img_firma_cliente` varchar(200) DEFAULT NULL,
  `estado_hoja` int(1) DEFAULT NULL,
  `hora_envio_hoja` time DEFAULT NULL,
  `url_pdf` varchar(200) DEFAULT NULL,
  `descuento` char(3) DEFAULT NULL,
  `precio_transporte` decimal(20,2) DEFAULT NULL,
  `nif` varchar(9) DEFAULT NULL,
  `enviado` tinyint(1) DEFAULT NULL,
  `guardado` tinyint(1) DEFAULT NULL,
  `secretaria` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_hoja_trabajo`
--

INSERT INTO `tbl_hoja_trabajo` (`id`, `id_tipo_cliente`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `fecha_guardado`, `fecha_ultima_modificacion`, `direccion`, `CP`, `ciudad`, `provincia`, `telefono`, `email`, `id_tipo_trabajo`, `descripcion`, `tiempo_total`, `id_empleado_propietario`, `precio_total`, `url_img_firma_cliente`, `estado_hoja`, `hora_envio_hoja`, `url_pdf`, `descuento`, `precio_transporte`, `nif`, `enviado`, `guardado`, `secretaria`) VALUES
(164, 1, NULL, NULL, NULL, NULL, 'p', '2021-05-23 11:22:12', '2021-05-23 11:22:38', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, '484.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_horas`
--

CREATE TABLE `tbl_horas` (
  `id` int(11) NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time DEFAULT NULL,
  `id_hoja_trabajo` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_horas_totales`
--

CREATE TABLE `tbl_horas_totales` (
  `id` int(11) NOT NULL,
  `id_hoja_trabajo` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `total_horas` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_img_presupuesto`
--

CREATE TABLE `tbl_img_presupuesto` (
  `id` int(11) NOT NULL,
  `img_url` varchar(200) NOT NULL,
  `id_presupuesto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_img_presupuesto`
--

INSERT INTO `tbl_img_presupuesto` (`id`, `img_url`, `id_presupuesto`) VALUES
(38, 'uploads/imgPresupuesto/AALX23hbCemvJpJPtmNEcUPmFNIrW6viKrobGiIr.jpg', 8),
(39, 'uploads/imgPresupuesto/oo94Xj0sxBrSH9EuA5JYWXps9L1Xl0d71vQlLIgr.jpg', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_img_promocion`
--

CREATE TABLE `tbl_img_promocion` (
  `id` int(11) NOT NULL,
  `id_promocion` int(11) NOT NULL,
  `url_img` varchar(255) NOT NULL,
  `img_hormann` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_img_promocion`
--

INSERT INTO `tbl_img_promocion` (`id`, `id_promocion`, `url_img`, `img_hormann`) VALUES
(2, 1, 'uploads/promo/promocio2.png', 1),
(3, 1, 'uploads/promo/promocio3.png', 1),
(5, 1, 'uploads/promo/IGS7ffTXUGQAtKInXjZMfkJxmFniAN3ruEFOQc8n.png', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_jerarquia`
--

CREATE TABLE `tbl_jerarquia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `id_padre_jerarquia` int(11) DEFAULT NULL,
  `ruta_img` varchar(255) NOT NULL,
  `info` text DEFAULT NULL,
  `texto_ayuda` varchar(255) DEFAULT NULL,
  `img_hormann` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_jerarquia`
--

INSERT INTO `tbl_jerarquia` (`id`, `nombre`, `id_padre_jerarquia`, `ruta_img`, `info`, `texto_ayuda`, `img_hormann`) VALUES
(1, 'Puertas residenciales', NULL, 'uploads/6NUVqgoclTJjGm6hEgI1XS3HoZ4PySZLyAI2mdZb.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dui ante, placerat sit amet interdum interdum, elementum a odio. Fusce blandit aliquam pellentesque. Nulla mattis turpis at tortor fringilla tempus. Nunc nibh sapien, aliquet quis odio vitae, vehicula feugiat enim. Cras vulputate ligula non arcu dictum, in convallis tellus vulputate.', '¿Es para tu casa?', 1),
(3, 'Puertas seccionales', 1, 'uploads/OAVvhdOqwx5TAyyNnNgx4m2bFCwE2nB5ZSDP10zo.jpg', 'Suspendisse sollicitudin bibendum dui vitae rutrum. Nullam est ipsum, vehicula et tincidunt a, ultrices ut tortor. Vivamus interdum eget sem at fringilla. Ut iaculis, est et imperdiet cursus, nunc orci malesuada turpis, sed congue augue eros faucibus turpis.', 'Lorem ipsum', 1),
(8, 'Puertas de entrada', 1, 'uploads/EOlX150WnpkcE74RW4X6YqwzW0qGVBu1D2sqrw9i.jpg', 'Integer varius arcu ante, ac efficitur mi rhoncus et. Curabitur vitae mi quis mauris faucibus ultrices. Nunc consequat, purus id tempus suscipit, urna felis vehicula lorem, a posuere mi nibh at dolor.', 'Lorem ipsum', 1),
(12, 'Puertas seccionales', 28, 'uploads/IT8JmyJ1WB8Ly9i5by0oVrZ1hJrFbIC4ENKT2IAy.jpg', 'Ut mollis lacus mauris, et vulputate sapien porta a. Maecenas aliquet tempus sodales. Sed convallis efficitur malesuada. Nulla sapien diam, elementum at urna a, convallis congue ligula.', 'Lorem ipsum', 1),
(20, 'Puertas seccionales laterales', 1, 'uploads/QJGlQAThnoc3I56GPE2ExQmSKV5Q1mz3OE41e5Rb.jpg', 'Mauris placerat nisl nisl, sed elementum tortor euismod eu. Donec commodo eu orci et luctus. Fusce vitae posuere lorem. Proin auctor massa magna, nec rutrum urna porttitor vitae. Donec a euismod elit, nec feugiat risus. Suspendisse et dapibus ligula.', 'Lorem ipsum', 1),
(28, 'Puertas industriales', NULL, 'uploads/hBFQ9H23ozhDyFcC7sZ6vgshpk6APbs1UZzNzBHr.jpg', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dui ante, placerat sit amet interdum interdum, elementum a odio. Fusce blandit aliquam pellentesque. Nulla mattis turpis at tortor fringilla tempus. Nunc nibh sapien, aliquet quis odio vitae, vehicula feugiat enim. Cras vulputate ligula non arcu dictum, in convallis tellus vulputate.', '¿Es para tu empresa?', 1),
(29, 'Puertas enrollables', 1, 'uploads/1gBYjWrTxkhKxYkkUfPkzSVrN8FvQTyPJK7sK9AJ.jpg', 'Integer sed augue vel ante tincidunt ullamcorper. In eget enim non urna vehicula tincidunt. Donec vel orci et quam tempus finibus eget quis nibh. Curabitur pellentesque nisl ut nunc mattis volutpat.', 'Lorem ipsum', 1),
(30, 'Automatismos', 1, 'uploads/Eip7cjviuDEIhMVc6XT8XGdWnwTKt7Z9f23KHKIx.jpg', 'Quisque sed egestas risus, nec fermentum odio. Aenean justo felis, dictum eget augue et, pulvinar volutpat nibh. Etiam suscipit risus id tristique blandit. In hac habitasse platea dictumst.', 'Lorem ipsum', 1),
(31, 'Equipamientos de carga y descarga', 28, 'uploads/kNdppjmURb3PfMdL7WtX8EFq2QPcGwNZnLwhRCbr.jpg', 'Praesent eros quam, cursus ut pretium at, consequat eget enim. Ut accumsan sit amet ligula sodales dictum. Quisque erat lacus, aliquet nec ante posuere, suscipit egestas justo. Proin pellentesque vitae purus sed maximus.', 'Lorem ipsum', 1),
(32, 'Puertas de apertura rápida', 28, 'uploads/SGlRbpV6NkoYVGfu0WOQeGKYDlAv3kGXHTHxQPLe.jpg', 'Praesent iaculis arcu a dui semper varius. Proin suscipit leo ut erat tempor cursus. Nam posuere sit amet risus vel pellentesque. Aenean eget turpis a massa sagittis rutrum.', 'Lorem ipsum', 1),
(33, 'Puertas enrollables', 28, 'uploads/iVNR3MYdmm17vfcKXKRNrdnJV0jDbojTJm4LwxTX.jpg', 'Mauris ac arcu nisl. Mauris iaculis, nisl et efficitur pulvinar, magna felis tincidunt eros, non ullamcorper nibh ligula et justo. Morbi consequat sem quis tellus lacinia, sed ultricies diam mattis.', 'Lorem ipsum', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_material_hojatrabajo`
--

CREATE TABLE `tbl_material_hojatrabajo` (
  `id` int(11) NOT NULL,
  `nombre_material` varchar(200) NOT NULL,
  `descripcion_material` varchar(200) NOT NULL,
  `cantidad_material` int(11) NOT NULL,
  `base_precio_unidad_material` decimal(20,2) NOT NULL,
  `iva` decimal(6,2) NOT NULL,
  `descuento` decimal(6,2) NOT NULL,
  `total_con_iva` decimal(20,2) NOT NULL,
  `id_hojaTrabajo` int(11) NOT NULL,
  `stock` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_material_hojatrabajo`
--

INSERT INTO `tbl_material_hojatrabajo` (`id`, `nombre_material`, `descripcion_material`, `cantidad_material`, `base_precio_unidad_material`, `iva`, `descuento`, `total_con_iva`, `id_hojaTrabajo`, `stock`) VALUES
(138, 'Puerta1', '', 2, '200.00', '21.00', '0.00', '484.00', 164, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_material_presupuesto`
--

CREATE TABLE `tbl_material_presupuesto` (
  `id` int(11) NOT NULL,
  `id_presupuesto` int(11) NOT NULL,
  `nombre_material` varchar(255) NOT NULL,
  `descripcion_material` varchar(255) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `base_precio_unidad` decimal(20,2) NOT NULL,
  `iva` decimal(6,2) NOT NULL,
  `descuento` decimal(6,2) NOT NULL,
  `total_con_iva` decimal(20,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_material_presupuesto`
--

INSERT INTO `tbl_material_presupuesto` (`id`, `id_presupuesto`, `nombre_material`, `descripcion_material`, `cantidad`, `base_precio_unidad`, `iva`, `descuento`, `total_con_iva`) VALUES
(5, 8, 'Material12!!', 'descripcion', 22, '3.00', '3.00', '3.00', '65.94'),
(6, 8, 'Mat22222', '2333', 23, '23.00', '21.00', '23.00', '492.87'),
(10, 8, 'material333', '22', 2, '2.00', '2.00', '2.00', '4.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_presupuesto`
--

CREATE TABLE `tbl_presupuesto` (
  `id` int(11) NOT NULL,
  `descripcion_trabajo` varchar(200) DEFAULT NULL,
  `ubicacion` varchar(200) DEFAULT NULL,
  `precio_transporte` decimal(20,2) DEFAULT NULL,
  `medidas_tecnicas` text DEFAULT NULL,
  `dni_cliente` varchar(9) DEFAULT NULL,
  `nombre_cliente` varchar(100) DEFAULT NULL,
  `apellido1_cliente` varchar(100) DEFAULT NULL,
  `apellido2_cliente` varchar(100) DEFAULT NULL,
  `nombre_empresa` varchar(255) DEFAULT NULL,
  `nif` varchar(30) DEFAULT NULL,
  `telefono_cliente` char(9) DEFAULT NULL,
  `email_cliente` varchar(200) DEFAULT NULL,
  `importe_total` decimal(20,2) DEFAULT NULL,
  `enviado` tinyint(1) NOT NULL,
  `guardado` tinyint(1) NOT NULL,
  `fecha_guardado` datetime DEFAULT NULL,
  `fecha_ultima_modificacion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_presupuesto`
--

INSERT INTO `tbl_presupuesto` (`id`, `descripcion_trabajo`, `ubicacion`, `precio_transporte`, `medidas_tecnicas`, `dni_cliente`, `nombre_cliente`, `apellido1_cliente`, `apellido2_cliente`, `nombre_empresa`, `nif`, `telefono_cliente`, `email_cliente`, `importe_total`, `enviado`, `guardado`, `fecha_guardado`, `fecha_ultima_modificacion`) VALUES
(8, 'montar la puerta de la casa.', 'C/ Mercè Rodoreda, 15, Barcelona', '120.00', '34cm de ancho por 4 de largo', NULL, 'Judit', 'Castedo', NULL, NULL, NULL, '658748596', '100007157.joan23@fje.edu', '562.81', 1, 1, '2021-04-12 15:20:21', '2021-05-14 16:05:32'),
(119, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'f', NULL, NULL, NULL, NULL, 0, 1, '2021-05-21 19:49:57', '2021-05-21 19:49:57'),
(120, NULL, NULL, '200.00', NULL, NULL, NULL, NULL, NULL, 'hola', NULL, NULL, NULL, '200.00', 0, 1, '2021-05-21 19:53:42', '2021-05-21 19:53:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_producto`
--

CREATE TABLE `tbl_producto` (
  `id` int(11) NOT NULL,
  `id_jerarquia` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `ruta_img` varchar(255) NOT NULL,
  `img_hormann` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_producto`
--

INSERT INTO `tbl_producto` (`id`, `id_jerarquia`, `nombre`, `descripcion`, `ruta_img`, `img_hormann`) VALUES
(1, 3, 'LPU 67 Thermo', 'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.', 'uploads/bdmHDvApUw02mK6oXDQUcCvw8ZCwghNOfTVXDevw.jpg', 1),
(2, 3, 'LTH 42', 'Curabitur pharetra nibh in eros hendrerit, ut commodo nibh efficitur.', 'uploads/eKD54KljxuPC1bf9yh41uv7xhJMmgjaxf4Y8vbBp.jpg', 1),
(4, 3, 'LTE 42', 'Suspendisse in mattis elit. Maecenas et luctus felis. Vestibulum velit velit, pellentesque vel semper vitae, semper quis risus.', 'uploads/s0K6cQFg9KYM549v85BR5LN68FgmAoCeYuWGl09j.jpg', 1),
(18, 8, 'Modelo 600', 'Quisque ornare, turpis et fermentum iaculis, metus libero convallis felis, a luctus lectus ligula volutpat eros.', 'uploads/FQyYAmWLxVANLmQvERybieO8hBiNzcVeTm91KJoZ.png', 1),
(19, 8, 'Modelo 015', 'Praesent vel felis a nisi sodales malesuada et vitae nibh. Aliquam in eleifend nulla. Ut massa risus, dictum vitae purus ut, imperdiet hendrerit enim.', 'uploads/Upv4s3VMHzvFzd1kUg6D6GoPWNMZmN1qm6YyIHTM.png', 1),
(20, 8, 'Modelo 900', 'Pellentesque porta massa nec nisi interdum, pharetra bibendum nibh volutpat. Proin lacinia sapien nec ante mollis blandit.', 'uploads/C7z0k7a2MDcwKgLZqvluTABxCNaytBXTk1AYl6fF.png', 1),
(21, 20, 'Cuarterones', 'Phasellus ornare, orci vel consequat blandit, justo lectus bibendum lorem, id tempor diam libero viverra mi.', 'uploads/Dqu5UtB2OVVDHD0uf1mB7VbAM89um5f8jTjjN5Sn.jpg', 1),
(22, 20, 'Acanalado L, modelo 481', 'Aenean sed elementum elit. Quisque cursus ante ligula, euismod iaculis eros finibus in. Vestibulum id rutrum purus.', 'uploads/7jdnTjCIftWPPnprGJ7SHO17BScwE1XwabE2JliP.jpg', 1),
(23, 29, 'Puerta enrollable compacta', 'Mauris pretium sem eget sapien tristique, a faucibus urna iaculis. Curabitur suscipit ex ligula, ac tempus justo laoreet sed.', 'uploads/CdFuJymbTVRroOBxn0CcDJgXKOXzHaedAL1ttGYx.jpg', 1),
(24, 29, 'Desconexión automática segura', 'Sed id laoreet tortor. Integer at libero vestibulum, eleifend erat ut, lacinia justo. Morbi ut lobortis velit.', 'uploads/2yf91aTUZiZ0cvjeaZNxi7udmeuPj5d5Myke9F9V.jpg', 1),
(25, 30, 'SupraMatic', 'Cras congue molestie pellentesque. Mauris tristique sodales tempor. Integer luctus lacus sem, a mollis urna euismod a.', 'uploads/4PDjDzA9gCAyO5Pz8MOUgXPrdbvOwQcJDIGABOAH.jpg', 1),
(26, 30, 'ProMatic', 'Aenean in hendrerit lorem. Donec ante leo, viverra in pellentesque eget, iaculis fermentum ipsum.', 'uploads/WlVi1uwGQN0uaF3Xpa44IATXHE11GoDmbE1pVnHX.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_promocion`
--

CREATE TABLE `tbl_promocion` (
  `id` int(11) NOT NULL,
  `url_pdf` varchar(255) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_promocion`
--

INSERT INTO `tbl_promocion` (`id`, `url_pdf`, `nombre`, `activo`) VALUES
(1, 'uploads/promo/Yo0ZiMFEx1jyKHnX8FqzR3NAV2HVzDbTp4OExqfl.pdf', 'promoción 2020-2021', 1),
(2, '', 'prueba', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_rol`
--

CREATE TABLE `tbl_rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_rol`
--

INSERT INTO `tbl_rol` (`id`, `nombre`) VALUES
(1, 'administrador'),
(2, 'secretaría'),
(3, 'trabajador_empresa'),
(4, 'trabajador_subcontratado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_stock`
--

CREATE TABLE `tbl_stock` (
  `id` int(11) NOT NULL,
  `nombre_producto` varchar(200) NOT NULL,
  `cantidad` mediumint(3) NOT NULL,
  `precio_unidad` decimal(20,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_stock`
--

INSERT INTO `tbl_stock` (`id`, `nombre_producto`, `cantidad`, `precio_unidad`) VALUES
(2, 'Puerta1', 136, '200.00'),
(5, 'Puerta2', 2005, '256.00'),
(6, 'Puerta3', 121, '120.00'),
(8, 'Puerta5', 6, '62.00'),
(9, '3', 32, NULL),
(12, 'Puerta23', 4, '23.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_suma_horas`
--

CREATE TABLE `tbl_suma_horas` (
  `id` int(11) NOT NULL,
  `id_hoja_trabajo` int(11) NOT NULL,
  `id_empleado` int(11) NOT NULL,
  `horas_totales` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_cliente`
--

CREATE TABLE `tbl_tipo_cliente` (
  `id` int(11) NOT NULL,
  `nombre_tipo_cliente` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tipo_cliente`
--

INSERT INTO `tbl_tipo_cliente` (`id`, `nombre_tipo_cliente`) VALUES
(1, 'Empresa'),
(2, 'Particular');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_trabajo`
--

CREATE TABLE `tbl_tipo_trabajo` (
  `id` int(11) NOT NULL,
  `nombre_tipo_trabajo` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_tipo_trabajo`
--

INSERT INTO `tbl_tipo_trabajo` (`id`, `nombre_tipo_trabajo`) VALUES
(1, 'Instalación'),
(2, 'Garantía'),
(3, 'Reparación'),
(4, 'Mantenimiento');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `id_card` varchar(50) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido1` varchar(255) NOT NULL,
  `apellido2` varchar(255) DEFAULT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `passwd` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id`, `id_rol`, `id_card`, `nombre`, `apellido1`, `apellido2`, `telefono`, `correo`, `estado`, `passwd`) VALUES
(3, 1, '232323231', 'Judit', 'Castedo', 'Va', '644321234', 'juditprueba1@gmail.com', 1, '81dc9bdb52d04dc20036dbd8313ed055'),
(16, 2, '2wet', '2w3e4r5t', 'q2w3e4rt5yu', 'qwerty', '1234', 'secretaria@gmail.com', 1, '81dc9bdb52d04dc20036dbd8313ed055'),
(17, 3, '3456789', 'Juan', 'Pérez', NULL, '23456789', 'jperez@gmail.com', 1, '81dc9bdb52d04dc20036dbd8313ed055'),
(18, 4, 'qw3e4rt', '45', '1', '12', '12', 'g@g.c', 1, '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_blog`
--
ALTER TABLE `tbl_blog`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_catalogo`
--
ALTER TABLE `tbl_catalogo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jerarquia` (`id_jerarquia`);

--
-- Indices de la tabla `tbl_compartir_hoja`
--
ALTER TABLE `tbl_compartir_hoja`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hoja_trabajo` (`id_hoja_trabajo`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `tbl_hoja_trabajo`
--
ALTER TABLE `tbl_hoja_trabajo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo_cliente` (`id_tipo_cliente`),
  ADD KEY `id_tipo_trabajo` (`id_tipo_trabajo`),
  ADD KEY `id_empleado` (`id_empleado_propietario`);

--
-- Indices de la tabla `tbl_horas`
--
ALTER TABLE `tbl_horas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hoja_trabajo` (`id_hoja_trabajo`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `tbl_horas_totales`
--
ALTER TABLE `tbl_horas_totales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hoja_trabajo` (`id_hoja_trabajo`),
  ADD KEY `id_empleado` (`id_empleado`);

--
-- Indices de la tabla `tbl_img_presupuesto`
--
ALTER TABLE `tbl_img_presupuesto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_presupuesto` (`id_presupuesto`);

--
-- Indices de la tabla `tbl_img_promocion`
--
ALTER TABLE `tbl_img_promocion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_promocion` (`id_promocion`);

--
-- Indices de la tabla `tbl_jerarquia`
--
ALTER TABLE `tbl_jerarquia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_material_hojatrabajo`
--
ALTER TABLE `tbl_material_hojatrabajo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_hojaTrabajo` (`id_hojaTrabajo`);

--
-- Indices de la tabla `tbl_material_presupuesto`
--
ALTER TABLE `tbl_material_presupuesto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_presupuesto` (`id_presupuesto`);

--
-- Indices de la tabla `tbl_presupuesto`
--
ALTER TABLE `tbl_presupuesto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_producto`
--
ALTER TABLE `tbl_producto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_jerarquia` (`id_jerarquia`);

--
-- Indices de la tabla `tbl_promocion`
--
ALTER TABLE `tbl_promocion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_stock`
--
ALTER TABLE `tbl_stock`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_suma_horas`
--
ALTER TABLE `tbl_suma_horas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_empleado` (`id_empleado`),
  ADD KEY `id_hoja_trabajo` (`id_hoja_trabajo`);

--
-- Indices de la tabla `tbl_tipo_cliente`
--
ALTER TABLE `tbl_tipo_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_tipo_trabajo`
--
ALTER TABLE `tbl_tipo_trabajo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_card` (`id_card`,`correo`),
  ADD KEY `tbl_usuario_ibfk_1` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_blog`
--
ALTER TABLE `tbl_blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_catalogo`
--
ALTER TABLE `tbl_catalogo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `tbl_compartir_hoja`
--
ALTER TABLE `tbl_compartir_hoja`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `tbl_hoja_trabajo`
--
ALTER TABLE `tbl_hoja_trabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT de la tabla `tbl_horas`
--
ALTER TABLE `tbl_horas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `tbl_horas_totales`
--
ALTER TABLE `tbl_horas_totales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_img_presupuesto`
--
ALTER TABLE `tbl_img_presupuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `tbl_img_promocion`
--
ALTER TABLE `tbl_img_promocion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tbl_material_hojatrabajo`
--
ALTER TABLE `tbl_material_hojatrabajo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `tbl_material_presupuesto`
--
ALTER TABLE `tbl_material_presupuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `tbl_presupuesto`
--
ALTER TABLE `tbl_presupuesto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT de la tabla `tbl_producto`
--
ALTER TABLE `tbl_producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `tbl_promocion`
--
ALTER TABLE `tbl_promocion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_rol`
--
ALTER TABLE `tbl_rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tbl_stock`
--
ALTER TABLE `tbl_stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `tbl_suma_horas`
--
ALTER TABLE `tbl_suma_horas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_compartir_hoja`
--
ALTER TABLE `tbl_compartir_hoja`
  ADD CONSTRAINT `tbl_compartir_hoja_ibfk_1` FOREIGN KEY (`id_hoja_trabajo`) REFERENCES `tbl_hoja_trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_compartir_hoja_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `tbl_usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_hoja_trabajo`
--
ALTER TABLE `tbl_hoja_trabajo`
  ADD CONSTRAINT `tbl_hoja_trabajo_ibfk_1` FOREIGN KEY (`id_tipo_cliente`) REFERENCES `tbl_tipo_cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_hoja_trabajo_ibfk_2` FOREIGN KEY (`id_tipo_trabajo`) REFERENCES `tbl_tipo_trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_horas`
--
ALTER TABLE `tbl_horas`
  ADD CONSTRAINT `tbl_horas_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `tbl_usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_horas_ibfk_2` FOREIGN KEY (`id_hoja_trabajo`) REFERENCES `tbl_hoja_trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_horas_totales`
--
ALTER TABLE `tbl_horas_totales`
  ADD CONSTRAINT `tbl_horas_totales_ibfk_1` FOREIGN KEY (`id_empleado`) REFERENCES `tbl_usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_horas_totales_ibfk_2` FOREIGN KEY (`id_hoja_trabajo`) REFERENCES `tbl_hoja_trabajo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_img_presupuesto`
--
ALTER TABLE `tbl_img_presupuesto`
  ADD CONSTRAINT `tbl_img_presupuesto_ibfk_1` FOREIGN KEY (`id_presupuesto`) REFERENCES `tbl_presupuesto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_material_hojatrabajo`
--
ALTER TABLE `tbl_material_hojatrabajo`
  ADD CONSTRAINT `tbl_material_hojatrabajo_ibfk_1` FOREIGN KEY (`id_hojaTrabajo`) REFERENCES `tbl_hoja_trabajo` (`id`);

--
-- Filtros para la tabla `tbl_material_presupuesto`
--
ALTER TABLE `tbl_material_presupuesto`
  ADD CONSTRAINT `tbl_material_presupuesto_ibfk_1` FOREIGN KEY (`id_presupuesto`) REFERENCES `tbl_presupuesto` (`id`);

--
-- Filtros para la tabla `tbl_suma_horas`
--
ALTER TABLE `tbl_suma_horas`
  ADD CONSTRAINT `tbl_suma_horas_ibfk_1` FOREIGN KEY (`id_hoja_trabajo`) REFERENCES `tbl_hoja_trabajo` (`id`),
  ADD CONSTRAINT `tbl_suma_horas_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `tbl_usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
