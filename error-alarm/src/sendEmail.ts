import nodemailer from "nodemailer";
import { ENV as env } from "../env";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
});

export const sendEmail = async (errorCount: number, timeWindow: number) => {
  const message = {
    from: env.SMTP_MAIL_FROM,
    to: env.SMTP_MAIL_TO,
    subject: "Error Rate Alert",
    text: `Alert: ${errorCount} errors occurred in the last ${timeWindow / 1000} seconds`,
  };

  return transporter.sendMail(message);
};
