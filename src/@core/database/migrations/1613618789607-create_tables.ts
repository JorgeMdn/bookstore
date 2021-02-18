import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1613618789607 implements MigrationInterface {
    name = 'createTables1613618789607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserDetail" ("pk_user_detail" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying, "mother_last_name" character varying, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, CONSTRAINT "PK_df893d205418d16f5eab36ba10b" PRIMARY KEY ("pk_user_detail"))`);
        await queryRunner.query(`CREATE TABLE "User" ("pk_user" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, "fk_detail" integer NOT NULL, CONSTRAINT "UQ_29a05908a0fa0728526d2833657" UNIQUE ("username"), CONSTRAINT "UQ_4a257d2c9837248d70640b3e36e" UNIQUE ("email"), CONSTRAINT "REL_33ef591a37f07fce1f797e18a8" UNIQUE ("fk_detail"), CONSTRAINT "PK_4ddf875b749d85e2f831d971d11" PRIMARY KEY ("pk_user"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("pk_role" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, CONSTRAINT "PK_efdbc8c4ef3a5e9fe7c7fe770f9" PRIMARY KEY ("pk_role"))`);
        await queryRunner.query(`CREATE TABLE "UserRole" ("userPkUser" integer NOT NULL, "rolePkRole" integer NOT NULL, CONSTRAINT "PK_34fae784681024d6d3b314f7572" PRIMARY KEY ("userPkUser", "rolePkRole"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b004677898b716d6aa724d9e62" ON "UserRole" ("userPkUser") `);
        await queryRunner.query(`CREATE INDEX "IDX_be20b77263bd279aafcf9152f8" ON "UserRole" ("rolePkRole") `);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_33ef591a37f07fce1f797e18a85" FOREIGN KEY ("fk_detail") REFERENCES "UserDetail"("pk_user_detail") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_b004677898b716d6aa724d9e620" FOREIGN KEY ("userPkUser") REFERENCES "User"("pk_user") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_be20b77263bd279aafcf9152f8c" FOREIGN KEY ("rolePkRole") REFERENCES "Role"("pk_role") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_be20b77263bd279aafcf9152f8c"`);
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_b004677898b716d6aa724d9e620"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_33ef591a37f07fce1f797e18a85"`);
        await queryRunner.query(`DROP INDEX "IDX_be20b77263bd279aafcf9152f8"`);
        await queryRunner.query(`DROP INDEX "IDX_b004677898b716d6aa724d9e62"`);
        await queryRunner.query(`DROP TABLE "UserRole"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "UserDetail"`);
    }

}
