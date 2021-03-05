import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampNullable1614924247724 implements MigrationInterface {
    name = 'timestampNullable1614924247724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_by" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_at" SET NOT NULL`);
    }

}
