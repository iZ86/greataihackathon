"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Send } from "lucide-react";

export default function Chat() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <Sidebar page="chat" />

      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Scrollable messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Ask me anything about your documents
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                I&apos;m here to help you understand your medical records.
              </p>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-6 h-48">
              <div className="flex flex-col gap-2 items-start">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  HealthAI
                </p>
                <div className="rounded-lg bg-gray-200/50 dark:bg-gray-800/50 p-4 text-gray-800 dark:text-gray-200 max-w-lg">
                  <p>
                    Hi there! I&apos;m here to help you understand your medical
                    documents. What would you like to know?
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 justify-end">
                <div className="flex flex-col gap-2 items-end">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    You
                  </p>
                  <div className="rounded-lg bg-blue-500 p-4 text-white max-w-lg">
                    <p>What are the potential side effects of Lisinopril?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed input */}
        <footer className="border-t border-gray-200/10 dark:border-gray-700/50 p-6 bg-background-light dark:bg-background-dark">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <input
                className="w-full rounded-lg bg-gray-200/50 dark:bg-gray-800/50 py-3 pl-4 pr-16 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 border-transparent focus:border-transparent"
                placeholder="Type your question here..."
                type="text"
              />
              <button className="absolute inset-y-0 right-0 flex items-center justify-center rounded-r-lg bg-blue-500 hover:bg-blue-600 text-white h-full w-14 transition-colors cursor-pointer">
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
