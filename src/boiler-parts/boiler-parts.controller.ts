import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BoilerPartsService } from './boiler-parts.service';
import { AuthenticatedGuard } from 'src/auth/autheticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { GetBetsellersResponse, FindOneResponse, GetByNameRequest, GetByNameResponse, GetNewResponse, PaginateAndFilterResponse, SearchRequest, SearchResponse } from './types';

@Controller('boiler-parts')
export class BoilerPartsController {
  constructor(private readonly boilerPartsService: BoilerPartsService) {}

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({type: PaginateAndFilterResponse})
  @Get()
  paginateAndFilter(@Query() query){

    return this.boilerPartsService.paginateAndFilter(query);

  }

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({type:FindOneResponse})
  @Get('find/:id')
  findOne(@Param() param){
      return this.boilerPartsService.findOne(+param.id);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({type:GetBetsellersResponse})
  @Get('betsellers')
  betsellers(){
    return this.boilerPartsService.betsellers();
  }

  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({type:GetNewResponse})
  @Get('new')
  new(){
    return this.boilerPartsService.new();
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBody({type:GetByNameRequest})
  @ApiOkResponse({type:GetByNameResponse})
  @Post('name')
  findOneByName(@Body(){name}: {name:string}){
    return this.boilerPartsService.findOneByName(name)
  }

  @UseGuards(AuthenticatedGuard)
  @ApiBody({type:SearchRequest})
  @ApiOkResponse({type:SearchResponse})
  @Post('search')
  search(@Body(){search}: {search:string}){
    return this.boilerPartsService.searchByString(search);
  }

}
