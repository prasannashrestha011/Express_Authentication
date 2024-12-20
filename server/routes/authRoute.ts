import { Router } from "express";
import { authenticateUser, changePassword, registerNewUser } from "../controllers/authController";

const route=Router()

route.post("/register",registerNewUser)
route.post("/login",authenticateUser)
route.post("/update/password",changePassword)
export default route