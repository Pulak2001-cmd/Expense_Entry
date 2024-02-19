import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConnectionConfig } from './configuration/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configuration';
import { UserController } from './users/controller/user.controller';
import { ExpenceController } from './expence/controller/expence.controller';
import { AuthController } from './auth/auth.controller';
import { UserService } from './users/service/user.service';
import { ExpenceService } from './expence/service/expence.service';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: databaseConnectionConfig,
      imports: undefined,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    ExpenceController,
    AuthController,
  ],
  providers: [AppService, UserService, ExpenceService, AuthService],
})
export class AppModule {}
