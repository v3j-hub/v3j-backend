import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import dotenv from "dotenv";
dotenv.config();

const mailgunAuth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

export const transporter = nodemailer.createTransport(mg(mailgunAuth));
