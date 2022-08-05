/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductAlreadyExists extends HttpException {
  constructor() {
    super("Product already exists!", HttpStatus.BAD_REQUEST);
  }
}