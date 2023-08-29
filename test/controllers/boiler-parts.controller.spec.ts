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
import { BoilerPartsModule } from 'src/boiler-parts/boiler-parts.module';

const mockedUser = {
    username : 'Dima',
    email: 'dima@bk.ru',
    password: 'anna123,',
};

describe('BoilerParts Controller',() => {
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
              BoilerPartsModule,
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

    it('Should get one part',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const response = await request(app.getHttpServer())
        .get('/boiler-parts/find/1')
        .set('Cookie',login.headers['set-cookie']);


        expect(response.body).toEqual(
            expect.objectContaining({
                id:1,
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                betseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),






            })
        );
       
    });

    it('Should get betsellers',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const response = await request(app.getHttpServer())
        .get('/boiler-parts/betsellers')
        .set('Cookie',login.headers['set-cookie']);


        expect(response.body.rows).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                betseller: true,
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),






            }])
        );
       
    });

    it('Should get new',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const response = await request(app.getHttpServer())
        .get('/boiler-parts/new')
        .set('Cookie',login.headers['set-cookie']);


        expect(response.body.rows).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                betseller: expect.any(Boolean),
                new: true,
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),






            }])
        );
       
    });

    it('Should search by string',async () => {

        const body = {search: 'i'}
        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const response = await request(app.getHttpServer())
        .post('/boiler-parts/search')
        .send(body)
        .set('Cookie',login.headers['set-cookie']);

        expect(response.body.rows.length).toBeLessThanOrEqual(20);


        response.body.rows.forEach((element) => {
            expect(element.name.toLowerCase()).toContain(body.search);
        });


        expect(response.body.rows).toEqual(
            expect.arrayContaining([{
                id: expect.any(Number),
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: expect.any(String),
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                betseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),






            }])
        );
       
    });
    
    it('Should get by name',async () => {

        const body = {name: 'Ipsum a.'}
        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const response = await request(app.getHttpServer())
        .post('/boiler-parts/name')
        .send(body)
        .set('Cookie',login.headers['set-cookie']);

        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: 'Ipsum a.',
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                betseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),






            })
        );
       
    });
});