import { Module } from '@nestjs/common';
import { UserModule } from './resources/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSourceOptions from './configs/type-orm.config';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({...dataSourceOptions }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

/**
 * 
 import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity'; // Import your User entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'users.sqlite', // Specifies the database file name
      entities: [User], // List your entities here, or use a glob pattern
      synchronize: true, // Automatically creates database schema on application launch (use with caution in production)
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

 */