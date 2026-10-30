const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  saveActivity,
  getActivityHistory,
  getActivityByDate,
} = require("../controllers/activityController");

router.post("/", protect, saveActivity);
router.get("/history", protect, getActivityHistory);
router.get("/:date", protect, getActivityByDate);

module.exports = router;