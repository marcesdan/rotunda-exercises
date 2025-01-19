import { logErrorToFile } from "./logErrorToFile";
import { sendEmail } from "./sendEmail";

type LogErrorConfig = {
  timeWindow: number;
  threshold: number;
};

export const createLogError = ({ timeWindow, threshold }: LogErrorConfig) => {
  const errorTimestamps: number[] = [];

  return async (error: Error) => {
    const now = Date.now();
    errorTimestamps.push(now);

    logErrorToFile(error);

    const cutoff = now - timeWindow;
    while (errorTimestamps.length && errorTimestamps[0] < cutoff) {
      errorTimestamps.shift();
    }

    if (errorTimestamps.length >= threshold) {
      sendEmail(errorTimestamps.length, timeWindow);
      errorTimestamps.length = 0;
    }
  };
};
