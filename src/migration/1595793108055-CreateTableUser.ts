import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUser1595793108055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `CREATE TABLE "user" ("id" int NOT NULL,
          "nome" character varying(100) NOT NULL,
          "email" character varying(100) UNIQUE NOT NULL,
          "senha" character varying(100) NOT NULL,
          CONSTRAINT "PK_234512aefbb11a5b2fa92696828" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
