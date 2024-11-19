import { Column, DataType, Index, Model, Table } from "sequelize-typescript";

interface UserCreationAttributes{
    name: string;
    surname: string;
    age: number;
    sex: string;
}

@Table({tableName:'user', timestamps: false,})
export class User extends Model<User, UserCreationAttributes>{
    @Index({ using: 'BTREE' })
    @Column({
        type:DataType.INTEGER, 
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @Column({
        type:DataType.STRING, 
        allowNull:true
    })
    name:string;
    
    @Column({
        type:DataType.STRING, 
        allowNull:true
    })
    surname:string;

    @Column({
        type:DataType.INTEGER, 
        allowNull:true
    })
    age:number;

    @Column({
        type:DataType.STRING, 
        allowNull:true
    })
    sex:string;

    @Column({
        type:DataType.BOOLEAN, 
        allowNull:true
    })
    isHappy:boolean;
}
