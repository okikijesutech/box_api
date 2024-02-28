// emailService.ts

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: "your-email@gmail.com",
  //     pass: "your-password",
  //   },
  host: "smtp.example.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "hello@okiki.com",
    pass: "your-email-password",
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const mailOptions = {
      from: "your-email@gmail.com",
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default {
  sendEmail,
};
