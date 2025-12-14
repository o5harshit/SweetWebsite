// server/controllers/cartPurchaseController.js
import CartModel from "../Models/CartModel.js";
import Sweet from "../Models/SweetModel.js";

export const purchaseCart = async (req, res) => {
  try {
    // Fetch user's cart with sweet details
    const cart = await CartModel.findOne({ userId: req.userId }).populate("sweets.sweetId");
    console.log(cart);

    if (!cart || cart.sweets.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    // Check if all items have enough stock
    for (const item of cart.sweets) {
      if (item.sweetId.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${item.sweetId.name}`,
        });
      }
    }

    // Deduct quantity from each sweet
    for (const item of cart.sweets) {
      item.sweetId.quantity -= item.quantity;
      await item.sweetId.save();
    }

    // Empty the cart
    cart.sweets = [];
    await cart.save();

    res.status(200).json({ message: "Purchased successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
