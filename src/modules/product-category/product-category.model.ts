import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class ProductCategory extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    categoryName: string;
}
