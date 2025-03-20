import { config } from 'dotenv';
config();

export const envConfig = {
  appEnv: process.env.APP_ENV,
  serviceName: process.env.SERVICE_NAME,
  http: {
    host: process.env.HTTP_HOST,
    port: process.env.HTTP_PORT,
    apiTimeout: process.env.API_TIMEOUT_IN_MS
      ? +process.env.API_TIMEOUT_IN_MS
      : 25000,
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  db: {
    postgres: {
      host: process.env.DB_POSTGRES_HOST,
      port: process.env.DB_POSTGRES_PORT,
      name: process.env.DB_POSTGRES_NAME,
      username: process.env.DB_POSTGRES_USERNAME,
      password: process.env.DB_POSTGRES_PASSWORD,
      poolsize: Number(process.env.DB_POOL_SIZE),
      connectionTimeoutInMS: Number(process.env.DB_CONNECTION_TIMEOUT_IN_MS),
    },
  },
  swagger: {
    title: process.env.SWAGGER_TITLE,
    description: process.env.SWAGGER_DESCRIPTION,
    version: process.env.SWAGGER_VERSION,
    auth: {
      type: process.env.SWAGGER_AUTH_TYPE,
      schema: process.env.SWAGGER_AUTH_SCHEMA,
      bearerformat: process.env.SWAGGER_AUTH_BEARER_FORMAT,
      name: process.env.SWAGGER_AUTH_NAME,
      description: process.env.SWAGGER_AUTH_DESCRIPTION,
      in: process.env.SWAGGER_AUTH_IN,
    },
  },
  encDec: {
    sessionTimeout: process.env.ENC_DEC_SESSION_TIMEOUT,
  },
  redis: {
    readyLog: process.env.REDIS_READY_LOG,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    defaultCacheTtl: process.env.DEFAULT_REDIS_TRANSACTION_TTL || '86400',
    defaultRedisCacheEnabled: process.env.DEFAULT_REDIS_CACHE_ENABLED || 'true',
  },
  gcp: {
    projectId: process.env.GCP_PROJECTID,
    logName: process.env.GCP_LOG_NAME,
    serviceName: process.env.SERVICE_NAME,
    logSize: process.env.LOGSIZE || 256,
  },
  systemIntegration:
    'http://' +
    process.env.HDFCERGO_SYSTEM_INTEGRATION_SERVICE_SERVICE_HOST +
    ':' +
    process.env.HDFCERGO_SYSTEM_INTEGRATION_SERVICE_SERVICE_PORT +
    '/api/si',
  secrets: process.env.SECRETS?.split(',') || [],
  defaultPagination: process.env.DEFAULT_PAGINATION,
  seedBasePath: process.env.SEED_BASE_PATH,
  seedUserFile: process.env.SEED_AGENT_FILE || 'user.csv',
  logging: {
    logLevel: process.env.LOG_LEVEL ? +process.env.LOG_LEVEL : 0,
  },
  isMasterGuardEnable: JSON.parse(process.env.MASTER_GUARD || 'false'),
  releaseVersion: process.env.RELEASE_VERSION,
  lockKey: process.env.LOCK_KEY,
  lockValue: process.env.LOCK_VALUE,
  lockExpiry: process.env.LOCK_EXPIRY,
  lockOk: process.env.LOCK_OK,
};
