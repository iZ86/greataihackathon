"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { generateSessionId } from "@/utils/session";

export default function NewChat() {
  const router = useRouter();

  useEffect(() => {
    const newSessionId = generateSessionId();
    router.replace(`/chat/${newSessionId}`);
  }, [router]);

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white min-h-screen flex flex-col">
    </div>
  );
}
