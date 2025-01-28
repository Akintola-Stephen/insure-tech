import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    productName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    price: number;
}
