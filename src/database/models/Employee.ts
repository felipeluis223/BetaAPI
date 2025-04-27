import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import { v4 as uuidv4 } from "uuid";

class Employee extends Model {
    public id!: string;
    public name!: string;
    public cpf!: string;
    public rg!: string;
    public email!: string;
    public phone!: string;
}

Employee.init(
    {
        id: {
            type: DataTypes.UUID,  // UUID
            defaultValue: uuidv4,  // Gerando UUID automaticamente
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: "employees",
        tableName: "employees", // Nome da tabela pode ser definido explicitamente
        timestamps: true // Adiciona `createdAt` e `updatedAt` automaticamente
    }
);

sequelize.sync().then(() => {
    console.log("Tabela de Funcionário sincronizada...");
}).catch((error) => {
    console.error("Erro ao sincronizar tabela:", error);
});

export default Employee;
