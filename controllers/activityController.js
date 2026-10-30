const Activity = require("../models/Activity");

// SAVE OR UPDATE DAILY ACTIVITY
const saveActivity = async (req, res) => {
  try {
    const {
      date,
      steps,
      calories,
      water,
      sleep,
      workoutMinutes,
    } = req.body;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Provide a valid date in YYYY-MM-DD format",
      });
    }

    const activity = await Activity.findOneAndUpdate(
      {
        userId: req.user.id,
        date,
      },
      {
        $set: {
          ...(steps !== undefined && { steps }),
          ...(calories !== undefined && { calories }),
          ...(water !== undefined && { water }),
          ...(sleep !== undefined && { sleep }),
          ...(workoutMinutes !== undefined && { workoutMinutes }),
        },
        $setOnInsert: {
          userId: req.user.id,
          date,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Daily activity saved successfully",
      activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ACTIVITY HISTORY
const getActivityHistory = async (req, res) => {
  try {
    const activities = await Activity.find({
      userId: req.user.id,
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

// GET ACTIVITY FOR A PARTICULAR DATE
const getActivityByDate = async (req, res) => {
  try {
    const activity = await Activity.findOne({
      userId: req.user.id,
      date: req.params.date,
    });

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "No activity found for this date",
      });
    }

    res.status(200).json({
      success: true,
      activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveActivity,
  getActivityHistory,
  getActivityByDate,
};