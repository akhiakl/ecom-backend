import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { Product } from './models';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
