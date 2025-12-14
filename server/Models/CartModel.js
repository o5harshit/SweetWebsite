import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // each user has only one cart
    },
    sweets: [
      {
        sweetId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sweet",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        dateAdded: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
