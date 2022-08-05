/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Param, Patch,Delete } from '@nestjs/common';
import { ProductDTO } from './Product.dto';
import { ProductsService } from './products.service';
@Controller('products')
export class ProductsController {
  constructor(private readonly productservice: ProductsService) {}
  @Post()
  async addProds(@Body() products: ProductDTO ) {
    return await this.productservice.addproduct(products);
  }
  @Get()
  async getAllProds() {
    const allprods = await this.productservice.getAllproduct();
    const res = allprods[0]
    return res;
  }
  @Get(':id')
  getprod(@Param('id') id: string) {
    console.log(id)
    return this.productservice.getProduct(id);
  }
  @Patch(':id')
  async updateprod(@Body() products: ProductDTO,
    @Param('id') id: string,
    // @Body('name') prodname: string,
    // @Body('description') proddesc: string,
    // @Body('price') prodprice: number,
  ) {
    await this.productservice.updateproduct(id,products);
    return null
  }
  @Delete(':id')
  async delprod(@Param('id') id: string){
    await this.productservice.deleteproduct(id);
    return null
  }
}
