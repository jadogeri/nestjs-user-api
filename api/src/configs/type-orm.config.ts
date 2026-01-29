import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { da } from '@faker-js/faker';

dotenv.config();

console.log("Loading TypeORM configuration...");
console.log("Node Environment:", process.env.NODE_ENV || 'development');
console.log("dirname in type-orm.config.ts:", __dirname);
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const databaseFile = isProduction ? process.env.DATABASE || "prodDB.sqlite" : 'devDB.sqlite';
console.log("Using database file:", databaseFile);



export const dataSourceOptions: TypeOrmModuleOptions & SeederOptions = {
  type: 'sqlite',
  database: databaseFile,
  // {ts,js} matches both source and compiled files
  entities: [__dirname + '/../resources/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  seeds: [__dirname + '/db/seeds/*{.ts,.js}'],
  factories: [__dirname + '/db/factories/*{.ts,.js}'],
  synchronize: !isProduction,
};

export default dataSourceOptions;
