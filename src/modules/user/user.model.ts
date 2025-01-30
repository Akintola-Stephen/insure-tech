import { Table, Model, Column, HasOne, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Wallet } from "../wallet/wallet.model";
import { Product } from "../product/product.model";
import { Plan } from "../plan/plan.model";
import { ProductPurchaseOrder } from "../product/product-purchase-order.model";
import { PendingPolicy } from "../policy/policy.model";


@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email: string;

    @HasOne(() => Wallet)
    wallet: Wallet;

    @BelongsToMany(() => Product, () => ProductPurchaseOrder)
    products: Product[];

    @HasMany(() => Plan)
    plans: Plan[];

    @HasOne(() => PendingPolicy)
    policy: PendingPolicy
}