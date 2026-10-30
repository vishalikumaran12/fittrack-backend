const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addFood,
  getFoodLogs,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

router.post("/", protect, addFood);
router.get("/", protect, getFoodLogs);
router.patch("/:id", protect, updateFood);
router.delete("/:id", protect, deleteFood);

module.exports = router;