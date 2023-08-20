import { Controller, Get, Post, Body, HttpStatus, Header, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type','application/json')
    createUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.create(createUserDto);
    }

}
