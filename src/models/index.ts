import { sequelize } from "../../database";
import User from "./user.model";
import Ingredient from "./ingredient.model";

const seedDatabase = async () => {
    try {
        const usersCount = await User.count();
        if (usersCount === 0) {
            await User.bulkCreate([
                { name: "Alice Doe", email: "alice@example.com", password: "hashedpassword1" },
                { name: "Bob Smith", email: "bob@example.com", password: "hashedpassword2" },
                { name: "Charlie Brown", email: "charlie@example.com", password: "hashedpassword3" }
            ]);
            console.log("✅ Fake users inserted!");
        }

        const ingredientsCount = await Ingredient.count();
        if (ingredientsCount === 0) {
            await Ingredient.bulkCreate([
                { name: "Tomato" },
                { name: "Onion" },
                { name: "Garlic" }
            ]);
            console.log("✅ Fake ingredients inserted!");
        }
    } catch (error) {
        console.error("❌ Error inserting fake data:", error);
    }
};

const syncDB = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log("✅ Database synchronized!");
        await seedDatabase();
    } catch (error) {
        console.error("❌ Error syncing database:", error);
    }
};

export { User, Ingredient, syncDB };
