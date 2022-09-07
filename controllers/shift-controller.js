const Shift = require("../models/shift");

const createShift = async (req, res, next) => {
  const { user } = req.body;

  let createdShift = new Shift({
    user,
    inTime: Date(),
    hours: 0,
    tips: 0,
  });

  try {
    await createdShift.save();
  } catch (error) {
    console.log(error);
  }

  res.json(createdShift);
};

exports.createShift = createShift;
