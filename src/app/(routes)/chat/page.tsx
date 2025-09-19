"use client";

import ChatArea from "@/components/ChatArea";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Chat() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <Sidebar page="chat" />
      <ChatArea />
    </div>
  );
}
