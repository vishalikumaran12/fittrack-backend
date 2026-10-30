const FoodLog = require("../models/FoodLog");

// ADD FOOD
const addFood = async (req, res) => {
  try {
    const {
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      date,
    } = req.body;

    if (!foodName || !mealType || !date) {
      return res.status(400).json({
        success: false,
        message: "Food name, meal type and date are required",
      });
    }

    const food = await FoodLog.create({
      userId: req.user.id,
      foodName,
      mealType,
      calories,
      protein,
      carbs,
      fat,
      date,
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET FOOD HISTORY
const getFoodLogs = async (req, res) => {
  try {
    const foods = await FoodLog.find({
      userId: req.user.id,
    }).sort({ date: -1 });

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

// UPDATE FOOD
const updateFood = async (req, res) => {
  try {
    const food = await FoodLog.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food record updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE FOOD
const deleteFood = async (req, res) => {
  try {
    const food = await FoodLog.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!food) {
      return res.status(404).json({
        success: false,
        message: "Food record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Food record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addFood,
  getFoodLogs,
  updateFood,
  deleteFood,
};