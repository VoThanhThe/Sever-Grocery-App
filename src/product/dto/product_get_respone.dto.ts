
// lấy về danh sách sản phẩm

import {Product} from "../product.entity";

export class ProductGetResponeDTO{
    status: Boolean;
    message: String;
    // data trả về là 1 mảng Product
    data: Product[];

}