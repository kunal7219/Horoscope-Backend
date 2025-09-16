import { Router } from "express";
import { registerUser, loginUser, validateRegistration } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", validateRegistration, registerUser);
router.post("/login", loginUser);

export default router;
