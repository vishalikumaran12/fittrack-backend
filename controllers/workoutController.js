const Workout = require("../models/Workout");

// CREATE WORKOUT
const addWorkout = async (req, res) => {
  try {
    const {
      workoutName,
      category,
      duration,
      caloriesBurned,
      date,
      completed,
    } = req.body;

    if (!workoutName || !duration || !date) {
      return res.status(400).json({
        success: false,
        message: "Workout name, duration and date are required",
      });
    }

    const workout = await Workout.create({
      userId: req.user.id,
      workoutName,
      category,
      duration,
      caloriesBurned,
      date,
      completed,
    });

    res.status(201).json({
      success: true,
      message: "Workout added successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET USER WORKOUTS
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({
      userId: req.user.id,
    }).sort({ date: -1 });

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

// UPDATE WORKOUT
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE WORKOUT
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: "Workout not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
};