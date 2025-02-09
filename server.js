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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./database");
const index_1 = require("./src/models/index");
const swagger_1 = require("./src/config/swagger");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8050;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Connexion à la base de données
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_1.connectDB)();
    yield (0, index_1.syncDB)();
    (0, swagger_1.setupSwagger)(app);
    app.use("/api", routes_1.default);
    app.get('/', (req, res) => {
        res.json({
            status: 200,
            message: "LFM BackEnd - Tests TI, TU, & TS"
        });
    });
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
});
startServer();
exports.default = app;
