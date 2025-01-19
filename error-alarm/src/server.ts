import express, { Request, Response, NextFunction } from "express";
import { createLogError } from ".";

export const app = express();

const logError = createLogError({ timeWindow: 60000, threshold: 10 });

// Simulate an error in a route
app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Simulated error");
  next(error);
});

// Error-handling middleware
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  try {
    await logError(err);
    res.status(500).send("Internal Server Error");
  } catch (error) {
    next(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
