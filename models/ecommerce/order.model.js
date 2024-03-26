import mongoose, { Schema } from "mongoose";

const orderItemsSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderAddress: {
      type: String,
      required: true,
    },
    orderItems: {
        type: [orderItemsSchema]
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Cancelled", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
