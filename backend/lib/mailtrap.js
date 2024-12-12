import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config();

const token = process.env.MAILTRAP_TOKEN;

export const client = new MailtrapClient({ token });

export const sender = {
  email: process.env.MAILTRAP_EMAIL,
  name: process.env.MAILTRAP_NAME,
};
