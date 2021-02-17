import {MigrationInterface, QueryRunner} from "typeorm";

export class updateNameToUserDetailTableAndRelathionship1613537887124 implements MigrationInterface {
    name = 'updateNameToUserDetailTableAndRelathionship1613537887124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_2198630cc5e91e1bcda13e5962d"`);
        await queryRunner.query(`CREATE TABLE "UserDetail" ("pk_user_detail" SERIAL NOT NULL, "name" character varying NOT NULL, "last_name" character varying, "mother_last_name" character varying, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, "created_by" TIMESTAMP NOT NULL, "updated_by" TIMESTAMP NOT NULL, CONSTRAINT "PK_df893d205418d16f5eab36ba10b" PRIMARY KEY ("pk_user_detail"))`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_2198630cc5e91e1bcda13e5962d" FOREIGN KEY ("fk_detail") REFERENCES "UserDetail"("pk_user_detail") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP CONSTRAINT "FK_2198630cc5e91e1bcda13e5962d"`);
        await queryRunner.query(`DROP TABLE "UserDetail"`);
        await queryRunner.query(`ALTER TABLE "Users" ADD CONSTRAINT "FK_2198630cc5e91e1bcda13e5962d" FOREIGN KEY ("fk_detail") REFERENCES "UserDetails"("pk_user_details") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
