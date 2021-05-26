const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Produce must have a name"],
  },
  quantity: {
    type: String,
    required: [true, "Produce must have quantity"],
  },
  stored_at: {
    type: mongoose.ObjectId,
  },
  farmer_id: {
    type: mongoose.ObjectId,
  },
  amount: {
    type: Number,
  },
  wareowner_id: {
    type: mongoose.ObjectId,
  },
});

const Produce = mongoose.model("Produce", produceSchema);
module.exports = Produce;
