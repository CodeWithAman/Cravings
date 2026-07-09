import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/auth.service.js";

export const RegisterUser = async (req, res, next) => {
  try {
    
    // controller logic
    const { fullname, email, phone, gender, password, dob, userType } = req.body;
    
    if (!fullname || !email || !password || !phone || !gender || !dob || !userType) {
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

    const photoURL = `https://placehold.co/600x400?text=${fullname.charAt(0).toUpperCase()}`;

    const photo = {
      url: photoURL,
      publicId: null,
    };

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
      userType,
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
    
    await genToken(existingUser, res);

    res.status(200).json({
      message: "Welcome Back !!",
      data: existingUser,
    });
  } catch (error) {
    console.log(error.message);
    next();
  }
};

export const LogoutUser = async (req, res, next) => {
  try {
    res.clearCookie("UserData", { maxAge: 0 });

    res.status(200).json({ message: "Logout Sucessfully" });
  } catch (error) {
    console.log(error.message);
    next();
  }
};
