import { Request, Response } from "express";
import Ingredient from "../models/ingredient.model";

const getAllIngredients = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredients = await Ingredient.findAll();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ingredients", error });
    }
};

const getIngredientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);
        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
            return;
        }
        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ingredient", error });
    }
};

const createIngredient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const existingIngredient = await Ingredient.findOne({ where: { name } });

        if (existingIngredient) {
            res.status(400).json({ message: "Ingredient already exists" });
            return;
        }

        const newIngredient = await Ingredient.create({ name });
        res.status(201).json(newIngredient);
    } catch (error) {
        res.status(500).json({ message: "Error creating ingredient", error });
    }
};


const updateIngredient = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const ingredient = await Ingredient.findByPk(req.params.id);

        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
            return;
        }

        ingredient.name = name || ingredient.name;
        await ingredient.save();

        res.json(ingredient);
    } catch (error) {
        res.status(500).json({ message: "Error updating ingredient", error });
    }
};

const deleteIngredient = async (req: Request, res: Response): Promise<void> => {
    try {
        const ingredient = await Ingredient.findByPk(req.params.id);
        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
            return;
        }
        await ingredient.destroy();
        res.json({ message: "Ingredient deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting ingredient", error });
    }
};


export default { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient };
