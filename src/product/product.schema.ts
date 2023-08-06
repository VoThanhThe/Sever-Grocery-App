
// Map giữa các thuộc tính của model và
// các thuộc tính của document trong MongoDB

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  description: string;

  @Prop()
  image: string;
  
  @Prop()
  category: string;
  @Prop()
  type: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);