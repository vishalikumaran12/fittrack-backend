
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const activityRoutes = require("./routes/activityRoutes");
const adminRoutes = require("./routes/adminRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const foodRoutes = require("./routes/foodRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/food-logs", foodRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "FitTrack Backend API is running!",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
