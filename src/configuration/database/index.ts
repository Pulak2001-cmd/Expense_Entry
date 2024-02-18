import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function databaseConnectionConfig(config: ConfigService) : TypeOrmModuleOptions {
  const conf:any = {
    type: 'postgres',
    host: config.get('postgres.host'),
    port: config.get('postgres.port'),
    username: config.get('postgres.username'),
    password: config.get('postgres.password'),
    database: config.get('postgres.database'),
    entities: ['dist/**/entities/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true
  }
  
  if(process.env.POSTGRES_SSH === 'true'){
    conf.ssh = true
    conf.extra = {
      ssl: {
          rejectUnauthorized: false
      }
    }
  }
  return conf;
}