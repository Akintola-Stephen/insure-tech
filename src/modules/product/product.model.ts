import { Column, DataType, Model, Table, ForeignKey, BelongsTo, BelongsToMany, AllowNull } from 'sequelize-typescript';
import { ProductCategory } from '../product-category/product-category.model';
import { User } from '../user/user.model';
import { ProductPurchaseOrder } from './product-purchase-order.model';

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

    @Column({
        type: DataType.INTEGER,
    })
    quantity: number;


    @ForeignKey(() => ProductCategory)
    @Column
    productCategoryId: number;

    @BelongsTo(() => ProductCategory)
    category: ProductCategory;

    @BelongsToMany(() => User, () => ProductPurchaseOrder)
    users: User;
}
