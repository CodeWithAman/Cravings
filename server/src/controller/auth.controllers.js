import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const RegisterUser = async (req, res, next) => {
  try {
    // controller logic
    const { fullname, email, phone, gender, password, dob } = req.body;

    if (!fullname || !email || !password || !phone || !gender || !dob) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("Email Already Registered");
      error.statusCode = 409;
      return next(error);
    }


    const photo = `https://placehold.co/600x400?text=${fullname.charAt(0).toUpperCase()}`;

    const SALT = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = await User.create({
      fullname,
      email,
      phone,
      gender,
      password: hashedPassword,
      dob,
      photo,
    });

    res.status(201).json({ message: "User Created Succesfully" });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const LoginUser = async (req, res, next) => {
  try {
    // controller logic
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const error = new Error("Email not Registered");
      error.statusCode = 404;
      return next(error);
    }

    const isverified = await bcrypt.compare(password, existingUser.password);
    if (!isverified) {
      const error = new Error("Incorrect Password");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({
      message: "User Login Sucessfully | Welcome Back !!",
      data: existingUser,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const LogoutUser = async (req, res, next) => {
  try {
    // controller logic
  } catch (error) {
    console.log(error.message);
    next();
  }
};
