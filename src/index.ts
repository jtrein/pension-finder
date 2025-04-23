import express, { ErrorRequestHandler } from "express";

import pensionsRoutes from "./routes/pensions";
import { AppError } from "./errors";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.details.status).json(err.details);

    return;
  }

  res.status(500).json({ status: 500, message: "Internal server error" });
};

const BASE_API_PATH = "/api";
const PORT = 3000;

const app = express();

app.use(BASE_API_PATH, pensionsRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
