import React from "react";
import { Bell, CalendarDays, Menu } from "lucide-react";
import { getDate, getDayName } from "@/lib";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white text-black shadow-md sticky top-0 z-40">
      <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 py-3 md:py-4">
        {/* Left Section: Menu & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-black hover:text-primary transition-colors p-1"
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <div className="leading-tight">
            <div className="text-base sm:text-lg md:text-xl font-bold">
              DREAMY
            </div>
            <div className="text-base sm:text-lg md:text-xl font-bold">
              SOFTWARE
            </div>
          </div>
        </div>

        {/* Right Section: Icons & Date */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {/* Notification Bell */}
          <button
            className="bg-[#5475FF] p-2 sm:p-2.5 text-white rounded-md transition-colors"
            aria-label="Notifications"
          >
            <Bell size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Calendar Icon */}
          <button
            className="bg-[#5475FF] p-2 sm:p-2.5 text-white rounded-md hover:bg-hover transition-colors"
            aria-label="Calendar"
          >
            <CalendarDays size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Date Display */}
          <div className="hidden sm:flex flex-col text-right">
            <div className="text-sm md:text-base font-semibold leading-tight">
              {getDayName()}
            </div>
            <div className="text-xs md:text-sm text-gray-600 leading-tight">
              {getDate()}
            </div>
          </div>

          {/* Mobile Date Display */}
          <div className="flex sm:hidden flex-col text-right">
            <div className="text-xs font-semibold leading-tight">
              {getDayName().substring(0, 3)}
            </div>
            <div className="text-xs text-gray-600 leading-tight">
              {getDate().split(",")[0]}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
