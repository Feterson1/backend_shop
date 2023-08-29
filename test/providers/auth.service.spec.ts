import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from 'src/config/sequelizeConfiguration.service';
import { databaseConfig } from 'src/config/configuration';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';

const mockedUser = {
    username : 'Dima',
    email: 'dima@bk.ru',
    password: 'anna123,',
};

describe('Auth Service',() => {
    let app : INestApplication;
    let authService: AuthService;

    beforeEach(async () => {
        const testModule : TestingModule = await Test.createTestingModule({
            imports: [UsersModule,SequelizeModule.forRootAsync({
                imports: [ConfigModule],
                useClass: SequelizeConfigService,
              }),
              ConfigModule.forRoot({
                load: [databaseConfig],
              }),
              AuthModule,]
        }).compile();
        authService = testModule.get<AuthService>(AuthService);
        app = testModule.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        const user = new User();
        
        const hashedPassword = await bcrypt.hash(mockedUser.password,10);
        user.username = mockedUser.username;
        user.password = hashedPassword;
        user.email = mockedUser.email;

        return user.save(); 

    });

    afterEach(async () => {
        await User.destroy({where:{username:mockedUser.username}});
        

    });

    it('Should login user',async () => {

        const user = await authService.validateUser(mockedUser.username, mockedUser.password);

      

        expect(user.username).toBe(mockedUser.username);
        expect(user.email).toBe(mockedUser.email);
    });

  

  

});