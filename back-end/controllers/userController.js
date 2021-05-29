const User = require("../models/userModel");
const Produce = require("../models/produceModel");
const Warehouse = require("../models/warehouseModel");
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

exports.addOrder = catchAsync(async (req, res) => {
  const farmer = await User.findById(req.body.farmer_id);
  const ware = await Warehouse.findById(req.body.warehouse_id);

  const newProduce = await Produce.create({
    ...req.body,
    owned_by: farmer.firstName + "/" + farmer.lastName,
    storage_place: ware.name + "/" + ware.address,
  });
  const updatedWareOwner = await User.findById(req.params.id);

  updatedWareOwner.orders.push(newProduce._id);
  await updatedWareOwner.save();

  res.status(200).json({
    status: "success",
    data: {
      user: updatedWareOwner,
    },
  });
});

exports.loadOrder = catchAsync(async (req, res) => {
  const warehouseOwner = await User.findById(req.params.id);

  const orderIds = warehouseOwner.orders;
  const pendingOrders = await Produce.find({ _id: { $in: orderIds } });
  const newOrders = new Array(
    ...pendingOrders.filter((obj) => obj.accepted === false)
  );

  // console.log("filtered:", pendingOrders);
  // console.log("All", warehouseOwner.orders);

  res.status(200).json({
    status: "success",
    data: {
      newOrders,
    },
  });
});
