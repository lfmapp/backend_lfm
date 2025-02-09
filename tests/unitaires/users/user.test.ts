import User from "../../../src/models/user.model";

jest.mock("../../../src/models/user.model");

describe("User Model (Unitaire)", () => {
    it("should create a user instance", async () => {
        const mockUser = {
            id: 1,
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        };

        // Simule `User.create()` pour renvoyer `mockUser`
        (User.create as jest.Mock).mockResolvedValue(mockUser);

        // Exécute la méthode comme si elle était réelle
        const user = await User.create({
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        });

        // Vérifications du mock
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(User.create).toHaveBeenCalledWith({
            name: "Test User",
            email: "test@example.com",
            password: "hashedpassword",
        });

        // Vérifications du résultat
        expect(user).toHaveProperty("id");
        expect(user.name).toBe("Test User");
        expect(user.email).toBe("test@example.com");
    });
});
