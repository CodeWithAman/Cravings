import  cloudinary from "./src/config/cloudinary.config.js"
import express from "express";
import connectDB from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/routers/auth.routes.js";
import PublicRouter from "./src/routers/public.route.js";
import CommonRouter from "./src/routers/common.route.js";
import AdminRouter from "./src/router/admin.route.js";
import RestaurantRouter from "./src/routers/restaurant.routes.js";
import CustomerRouter from "./src/router/customer.route.js";
import RiderRouter from "./src/router/rider.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: "http://localhost:5173" , credentials: true }));
app.use(express.json());
app.use(cookieParser())

app.use(morgan("dev"));

app.use("/auth", AuthRouter);
app.use("/public", PublicRouter);
app.use("/common", CommonRouter);

app.use("/admin", AdminRouter);
app.use("/restaurant", RestaurantRouter)
app.use("/customer", CustomerRouter);
app.use("/rider", RiderRouter);

// default API
app.get("/", (req, res) => {
  console.log("Default Get API Hit");
  res.json({ message: "Welcome to my Cravings Project" }); // api creations
});

// Default Error Handler
app.use((err, req, res, next) => {
  const ErrorMessage = err.message || "Internal Server Error";
  const ErrorStatusCode = err.statusCode || 500;

  res.status(ErrorStatusCode).json({ message: ErrorMessage });
});

const port = process.env.PORT || 5000; // verify the port

app.listen(port,async () => {
  console.log("Server Strated on PORT:", port); //
  connectDB();
  try {
    const result = await cloudinary.api.ping()
    console.log("Cloudinary Connected :");
    console.log(result);
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
});
