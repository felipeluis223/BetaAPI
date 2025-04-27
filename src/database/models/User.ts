import { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

class User extends Model {
  public id!: string;  // Mudança de número para string (UUID)
  public email!: string;
  public name!: string;
  public password?: string;

  public async checkPassword(password: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,  // UUID
      defaultValue: uuidv4,  // Gerando UUID automaticamente
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Tornar opcional para permitir login via Google
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;
