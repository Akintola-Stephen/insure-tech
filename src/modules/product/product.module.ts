import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
