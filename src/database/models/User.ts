import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcrypt";

class User extends Model {
    public id! : number;
    public name! : string;
    public email! : string;
    public password! : string;
    
    public async checkPassword(password:string): Promise<boolean>{
        return await bcrypt.compare(password, this.password)
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "users",
        hooks: {
            beforeCreate: async (user)=>{
                user.password = await bcrypt.hash(user.password, 10) //Hash antes de salvar
            },
        },
    },
);

sequelize.sync().then(()=>{
    console.log("Tabela de Usuário sincronizada...");
})

export default User;