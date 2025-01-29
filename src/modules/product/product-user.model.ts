import { Table, Model, ForeignKey, Column, DataType } from "sequelize-typescript";
import { User } from "../user/user.model";
import { Product } from "../product/product.model";


// Join Table
@Table
export class UserProduct extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    quantity: number;
}
