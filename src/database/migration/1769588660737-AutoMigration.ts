import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1769588660737 implements MigrationInterface {
    name = 'AutoMigration1769588660737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."inbodies_source_enum" AS ENUM('ocr', 'manual')`);
        await queryRunner.query(`CREATE TABLE "inbodies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "weight" double precision NOT NULL, "skeletalMuscleMass" double precision, "bodyFatMass" double precision, "bodyFatPercentage" double precision, "bmi" double precision, "basalMetabolicRate" integer, "visceralFatLevel" integer, "imageUrl" character varying, "source" "public"."inbodies_source_enum" NOT NULL DEFAULT 'ocr', "measuredAt" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_7b9ffff772152b25a4ff2da29a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exercises_primarymuscle_enum" AS ENUM('chest', 'back', 'shoulder', 'arm', 'leg', 'core')`);
        await queryRunner.query(`CREATE TYPE "public"."exercises_category_enum" AS ENUM('free_weight', 'machine', 'body_weight')`);
        await queryRunner.query(`CREATE TYPE "public"."exercises_equipment_enum" AS ENUM('barbell', 'dumbbell', 'machine', 'body')`);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "englishName" character varying, "description" text, "imageUrl" character varying, "primaryMuscle" "public"."exercises_primarymuscle_enum" NOT NULL, "category" "public"."exercises_category_enum" NOT NULL, "equipment" "public"."exercises_equipment_enum" NOT NULL, "defaultRestSeconds" integer NOT NULL DEFAULT '90', "incrementUnit" double precision NOT NULL DEFAULT '2.5', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weight_recommendation_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recommendedWeight" double precision NOT NULL, "actualWeight" double precision NOT NULL, "isFollowed" boolean NOT NULL DEFAULT false, "reason" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "setId" uuid, CONSTRAINT "PK_4f92ff2d96baa50fdf049e0d183" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workout_sets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "setNumber" integer NOT NULL, "weight" double precision NOT NULL, "reps" integer NOT NULL, "isSuccess" boolean NOT NULL DEFAULT true, "isRecommended" boolean NOT NULL DEFAULT false, "restSeconds" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "sessionId" uuid, "exerciseId" uuid, CONSTRAINT "PK_5ad75c97e58e8c660a48926d438" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_cb4823ab0bc046215da7045d22" ON "workout_sets" ("sessionId", "exerciseId", "setNumber") `);
        await queryRunner.query(`CREATE TABLE "workout_sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workoutDate" date NOT NULL, "startedAt" TIMESTAMP, "endedAt" TIMESTAMP, "totalVolume" double precision, "memo" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_eea00e05dc78d40b55a588c9f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_b951d5ee60b6a68861ab9af1f4" ON "workout_sessions" ("userId", "workoutDate") `);
        await queryRunner.query(`CREATE TYPE "public"."users_provider_enum" AS ENUM('google', 'apple')`);
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female', 'other')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provider" "public"."users_provider_enum" NOT NULL, "providerId" character varying(255) NOT NULL, "email" character varying(320) NOT NULL, "nickname" character varying(50) NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "birthDate" date, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ae9a93b13bce1425823c8ecd07" ON "users" ("provider", "providerId") `);
        await queryRunner.query(`ALTER TABLE "inbodies" ADD CONSTRAINT "FK_45a55431e7f5c8141c85967dc39" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weight_recommendation_logs" ADD CONSTRAINT "FK_2b5446781727b741259cd4222f8" FOREIGN KEY ("setId") REFERENCES "workout_sets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_sets" ADD CONSTRAINT "FK_c6a038f556e71b7b4c4d366484b" FOREIGN KEY ("sessionId") REFERENCES "workout_sessions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_sets" ADD CONSTRAINT "FK_b6f291312131dd1fa81a5bea995" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "workout_sessions" ADD CONSTRAINT "FK_b4b5ff8f7c2cb3c3c18e07cc5ce" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workout_sessions" DROP CONSTRAINT "FK_b4b5ff8f7c2cb3c3c18e07cc5ce"`);
        await queryRunner.query(`ALTER TABLE "workout_sets" DROP CONSTRAINT "FK_b6f291312131dd1fa81a5bea995"`);
        await queryRunner.query(`ALTER TABLE "workout_sets" DROP CONSTRAINT "FK_c6a038f556e71b7b4c4d366484b"`);
        await queryRunner.query(`ALTER TABLE "weight_recommendation_logs" DROP CONSTRAINT "FK_2b5446781727b741259cd4222f8"`);
        await queryRunner.query(`ALTER TABLE "inbodies" DROP CONSTRAINT "FK_45a55431e7f5c8141c85967dc39"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae9a93b13bce1425823c8ecd07"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_provider_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b951d5ee60b6a68861ab9af1f4"`);
        await queryRunner.query(`DROP TABLE "workout_sessions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb4823ab0bc046215da7045d22"`);
        await queryRunner.query(`DROP TABLE "workout_sets"`);
        await queryRunner.query(`DROP TABLE "weight_recommendation_logs"`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TYPE "public"."exercises_equipment_enum"`);
        await queryRunner.query(`DROP TYPE "public"."exercises_category_enum"`);
        await queryRunner.query(`DROP TYPE "public"."exercises_primarymuscle_enum"`);
        await queryRunner.query(`DROP TABLE "inbodies"`);
        await queryRunner.query(`DROP TYPE "public"."inbodies_source_enum"`);
    }

}
