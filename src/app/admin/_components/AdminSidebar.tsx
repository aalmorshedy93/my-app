// src/app/admin/_components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTable,
  FaComments,
  FaSignOutAlt,
  FaCog,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const links = [
    { label: "Articles Table", path: "/admin/articles-table", icon: <FaTable /> },
    { label: "Comments Table", path: "/admin/comments-table", icon: <FaComments /> },
    { label: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <aside
      className={`${
        open ? "w-64" : "w-20"
      } bg-sky-700 text-white flex flex-col transition-all duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-sky-600">
        <span className={`${!open && "hidden"} text-lg font-semibold`}>Admin Panel</span>
        <button
          onClick={() => setOpen(!open)}
          className="text-white focus:outline-none hover:text-sky-200"
        >
          <FaBars />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-3">
        {links.map((link) => {
          const active = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                active
                  ? "bg-sky-500 text-white"
                  : "hover:bg-sky-600 text-sky-100"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              {open && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sky-600">
        <button className="flex items-center gap-2 text-sky-100 hover:text-white">
          <FaSignOutAlt />
          {open && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
