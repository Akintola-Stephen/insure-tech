import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";

@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async createProduct(@Body() productDto: ProductDto) {
        return this.productService.createProduct(productDto);
    }

    @Get(":productName")
    async getProductDetailsByName(@Param('productName') productName: string) {
        return this.productService.getProductDetailsByName(productName);
    }
}