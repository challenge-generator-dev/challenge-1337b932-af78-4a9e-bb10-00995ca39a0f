import {
  Module,
  NestModule,
  MiddlewareConsumer,
  Logger,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './infrastructure/controllers/product.controller';
import { ProductSqlRepository } from './infrastructure/repositories/sql/product-sql.repository';
import { ProductNosqlRepository } from './infrastructure/repositories/nosql/product-nosql.repository';
import { ProductRepository } from './domain/repositories/product.repository';
import { DatabaseConfigService } from './config/database.config';
import { HttpExceptionFilter } from './infrastructure/filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfig = new DatabaseConfigService(configService);
        const nosqlConfig = databaseConfig.getNosqlConfig();
        return {
          uri: nosqlConfig.uri || 'mongodb://localhost:27017/inventory',
          dbName: nosqlConfig.database || 'inventory',
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductSqlRepository,
    },
    {
      provide: 'DATABASE_CONFIG',
      useClass: DatabaseConfigService,
    },
    {
      provide: 'APP_FILTER',
      useClass: HttpExceptionFilter,
    },
    Logger,
  ],
  exports: [ProductRepository, DatabaseConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes('*');
  }
}