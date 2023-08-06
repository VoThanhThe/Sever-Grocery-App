// service: là chổ tương tác với database và xử lý logic cho ứng dụng

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from './user.schema';
import { UserRegisterRequestDTO } from './dto/user_register_request.dto';
import { UserResponeDTO } from './dto/user_respone.dto';
import { UserLoginRequestDTO } from './dto/user_login_request.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
        private jwtService: JwtService) { }

    // hàm đăng kí vào database
    async register(requestDTO: UserRegisterRequestDTO): Promise<UserResponeDTO> {
        let responeDTO: UserResponeDTO = {
            status: true,
            message: 'Register successfully',
            data: null
        }
        try {
            const { name, phoneNumber, password, confirmPassword } = requestDTO;
            if (password !== confirmPassword) {
                throw new Error("Passwords and Comfirm Password do not match")
            }
            const result = await this.userModel.findOne({ phoneNumber });
            if (!result) {
                const user: User = { name, phoneNumber, password }
                const model = new this.userModel(user);
                await model.save();
            } else {
                throw new Error("Phone number is already");
            }

        } catch (error: any) {
            responeDTO = {
                ...responeDTO,
                status: false,
                message: "Register Failed",
            }
        }
        return responeDTO;
    }

    // hàm đăng nhập
    async login(requestDTO: UserLoginRequestDTO): Promise<UserResponeDTO> {
        let responeDTO: UserResponeDTO = {
            status: true,
            message: 'Login successfully',
            data: null
        }
        try {
            const { phoneNumber, password } = requestDTO;
            const user = await this.userModel.findOne({ phoneNumber });
            if (!user) {
                throw new Error("User not found");
            }
            if (user.password !== password) {
                throw new Error("Password is incorrect");
            }
            responeDTO.data = {
                user: user,
                token: this.jwtService.sign({ phone: user.phoneNumber, id: user._id })
            }

        } catch (error: any) {
            responeDTO = {
                ...responeDTO,
                status: false,
                message: "Login Failed",
            }
        }
        return responeDTO;
    }

    //lấy danh sách user
    async getAllUser(): Promise<UserResponeDTO> {
        let responeDTO: UserResponeDTO = {
            status: true,
            message: 'Get all user successfully',
            data: null
        }
        try {
            const user = await this.userModel.find();
            if (!user) {
                throw new Error("User not found");
            }

            responeDTO.data = {
                user: user
            };
        } catch (error) {
            responeDTO = {
                ...responeDTO,
                status: false,
                message: "Get all user Failed",
            }
        }
        return responeDTO;
    }
}