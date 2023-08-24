import { Controller, Get, Post, Body, HttpStatus, Header, HttpCode, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/autheticated.guard';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LoginCheckResponse, LoginUserRequest, LoginUserResponse, LogoutUserResponse, SignupUserResponse } from './types';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}


    @ApiOkResponse({type:SignupUserResponse})
    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type','application/json')
    createUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.create(createUserDto);
    }


    
    @ApiBody({type: LoginUserRequest})
    @ApiOkResponse({type:LoginUserResponse})
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    @Header('Content-type','application/json')
    @UseGuards(LocalAuthGuard)
    login(@Request() req){

        return {user: req.user, msg: 'Logged in'};
    }

    @ApiOkResponse({type:LoginCheckResponse})
    @Get('/login-check')
    @UseGuards(AuthenticatedGuard)
    loginCheck(@Request() req){

        return req.user;
    }


    @ApiOkResponse({type: LogoutUserResponse})
    @Get('/logout')
    logOut(@Request() req){
        req.session.destroy();

        return {msg: 'Session has ended'};
    }





}
