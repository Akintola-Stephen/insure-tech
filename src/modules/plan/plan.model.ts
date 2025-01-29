import { Table, Model, Column, ForeignKey, BelongsTo, HasMany, DataType } from "sequelize-typescript";
import { User } from "../user/user.model";

@Table
export class Plan extends Model {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    totalAmount: number;
}
