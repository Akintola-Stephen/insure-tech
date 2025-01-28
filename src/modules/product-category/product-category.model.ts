import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Product } from '../product/product.model';

@Table
export class ProductCategory extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categoryName: string;

    @HasMany(() => Product)
    products: Product[];
}
