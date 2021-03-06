const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Produce must have a name"],
  },
  quantity: {
    type: Number,
    required: [true, "Produce must have quantity"],
  },
  warehouse_id: {
    type: mongoose.ObjectId,
  },
  farmer_id: {
    type: mongoose.ObjectId,
  },
  price_to_sell: {
    type: Number,
    default: 0,
  },
  amount_payable_byfarmer: {
    type: Number,
  },
  wareowner_id: {
    type: mongoose.ObjectId,
  },
  farmer_contact: {
    type: Number,
  },
  owned_by: {
    type: String,
  },
  storage_place: {
    type: String,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Produce = mongoose.model("Produce", produceSchema);
module.exports = Produce;
