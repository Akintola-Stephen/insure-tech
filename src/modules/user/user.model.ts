import { Table, Model, Column, HasOne, DataType } from "sequelize-typescript";
import { Wallet } from "../wallet/wallet.model";


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
}