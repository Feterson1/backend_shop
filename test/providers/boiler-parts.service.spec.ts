import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from 'src/config/sequelizeConfiguration.service';
import { databaseConfig } from 'src/config/configuration';
import { BoilerPartsModule } from 'src/boiler-parts/boiler-parts.module';
import { BoilerPartsService } from 'src/boiler-parts/boiler-parts.service';

describe('BoilerParts Service',() => {
    let app : INestApplication;
    let boilerPartsService: BoilerPartsService;

    beforeEach(async () => {
        const testModule : TestingModule = await Test.createTestingModule({
            imports: [UsersModule,SequelizeModule.forRootAsync({
                imports: [ConfigModule],
                useClass: SequelizeConfigService,
              }),
              ConfigModule.forRoot({
                load: [databaseConfig],
              }),
              BoilerPartsModule,]
        }).compile();

        boilerPartsService = testModule.get<BoilerPartsService>(BoilerPartsService);
        app = testModule.createNestApplication();
        await app.init();
    });

   

    it('Should find part',async () => {

        const part = await boilerPartsService.findOne(1);

        expect(part.dataValues).toEqual(
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
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );
       
       
    });

    it('Should find part by name',async () => {

        const part = await boilerPartsService.findOneByName("Ipsum a.");

        expect(part.dataValues).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                price: expect.any(Number),
                boiler_manufacturer: expect.any(String),
                parts_manufacturer: expect.any(String),
                vendor_code: expect.any(String),
                name: "Ipsum a.",
                description: expect.any(String),
                images: expect.any(String),
                in_stock: expect.any(Number),
                betseller: expect.any(Boolean),
                new: expect.any(Boolean),
                popularity: expect.any(Number),
                compatibility: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),

            })
        );
       
       
    });

    it('Should find part by search string',async () => {

        const searchString = 'i'

        const parts = await boilerPartsService.searchByString(searchString);

        expect(parts.rows.length).toBeLessThanOrEqual(20);

        parts.rows.forEach((element) => {
            expect(element.name.toLowerCase()).toContain(searchString);

            expect(element.dataValues).toEqual(
                expect.objectContaining({
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
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                })
            );
        });

       
     
       
       
    });

    it('Should find betsellers',async () => {

        const parts = await boilerPartsService.betsellers();

        parts.rows.forEach((element) => {
            
            expect(element.dataValues).toEqual(
                expect.objectContaining({
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
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                })
            );
        });
       
       
    });

    it('Should find news',async () => {

        const parts = await boilerPartsService.new();

        parts.rows.forEach((element) => {
            
            expect(element.dataValues).toEqual(
                expect.objectContaining({
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
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                })
            );
        });
       
       
    });

  

});