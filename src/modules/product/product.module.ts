import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductPurchaseOrder } from './product-purchase-order.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Product, ProductPurchaseOrder])
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService]
})
export class ProductModule { }
