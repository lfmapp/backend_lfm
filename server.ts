import express, { Request, Response } from 'express';
import cors from "cors";
import routes from "./routes";
import { connectDB } from "./database";
import { syncDB } from "./src/models/index";
import { setupSwagger } from "./src/config/swagger";

const app = express();
const PORT = process.env.PORT || 8050;

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à la base de données
const startServer = async () => {
    await connectDB();
    await syncDB();
    
    setupSwagger(app); 
    app.use("/api", routes);

    app.get('/', (req: Request, res: Response) => {
        res.json({
            status: 200,
            message: "LFM BackEnd - Tests TI, TU, & TS"
        });
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
}
startServer();
export default app;