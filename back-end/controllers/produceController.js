const Produce = require("../models/produceModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.createProduce = catchAsync(async (req, res, next) => {
  console.log("Produce Body:", req.body);

  const newProduce = await Produce.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      produce: newProduce,
      message: "Produce Added Successfully!",
    },
  });
});

exports.getAllProduces = catchAsync(async (req, res, next) => {
  const produces = await Produce.find();

  res.status(200).json({
    status: "success",
    results: produces.length,
    data: {
      produces: produces,
    },
  });
});

// Below controllers not configured
exports.getProduce = catchAsync((req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This Route has not yet implemented.",
  });
});

exports.updateProduce = catchAsync((req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This Route has not yet implemented.",
  });
});

exports.deleteProduce = catchAsync((req, res, next) => {
  res.status(500).json({
    status: "error",
    message: "This Route has not yet implemented.",
  });
});
