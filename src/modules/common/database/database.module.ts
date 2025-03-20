import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path, { join } from 'path';
import { envConfig } from 'src/shared/config/app.config';
import * as fs from 'fs-extra'


@Module({
  // Import TypeOrmModule with forRootAsync method
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [], // Import the module that exports SecretManagerService
      // Use factory function to configure TypeOrm
      useFactory: async () => {
        try {
          // Fetch all secrets from SecretManagerService
         
          // Return TypeOrm configuration
          return {
            type: 'postgres',
            // Get host from secrets
            host: envConfig.db.postgres.host,
            // Get port from secrets
            port: Number(envConfig.db.postgres.port),
            // Get database name from envConfig
            database: envConfig.db.postgres.name,
            // Get username from secrets
            username: envConfig.db.postgres.username,
            // Get password from secrets
            password: envConfig.db.postgres.password,
            // Define entities
            entities: [join(__dirname, '/../**', '*.entity.{ts,js}')],
            // Set synchronize to false for production
            synchronize: false,
            // Uncomment to enable SSL
            poolSize: envConfig.db.postgres.poolsize,
            connectTimeoutMS: envConfig.db.postgres.connectionTimeoutInMS,
            ssl: {
              rejectUnauthorized: false,
              ca: fs.readFileSync('src/shared/certs/dev-server-ca.pem').toString(),
              key: fs.readFileSync('src/shared/certs/dev-client-key.pem').toString(),
              cert: fs.readFileSync('src/shared/certs/dev-client-cert.pem').toString(),
            },
          };
        } catch (error) {
          // Log error if any
          console.error('Error connecting to database:', error);
          throw error;
        }
      },
    }),
  ],
})
export class DatabaseModule {}
