import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductCategory } from "./product-category.model";
import { ProductCategoryDto } from "./dto/product-category-dto";
import { log } from "console";

@Injectable()
export class ProductCategoryService {
    constructor(@InjectModel(ProductCategory) private productCategoryModel: typeof ProductCategory) { }

    async createProductCategory(productCategoryDto: ProductCategoryDto) {
        try {
            const existingCategory = await this.productCategoryModel.findOne({
                where: {
                    categoryName: productCategoryDto.categoryName,
                },
            });

            if (existingCategory) throw new Error('Category already exists');

            const productCategory = await this.productCategoryModel.create(
                { categoryName: productCategoryDto.categoryName })
                ;
                console.log(productCategory);
                
            return productCategory;
        } catch (error) {
            throw new Error(`Failed to create product category: ${error.message}`);
        }
    }

}