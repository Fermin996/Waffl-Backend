const User = require("../models/user");

const createUser = async (req, res, next) => {
  const { name, pin } = req.body;

  let createdUser = new User({
    name,
    pin,
  });

  try {
    await createdUser.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json(createdUser);
};

const clockInUser = async (req, res, next) => {
  const pin = req.body.pin;
  let user;

  try {
    user = await User.findOne({ pin: pin });
  } catch (error) {
    console.log(error);
  }

  if (user) {
    res.json(user);
  } else {
    res.json(false);
  }
};

exports.createUser = createUser;
exports.clockInUser = clockInUser;
