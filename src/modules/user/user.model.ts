import { Table, Model, Column, HasOne, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Wallet } from "../wallet/wallet.model";
import { Product } from "../product/product.model";
import { Plan } from "../plan/plan.model";
import { UserProduct } from "../product/product-user.model";


@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: String;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: String;

    @HasOne(() => Wallet)
    wallet: Wallet;

    @BelongsToMany(() => Product, () => UserProduct)
    products: Product[];

    @HasMany(() => Plan)
    plans: Plan[];
}