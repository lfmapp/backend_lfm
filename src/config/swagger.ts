import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentation de l'API avec Swagger",
        },
        servers: [
            {
                url: "http://localhost:8050",
                description: "Serveur local",
            },
        ],
    },
    apis: [path.resolve(__dirname, "../../routes.ts")],
};


const swaggerSpec = swaggerJsDoc(swaggerOptions);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("📄 Swagger disponible sur http://localhost:8050/api-docs");
}
