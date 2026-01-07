import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
    origin:[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
    ],
    Credentials:true,
    optionSuccessStatus:200
};
app.use(cors(corsOptions));

app.use(express.json());

import taskRoutes from "./router/taskRoutes.js";
app.use ("/api/task", taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;