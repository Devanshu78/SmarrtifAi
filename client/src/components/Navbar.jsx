import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-2xl flex items-center justify-between px-6 py-4 my-3">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl lg:text-3xl font-semibold font-serif 
        bg-linear-to-r from-indigo-600 to-purple-600 
        bg-clip-text text-transparent"
      >
        SkillNest
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {!isAuthenticated ? (
          <Button varient="secondary" onClick={() => navigate("/login")}>
            Login
          </Button>
        ) : (
          <div className="flex items-center gap-4">
            {/* Profile */}
            <Link
              to="/profile"
              className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
            >
              <div className="w-9 h-9 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <span className="hidden md:block font-medium text-gray-700">
                {user?.name}
              </span>
            </Link>

            {/* Logout */}
            <Button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-600 transition"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
