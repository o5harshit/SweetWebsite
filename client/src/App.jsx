import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

// App.jsx (Your code)
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-yellow-50 to-pink-100 font-sans text-gray-800">
      {/* Navbar */}
      <Navbar />

      <Outlet />

      {/* Footer at the bottom */}
      <footer className="w-full py-4 text-center text-sm text-gray-600 border-t border-pink-200">
        © {new Date().getFullYear()} SweetNest 🍬 | Crafted with ❤️
      </footer>
    </div>
  );
}

export default App;
