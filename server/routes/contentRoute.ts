import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { Content } from "../controllers/contentController";

const route=Router()

route.get("/content",authMiddleware,Content)

export default route