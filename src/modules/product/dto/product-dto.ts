import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    productName: string;

    @IsNumber()
    @IsNotEmpty()
    productAmount: number;

    @IsNumber()
    @IsNotEmpty()
    productCategoryId: number;
}
