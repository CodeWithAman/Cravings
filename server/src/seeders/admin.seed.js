import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const AdminUser = {
  fullname: "Admin",
  email: "admincravings@gmail.com",
  password: await bcrypt.hash("AdminCraving@123" , 10),
  dob: "1998-04-03",
  gender: "other",
  userType: "admin",
  phone: "1234567890",
  photo: { url: "https://placehold.co/600x400?text=Admin", publicId: null },
};

const adminSeed = async () => {
  try {
    const existingAdmin = await User.findOne({ email: AdminUser.email });

    if (existingAdmin) {
      console.log("Existing User Found");
      console.log("Deleting Existing User");
      await existingAdmin.deleteOne();
    }

    console.log("Creating New Admin");

    const newAdmin = await User.create(AdminUser);
    console.log("Admin Create sucessfully");
  } catch (error) {
    console.log("Admin Not Created");
    throw error;
  }
};

export default adminSeed;
