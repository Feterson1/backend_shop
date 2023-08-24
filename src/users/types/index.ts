import { ApiProperty } from '@nestjs/swagger';


export class LoginUserRequest{
    @ApiProperty({example:'anna'})
    username: string

    @ApiProperty({example:'anna123'})
    password: string
}


export class LoginUserResponse{
    @ApiProperty({example: {user: {
        userId: 1,
        username: 'anna',
        email: 'anna@gmail.com',
    },
    msg: 'logged in'}})

    user: {
        userId: number
        username: string
        email: string
    }
    msg: string
}

export class LogoutUserResponse{
    @ApiProperty({example: 'session has ended'})
    msg: string

}

export class LoginCheckResponse{
    @ApiProperty({example:1})
    userId: number

    @ApiProperty({example:'anna'})
    username:string

    @ApiProperty({example:'anna@gmail.com'})
    email:string
}


export class SignupUserResponse{
    @ApiProperty({example:1})
    id: number

    @ApiProperty({example:'anna'})
    username:string

    @ApiProperty({example:'password'})
    password:string

    @ApiProperty({example:'anna@gmail.com'})
    email:string

    @ApiProperty({example:'2023-08-22T13:32:24.513Z'})
    updatedAt:string

    @ApiProperty({example:'2023-08-22T13:32:24.513Z'})
    createdAt:string


}