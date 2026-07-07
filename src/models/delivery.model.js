import mongoose from "mongoose";
import { ORDER_STATUS, PRIORITY } from "../constants/index.js";

const deliverySchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED
    },
    priority: {
      type: String,
      enum: Object.values(PRIORITY),
      default: PRIORITY.NORMAL
    },
    assignedAt: { type: Date },
    deliveredAt: { type: Date }
  },
  { timestamps: true, versionKey: false }
);

const DeliveryModel = mongoose.model("Delivery", deliverySchema);
export default DeliveryModel;
