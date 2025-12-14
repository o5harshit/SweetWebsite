import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { ADD_CART_ITEMS } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SweetCard({ sweet }) {
  const navigate = useNavigate();
  const { image, name, category, price, quantity, _id,addedBy } = sweet;

  // Get the current logged-in user's ID from Redux
  const user = useSelector((state) => state.auth.user);
  


  const handleAddToCart = async (_id) => {
    try {
      const response = await apiClient.post(
        ADD_CART_ITEMS,
        {
          sweetId: _id,
          quantity: 1,
        },
        { withCredentials: true }
      );
      if (response.data) {
        toast.success(`${sweet.name} added to cart!`);

      } else {
        toast.error("Failed to add to cart!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="w-full max-w-xs"
    >
      <Card
        className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 
        border border-pink-100 transition-all hover:shadow-2xl hover:-translate-y-1"
      >
        {/* Image */}
        <div className="flex justify-center items-center p-3 bg-white/70 rounded-t-2xl">
          <img
            src={image}
            alt={name}
            className="h-48 w-full object-cover rounded-xl shadow-sm"
            style={{ objectFit: "cover", width: "90%", borderRadius: "1rem" }}
          />
        </div>

        {/* Sweet Details */}
        <CardContent className="p-5 flex flex-col items-center text-center space-y-2">
          <h2 className="font-bold text-lg text-pink-700 tracking-wide capitalize">
            {name}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Category: <span className="text-gray-700">{category}</span>
          </p>
          <p className="text-lg font-semibold text-gray-800">₹{price}</p>
          <p
            className={`font-medium ${
              quantity > 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {quantity > 0 ? `In stock: ${quantity}` : "Out of stock"}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col w-full gap-2 mt-3">
            <Button
              disabled={quantity === 0}
              onClick={() => handleAddToCart(_id)}
              className={`w-full rounded-xl py-2 font-semibold text-white transition-all ${
                quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 cursor-pointer"
              }`}
            >
              🛒 Add to Cart
            </Button>

            {/* Show Update button only if current user is creator */}
            {user?.id === addedBy._id && (
              <Button
                className="w-full rounded-xl py-2 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold cursor-pointer"
                onClick={() => navigate(`/update/${_id}`)}
              >
                ✏️ Update Sweet
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
