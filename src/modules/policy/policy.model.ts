import { Table, Model, Column, ForeignKey, BelongsTo, DataType } from "sequelize-typescript";
import { Plan } from "../plan/plan.model";

@Table
export class Policy extends Model {
    @ForeignKey(() => Plan)
    @Column
    planId: number;

    @BelongsTo(() => Plan)
    plan: Plan;

    @Column({
        type: DataType.ENUM('unused', 'used'),
        allowNull: false,
        defaultValue: 'unused'
    })
    status: 'unused' | 'used';

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    policyNumber: string; // Only generated when activated

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isDeleted: boolean;
}
