"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncDB = exports.Ingredient = exports.User = void 0;
const database_1 = require("../../database");
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const ingredient_model_1 = __importDefault(require("./ingredient.model"));
exports.Ingredient = ingredient_model_1.default;
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersCount = yield user_model_1.default.count();
        if (usersCount === 0) {
            yield user_model_1.default.bulkCreate([
                { name: "Alice Doe", email: "alice@example.com", password: "hashedpassword1" },
                { name: "Bob Smith", email: "bob@example.com", password: "hashedpassword2" },
                { name: "Charlie Brown", email: "charlie@example.com", password: "hashedpassword3" }
            ]);
            console.log("✅ Fake users inserted!");
        }
        const ingredientsCount = yield ingredient_model_1.default.count();
        if (ingredientsCount === 0) {
            yield ingredient_model_1.default.bulkCreate([
                { name: "Tomato" },
                { name: "Onion" },
                { name: "Garlic" }
            ]);
            console.log("✅ Fake ingredients inserted!");
        }
    }
    catch (error) {
        console.error("❌ Error inserting fake data:", error);
    }
});
const syncDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync({ alter: true });
        console.log("✅ Database synchronized!");
        yield seedDatabase();
    }
    catch (error) {
        console.error("❌ Error syncing database:", error);
    }
});
exports.syncDB = syncDB;
