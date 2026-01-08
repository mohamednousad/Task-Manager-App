import express from "express";
import {getall,post,put,del} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", getall);
router.post("/createTask", post);
router.put("/:id", put);
router.delete("/:id", del);

export default router;
