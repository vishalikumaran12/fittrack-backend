const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { requireAdmin } = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  getUserActivities,
  getUserFoodLogs,
  getUserWorkouts,
} = require("../controllers/adminController");
router.get("/users", protect, requireAdmin, getAllUsers);

router.get(
  "/users/:id/activities",
  protect,
  requireAdmin,
  getUserActivities
);
router.get(
  "/users/:id/food-logs",
  protect,
  requireAdmin,
  getUserFoodLogs
);
router.get(
  "/users/:id/workouts",
  protect,
  requireAdmin,
  getUserWorkouts
);
module.exports = router;