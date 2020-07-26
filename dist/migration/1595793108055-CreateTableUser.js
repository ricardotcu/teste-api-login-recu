"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTableUser1595793108055 = void 0;

class CreateTableUser1595793108055 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "user" ("id" int NOT NULL,
          "nome" character varying(100) NOT NULL,
          "email" character varying(100) UNIQUE NOT NULL,
          "senha" character varying(100) NOT NULL,
          CONSTRAINT "PK_234512aefbb11a5b2fa92696828" PRIMARY KEY ("id"))`);
  }

  async down(queryRunner) {}

}

exports.CreateTableUser1595793108055 = CreateTableUser1595793108055;