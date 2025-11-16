"use-client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa6";

interface PageHeaderProps {
  title: string;
  text: string;
  url?: string;
  onClick?: () => void;
}

function PageHeader({ title, text, url, onClick }: PageHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between items-center gap-5 px-8 py-3">
        <div className="text-5xl text-black font-semibold">{text}</div>

        <div>
          {(url || onClick) && (
            <button
              className="px-6 py-2 bg-[#5475FF] rounded-lg text-white flex items-center gap-x-3 font-semibold"
              onClick={() => {
                if (onClick) {
                  onClick();
                } else if (url) {
                  router.push(url);
                }
              }}
            >
              <FaPlus /> {title}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default PageHeader;
