import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampNullable31614925115555 implements MigrationInterface {
    name = 'timestampNullable31614925115555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_at" IS NULL`);
    }

}
