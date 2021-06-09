const Produce = require("../models/produceModel");
const User = require("../models/userModel");
const Warehouse = require("../models/warehouseModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.createProduce = catchAsync(async (req, res, next) => {
  console.log("Produce Body:", req.body);
  const newProduce = await Produce.findById(req.body.details._id);
  newProduce.accepted = true;
  await newProduce.save();

  const updateOwner = await User.findById(req.body.details.farmer_id);
  const updateWarehouse = await Warehouse.findById(
    req.body.details.warehouse_id
  );

  updateWarehouse.container.push(newProduce._id);
  updateWarehouse.space_available -= newProduce.quantity;
  updateWarehouse.last_update = new Date().toString().slice(0, 25) + "IST";
  await updateWarehouse.save();
  updateOwner.container.push(newProduce._id);
  await updateOwner.save();

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

exports.callStoredProduces = catchAsync(async (req, res, next) => {
  const storedProduces = await Produce.find({ _id: { $in: req.body } });
  console.log("Inside CallStoredProduces  : ", storedProduces);

  res.status(200).json({
    status: "success",
    results: storedProduces.length,
    data: {
      storedProduces,
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
