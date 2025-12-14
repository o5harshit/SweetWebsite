import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { apiClient } from "@/lib/api-client";
import { GET_SWEETS_BY_ID_ROUTE, UPDATE_SWEETS_ROUTE } from "@/utils/constants";

const categories = ["Chocolate", "Candy", "Pastry", "Traditional", "Beverage", "Other"];

export default function UpdateSweetPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sweet, setSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });
  const [originalSweet, setOriginalSweet] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch sweet details
  const fetchSweet = async () => {
    try {
      const response = await apiClient.get(`${GET_SWEETS_BY_ID_ROUTE}/${id}`, {
        withCredentials: true,
      });
      setSweet(response.data);
      setOriginalSweet(response.data); // store original to detect changes
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch sweet details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweet();
  }, [id]);

  const handleChange = (e) => {
    setSweet({ ...sweet, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Build only changed fields
  const getChangedFields = () => {
    const updated = {};
    for (const key in sweet) {
      if (sweet[key] !== originalSweet[key] && sweet[key] !== "") {
        updated[key] = sweet[key];
      }
    }
    return updated;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedFields = getChangedFields();
    if (!Object.keys(updatedFields).length && !imageFile) {
      toast.info("No changes detected");
      return;
    }

    try {
      const formData = new FormData();

      // append only changed text fields
      for (const key in updatedFields) {
        formData.append(key, updatedFields[key]);
      }

      // append file if selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await apiClient.put(`${UPDATE_SWEETS_ROUTE}/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        window.alert("Sweet updated successfully!");
        navigate("/sweets");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-4xl mx-auto my-6 px-6"
    >
      <Card className="rounded-2xl bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 shadow-md border border-pink-100">
        <CardContent className="p-8 space-y-5">
          <h1 className="text-3xl font-bold text-pink-700 text-center mb-4">
            ✏️ Update Sweet
          </h1>

          <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side Inputs */}
            <div className="space-y-4">
              <div>
                <Label>Sweet Name</Label>
                <Input type="text" name="name" value={sweet.name} onChange={handleChange} />
              </div>

              <div>
                <Label>Category</Label>
                <select
                  name="category"
                  value={sweet.category}
                  onChange={handleChange}
                  className="w-full p-2 rounded-md border border-pink-200 bg-white focus:ring-2 focus:ring-pink-400"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label>Price (₹)</Label>
                <Input type="number" name="price" value={sweet.price} onChange={handleChange} min="0" />
              </div>

              <div>
                <Label>Quantity</Label>
                <Input type="number" name="quantity" value={sweet.quantity} onChange={handleChange} min="0" />
              </div>
            </div>

            {/* Right Side */}
            <div className="space-y-4">
              <div>
                <Label>Description</Label>
                <textarea
                  name="description"
                  value={sweet.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-md border border-pink-200 bg-white p-2 focus:ring-2 focus:ring-pink-400 resize-none"
                />
              </div>

              <div>
                <Label>Upload New Image (optional)</Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                {(imageFile || sweet.image) && (
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : sweet.image}
                    alt="preview"
                    className="w-48 h-48 object-cover rounded-lg border mt-2 shadow-sm mx-auto"
                  />
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="col-span-1 md:col-span-2 flex justify-end gap-4 pt-4">
              <Button
                type="button"
                onClick={() => navigate("/sweets")}
                className="bg-gray-400 hover:bg-gray-500 text-white cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold cursor-pointer">
                Update Sweet
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
