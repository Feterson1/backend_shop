import { Injectable } from '@nestjs/common';
import {Op} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { BoilerParts } from './boiler-parts.model';
import { IBoilerPartsFilter, IBoilerPartsQuery } from './types';

@Injectable()
export class BoilerPartsService {
  constructor(@InjectModel(BoilerParts) private BoilerPartsModel: typeof BoilerParts){}


  async paginateAndFilter(query:IBoilerPartsQuery): Promise<{count:number;rows: BoilerParts[]}>{

    const limit = +query.limit;
    const offset = + query.offset * 20;
    const filter = {} as Partial<IBoilerPartsFilter>

    if(query.priceFrom && query.priceFrom){
      filter.price = {
        [Op.between] : [+query.priceFrom, +query.priceTo],
      }
    }
    if(query.boiler){
      filter.boiler_manufacturer = JSON.parse(decodeURIComponent(query.boiler));
    }

    if(query.parts){
      filter.parts_manufacturer = JSON.parse(decodeURIComponent(query.parts));
    }

    return this.BoilerPartsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    })

  }

  async betsellers(): Promise<{count:number;rows: BoilerParts[]}>{

    return this.BoilerPartsModel.findAndCountAll({
      where:{betseller: true},
    
    })

  }

  async new(): Promise<{count:number;rows: BoilerParts[]}>{

    return this.BoilerPartsModel.findAndCountAll({
      where:{new: true},
    
    })

  }


  async findOne(id: number): Promise<BoilerParts> {

    return this.BoilerPartsModel.findOne({
      where: {id}
    })

  }

  async findOneByName(name:string): Promise<BoilerParts>{
    return this.BoilerPartsModel.findOne({
      where: {name}
    })
  }

  async searchByString(str:string): Promise< {count: number; rows: BoilerParts[]}>{
    return this.BoilerPartsModel.findAndCountAll({
      limit: 20,
      where: {name: {[Op.like]: `%${str}%`}},
    })
  }

  

  
}
