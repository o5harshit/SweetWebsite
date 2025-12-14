import CartModel from "../Models/CartModel.js";
import Sweet from "../Models/SweetModel.js";


// 🛒 Get current user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.userId }).populate("sweets.sweetId");
    if (!cart) return res.status(200).json({ sweets: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const addToCart = async (req, res) => {
  const { sweetId, quantity = 1 } = req.body;

  try {
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    if (sweet.quantity < quantity) return res.status(400).json({ message: "Not enough stock" });

    // Decrease sweet stock permanently
    sweet.quantity -= quantity;
    await sweet.save();

    let cart = await CartModel.findOne({ userId: req.userId });

    if (!cart) {
      cart = new CartModel({ userId: req.userId, sweets: [{ sweetId, quantity }] });
    } else {
      const itemIndex = cart.sweets.findIndex((item) => item.sweetId.toString() === sweetId);
      if (itemIndex > -1) {
        cart.sweets[itemIndex].quantity += quantity;
      } else {
        cart.sweets.push({ sweetId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ cart, updatedStock: sweet.quantity });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await CartModel.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.sweets.id(itemId);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    const sweet = await Sweet.findById(item.sweetId);
    if (sweet.quantity < quantity) return res.status(400).json({ message: "Not enough stock" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const removeCartItem = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId: req.userId });
    console.log(cart);
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Find the item in the sweets array by subdocument _id or sweetId
    const itemIndex = cart.sweets.findIndex(
      (item) => item._id.toString() === itemId || item.sweetId.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Completely remove the item
    cart.sweets.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



