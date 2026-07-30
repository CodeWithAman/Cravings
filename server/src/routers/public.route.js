import express from "express";
import {
  ContactUsForm,
  GetAllRestaurants,
  GetRestaurantDetails,
} from "../controllers/public.controller.js";

const router = express.Router();

router.post("/contactUs", ContactUsForm);

router.get("/restaurants", GetAllRestaurants)

router.get("/restaurant-detail/:restaurantId", GetRestaurantDetails)

export default router;
