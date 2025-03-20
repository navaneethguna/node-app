import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/common/database/database.module';
import { envConfig } from './shared/config/app.config';
import { User } from './modules/common/entities/user.entity';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  providers: [
    AppService
  ],
  controllers: [AppController],
})
export class AppModule { }
