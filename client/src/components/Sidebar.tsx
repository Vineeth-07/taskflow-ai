import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-40 bg-[#111827] text-white min-h-screen px-5 py-6">
      <h2 className="text-xl font-semibold mb-8 tracking-tight">TaskFlow</h2>
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg transition ${
              isActive
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`
          }
        >
          Dashboard
        </NavLink>
      </nav>
    </div>
  );
}
export default Sidebar;
