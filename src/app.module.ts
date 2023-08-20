import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfiguration.service';
import { databaseConfig } from './config/configuration';


@Module({
  imports: [UsersModule,SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    useClass: SequelizeConfigService,
  }),
  ConfigModule.forRoot({
    load: [databaseConfig],
  })
],
  
})
export class AppModule {}
