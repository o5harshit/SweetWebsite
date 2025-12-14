import SweetCard from "./SweetCard";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { FILTER_SWEETS_ROUTE } from "@/utils/constants";

export default function SweetList({ sweets, filters }) {
  const [filteredSweets, setFilteredSweets] = useState(sweets || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFilteredSweets = async () => {
      if (!filters) {
        setFilteredSweets(sweets);
        return;
      }

      const { name, category, price } = filters;

      // If all filters empty, show original sweets
      if (!name?.trim() && !category?.trim() && !price?.trim()) {
        setFilteredSweets(sweets);
        return;
      }

      setLoading(true);
      try {
        const query = {};
        if (name?.trim()) query.name = name.trim();
        if (category?.trim()) query.category = category.trim();
        if (price?.trim()) query.price = price.trim();

        const res = await apiClient.put(FILTER_SWEETS_ROUTE, { query }, { withCredentials: true });
        setFilteredSweets(res.data.sweets || []);
      } catch (err) {
        console.error("Error fetching filtered sweets:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredSweets();
  }, [filters, sweets]);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-20">
        <p className="text-pink-700 text-lg font-medium">🍭 Loading sweets...</p>
      </motion.div>
    );
  }

  if (!filteredSweets.length) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-20">
        <img
          src="https://cdn-icons-png.flaticon.com/512/837/837560.png"
          alt="No sweets"
          className="w-28 h-28 mx-auto mb-4 opacity-80"
        />
        <h2 className="text-pink-700 text-2xl font-semibold mb-1">No sweets found 🍬</h2>
        <p className="text-gray-500 text-sm">Try searching for another name or category.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="max-w-7xl mx-auto px-6 pb-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center"
    >
      {filteredSweets.map((sweet) => (
        <SweetCard key={sweet._id} sweet={sweet} />
      ))}
    </motion.div>
  );
}
