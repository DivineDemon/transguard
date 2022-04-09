const express = require("express");
const colors = require("colors");
const authRoute = require("./routes/auth");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const port = process.env.port || 5000;

connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Base Route Working!" });
});
app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`Server Started on port ${port}`));
