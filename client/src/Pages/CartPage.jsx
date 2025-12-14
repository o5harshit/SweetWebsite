import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { DELETE_CART_ITEMS, GET_CART_ITEMS, PURCHASE_ITEMS, UPDATE_CART_ITEMS } from "@/utils/constants";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(GET_CART_ITEMS, { withCredentials: true });
      setCart(response.data.sweets || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (itemId, qty) => {
    if (qty < 1) return;
    try {
      await apiClient.put(`${UPDATE_CART_ITEMS}/${itemId}`, { quantity: qty }, { withCredentials: true });
      toast.success("Quantity updated");
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    try {
      await apiClient.delete(`${DELETE_CART_ITEMS}/${itemId}`, { withCredentials: true });
      toast.success("Item removed");
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };


const handlePurchase = async () => {
  try {
    const response = await apiClient.post(PURCHASE_ITEMS, {}, { withCredentials: true });
    if (response.data?.message) {
      window.alert(response.data.message); // Show "Purchased 
      fetchCart();
    }
  } catch (error) {
    window.alert(error.response?.data?.message || "Purchase failed");
  }
};


  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.sweetId.price * item.quantity,
    0
  );

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading cart...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 border border-pink-100">
                  <div className="flex justify-center items-center p-3 bg-white/70 rounded-t-2xl">
                    <img
                      src={item.sweetId.image}
                      alt={item.sweetId.name}
                      className="h-48 w-full object-cover rounded-xl shadow-sm"
                      style={{ objectFit: "cover", width: "90%", borderRadius: "1rem" }}
                    />
                  </div>

                  <CardContent className="p-5 flex flex-col items-center text-center space-y-2">
                    <h2 className="font-bold text-lg text-pink-700 tracking-wide capitalize">
                      {item.sweetId.name}
                    </h2>
                    <p className="text-gray-500 text-sm font-medium">
                      Category: <span className="text-gray-700">{item.sweetId.category}</span>
                    </p>
                    <p className="text-lg font-semibold text-gray-800">₹{item.sweetId.price}</p>
                    <p className="font-medium text-green-600">
                      Quantity: {item.quantity}
                    </p>

                    <div className="flex gap-2 mt-3 w-full">
                      <Button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer"
                      >
                        -
                      </Button>
                      <Button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-1/3 bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => removeItem(item._id)}
                        className="w-1/3 bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer"
                      >
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 flex justify-end items-center gap-6">
          <h2 className="text-2xl font-bold text-gray-800">Total: ₹{totalPrice}</h2>
          <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold cursor-pointer" onClick={handlePurchase}>
            Purchase
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
