const User = require("../models/User");
const Activity = require("../models/Activity");
const FoodLog = require("../models/FoodLog");
const Workout = require("../models/Workout");

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET A USER'S DAILY ACTIVITY
const getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.params.id,
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET A USER'S FOOD LOGS
const getUserFoodLogs = async (req, res) => {
  try {
    const foods = await FoodLog.find({
      userId: req.params.id,
    }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET A USER'S WORKOUT HISTORY
const getUserWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.params.id,
    }).sort({ date: -1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getAllUsers,
  getUserActivities,
  getUserFoodLogs,
  getUserWorkouts,
};