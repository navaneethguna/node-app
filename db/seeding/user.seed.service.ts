import { Repository } from 'typeorm';
import * as fs from 'fs-extra';
import csvParser from 'csv-parser';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { envConfig } from '../../src/shared/config/app.config';
import { User } from '../../src/modules/common/entities/user.entity';
@Injectable()
export class UserSeedService {
  constructor(
    private readonly userRepository: Repository<User>
  ) {}

  async seed() {
    const csvFilePath = envConfig.seedBasePath + '/user.csv';
    const users = await this.parseCsvData(csvFilePath);
    await this.userRepository.createQueryBuilder().insert().into(User).values(users).orIgnore(`DO NOTHING`).execute();
    console.debug('User master data seeded successfully!', {});
  }

  private async parseCsvData(csvFilePath: string): Promise<User[]> {
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

    if (data.ID && data.NAME) {
      user.id = data.ID;
      user.name = data.NAME;
    }

    return user;
  }
}
