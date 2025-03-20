import { MigrationInterface, QueryRunner } from 'typeorm';
import csvParser from 'csv-parser';
import * as fs from 'fs-extra';
import { envConfig } from '../../src/shared/config/app.config';
import { User } from '../../src/modules/common/entities/user.entity';

export class Migration1742414823490 implements MigrationInterface {
  name = 'Migration1742414823490';

  public async seedUser(queryRunner: QueryRunner): Promise<void> {
    const csvFilePath = envConfig.seedBasePath + '/' + envConfig.seedUserFile;
    const users = await this.parseUserCsvData(csvFilePath);
    await queryRunner.manager.createQueryBuilder().insert().into(User).values(users).orIgnore(`DO NOTHING`).execute();
    console.log('User master data seeded successfully!', {});
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.seedUser(queryRunner);
  }

  
  public async deleteUser(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().delete().from(User).execute();
  }


  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.deleteUser(queryRunner);
  }
  private async parseUserCsvData(csvFilePath: string): Promise<User[]> {
    const users: User[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csvParser({ separator: ';' }))
        .on('data', (data) => {
          const user = this.parseUserData(data);
          if (Object.keys(user).length > 0) {
            users.push(user);
          }
        })
        .on('end', () => {
          resolve(users);
        })
        .on('error', (error) => {
          console.error('error in users master seed service', {});
          reject(error);
        });
    });
  }

  parseUserData(data) {
    const user = new User();

    if (data.USER_ID && data.USER_NAME) {
      user.id = data.USER_ID;
      user.name = data.USER_NAME;
    }
    return user;
  }
}
