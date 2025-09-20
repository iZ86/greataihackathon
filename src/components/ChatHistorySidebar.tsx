"use client";

import { useState } from "react";
import Link from "next/link";
import { History, X } from "lucide-react"; // hamburger & close icons
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <>
      {/* History button */}
      <div className="shadow-md px-6 py-4 flex items-center justify-between lg:absolute lg:top-20 lg:right-0">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-800 dark:text-gray-200"
        >
          <History size={32} className="cursor-e-resize" />
        </button>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Chat History
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X
              size={24}
              className="text-gray-600 dark:text-gray-300 cursor-e-resize"
            />
          </button>
        </div>

        {/* Chat Links */}
        <nav className="flex flex-col"></nav>
      </aside>
    </>
  );
}
