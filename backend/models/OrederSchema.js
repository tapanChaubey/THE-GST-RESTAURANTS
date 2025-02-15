const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodData",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodUser",
      required: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
   paymentMode: {
      type: String,
      enum: ["UPI", "COD", "NB", "CARD"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Failed", "Successful"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    }
  },
  { timestamps: true } 
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
