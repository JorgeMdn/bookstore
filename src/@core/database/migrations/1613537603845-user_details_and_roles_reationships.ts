import {MigrationInterface, QueryRunner} from "typeorm";

export class userDetailsAndRolesReationships1613537603845 implements MigrationInterface {
    name = 'userDetailsAndRolesReationships1613537603845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UserDetails" ("pk_user_details" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying, "mother_last_name" character varying, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, CONSTRAINT "PK_11c82f2ba592b9e13cbe1f1d55e" PRIMARY KEY ("pk_user_details"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("pk_user" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, "fk_detail" integer NOT NULL, CONSTRAINT "UQ_ffc81a3b97dcbf8e320d5106c0d" UNIQUE ("username"), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "REL_2198630cc5e91e1bcda13e5962" UNIQUE ("fk_detail"), CONSTRAINT "PK_67f9b0c8dfaef7a248140f98673" PRIMARY KEY ("pk_user"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("pk_role" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, CONSTRAINT "PK_efdbc8c4ef3a5e9fe7c7fe770f9" PRIMARY KEY ("pk_role"))`);
        await queryRunner.query(`CREATE TABLE "UserRole" ("usersPkUser" integer NOT NULL, "rolePkRole" integer NOT NULL, CONSTRAINT "PK_dc7a5899f7187767dd2af94a4cc" PRIMARY KEY ("usersPkUser", "rolePkRole"))`);
        await queryRunner.query(`CREATE INDEX "IDX_31def1d099d596feec0f1f42c2" ON "UserRole" ("usersPkUser") `);
        await queryRunner.query(`CREATE INDEX "IDX_be20b77263bd279aafcf9152f8" ON "UserRole" ("rolePkRole") `);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_2198630cc5e91e1bcda13e5962d" FOREIGN KEY ("fk_detail") REFERENCES "UserDetails"("pk_user_details") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_31def1d099d596feec0f1f42c27" FOREIGN KEY ("usersPkUser") REFERENCES "Users"("pk_user") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "UserRole" ADD CONSTRAINT "FK_be20b77263bd279aafcf9152f8c" FOREIGN KEY ("rolePkRole") REFERENCES "Role"("pk_role") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_be20b77263bd279aafcf9152f8c"`);
        await queryRunner.query(`ALTER TABLE "UserRole" DROP CONSTRAINT "FK_31def1d099d596feec0f1f42c27"`);
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_2198630cc5e91e1bcda13e5962d"`);
        await queryRunner.query(`DROP INDEX "IDX_be20b77263bd279aafcf9152f8"`);
        await queryRunner.query(`DROP INDEX "IDX_31def1d099d596feec0f1f42c2"`);
        await queryRunner.query(`DROP TABLE "UserRole"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "UserDetails"`);
    }

}
