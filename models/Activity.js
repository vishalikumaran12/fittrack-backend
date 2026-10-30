const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    steps: {
      type: Number,
      default: 0,
      min: 0,
    },
    calories: {
      type: Number,
      default: 0,
      min: 0,
    },
    water: {
      type: Number,
      default: 0,
      min: 0,
    },
    sleep: {
      type: Number,
      default: 0,
      min: 0,
    },
    workoutMinutes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// One activity record per user per day
activitySchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Activity", activitySchema);