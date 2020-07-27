"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delUserCreateUser1595814589469 = void 0;

class delUserCreateUser1595814589469 {
  async up(queryRunner) {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "nome" character varying(100) NOT NULL,
          "email" character varying(100) UNIQUE NOT NULL,
          "senha" character varying(100) NOT NULL,
          CONSTRAINT "PK_234512aefbb11a5b2fa92696828" PRIMARY KEY ("id"))`);
  }

  async down(queryRunner) {
    `DROP TABLE "user"`;
  }

}

exports.delUserCreateUser1595814589469 = delUserCreateUser1595814589469;