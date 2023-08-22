import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfiguration.service';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule,SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useClass: SequelizeConfigService,
  }),
  ConfigModule.forRoot({
    load: [databaseConfig],
  }),
  UsersModule,
  AuthModule,
],
  
})
export class AppModule {}
