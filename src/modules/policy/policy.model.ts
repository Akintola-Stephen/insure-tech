import { Table, Model, Column, ForeignKey, BelongsTo, DataType, Scopes } from "sequelize-typescript";
import { Plan } from "../plan/plan.model";
import { User } from "../user/user.model";


@Scopes(() => ({
    byPlan: (planId: number) => ({ where: { planId } }),
}))
@Table
export class PendingPolicy extends Model {
    @ForeignKey(() => Plan)
    @Column
    planId: number;

    @BelongsTo(() => Plan)
    plan: Plan;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

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

