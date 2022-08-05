/* eslint-disable prettier/prettier */
import { Injectable,NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./products.model";
import { Model } from "mongoose";
import { ProductDTO } from "./Product.dto";
@Injectable()

export class ProductsService{
    constructor(@InjectModel('Product') private readonly Prodmodel:Model<Product>){}
    async addproduct(products: ProductDTO){
            const newprod =  await (new this.Prodmodel(products).save());
            return newprod.id as ProductDTO;

    }
    async getAllproduct(){
        const prods = await this.Prodmodel.find().exec();
        return prods.map(prod=>({
            // id:prod.id,
            name:prod.name,
            description:prod.description,
            price:prod.price,
        }))
    }
    async getProduct(prodid:string){
        const product = await this.Prodmodel.findById(prodid)
        return product ;
    }
    async updateproduct(prodid:string,products: ProductDTO){
        const updatedProd = await this.findproduct(prodid);
        if (products.name) {
            // updatedProd.name = name;
        }
        // if (products: ProductDTOdescription) {
            // updatedProd.description = description;
        // }
        // if (price) {
            // updatedProd.price = price;
        // }
        updatedProd.save();
    }
    async deleteproduct(prodid:string){
        await this.Prodmodel.deleteOne({_id:prodid}).exec();
    }
    private async findproduct(id:string):Promise<Product>{
       let product;
        try {
            product = await this.Prodmodel.findById(id)
       } catch (error) {
           throw new NotFoundException("Product not found");
       }
        if (!product) {
            throw new NotFoundException("Product not found");
        }
        // return { id:product.id,name:product.name,description:product.description,price:product.price}
        return product
    }
}