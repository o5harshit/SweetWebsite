import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./components/Auth";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import AppRoot from "@/config/AppRoot";
import ProtectedAuthRoute from "./config/ProtectedAuthRoute";
import { PrivateRoute } from "./config/PrivateRoute";
import Login from "./components/Login";
import CartPage from "./Pages/CartPage";
import UpdateSweetPage from "./Pages/UpdateSweetPage";
import AdminDashboard from "./Pages/AdminDashboard";
import SweetStore from "./Pages/SweetStore";

const browseRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "userLogin",
        element: (
          <ProtectedAuthRoute>
            <Auth />
          </ProtectedAuthRoute>
        ),
      },

      {
        path: "adminLogin",
        element: (
          <ProtectedAuthRoute>
            <Login />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "sweets",
        element: (
          <PrivateRoute>
            <SweetStore />
          </PrivateRoute>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <PrivateRoute>
          <AdminDashboard/>
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateSweetPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/",
        element: <Navigate to="/userLogin" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/userLogin" replace />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster closeButton />
    <Provider store={store}>
      <AppRoot>
        <RouterProvider router={browseRoutes} />
      </AppRoot>
    </Provider>
  </StrictMode>
);
