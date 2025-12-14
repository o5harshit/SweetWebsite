import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DELETE_SWEETS_ROUTES, GET_SWEETS_ROUTE, UPDATE_SWEETS_ROUTE } from "@/utils/constants";


export default function AdminDashboard() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockDialogOpen, setStockDialogOpen] = useState(false);
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");

  const fetchSweets = async () => {
    try {
      const response = await apiClient.get(GET_SWEETS_ROUTE, { withCredentials: true });
      setSweets(response.data.sweets || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;

    try {
      await apiClient.delete(`${DELETE_SWEETS_ROUTES}/${id}`, { withCredentials: true });
      toast.success("Sweet deleted successfully");
      setSweets((prev) => prev.filter((sweet) => sweet._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete sweet");
    }
  };

  const openStockDialog = (sweet) => {
    setSelectedSweet(sweet);
    setNewQuantity(sweet.quantity);
    setStockDialogOpen(true);
  };

  const handleStockUpdate = async () => {
    if (isNaN(newQuantity) || Number(newQuantity) < 0) {
      toast.error("Invalid quantity");
      return;
    }

    try {
      const response = await apiClient.put(
        `${UPDATE_SWEETS_ROUTE}/${selectedSweet._id}`,
        { quantity: Number(newQuantity) },
        { withCredentials: true }
      );

      toast.success("Stock updated successfully");
      setSweets((prev) =>
        prev.map((sweet) =>
          sweet._id === selectedSweet._id ? { ...sweet, quantity: response.data.quantity } : sweet
        )
      );
      fetchSweets();
      setStockDialogOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update stock");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading sweets...</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <Card className="shadow-md rounded-xl p-4">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">All Sweets</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Category</th>
                  <th className="py-2 px-4 border-b">Price (₹)</th>
                  <th className="py-2 px-4 border-b">Quantity</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sweets.map((sweet) => (
                  <tr key={sweet._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{sweet.name}</td>
                    <td className="py-2 px-4 border-b">{sweet.category}</td>
                    <td className="py-2 px-4 border-b">{sweet.price}</td>
                    <td className="py-2 px-4 border-b">{sweet.quantity}</td>
                    <td className="py-2 px-4 border-b flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => openStockDialog(sweet)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white cursor-pointer"
                      >
                        Update Stock
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(sweet._id)}
                        className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {sweets.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-500">
                      No sweets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stock Update Dialog */}
      <Dialog open={stockDialogOpen} onOpenChange={setStockDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Update Stock for {selectedSweet?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Input
              type="number"
              value={newQuantity}
              onChange={(e) => setNewQuantity(e.target.value)}
              min="0"
            />
          </div>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setStockDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleStockUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
