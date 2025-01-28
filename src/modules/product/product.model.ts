import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ProductCategory } from '../product-category/product-category.model';

@Table
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    productName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;

    @ForeignKey(() => ProductCategory)
    @Column
    productCategoryId: number;

    @BelongsTo(() => ProductCategory)
    category: ProductCategory;
}
