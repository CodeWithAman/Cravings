import ContactUs from "../models/contact.model.js";

export const ContactUsForm = async (req, res, next) => {
  try {
    
    const { fullname, email, phone, subject, message } = req.body;
    
    if (!fullname || !email || !phone || !subject || !message) {
      const error = new Error("All Feilds Required");
      error.statusCode = 400;
      return next(error);
    }

    const NewContactMessage = await ContactUs.create({
      fullname,
      email,
      phone,
      subject,
      message,
    });

    res
      .status(201)
      .json({
        message: "Thanks for Contacting Us! You will hear back from us soon",
      });
  } catch (error) {
    console.log(error.message);
    next();
  }
};
