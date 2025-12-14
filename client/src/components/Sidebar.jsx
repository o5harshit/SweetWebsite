import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const role = useSelector((state) => state.auth?.user?.role);

  // Sidebar options based on role
  const links =
    role === "admin"
      ? [{ path: "/AllDocument", label: "All Document" }]
      : [
          { path: "/AddDocument", label: "Add Document" },
          { path: "/YourDocument", label: "Your Document" },
          { path: "/AllDocument", label: "All Document" },
          { path: "/TeamQA", label: "Team Q&A" },
        ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-[18%] min-h-screen border-r border-gray-300 flex flex-col pt-10 gap-3 bg-white shadow-md"
    >
      {links.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-5 py-3 text-sm font-medium transition-all duration-300 border-l-4 ${
              isActive
                ? "bg-purple-50 border-purple-600 text-purple-600"
                : "hover:bg-gray-100 border-transparent"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </motion.div>
  );
}
