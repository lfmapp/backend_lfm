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
const user_model_1 = __importDefault(require("../../../src/models/user.model"));
const database_1 = require("../../../database");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.sync({ force: true });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close();
}));
describe("User Model", () => {
    it("should create a user model instance", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.create({
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        });
        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Test User");
        expect(user.email).toBe("test@example.com");
    }));
    it("should fail if email is not unique", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_model_1.default.create({
                name: "Test User 2",
                email: "test@example.com",
                password: "hashedpassword",
            });
        }
        catch (error) {
            expect(error).toBeDefined();
            expect(error.name).toBe("SequelizeUniqueConstraintError");
        }
    }));
});
