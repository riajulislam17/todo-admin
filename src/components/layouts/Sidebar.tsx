import React, { memo, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CheckSquare, User, LogOut, X, HomeIcon } from "lucide-react";
import Cookies from "js-cookie";
import { useUserContext } from "@/contexts/UserContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = memo(({ isOpen, onClose }) => {
  const router = useRouter();
  const { user, loading } = useUserContext();

  const menuItems = useMemo(() => [
    {
      name: "Dashboard",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Todos",
      path: "/todos",
      icon: CheckSquare,
    },
    {
      name: "Account Information",
      path: "/profile",
      icon: User,
    },
  ], []);

  const handleLogout = useCallback(() => {
    Cookies.remove(`${process.env.NEXT_PUBLIC_TOKEN_NAME}`);
    router.push("/login");
  }, [router]);

  const isActive = useCallback((path: string) => router.pathname === path, [router.pathname]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-primary text-secondary transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 flex flex-col`}
      >
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-secondary hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Info Section */}
        <div className="px-4 py-6 border-b border-hover">
          {loading ? (
            <div className="flex items-center gap-3 animate-pulse">
              <div className="w-12 h-12 bg-hover rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-hover rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-hover rounded w-1/2"></div>
              </div>
            </div>
          ) : user ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="relative w-16 h-16 rounded-full bg-hover flex items-center justify-center text-white font-bold overflow-hidden">
                {user.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">
                    {user.first_name?.charAt(0)}
                    {user.last_name?.charAt(0)}
                  </span>
                )}
              </div>

              <div className="text-center w-full px-2">
                <p className="text-white font-semibold truncate">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-secondary text-sm truncate">{user.email}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-hover to-primary text-white"
                        : "hover:bg-gradient-to-r hover:from-hover hover:to-primary hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-hover">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-hover hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
