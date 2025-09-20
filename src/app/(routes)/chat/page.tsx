"use client";

import ChatArea from "@/components/ChatArea";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PreAuth from "../../../components/PreAuth";

export default function Chat() {
  return (

    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <PreAuth>
        <Sidebar page="chat" />
        <ChatArea />

      </PreAuth>
    </div>
  );
}
