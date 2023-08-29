import { PaymentModule } from './../../src/payment/payment.module';
import { Test, TestingModule } from '@nestjs/testing';
import * as session from 'express-session';
import * as passport from 'passport';
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


const mockedUser = {
    username : 'Dima',
    email: 'dima@bk.ru',
    password: 'anna123,',
};

const mockedPay = {
    status: 'pending',
    amount: {
        value: '100.00',
        currency: 'RUB',
    }

};

describe('Payment Controller',() => {
    let app : INestApplication;
  


    beforeEach(async () => {
        const testModule : TestingModule = await Test.createTestingModule({
            imports: [UsersModule,SequelizeModule.forRootAsync({
                imports: [ConfigModule],
                useClass: SequelizeConfigService,
              }),
              ConfigModule.forRoot({
                load: [databaseConfig],
              }),
              PaymentModule,
              AuthModule,]
        }).compile();

     

        app = testModule.createNestApplication();
        app.use(session({
            secret: 'keyword',
            resave: false,
            saveUninitialized: false,
          }));
          app.use(passport.initialize());
          app.use(passport.session());
          
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

    it('Should make payment',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const response = await request(app.getHttpServer())
        .post('/payment')
        .send({amount: 100})
        .set('Cookie',login.headers['set-cookie']);


        expect(response.body.status).toEqual(mockedPay.status);
        expect(response.body.amount).toEqual(mockedPay.amount);
           
       
    });

   
});
