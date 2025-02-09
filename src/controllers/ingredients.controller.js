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
const ingredient_model_1 = __importDefault(require("../models/ingredient.model"));
const getAllIngredients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredients = yield ingredient_model_1.default.findAll();
        res.json(ingredients);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ingredients", error });
    }
});
const getIngredientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredient = yield ingredient_model_1.default.findByPk(req.params.id);
        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
            return;
        }
        res.json(ingredient);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching ingredient", error });
    }
});
const createIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const existingIngredient = yield ingredient_model_1.default.findOne({ where: { name } });
        if (existingIngredient) {
            res.status(400).json({ message: "Ingredient already exists" });
            return;
        }
        const newIngredient = yield ingredient_model_1.default.create({ name });
        res.status(201).json(newIngredient);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating ingredient", error });
    }
});
const updateIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const ingredient = yield ingredient_model_1.default.findByPk(req.params.id);
        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
            return;
        }
        ingredient.name = name || ingredient.name;
        yield ingredient.save();
        res.json(ingredient);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating ingredient", error });
    }
});
const deleteIngredient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ingredient = yield ingredient_model_1.default.findByPk(req.params.id);
        if (!ingredient) {
            res.status(404).json({ message: "Ingredient not found" });
            return;
        }
        yield ingredient.destroy();
        res.json({ message: "Ingredient deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting ingredient", error });
    }
});
exports.default = { getAllIngredients, getIngredientById, createIngredient, updateIngredient, deleteIngredient };
