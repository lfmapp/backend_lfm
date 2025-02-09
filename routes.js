"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = __importDefault(require("./src/controllers/users.controller"));
const ingredients_controller_1 = __importDefault(require("./src/controllers/ingredients.controller"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Bienvenue sur l'API ! La doc ici : http://localhost:8050/api-docs/",
    });
});
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     responses:
 *       200:
 *         description: Liste des utilisateurs retournée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/users", users_controller_1.default.getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get("/users/:id", users_controller_1.default.getUserById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Erreur de validation
 */
router.post("/users", users_controller_1.default.createUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.put("/users/:id", users_controller_1.default.updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete("/users/:id", users_controller_1.default.deleteUser);
/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Récupérer tous les ingrédients
 *     responses:
 *       200:
 *         description: Liste des ingrédients retournée avec succès
 */
router.get("/ingredients", ingredients_controller_1.default.getAllIngredients);
/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Récupérer un ingrédient par ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingrédient trouvé
 *       404:
 *         description: Ingrédient non trouvé
 */
router.get("/ingredients/:id", ingredients_controller_1.default.getIngredientById);
/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Créer un nouvel ingrédient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingrédient créé avec succès
 */
router.post("/ingredients", ingredients_controller_1.default.createIngredient);
/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Mettre à jour un ingrédient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ingrédient mis à jour avec succès
 */
router.put("/ingredients/:id", ingredients_controller_1.default.updateIngredient);
/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Supprimer un ingrédient
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingrédient supprimé avec succès
 */
router.delete("/ingredients/:id", ingredients_controller_1.default.deleteIngredient);
exports.default = router;
