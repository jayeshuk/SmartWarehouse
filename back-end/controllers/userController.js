const User = require("../models/userModel");
const catchAsync = require("../../utils/catchAsync");

exports.getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "success",
    user: user,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This Route has not yet implemented.",
  });
};

exports.updateUser = catchAsync(async (req, res, next) => {
  // const user = await User.findById(req.params.id);
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    user: {},
  });
});
