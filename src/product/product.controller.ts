// controller: là nơi xử lý các request từ client
// controller sẽ gọi đến service để xử lý các logic của ứng dụng

import {
    Controller, Get, Post, Body, Res,
    Req, Param, Query, HttpStatus, HttpCode, Put, Delete,
    UseGuards, Request as RequestNest, Render
} from '@nestjs/common';
import { Response, Request } from 'express';

import { ProductService } from './product.service';
import { ProductInsertRequestDTO } from './dto/product_insert_request.dto';
import { ProductInsertResponeDTO } from './dto/product_insert_respone.dto';
import { ProductGetRequestDTO } from './dto/product_get_request.dto';
import { ProductUpdateRequestDTO } from './dto/product_update_request.dto';
import { AuthGuard } from 'src/middleware/guard.middleware';

@Controller('san-pham')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    // url: http://localhost:3000/san-pham/insert
    @Post('insert')
    async insert(@Body() body: ProductInsertRequestDTO, @Res() res: Response) {
        try {
            const responeDTO = await this.productService.insert(body);
            return res.status(HttpStatus.OK).json(responeDTO);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }

    }

    // url: http://localhost:3000/san-pham/get
    @UseGuards(AuthGuard)
    @Get('get')
    async get(@RequestNest() req: Request,@Query() query: ProductGetRequestDTO, @Res() res: Response) {
        try {
            const user = req;
            console.log(user);
            //đọc name, price từ query string
            const {name, price} = query;
            const responeDTO = await this.productService.get(query);
            return res.status(HttpStatus.OK).json(responeDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    // url: http://localhost:3000/san-pham/update/1

    @Put('update/:id')
    async update(@Param('id') id: string, @Body() body: ProductUpdateRequestDTO, @Res() res: Response) {
        try {
            const responeDTO = await this.productService.update(id, body);
            return res.status(HttpStatus.OK).json(responeDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }

    // url: http://localhost:3000/san-pham/delete/1
    @Delete('delete/:id')
    async delete(@Param('id') id: string, @Res() res: Response) {
        try {
            const responseDTO = await this.productService.delete(id);
            return res.status(HttpStatus.OK).json(responseDTO);
        } catch (error: any) {
            return res.status(HttpStatus.BAD_REQUEST).json(error);
        }
    }
}
