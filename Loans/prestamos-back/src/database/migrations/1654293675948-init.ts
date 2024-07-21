import { MigrationInterface, QueryRunner } from "typeorm";

export class init1654293675948 implements MigrationInterface {
    name = 'init1654293675948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`modulos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`modulo\` varchar(150) NOT NULL, \`activo\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(255) NOT NULL, \`descripcion\` varchar(255) NOT NULL DEFAULT '', \`nivel\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(150) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(255) NOT NULL, \`nombre\` varchar(150) NULL, \`apellido\` varchar(150) NULL, \`provincia\` varchar(150) NULL, \`localidad\` varchar(150) NULL, \`avatar\` varchar(255) NULL, \`telefono\` varchar(30) NULL, \`domicilio\` varchar(40) NULL, \`recpass\` varchar(6) NULL, \`created_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`activo\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`prestamos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`monto\` double NOT NULL, \`valor_cuota\` double NOT NULL, \`fecha_hora\` timestamp NULL, \`vencimiento\` timestamp NULL, \`tasa_interes\` double NULL, \`intereses\` double NULL, \`cantidad_cuotas\` int NULL, \`cuotas_pagadas\` int NULL, \`tipo_pago\` varchar(255) NULL, \`saldo\` double NULL, \`estado\` varchar(255) NULL, \`usuarioIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pagos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`monto\` double NOT NULL, \`ganancia\` double NOT NULL, \`interes\` tinyint NOT NULL, \`tasa_interes\` int NULL, \`fecha_hora\` timestamp NOT NULL, \`nro_cuota\` int NOT NULL, \`prestamoIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios_roles\` (\`usuarios\` int NOT NULL, \`roles\` int NOT NULL, INDEX \`IDX_536f1b37079700f1169ce0f5e3\` (\`usuarios\`), INDEX \`IDX_85a49331d45a9c67483200e0a6\` (\`roles\`), PRIMARY KEY (\`usuarios\`, \`roles\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios_modulos\` (\`usuarios\` int NOT NULL, \`modulos\` int NOT NULL, INDEX \`IDX_058b2b3c23acdea2d20db2fed1\` (\`usuarios\`), INDEX \`IDX_37530c4aeb7a297c30fdbd2215\` (\`modulos\`), PRIMARY KEY (\`usuarios\`, \`modulos\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`prestamos\` ADD CONSTRAINT \`FK_2f966239d2370e50095dd4647f6\` FOREIGN KEY (\`usuarioIdId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pagos\` ADD CONSTRAINT \`FK_24c4d5da7d8eaca755fb1a22600\` FOREIGN KEY (\`prestamoIdId\`) REFERENCES \`prestamos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios_roles\` ADD CONSTRAINT \`FK_536f1b37079700f1169ce0f5e30\` FOREIGN KEY (\`usuarios\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`usuarios_roles\` ADD CONSTRAINT \`FK_85a49331d45a9c67483200e0a62\` FOREIGN KEY (\`roles\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuarios_modulos\` ADD CONSTRAINT \`FK_058b2b3c23acdea2d20db2fed15\` FOREIGN KEY (\`usuarios\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`usuarios_modulos\` ADD CONSTRAINT \`FK_37530c4aeb7a297c30fdbd2215d\` FOREIGN KEY (\`modulos\`) REFERENCES \`modulos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`usuarios_modulos\` DROP FOREIGN KEY \`FK_37530c4aeb7a297c30fdbd2215d\``);
        await queryRunner.query(`ALTER TABLE \`usuarios_modulos\` DROP FOREIGN KEY \`FK_058b2b3c23acdea2d20db2fed15\``);
        await queryRunner.query(`ALTER TABLE \`usuarios_roles\` DROP FOREIGN KEY \`FK_85a49331d45a9c67483200e0a62\``);
        await queryRunner.query(`ALTER TABLE \`usuarios_roles\` DROP FOREIGN KEY \`FK_536f1b37079700f1169ce0f5e30\``);
        await queryRunner.query(`ALTER TABLE \`pagos\` DROP FOREIGN KEY \`FK_24c4d5da7d8eaca755fb1a22600\``);
        await queryRunner.query(`ALTER TABLE \`prestamos\` DROP FOREIGN KEY \`FK_2f966239d2370e50095dd4647f6\``);
        await queryRunner.query(`DROP INDEX \`IDX_37530c4aeb7a297c30fdbd2215\` ON \`usuarios_modulos\``);
        await queryRunner.query(`DROP INDEX \`IDX_058b2b3c23acdea2d20db2fed1\` ON \`usuarios_modulos\``);
        await queryRunner.query(`DROP TABLE \`usuarios_modulos\``);
        await queryRunner.query(`DROP INDEX \`IDX_85a49331d45a9c67483200e0a6\` ON \`usuarios_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_536f1b37079700f1169ce0f5e3\` ON \`usuarios_roles\``);
        await queryRunner.query(`DROP TABLE \`usuarios_roles\``);
        await queryRunner.query(`DROP TABLE \`pagos\``);
        await queryRunner.query(`DROP TABLE \`prestamos\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`modulos\``);
    }

}
