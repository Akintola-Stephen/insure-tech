import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(":productName")
    async getProductWithCategory(@Param('productName') productName: string) {
        return this.productService.getProductWithCategoryByName(productName);
    }
}