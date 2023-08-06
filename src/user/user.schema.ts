
// Map giữa các thuộc tính của model và
// các thuộc tính của document trong MongoDB

import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  phoneNumber: String;

  @Prop()
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);