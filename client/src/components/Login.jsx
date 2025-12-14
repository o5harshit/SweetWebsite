import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import {  LOGIN_ROUTE } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSuccess } from "@/store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [loading,setLoading] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      const response = await apiClient.post(
        LOGIN_ROUTE,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Welcome Admin!");
        console.log("hii");
        dispatch(loginSuccess(response.data.message));
        setLoading(false);
        navigate("admin/dashboard");
      } else {
        toast.error("You are not authorized as Admin");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Login
        </h2>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg px-5 py-4"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-lg px-5 py-4"
          />

          {/* ✅ Hidden default role (admin) */}
          <input type="hidden" value="admin" readOnly />

          <Button
            onClick={handleLogin}
            className="mt-4 w-full rounded-lg bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
          >
           { loading ? "Loading..." : "Login"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
