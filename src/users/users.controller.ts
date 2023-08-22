import { Controller, Get, Post, Body, HttpStatus, Header, HttpCode, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/autheticated.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type','application/json')
    createUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.create(createUserDto);
    }
    

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @Header('Content-type','application/json')
    @UseGuards(LocalAuthGuard)
    login(@Request() req){

        return {user: req.user, msg: 'Logged in'};
    }

    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req){

        return req.user;
    }

    @Get('/logout')
    logOut(@Request() req){
        req.session.destroy();

        return {msg: 'Session has ended'};
    }





}
