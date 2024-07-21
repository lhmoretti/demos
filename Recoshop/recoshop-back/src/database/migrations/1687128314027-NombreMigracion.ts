import { MigrationInterface, QueryRunner } from 'typeorm';

export class NombreMigracion1687128314027 implements MigrationInterface {
    name = 'NombreMigracion1687128314027';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `banners` (`id` int NOT NULL AUTO_INCREMENT, `titulo` varchar(20) NOT NULL, `descrip` varchar(255) NOT NULL, `link` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `usuarios` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(45) NOT NULL, `password` varchar(255) NOT NULL, `nombre` varchar(40) NULL, `apellido` varchar(80) NULL, `provincia` varchar(80) NULL, `localidad` varchar(80) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(40) NULL, `email` varchar(70) NULL, `recpass` varchar(6) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, `role` int NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `categorias_comercios` (`id` int NOT NULL AUTO_INCREMENT, `categoria` varchar(50) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `comercios` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NULL, `descripcion` text NULL, `plan` varchar(255) NOT NULL, `cuit` varchar(11) NULL, `banner` varchar(255) NULL, `avatar` varchar(255) NULL, `telefono` varchar(30) NULL, `domicilio` varchar(255) NULL, `localidad` varchar(255) NULL, `email` varchar(70) NULL, `created_at` timestamp NULL, `updated_at` timestamp NULL, `activo` tinyint NOT NULL DEFAULT 1, `socio_cic` tinyint NOT NULL DEFAULT 1, `mp_acuerdo_vendedor` tinyint NOT NULL DEFAULT 1, `mp_mercadopago` tinyint NOT NULL DEFAULT 0, `mp_mercadopago_qr` tinyint NOT NULL DEFAULT 0, `mp_trans_banc` tinyint NOT NULL DEFAULT 0, `mp_pago_sucursal` tinyint NOT NULL DEFAULT 0, `mp_abono_contra` tinyint NOT NULL DEFAULT 0, `mp_pago_posnet` tinyint NOT NULL DEFAULT 0, `e_acuerdo_vendedor` tinyint NOT NULL DEFAULT 1, `e_delivery` tinyint NOT NULL DEFAULT 0, `e_retiro_sucursal` tinyint NOT NULL DEFAULT 0, `access_token` varchar(255) NULL, `last_update_token` timestamp NULL, `auth_code` varchar(255) NULL, `refresh_token` varchar(255) NULL, `catComIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `marcas` (`id` int NOT NULL AUTO_INCREMENT, `marca` varchar(20) NOT NULL, `comercioIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `opiniones` (`id` int NOT NULL AUTO_INCREMENT, `opinion` varchar(255) NOT NULL, `puntaje` int NOT NULL, `fecha` date NULL, `hora` time NULL, `usuarioId` int NULL, `productoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `imagenes` (`id` int NOT NULL AUTO_INCREMENT, `img_thumb` text NULL, `url` text NULL, `productoId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `productos` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `descripcion` text NOT NULL, `unidad` int NOT NULL, `alto` int NULL, `ancho` int NULL, `profundidad` int NULL, `peso` int NULL, `precio_costo` double NULL, `precio_venta` double NOT NULL, `precio_oferta` double NULL, `oferta` tinyint NULL DEFAULT 0, `promocion` tinyint NULL DEFAULT 0, `destacado` tinyint NULL DEFAULT 0, `promocion_comercio` tinyint NULL DEFAULT 0, `destacado_comercio` tinyint NULL DEFAULT 0, `inicio` tinyint NULL DEFAULT 0, `disponible` tinyint NOT NULL DEFAULT 1, `disponible_compra` tinyint NOT NULL DEFAULT 1, `disponible_consulta` tinyint NOT NULL DEFAULT 0, `archivado` tinyint NOT NULL DEFAULT 0, `rebaja` int NULL, `sku` varchar(50) NULL, `ranking` int NULL, `stock_actual` int NULL, `marcaIdId` int NULL, `categoriaIdId` int NULL, `comercioIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `categorias` (`id` int NOT NULL AUTO_INCREMENT, `categoria` varchar(255) NOT NULL, `url_img` varchar(255) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `horarios` (`id` int NOT NULL AUTO_INCREMENT, `horario` varchar(5) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `dias` (`id` int NOT NULL AUTO_INCREMENT, `dia` varchar(10) NOT NULL, `activo` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `errores` (`id` int NOT NULL AUTO_INCREMENT, `fecha_hora` varchar(255) NOT NULL, `message` text NOT NULL, `status` int NOT NULL, `statusText` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `ok` tinyint NOT NULL, `name` varchar(255) NOT NULL, `error` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `pedidoslineas` (`id` int NOT NULL AUTO_INCREMENT, `id_prod` bigint NOT NULL, `comercioId` int NOT NULL, `cantidad` int NOT NULL, `unidad` int NOT NULL, `img` varchar(255) NULL, `nombre` varchar(50) NOT NULL, `descripcion` varchar(140) NOT NULL, `precio_venta` double NOT NULL, `precio_oferta` double NULL, `oferta` tinyint NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `pedidos` (`id` int NOT NULL AUTO_INCREMENT, `fecha_hora` timestamp NOT NULL, `fecha_entrega` date NULL, `hora_entrega` time NULL, `comentario` varchar(255) NULL, `estado` char(1) NULL, `total` double NOT NULL, `ext_ref` varchar(255) NULL, `modo_pago` varchar(255) NULL, `modo_entrega` varchar(255) NOT NULL, `usuarioIdId` int NULL, `comercioIdId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `suscripciones` (`id` int NOT NULL AUTO_INCREMENT, `nombre` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `comercio_usuario` (`usuarios` int NOT NULL, `comercios` int NOT NULL, INDEX `IDX_4e814d676f9c4ed2fa382ebae5` (`usuarios`), INDEX `IDX_576c585732e5365c01406ad9c6` (`comercios`), PRIMARY KEY (`usuarios`, `comercios`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `comercios_usuarios_usuarios` (`comerciosId` int NOT NULL, `usuariosId` int NOT NULL, INDEX `IDX_73be7cbfa942a0a630781d67e4` (`comerciosId`), INDEX `IDX_ff28accb2a0befacfbf1017e05` (`usuariosId`), PRIMARY KEY (`comerciosId`, `usuariosId`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `dias_horarios` (`dia` int NOT NULL, `horario` int NOT NULL, INDEX `IDX_84f79c7f6f2221cb4fd67a80b6` (`dia`), INDEX `IDX_da501f56ddefe8d808181782a1` (`horario`), PRIMARY KEY (`dia`, `horario`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'CREATE TABLE `pedidos_pedido_lineas_pedidoslineas` (`pedidosId` int NOT NULL, `pedidoslineasId` int NOT NULL, INDEX `IDX_d86feda82c152c081b2b7db877` (`pedidosId`), INDEX `IDX_4cfcb3ce2fc2e7b46dae76a07c` (`pedidoslineasId`), PRIMARY KEY (`pedidosId`, `pedidoslineasId`)) ENGINE=InnoDB',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercios` ADD CONSTRAINT `FK_ed84a517807052efc9bd8835afa` FOREIGN KEY (`catComIdId`) REFERENCES `categorias_comercios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `marcas` ADD CONSTRAINT `FK_447d622805896953240aca8560f` FOREIGN KEY (`comercioIdId`) REFERENCES `comercios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `opiniones` ADD CONSTRAINT `FK_3bd670054c2e6e6b4e4410433be` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `opiniones` ADD CONSTRAINT `FK_6f28d34d37bdcbf9ea724a83ea3` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `imagenes` ADD CONSTRAINT `FK_6a316a02cc75b27dc1c594e1bd9` FOREIGN KEY (`productoId`) REFERENCES `productos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `productos` ADD CONSTRAINT `FK_411531501bad70cc7edca01c107` FOREIGN KEY (`marcaIdId`) REFERENCES `marcas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `productos` ADD CONSTRAINT `FK_b8c37a4a8897ff913f386d18fce` FOREIGN KEY (`categoriaIdId`) REFERENCES `categorias`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `productos` ADD CONSTRAINT `FK_e15d7727a921af2c05037a54c5e` FOREIGN KEY (`comercioIdId`) REFERENCES `comercios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos` ADD CONSTRAINT `FK_9de5fd3cba23f3ad6ad00f13ebd` FOREIGN KEY (`usuarioIdId`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos` ADD CONSTRAINT `FK_2199e360c838096bab48467722c` FOREIGN KEY (`comercioIdId`) REFERENCES `comercios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercio_usuario` ADD CONSTRAINT `FK_4e814d676f9c4ed2fa382ebae55` FOREIGN KEY (`usuarios`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercio_usuario` ADD CONSTRAINT `FK_576c585732e5365c01406ad9c6a` FOREIGN KEY (`comercios`) REFERENCES `comercios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercios_usuarios_usuarios` ADD CONSTRAINT `FK_73be7cbfa942a0a630781d67e46` FOREIGN KEY (`comerciosId`) REFERENCES `comercios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercios_usuarios_usuarios` ADD CONSTRAINT `FK_ff28accb2a0befacfbf1017e051` FOREIGN KEY (`usuariosId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `dias_horarios` ADD CONSTRAINT `FK_84f79c7f6f2221cb4fd67a80b6b` FOREIGN KEY (`dia`) REFERENCES `dias`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `dias_horarios` ADD CONSTRAINT `FK_da501f56ddefe8d808181782a1f` FOREIGN KEY (`horario`) REFERENCES `horarios`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos_pedido_lineas_pedidoslineas` ADD CONSTRAINT `FK_d86feda82c152c081b2b7db8778` FOREIGN KEY (`pedidosId`) REFERENCES `pedidos`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos_pedido_lineas_pedidoslineas` ADD CONSTRAINT `FK_4cfcb3ce2fc2e7b46dae76a07cd` FOREIGN KEY (`pedidoslineasId`) REFERENCES `pedidoslineas`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE `pedidos_pedido_lineas_pedidoslineas` DROP FOREIGN KEY `FK_4cfcb3ce2fc2e7b46dae76a07cd`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos_pedido_lineas_pedidoslineas` DROP FOREIGN KEY `FK_d86feda82c152c081b2b7db8778`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `dias_horarios` DROP FOREIGN KEY `FK_da501f56ddefe8d808181782a1f`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `dias_horarios` DROP FOREIGN KEY `FK_84f79c7f6f2221cb4fd67a80b6b`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercios_usuarios_usuarios` DROP FOREIGN KEY `FK_ff28accb2a0befacfbf1017e051`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercios_usuarios_usuarios` DROP FOREIGN KEY `FK_73be7cbfa942a0a630781d67e46`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercio_usuario` DROP FOREIGN KEY `FK_576c585732e5365c01406ad9c6a`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercio_usuario` DROP FOREIGN KEY `FK_4e814d676f9c4ed2fa382ebae55`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos` DROP FOREIGN KEY `FK_2199e360c838096bab48467722c`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `pedidos` DROP FOREIGN KEY `FK_9de5fd3cba23f3ad6ad00f13ebd`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `productos` DROP FOREIGN KEY `FK_e15d7727a921af2c05037a54c5e`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `productos` DROP FOREIGN KEY `FK_b8c37a4a8897ff913f386d18fce`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `productos` DROP FOREIGN KEY `FK_411531501bad70cc7edca01c107`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `imagenes` DROP FOREIGN KEY `FK_6a316a02cc75b27dc1c594e1bd9`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `opiniones` DROP FOREIGN KEY `FK_6f28d34d37bdcbf9ea724a83ea3`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `opiniones` DROP FOREIGN KEY `FK_3bd670054c2e6e6b4e4410433be`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `marcas` DROP FOREIGN KEY `FK_447d622805896953240aca8560f`',
            undefined,
        );
        await queryRunner.query(
            'ALTER TABLE `comercios` DROP FOREIGN KEY `FK_ed84a517807052efc9bd8835afa`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_4cfcb3ce2fc2e7b46dae76a07c` ON `pedidos_pedido_lineas_pedidoslineas`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_d86feda82c152c081b2b7db877` ON `pedidos_pedido_lineas_pedidoslineas`',
            undefined,
        );
        await queryRunner.query(
            'DROP TABLE `pedidos_pedido_lineas_pedidoslineas`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_da501f56ddefe8d808181782a1` ON `dias_horarios`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_84f79c7f6f2221cb4fd67a80b6` ON `dias_horarios`',
            undefined,
        );
        await queryRunner.query('DROP TABLE `dias_horarios`', undefined);
        await queryRunner.query(
            'DROP INDEX `IDX_ff28accb2a0befacfbf1017e05` ON `comercios_usuarios_usuarios`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_73be7cbfa942a0a630781d67e4` ON `comercios_usuarios_usuarios`',
            undefined,
        );
        await queryRunner.query(
            'DROP TABLE `comercios_usuarios_usuarios`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_576c585732e5365c01406ad9c6` ON `comercio_usuario`',
            undefined,
        );
        await queryRunner.query(
            'DROP INDEX `IDX_4e814d676f9c4ed2fa382ebae5` ON `comercio_usuario`',
            undefined,
        );
        await queryRunner.query('DROP TABLE `comercio_usuario`', undefined);
        await queryRunner.query('DROP TABLE `suscripciones`', undefined);
        await queryRunner.query('DROP TABLE `pedidos`', undefined);
        await queryRunner.query('DROP TABLE `pedidoslineas`', undefined);
        await queryRunner.query('DROP TABLE `errores`', undefined);
        await queryRunner.query('DROP TABLE `dias`', undefined);
        await queryRunner.query('DROP TABLE `horarios`', undefined);
        await queryRunner.query('DROP TABLE `categorias`', undefined);
        await queryRunner.query('DROP TABLE `productos`', undefined);
        await queryRunner.query('DROP TABLE `imagenes`', undefined);
        await queryRunner.query('DROP TABLE `opiniones`', undefined);
        await queryRunner.query('DROP TABLE `marcas`', undefined);
        await queryRunner.query('DROP TABLE `comercios`', undefined);
        await queryRunner.query('DROP TABLE `categorias_comercios`', undefined);
        await queryRunner.query('DROP TABLE `usuarios`', undefined);
        await queryRunner.query('DROP TABLE `banners`', undefined);
    }
}
