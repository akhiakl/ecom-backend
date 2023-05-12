import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  create(createProductInput: CreateProductInput) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne() {
    return `This action returns a #${id} product`;
  }

  update(, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove() {
    return `This action removes a #${id} product`;
  }
}
