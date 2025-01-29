import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./product.model";
import { ProductCategory } from "../product-category/product-category.model";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productModel: typeof Product) { }


    //TODO: Function that creates new product

    //TODO: Function that fetches every products


    async getProductWithCategoryByName(productName: string): Promise<Product> {
        const product = await this.productModel.findOne({
            where: {
                productName
            },
            include: [
                { model: ProductCategory, as: "category" }
            ]
        });
        if (!product) throw new NotFoundException(`Product with name ${productName} not found`)
        return product
    }
}