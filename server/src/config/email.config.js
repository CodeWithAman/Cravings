import nodemailer from "nodemailer";

const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSCODE,
      },
    });

    const mailOption = {
      from: process.env.GMAIL_USERNAME,
      to,
      subject,
      html: message,
    };

    const res = await transporter.sendMail(mailOption);
    console.log(res);
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export default sendEmail;

// sendEmail(
//     "amansen88127@gmail.com",
//     "test Email",
//     `<h1 style='color:blue;'>Text Message<h1/>
//     <p style='color:red;'>Btach FSD 6</p>`,
// );
