import express from "express";
import { ContactUsForm } from "../controller/public.controllers.js";


const router = express.Router()

router.post("/contactUs" , ContactUsForm)

export default router;
