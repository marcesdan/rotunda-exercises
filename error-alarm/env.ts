import { z } from "zod";

const envSchema = z.object({
  SMTP_HOST: z.string().min(1, "SMTP host is required"),
  SMTP_PORT: z
    .string()
    .transform(Number)
    .refine((port) => port > 0 && port < 65536, "Invalid SMTP port"),
  SMTP_USER: z.string().email("Invalid email format"),
  SMTP_PASS: z.string().min(16, "SMTP password must be at least 16 characters"),
  SMTP_MAIL_FROM: z.string().email("Invalid sender email"),
  SMTP_MAIL_TO: z.string().email("Invalid recipient email"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);
