import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { Content } from "../controllers/contentController";
import { authorizeRole } from "../middleware/authorizeRole";

const route=Router()

route.get("/content",authorizeRole("ADMIN"),Content)

export default route