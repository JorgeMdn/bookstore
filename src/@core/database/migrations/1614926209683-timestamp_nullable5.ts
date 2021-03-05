import {MigrationInterface, QueryRunner} from "typeorm";

export class timestampNullable51614926209683 implements MigrationInterface {
    name = 'timestampNullable51614926209683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."updated_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "UserDetail"."name" IS NULL`);
        await queryRunner.query(`ALTER TABLE "UserDetail" ALTER COLUMN "name" SET NOT NULL`);
    }

}
