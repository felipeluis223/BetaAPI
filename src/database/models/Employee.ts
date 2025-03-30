import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Employee extends Model {
    public id! : number;
    public name! : string;
    public cpf! : string;
    public rg! : string;
    public email! : string;
    public phone! : string;
};

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        rg: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "employees", // Sequelize pluraliza automaticamente
        tableName: "employees", // Se quiser forçar o nome da tabela
        timestamps: true // Adiciona `createdAt` e `updatedAt` automaticamente
    }
);

sequelize.sync().then(()=>{
    console.log("Tabela de Funcionário sincronizada...")
});

export default Employee;