import express from 'express';
import path from 'path';
import { ENV } from './config/env.js';

const app = express();

const __dirname = path.resolve();

app.get("/api/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

// Make the app ready for deployment
if(ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../admin/dist")));
}



app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));

app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
});