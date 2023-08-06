// service: là chổ tương tác với database và xử lý logic cho ứng dụng

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ProductInsertRequestDTO } from './dto/product_insert_request.dto';
import { ProductInsertResponeDTO } from './dto/product_insert_respone.dto';
import { ProductGetResponeDTO } from './dto/product_get_respone.dto';
import { ProductUpdateRequestDTO } from './dto/product_update_request.dto';
import { ProductUpdateResponeDTO } from './dto/product_update_respone.dto';
import { ProductDeleteResponeDTO } from './dto/product_delete_respone.dto';

import { Product, ProductDocument } from './product.schema';
import { ProductGetRequestDTO } from './dto/product_get_request.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>) { }

    // hàm insert vào database
    async insert(requestDTO: ProductInsertRequestDTO): Promise<ProductInsertResponeDTO> {
        try {
            const model = new this.productModel(requestDTO);
            await model.save();
            const responeDTO: ProductInsertResponeDTO = {
                status: true,
                message: 'Insert product Successfully'
            };
            return responeDTO;
        } catch (error) {
            return error.message();
        }
    }

    //hàm lấy dữ liệu từ database

    async get(queries: ProductGetRequestDTO): Promise<ProductGetResponeDTO> {
        // const products = await this.productModel.find({}).exec(); //select * from products
        const {name, price} = queries;
        let query = {};
            if (name) {
                query = { ...query, name: name };
            }
            if (price) {
                query = { ...query, price: price };
            }
            const products = await this.productModel
                .find(query)
                .exec();
        
            const responeDTO: ProductGetResponeDTO = {
                status: true,
                message: "Get all products successfully",
                data: products
            }
            return responeDTO;
    }


    //hàm update

    async update(id: String, requestDTO: ProductUpdateRequestDTO): Promise<ProductUpdateResponeDTO> {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            const { name, price, quantity, description } = requestDTO;

            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            product.quantity = quantity ? quantity : product.quantity;
            product.description = description ? description : product.description;

            await product.save();

            const responeDTO: ProductUpdateResponeDTO = {
                status: true,
                message: 'Cập nhật thành công'
            }
            return responeDTO;
        } catch (error: any) {
            console.log(error.message);
            const responeDTO: ProductUpdateResponeDTO = {
                status: false,
                message: error.message
            }
            return responeDTO;
        }
    }

    //hàm delete

    async delete(id: String): Promise<ProductDeleteResponeDTO> {
        try {
            const product = await this.productModel.findByIdAndDelete(id);
            if (!product) {
                throw new Error('Product not found');
            }
            const responeDTO: ProductDeleteResponeDTO = {
                status: true,
                message: 'Xóa thành công'
            }

            return responeDTO;

        } catch (error: any) {
            console.log(error.message);
            const responeDTO: ProductDeleteResponeDTO = {
                status: false,
                message: error.message
            }

            return responeDTO;
        }
    }
}