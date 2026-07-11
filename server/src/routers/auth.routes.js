import express from "express";
import {
  RegisterUser,
  LoginUser,
  LogoutUser,
  SendOTP,
  VerifyOTP,
  ResetPassword,
} from "../controllers/auth.controller.js";
import { OTPAuthProtect } from "../middlewares/auth.middleware.js";


const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)
router.get("/logout", LogoutUser)

router.post("/send-otp" , SendOTP)
router.post("/verify-otp", VerifyOTP)
router.post("/reset-password", OTPAuthProtect, ResetPassword)

export default router;
