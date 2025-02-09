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
jest.mock("../../../src/models/user.model");
describe("User Model (Unitaire)", () => {
    it("should create a user instance", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        };
        // Simule `User.create()` pour renvoyer `mockUser`
        user_model_1.default.create.mockResolvedValue(mockUser);
        // Exécute la méthode comme si elle était réelle
        const user = yield user_model_1.default.create({
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        });
        // Vérifications du mock
        expect(user_model_1.default.create).toHaveBeenCalledTimes(1);
        expect(user_model_1.default.create).toHaveBeenCalledWith({
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        });
        // Vérifications du résultat
        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Test User");
        expect(user.email).toBe("test@example.com");
    }));
});
