import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import GraphQLJSON from 'graphql-type-json';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as TypeOrmModuleOptions['type'],
      url: process.env.DATABASE_URL,
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CartModule,
    CartsModule,
    ProductsModule,
    OrdersModule,
  ],
})
export class AppModule {}
