import * as dotenv from 'dotenv';
dotenv.config();

export default () => {
  return {
    env: process.env.NODE_ENV,
    appName: process.env.APP_NAME || 'technical-test-diri-app',
    version: process.env.npm_package_version,
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
      sync: Boolean(process.env.DB_SYNC),
      log: Boolean(process.env.DB_LOG),
    },
  };
};
