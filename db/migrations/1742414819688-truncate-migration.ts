import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742414819688 implements MigrationInterface {
    name = 'Migration1742414819688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`TRUNCATE "USER_M" RESTART IDENTITY CASCADE;`);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {}

}
