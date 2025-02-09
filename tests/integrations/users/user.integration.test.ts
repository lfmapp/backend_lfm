import User from "../../../src/models/user.model";
import { sequelize } from "../../../database";

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("User Model", () => {
    it("should create a user model instance", async () => {
        const user = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        });

        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Test User");
        expect(user.email).toBe("test@example.com");
    });

    it("should fail if email is not unique", async () => {
        try {
            await User.create({
                name: "Test User 2",
                email: "test@example.com",
                password: "hashedpassword",
            });
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.name).toBe("SequelizeUniqueConstraintError");
        }
    });
});
