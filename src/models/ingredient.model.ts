import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../database";

class Ingredient extends Model {
    public id!: number;
    public name!: string;
}

Ingredient.init(
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
    },
    {
        sequelize,
        modelName: "Ingredient",
    }
);

export default Ingredient;
