import { Router } from "express";
import { registerNewUser } from "../controllers/authController";

const route=Router()

route.post("/register",registerNewUser)

export default route