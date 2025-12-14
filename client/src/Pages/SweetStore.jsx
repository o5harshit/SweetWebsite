import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import SweetList from "@/components/SweetList";
import AddSweetForm from "@/components/AddSweetForm";
import { apiClient } from "@/lib/api-client";
import { GET_SWEETS_ROUTE } from "@/utils/constants";
import { Button } from "@/components/ui/button";

export default function SweetStore() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Fetch all sweets initially
  useEffect(() => {
    const fetchAllSweets = async () => {
      try {
        const res = await apiClient.get(GET_SWEETS_ROUTE, { withCredentials: true });
        setSweets(res.data.sweets || []);
      } catch (err) {
        console.error("Error fetching sweets:", err);
        toast.error("Failed to load sweets.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllSweets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-100 text-pink-700 font-semibold text-lg">
        🍭 Loading your sweet delights...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-100 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-10 mb-6"
      >
        <h1 className="text-5xl font-extrabold text-pink-700 tracking-wide drop-shadow-md flex justify-center items-center gap-3">
          Explore Our Sweet Collection 🍰
        </h1>
        <p className="text-gray-600 mt-3 text-base">
          Discover happiness in every bite — made with love 💕
        </p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-6 px-4 md:px-0">
        <input
          type="text"
          placeholder="Search by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          placeholder="Search by category"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="text"
          placeholder="Search by price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>

      {/* Add Sweet Button */}
      <div className="flex justify-center mt-6 mb-10">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-5 py-2 rounded-xl shadow-md cursor-pointer"
        >
          ➕ Add Sweet
        </Button>
      </div>

      {/* Add Sweet Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="relative bg-white rounded-2xl p-6 shadow-xl w-[90%] max-w-md"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl cursor-pointer"
              >
                ✖
              </button>
              <AddSweetForm
                onSuccess={(sweet) => {
                  setSweets((prev) => [...prev, sweet]);
                  setShowForm(false);
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sweet List */}
      <SweetList
        sweets={sweets}
        filters={{ name: nameFilter, category: categoryFilter, price: priceFilter }}
      />
    </div>
  );
}
