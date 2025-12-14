import mongoose from "mongoose";

const SweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Sweet name is required"],
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      required: [true, "Sweet category is required"],
      enum: [
        "Chocolate",
        "Candy",
        "Pastry",
        "Traditional",
        "Beverage",
        "Other",
      ],
      default: "Other",
    },
    price: {
      type: Number,
      required: [true, "Sweet price is required"],
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: [true, "Sweet quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    image: {
      type: String,
      required : true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin who added the sweet
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// 🧠 Virtual field for stock status
SweetSchema.virtual("isAvailable").get(function () {
  return this.quantity > 0;
});

// ✅ Helper methods for purchase & restock
SweetSchema.methods.purchase = async function (qty = 1) {
  if (this.quantity < qty) {
    throw new Error("Not enough stock available!");
  }
  this.quantity -= qty;
  await this.save();
  return this;
};

SweetSchema.methods.restock = async function (qty = 1) {
  this.quantity += qty;
  await this.save();
  return this;
};

const Sweet = mongoose.model("Sweet", SweetSchema);

export default Sweet;
