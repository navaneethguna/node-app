import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742412036314 implements MigrationInterface {
    name = 'Migration1742412036314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "USER_M" ("USER_ID" integer NOT NULL, "USER_NAME" character varying(100) NOT NULL, CONSTRAINT "PK_ed27a2fa23b427da5db834401db" PRIMARY KEY ("USER_ID"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "USER_M"`);
    }

}
