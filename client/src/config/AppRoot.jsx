import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "@/lib/api-client";
import { GET_USER_INFO } from "@/utils/constants";
import { loginSuccess, logout } from "@/store/slices/authSlice";

import { useSelector } from "react-redux";

const AppRoot = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        setLoading(false);
        return; // ✅ already logged in, skip API
      }

      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });

        if (response.data.success && response.data.message) {
          dispatch(loginSuccess(response.data.message));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []); // only run once on mount

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  return children;
};

export default AppRoot
