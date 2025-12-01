import dotenv from "dotenv";

import nodemailer from "nodemailer";
import mgTransport from "nodemailer-mailgun-transport";

dotenv.config();

const mailgunAuth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY, 
        domain: process.env.MAILGUN_DOMAIN,
    },
};

const transporter = nodemailer.createTransport(mgTransport(mailgunAuth));

export const emailTransporter = transporter;