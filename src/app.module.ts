import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as TypeOrmModuleOptions['type'],
      url: process.env.DATABASE_URL,
      useNewUrlParser: true,
      entities: [],
      synchronize: true,
    }),
  ],
  providers: [AppResolver],
})
export class AppModule { }
