import { MigrationInterface, QueryRunner } from "typeorm";

export class Proddb1769674052325 implements MigrationInterface {
    name = 'Proddb1769674052325'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstName" varchar(100) NOT NULL, "lastName" varchar(100) NOT NULL, "email" varchar(150) NOT NULL, "age" integer NOT NULL, "ssn" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
