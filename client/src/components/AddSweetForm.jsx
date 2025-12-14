import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { ADD_SWEETS } from "@/utils/constants";

export default function AddSweetForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Other",
    price: "",
    quantity: "",
    description: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation (required fields)
    if (
      !formData.name ||
      !formData.category ||
      !formData.price ||
      !formData.quantity ||
      !formData.photo
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("quantity", formData.quantity);
    data.append("description", formData.description);
    data.append("photo", formData.photo);

    setLoading(true);

    console.log(data);
    try {
      const res = await apiClient.post(ADD_SWEETS, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log(res);

      if (res.data.success) {
        toast.success("Sweet added successfully!");
        setFormData({
          name: "",
          category: "Other",
          price: "",
          quantity: "",
          description: "",
          photo: null,
        });
        onSuccess?.(res.data.sweet);
      } else {
        toast.error(res.data.message || "Failed to add sweet.");
      }
    } catch (err) {
      console.error("Add Sweet Error:", err);
      toast.error("Server error while adding sweet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 bg-white cursor-pointer">
      <CardHeader>
        <CardTitle className="text-center text-pink-700 text-2xl font-semibold">
          🍬 Add New Sweet
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sweet Name */}
          <div>
            <Label htmlFor="name">Sweet Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter sweet name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div>
            <Label>Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(val) =>
                setFormData((prev) => ({ ...prev, category: val }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Chocolate",
                  "Candy",
                  "Pastry",
                  "Traditional",
                  "Beverage",
                  "Other",
                ].map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price (₹)*</Label>
            <Input
              type="number"
              id="price"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Quantity */}
          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Enter available quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description (max 200 chars)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Add a short description"
              value={formData.description}
              onChange={handleChange}
              maxLength={200}
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="photo">Sweet Image *</Label>
            <Input
              type="file"
              id="photo"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-all"
          >
            {loading ? "Adding Sweet..." : "Add Sweet 🍭"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
