import { Send } from "lucide-react";
import { CircleStop, Bot, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ChatArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  async function sendMessage() {
    if (!input.trim() || isLoading) return;
    setIsLoading(true);

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    const currentInput = input;
    setInput("");

    try {
      // Call AI API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: currentInput }),
      });
      const data = await res.json();

      // Add AI response
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Chat area */}
      <div className="flex flex-1 flex-col">
        {/* Scrollable messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-blue-500" />
                Ask me anything about your documents
                <Sparkles className="w-8 h-8 text-blue-500" />
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                I&apos;m here to help you understand your medical records.
              </p>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-6 h-56">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} transition-all duration-300 ease-in-out`}
                >
                  <span className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    {m.role === "user" ? (
                      "You"
                    ) : (
                      <>
                        <Bot size={14} className="text-blue-500" />
                        Medical AI Assistant
                      </>
                    )}
                  </span>
                  <div
                    className={`p-4 rounded-2xl max-w-lg transition-all duration-300 transform ${
                      m.role === "user"
                        ? "bg-blue-500 text-white shadow-lg hover:shadow-blue-500/25"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl backdrop-blur-sm mb-2"
                    }`}
                  >
                    {m.role === "user" ? (
                      m.content
                    ) : (
                      <div className="space-y-3 text-gray-800 dark:text-gray-200">
                        {m.content}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading indicator for AI response */}
              {isLoading && (
                <div className="flex flex-col items-start animate-fade-in">
                  <span className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                    <Bot size={14} className="text-blue-500 animate-pulse" />
                    Medical AI Assistant is thinking...
                  </span>
                  <div className="p-4 rounded-2xl max-w-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
                    <div className="flex space-x-2">
                      <div
                        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Analyzing medical records...
                    </p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Fixed input */}
        <footer className="border-t border-gray-200/10 dark:border-gray-700/50 p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl">
            <div className="relative">
              <input
                className="w-full rounded-2xl bg-white dark:bg-gray-800 py-4 pl-6 pr-20 text-gray-800 dark:text-gray-200 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 transition-all duration-300 shadow-lg"
                placeholder="Ask about patient records, medications, or diagnoses..."
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !isLoading && sendMessage()
                }
                disabled={isLoading}
              />
              <button
                className={`absolute inset-y-0 right-0 flex items-center justify-center rounded-r-2xl m-1 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                } text-white h-[calc(100%-8px)] w-16`}
                onClick={sendMessage}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircleStop size={20} className="animate-pulse" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
              Ask about medications, diagnoses, treatment plans, or any medical
              information
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
