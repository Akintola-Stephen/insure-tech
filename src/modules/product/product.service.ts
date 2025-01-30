import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./product.model";
import { ProductCategory } from "../product-category/product-category.model";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productModel: typeof Product) { }

    async createProduct(productDto: ProductDto): Promise<Product> {
        try {
            const product = await this.productModel.create(
                {
                    productName: productDto.productName,
                    productAmount: productDto.productAmount,
                    productCategoryId: productDto.productCategoryId,
                });
            return product;
        } catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
        }
    }


    async getProductDetailsByName(productName: string): Promise<Product> {
        const product = await this.productModel.findOne({
            where: {
                productName
            },
            include: [
                {
                    model: ProductCategory,
                    as: "category",
                    attributes: ['categoryName']
                }
            ]
        });
        if (!product) throw new NotFoundException(`Product with name ${productName} not found`)
        return product
    }


    //TODO: Function that creates new product

    //TODO: Function that fetches every products
}