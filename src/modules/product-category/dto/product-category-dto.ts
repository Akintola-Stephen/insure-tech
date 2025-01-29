import { IsNotEmpty, IsString } from "class-validator";

export class ProductCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryName: string;
}