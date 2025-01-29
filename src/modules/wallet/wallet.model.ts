import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Wallet extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({
    defaultValue: 0.0,
    type: DataType.DOUBLE,
    allowNull: false,
  })
  balance: number;

  @BelongsTo(() => User)
  user: User;
}
