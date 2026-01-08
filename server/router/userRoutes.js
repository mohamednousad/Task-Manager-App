import express from "express";
import { getall, post } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getall);
router.post("/createUser", post);

export default router;