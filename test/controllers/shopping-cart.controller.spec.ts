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
import { BoilerPartsService } from 'src/boiler-parts/boiler-parts.service';
import { UsersService } from 'src/users/users.service';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from 'src/shopping-cart/shopping-cart.module';

const mockedUser = {
    username : 'Dima',
    email: 'dima@bk.ru',
    password: 'anna123,',
};

describe('ShoppingCart Controller',() => {
    let app : INestApplication;
    let boilerPartsService: BoilerPartsService;
    let usersService: UsersService;


    beforeEach(async () => {
        const testModule : TestingModule = await Test.createTestingModule({
            imports: [UsersModule,SequelizeModule.forRootAsync({
                imports: [ConfigModule],
                useClass: SequelizeConfigService,
              }),
              ConfigModule.forRoot({
                load: [databaseConfig],
              }),
              ShoppingCartModule,
              BoilerPartsModule,
              AuthModule,]
        }).compile();

        boilerPartsService = testModule.get<BoilerPartsService>(BoilerPartsService);
        usersService = testModule.get<UsersService>(UsersService);

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

    beforeEach(async () => {

        const cart = new ShoppingCart();
   
        const user = await usersService.findOne({where:{username:mockedUser.username}});
    
        const part = await boilerPartsService.findOne(1);
    
        cart.userId = user.id;
        cart.partId = part.id;
        cart.boiler_manufacturer = part.boiler_manufacturer;
        cart.parts_manufacturer = part.parts_manufacturer;
        cart.price = part.price;
        cart.in_stock = part.in_stock;
        cart.image = JSON.parse(part.images)[0];
        cart.name = part.name;
        cart.total_price = part.price;
    
        return cart.save();

    });

    afterEach(async () => {
        await User.destroy({where:{username:mockedUser.username}});
        await ShoppingCart.destroy({where:{partId:1}});
        

    });

    it('Should get all cart items',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const user = await usersService.findOne({where:{username:mockedUser.username}});

        const response = await request(app.getHttpServer())
        .get(`/shopping-cart/${user.id}`)
        .set('Cookie',login.headers['set-cookie']);


        expect(response.body).toEqual(
            expect.arrayContaining([{
                id:expect.any(Number),
                userId: user.id,
                partId: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                price: expect.any(Number),
                parts_manufacturer: expect.any(String),
                name: expect.any(String),
                image: expect.any(String),
                count: expect.any(Number),
                total_price: expect.any(Number),
                in_stock: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),

            }])
        );
       
    });

    it('Should add cart item',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const user = await usersService.findOne({where:{username:mockedUser.username}});

        await request(app.getHttpServer())
        .post(`/shopping-cart/add`)
        .send({username: mockedUser.username, partId: 3})
        .set('Cookie',login.headers['set-cookie']);

        const response = await request(app.getHttpServer())
        .get(`/shopping-cart/${user.id}`)
        .set('Cookie',login.headers['set-cookie']);


        expect(response.body.find((item) => item.partId === 3)).toEqual(
            expect.objectContaining({
                id:expect.any(Number),
                userId: user.id,
                partId: 3,
                boiler_manufacturer: expect.any(String),
                price: expect.any(Number),
                parts_manufacturer: expect.any(String),
                name: expect.any(String),
                image: expect.any(String),
                count: expect.any(Number),
                total_price: expect.any(Number),
                in_stock: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),

            })
        );
       
    });
   
    it('Should get updated count of cart item',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});


        const response = await request(app.getHttpServer())
        .patch(`/shopping-cart/count/1`)
        .send({count: 2})
        .set('Cookie',login.headers['set-cookie']);

        expect(response.body).toEqual({count: 2})
        
    
       
    });

    it('Should get updated total price of cart item',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const part = await boilerPartsService.findOne(1);

        const response = await request(app.getHttpServer())
        .patch(`/shopping-cart/total-price/1`)
        .send({total_price: part.price * 3 })
        .set('Cookie',login.headers['set-cookie']);

        expect(response.body).toEqual({total_price: part.price * 3})
        
    
       
    });

    it('Should delete cart item',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        await request(app.getHttpServer())
        .delete(`/shopping-cart/one/1`)
        .set('Cookie',login.headers['set-cookie']);

        const user = await usersService.findOne({where:{username:mockedUser.username}});

        const response = await request(app.getHttpServer())
        .get(`/shopping-cart/${user.id}`)
        .set('Cookie',login.headers['set-cookie']);

        

        expect(response.body.find((item) => item.partId === 1)).toBeUndefined();
        
    
       
    });

    it('Should delete cart item',async () => {

        const login = await request(app.getHttpServer())
        .post('/users/login')
        .send({username: mockedUser.username , password: mockedUser.password});

        const user = await usersService.findOne({where:{username:mockedUser.username}});

        await request(app.getHttpServer())
        .delete(`/shopping-cart/all/${user.id}`)
        .set('Cookie',login.headers['set-cookie']);

       
        const response = await request(app.getHttpServer())
        .get(`/shopping-cart/${user.id}`)
        .set('Cookie',login.headers['set-cookie']);

        

        expect(response.body).toStrictEqual([]);
        
    
       
    });
});
