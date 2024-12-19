import { Router } from "express";
import { authenticateUser, registerNewUser } from "../controllers/authController";

const route=Router()

route.post("/register",registerNewUser)
route.post("/login",authenticateUser)
export default route