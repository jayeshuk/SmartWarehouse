const Warehouse = require("../models/warehouseModel");
const User = require("../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const mongoose = require("mongoose");

exports.getAllWarehouses = catchAsync(async (req, res, next) => {
  const warehouses = await Warehouse.find();

  res.status(200).json({
    status: "success",
    results: warehouses.length,
    data: {
      warehouses: warehouses,
    },
  });
});

exports.createWarehouse = catchAsync(async (req, res, next) => {
  console.log("Warehouse Body:", req.body);

  const newWarehouse = await Warehouse.create({
    ...req.body,
    last_update: new Date().toString().slice(0, 25) + "IST",
  });
  const updateOwner = await User.findById(req.body.wareowner_id);

  updateOwner.container.push(mongoose.Types.ObjectId(newWarehouse._id));
  await updateOwner.save();

  res.status(201).json({
    status: "success",
    data: {
      user: updateOwner,
      message: "Warehouse Added Successfully!",
    },
  });
});

exports.getWarehouse = catchAsync(async (req, res, next) => {
  //Loads Users Warehouses in account
  const user = await User.findById(req.params.id);
  const warehouses = await Warehouse.find({ _id: { $in: user.container } });

  res.status(200).json({
    status: "success",
    results: warehouses.length,
    data: {
      warehouses: warehouses,
    },
  });
});

exports.updateWarehouse = catchAsync(async (req, res, next) => {
  //   const warehouse = await Warehouse.findById(req.params.id);

  // Add CurrentOccupancy (PieData)
  // Add PastData along with (StackData)
  const updatedWare = await Warehouse.findByIdAndUpdate(req.params.id, {
    ...req.body,
    last_update: new Date().toString().slice(0, 25) + "IST",
  });

  res.status(200).json({
    status: "success",
    data: {
      warehouse: updatedWare,
    },
  });

  res.status(500).json({
    status: "error",
    message: "This Route has not yet implemented.",
  });
});

exports.deleteWarehouse = catchAsync(async (req, res, next) => {
  const warehouse = await Warehouse.deleteOne({ _id: req.params.id });
  res.status(200).json({
    status: "success",
    warehouse: {},
  });
});
