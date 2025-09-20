"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { History, Loader2, X } from "lucide-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);
const client = generateClient<Schema>();

interface SessionInfo {
  id: string;
  firstMessage: string;
  timestamp: Date;
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  useEffect(() => {
    async function loadSessions() {
      setIsHistoryLoading(true);
      try {
        const res = await client.models.ChatMessage.list();

        const sessionsMap = new Map<string, SessionInfo>();

        res.data.forEach((message) => {
          if (!message.sessionId) return;

          const sessionId = message.sessionId;
          const createdAt = new Date(message.createdAt as string);

          if (
            !sessionsMap.has(sessionId) ||
            createdAt < sessionsMap.get(sessionId)!.timestamp
          ) {
            // Only use user messages as the first message
            if (message.role === "user" && message.message) {
              sessionsMap.set(sessionId, {
                id: sessionId,
                firstMessage: message.message,
                timestamp: createdAt,
              });
            }
          }
        });

        // Convert map to array and sort by timestamp (newest first)
        const sortedSessions = Array.from(sessionsMap.values()).sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        );

        setSessions(sortedSessions);
      } catch (error) {
        console.error("Error loading sessions:", error);
      } finally {
        setIsHistoryLoading(false);
      }
    }

    if (isOpen) loadSessions();
  }, [isOpen]);

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

        {/* Chat Sessions */}
        <nav className="flex flex-col p-4">
          {isHistoryLoading && (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4">
              <Loader2 className="animate-spin" size={50} />
            </div>
          )}

          {sessions.map((session) => (
            <Link
              key={session.id}
              href={`/chat/${session.id}`}
              className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors mb-2 border border-gray-200 dark:border-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                {session.firstMessage}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {session.timestamp.toLocaleDateString()} at{" "}
                {session.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </Link>
          ))}

          {!isHistoryLoading && sessions.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No chat history yet
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
