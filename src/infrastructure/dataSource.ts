import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { MissingEnvironmentVariableError } from 'shared/expetions';
import { DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  port: parseInt(`${process.env.DATABASE_PORT}`),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [join(__dirname, '../**/*.entity.{js,ts}')],
};

export const getDataSourceOptions = () => {
  const dbEnvs = [
    'DATABASE_NAME',
    'DATABASE_PORT',
    'DATABASE_USERNAME',
    'DATABASE_PASSWORD',
  ];
  if (dbEnvs.some((env) => process.env[env] === undefined)) {
    throw new MissingEnvironmentVariableError(dbEnvs.filter((env) => process.env[env] === undefined).join(', '));
  }

  return dataSourceOptions;
};
