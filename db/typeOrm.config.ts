import path from 'path';
import { envConfig } from '../src/shared/config/app.config';
import { DataSource } from 'typeorm';
import * as fs from 'fs-extra'

async function dataSourceFactory(): Promise<DataSource> {
  
  return new DataSource({
    type: 'postgres',
    host: envConfig.db.postgres.host,
    port: Number(envConfig.db.postgres.port),
    database: envConfig.db.postgres.name,
    username: envConfig.db.postgres.username,
    password: envConfig.db.postgres.password,
    entities: [path.join(__dirname, '..', 'src', 'modules', '**', '*.entity.ts')],
    migrations: [path.join(__dirname, 'migrations', '*.ts')],
    poolSize: envConfig.db.postgres.poolsize,
    connectTimeoutMS: envConfig.db.postgres.connectionTimeoutInMS,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('src/shared/certs/dev-server-ca.pem').toString(),
    key: fs.readFileSync('src/shared/certs/dev-client-key.pem').toString(),
    cert: fs.readFileSync('src/shared/certs/dev-client-cert.pem').toString(),
  },
  });
}
export default dataSourceFactory();
