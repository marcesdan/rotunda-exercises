import { appendFile } from "fs/promises";
import { join } from "path";

const LOG_FILE = join(process.cwd(), "errors.log");

export const logErrorToFile = async (error: Error) => {
    console.error(error);

    const now = new Date().toISOString();
    const logLine = `${now}: ${error.stack}\n`;

    try {
        await appendFile(LOG_FILE, logLine);
    } catch (error) {
        console.error("Failed to log error to file", error);
    }
}
