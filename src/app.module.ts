import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConnectionConfig } from './configuration/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './configuration';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
