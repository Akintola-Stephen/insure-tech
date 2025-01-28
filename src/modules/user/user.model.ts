import { Table, Model, Column, HasOne } from "sequelize-typescript";
import { Wallet } from "../wallet/wallet.model";


@Table
export class User extends Model {
    @Column
    name: String;
    @Column
    email: String;

    @HasOne(() => Wallet)
    wallet: Wallet;
}