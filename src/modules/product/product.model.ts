import { Column, DataType, Model, Table, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { ProductCategory } from '../product-category/product-category.model';
import { User } from '../user/user.model';
import { UserProduct } from './product-user.model';

@Table
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    productName: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    productAmount: number;

    @ForeignKey(() => ProductCategory)
    @Column
    productCategoryId: number;

    @BelongsTo(() => ProductCategory)
    category: ProductCategory;

    @BelongsToMany(() => User, () => UserProduct)
    users: User;
}
