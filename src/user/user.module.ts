// module trong nestjs là một tập hợp các controller, service, module khác


import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema, User } from './user.schema';

import { LoggerMiddleware } from 'src/middleware/longer.middleware';
import {ProductQueryMiddleware} from 'src/middleware/product_query.middleware';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
        JwtModule.register({
            global: true,
            secret: "hello",
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(LoggerMiddleware, ProductQueryMiddleware)
        .forRoutes(UserController);
    }
}
