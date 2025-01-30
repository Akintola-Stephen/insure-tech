import { Table, Model, ForeignKey, Column, DataType, BelongsTo } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Product } from "./product.model";

@Table
export class ProductPurchaseOrder extends Model {
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Product)
    product: Product;
}
