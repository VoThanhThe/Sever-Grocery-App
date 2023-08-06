// controller: là nơi xử lý các request từ client
// controller sẽ gọi đến service để xử lý các logic của ứng dụng

import {
    Controller, Get, Post, Body, Res,
    Req, Param, Query, HttpStatus, HttpCode, Put, Delete,
    UseGuards, Request as RequestNest, Render
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { UserRegisterRequestDTO } from './dto/user_register_request.dto';
import { UserResponeDTO } from './dto/user_respone.dto';
import { UserLoginRequestDTO } from './dto/user_login_request.dto';
import { AuthGuard } from 'src/middleware/guard.middleware';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    // url: http://localhost:3000/user/register
    @Post('register')
    async register(@Body() body: UserRegisterRequestDTO, @Res() res: Response) {
        try {
            const responeDTO = await this.userService.register(body);
            return res.status(HttpStatus.OK).json(responeDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }

    // url: http://localhost:3000/user/login
    @Post('login')
    async login(@Body() body: UserLoginRequestDTO, @Res() res: Response) {
        try {
            const responeDTO = await this.userService.login(body);
            return res.status(HttpStatus.OK).json(responeDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }

    //url: http://localhost:3000/user
    @UseGuards(AuthGuard)
    @Get()
    async getAllUser(@RequestNest() req: Request,@Res() res: Response) {
        try {
            const user = req;
            console.log(user);
            const responeDTO = await this.userService.getAllUser();
            return res.status(HttpStatus.OK).json(responeDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

     //url: http://localhost:3000/user/home
    @Get("home")
    @Render('index')
    async home(@Res() res: Response) {
        return { message: 'Hello world!' };
    }


}
