import formData from "form-data";
import Mailgun from "mailgun.js";
import dotenv from "dotenv";

dotenv.config();

const mailgun = new Mailgun(formData);

export const mgClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});
