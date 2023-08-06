// module trong nestjs là một tập hợp các controller, service, module khác


import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductSchema, Product } from './product.schema';

import { LoggerMiddleware } from 'src/middleware/longer.middleware';
import {ProductQueryMiddleware} from 'src/middleware/product_query.middleware';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
        .apply(LoggerMiddleware, ProductQueryMiddleware)
        .forRoutes(ProductController);
    }
}
