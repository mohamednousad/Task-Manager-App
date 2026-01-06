import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";

const app = express();

app.use(cors(
    {
        origin:[
            "http://localhost:3000",
            "http://localhost:3001"
        ]
    }
));
app.use(express.json());

// Connect to the db
connectDB();

export default app;