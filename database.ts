import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();


const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;


if (!DB_NAME || !DB_USER || !DB_PASSWORD) {
    console.error("❌ ERREUR : Les variables d'environnement DB_NAME, DB_USER et DB_PASSWORD sont obligatoires.");
    process.exit(1); 
}


export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ PostgreSQL connecté avec succès !");
    } catch (error) {
        console.error("❌ Erreur de connexion à PostgreSQL :", error);
        process.exit(1); 
    }
};
