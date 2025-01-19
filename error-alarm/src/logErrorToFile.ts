import { appendFile, mkdir } from "fs/promises";
import { join } from "path";

const LOG_DIR = join(__dirname, "..", "logs");
const LOG_FILE = join(LOG_DIR, "errors.log");

export const logErrorToFile = async (error: Error) => {
  console.error(error);

  const now = new Date().toISOString();
  const logLine = `${now}: ${error.stack}\n`;

  try {
    await mkdir(LOG_DIR, { recursive: true });
    await appendFile(LOG_FILE, logLine);
  } catch (err) {
    console.error("Failed to log error to file", err);
  }
};
