import dotenv from "dotenv";
dotenv.config();

import express from "express"; // express
import connectDB from "./src/config/dbConnection.config.js";
import AuthRouter from "./src/routers/auth.routes.js";
import PublicRouter from "./src/routers/public.route.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/auth" , AuthRouter)
app.use("/public" , PublicRouter)

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

app.listen(port, () => {
  console.log("Server Strated on PORT:", port); //
  connectDB();
});
