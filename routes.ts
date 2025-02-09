import express, { Request, Response } from "express";
import usersController from "./src/controllers/users.controller";
import ingredientsController from "./src/controllers/ingredients.controller";

const router = express.Router();

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
router.get("/users", usersController.getAllUsers);

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
router.get("/users/:id", usersController.getUserById);

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
router.post("/users", usersController.createUser);

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
router.put("/users/:id", usersController.updateUser);

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
router.delete("/users/:id", usersController.deleteUser);

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Récupérer tous les ingrédients
 *     responses:
 *       200:
 *         description: Liste des ingrédients retournée avec succès
 */
router.get("/ingredients", ingredientsController.getAllIngredients);

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
router.get("/ingredients/:id", ingredientsController.getIngredientById);

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
router.post("/ingredients", ingredientsController.createIngredient);

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
router.put("/ingredients/:id", ingredientsController.updateIngredient);

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
router.delete("/ingredients/:id", ingredientsController.deleteIngredient);

export default router;