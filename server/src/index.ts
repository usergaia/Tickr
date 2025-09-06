import express, { Request, Response } from "express";
import connectDB from "./db";
import itemRoutes from "./routes/stocks.route";
import cors from "cors";

const app = express();
const port = 2000;

// mw
app.use(cors());
app.use(express.json());

// routes
app.use("/api/items", itemRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express + TypeScript!");
});

// db
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
