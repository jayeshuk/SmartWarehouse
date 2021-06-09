const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A warehouse must have a name"],
  },
  address: {
    type: String,
    required: [true, "A warehouse must have an address"],
  },
  space_available: {
    type: Number,
    default: this.total_space,
  },
  total_space: {
    type: Number,
    required: [true, "A warehouse must have space"],
  },
  rate: {
    type: Number,
  },
  wareowner_id: {
    type: mongoose.ObjectId,
  },
  container: {
    type: Array,
    default: [],
  },
  last_update: {
    type: String,
  },
});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);
module.exports = Warehouse;
