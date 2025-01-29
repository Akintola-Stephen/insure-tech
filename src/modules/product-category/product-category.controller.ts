import { Body, Controller, Post } from "@nestjs/common";
import { ProductCategoryService } from "./product-category.service";
import { ProductCategoryDto } from "./dto/product-category-dto";
import { ProductCategory } from "./product-category.model";

@Controller("product-categories")
export class ProductCategoryController {
    constructor(private readonly productCategoryService: ProductCategoryService) { }

    @Post()
    async createProductCategory(@Body() productCategoryDto: ProductCategoryDto): Promise<ProductCategory> {
        return this.productCategoryService.createProductCategory(productCategoryDto);

    }
}