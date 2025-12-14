import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { logout } from "@/store/slices/authSlice";
import { LOGOUT_USER } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const response = await apiClient.get(LOGOUT_USER, {
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(logout());
        toast.success("User has been logged out");
        navigate("/userLogin");
      } else {
        toast.error("Logout failed! Try again");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 shadow-lg px-8 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate("/sweets")}
        className="text-3xl font-extrabold tracking-wide text-white cursor-pointer select-none"
      >
        🍬 SweetNest
      </motion.div>

      {/* Right-side Actions */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            {/* For normal users only */}
            {user.role === "user" && (
              <Button
                onClick={() => navigate("/cart")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md cursor-pointer"
              >
                View Cart
              </Button>
            )}

            {/* Logout button for all roles */}
            <Button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md cursor-pointer"
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
