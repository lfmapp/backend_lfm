import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error });
    }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};


const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error });
    }
};


export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
