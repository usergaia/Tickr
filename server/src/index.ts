import express, { Request, Response } from "express";
import connectDB from "./db";
import "./redis";
import itemRoutes from "./routes/stocks.route";
import cors from "cors";

const app = express();
const port = 1000;

// mw
app.use(cors());
app.use(express.json());

// routes
app.use("/stocks", itemRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the server!!");
});

// health check for client to verify server is running
app.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "healthy", timestamp: new Date().toISOString() });
});

// db
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
