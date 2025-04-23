import express from "express";

import pensionsRoutes from "./routes/pensions";

const BASE_API_PATH = "/api";
const PORT = 3000;

const app = express();

app.use(BASE_API_PATH, pensionsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
