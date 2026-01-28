import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1769579086305 implements MigrationInterface {
    name = 'AutoMigration1769579086305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "userAlram" ("id" SERIAL NOT NULL, "alramInit" character varying NOT NULL, "status" boolean NOT NULL, "userId" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_3738e819cee8ab901675923af45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "email" character varying, "password" character varying NOT NULL, "providerId" character varying NOT NULL, "provider" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "testColumn" character varying, CONSTRAINT "UQ_0ad4792ebd254550ad4fdb55d6b" UNIQUE ("providerId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "userAlram" ADD CONSTRAINT "FK_6174305fa3af10e9c80a24ecb73" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "userAlram" DROP CONSTRAINT "FK_6174305fa3af10e9c80a24ecb73"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "userAlram"`);
    }

}
