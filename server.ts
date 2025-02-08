import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.json({
        status: 200,
        message: "LFM BackEnd - Test Jenkins"
    });
});

const PORT = 8080;


if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

export default app;
