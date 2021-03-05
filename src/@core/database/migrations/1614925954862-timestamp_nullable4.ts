import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampNullable41614925954862 implements MigrationInterface {
    name = 'timestampNullable41614925954862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserDetail" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."updated_by" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "Role"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "Role"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "Role" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "User"."created_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "User" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_by" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ADD "created_by" TIMESTAMP NOT NULL`);
    }

}
