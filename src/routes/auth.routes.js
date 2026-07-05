import express from "express"
import { login } from "../controllers/auth.controller.js"

const router = express.Router()
//no olvidar poner exacta la ruta
router.post("/auth/login", login)

export default router;