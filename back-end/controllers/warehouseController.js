const Warehouse = require("../models/warehouseModel");
const User = require("../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

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

  const newWarehouse = await Warehouse.create(req.body);
  const updateOwner = await User.findById(req.body.wareowner_id);

  updateOwner.container.push(newWarehouse._id);
  await updateOwner.save();

  res.status(201).json({
    status: "success",
    data: {
      warehouse: newWarehouse,
      message: "Warehouse Added Successfully!",
    },
  });
});

exports.getWarehouse = catchAsync(async (req, res, next) => {
  const warehouse = await Warehouse.findById(req.params.id);

  res.status(200).json({
    status: "success",
    warehouse: warehouse,
  });
});

exports.updateWarehouse = catchAsync(async (req, res, next) => {
  //   const warehouse = await Warehouse.findById(req.params.id);
  const updatedWare = await Warehouse.findByIdAndUpdate(
    req.params.id,
    req.body
  );

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
