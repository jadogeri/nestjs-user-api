import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeederOptions } from 'typeorm-extension';
console.log("dirname in type-orm.config.ts:", __dirname);

export const dataSourceOptions: TypeOrmModuleOptions & SeederOptions = {
  type: 'sqlite',
  database: 'users.sqlite',
  // {ts,js} matches both source and compiled files
  entities: [__dirname + '/../resources/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  seeds: [__dirname + '/db/seeds/*{.ts,.js}'],
  factories: [__dirname + '/db/factories/*{.ts,.js}'],
  synchronize: true,
};

export default dataSourceOptions;
