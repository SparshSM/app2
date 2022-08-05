/* eslint-disable prettier/prettier */
// import * as mongoose from 'mongoose';
// export const ProductSchema = new mongoose.Schema({
//     name:{type: String,required:true},
//     description:{type: String,required:true},
//     price:{type: Number,required:true},
// });

// export interface ProductModel extends mongoose.Document{
//        id: string;
//        name:string;
//        description:string;
//        price:number;
// }

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Product extends Document {
  
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);