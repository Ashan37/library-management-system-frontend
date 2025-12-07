import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Book, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/dashboard/books", icon: Book, label: "Books" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-2 bg-white rounded-lg shadow-lg top-4 left-4 lg:hidden"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 mt-10 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Library System</h2>
            <p className="mt-1 text-sm text-gray-500">Management Portal</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive(item.path) ? '#5E2A2B' : 'transparent',
                    color: isActive(item.path) ? 'white' : '#5E2A2B'
                  }}
                  onMouseEnter={(e) => !isActive(item.path) && (e.currentTarget.style.backgroundColor = '#F5F3EF')}
                  onMouseLeave={(e) => !isActive(item.path) && (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-4 py-3 text-gray-700 transition-colors rounded-lg hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
