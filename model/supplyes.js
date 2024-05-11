const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
});
const Supply = mongoose.model("supplies", supplySchema);
module.exports = Supply;
