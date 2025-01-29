import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from '../modules/product/product.model';
import { ProductCategory } from '../modules/product-category/product-category.model';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT') || 5432,
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                models: [Product, ProductCategory],
                autoLoadModels: true,
                // synchronize: true, 
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
