"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, MoreVertical, Send } from "lucide-react";
import { MOCK_USERS } from "@/lib/data";

interface Message {
  id: string;
  text: string;
  fromMe: boolean;
  timestamp: string;
}

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find the user from the ID
  const user = MOCK_USERS.find((u) => u.id === params.id as string);

  // Mock conversation data
  const mockMessages: Message[] = [
    {
      id: "1",
      text: "So... 88 huh?",
      fromMe: false,
      timestamp: "10:23 AM",
    },
    {
      id: "2",
      text: "I was being generous 😉",
      fromMe: true,
      timestamp: "10:24 AM",
    },
    {
      id: "3",
      text: "Wow. Tough crowd.",
      fromMe: false,
      timestamp: "10:25 AM",
    },
    {
      id: "4",
      text: "Prove me wrong.",
      fromMe: true,
      timestamp: "10:26 AM",
    },
  ];

  const [messages, setMessages] = useState<Message[]>(mockMessages);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      fromMe: true,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white/40">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header - Fixed at Top with Glassmorphism */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-4 px-4 py-4">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Avatar + Name + Status */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={user.image}
                alt={user.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold truncate">{user.name}</h2>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>
          </div>

          {/* Options Menu */}
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <MoreVertical className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] ${
                msg.fromMe
                  ? "bg-violet-600 text-white rounded-2xl rounded-br-none"
                  : "bg-zinc-800 text-zinc-200 rounded-2xl rounded-bl-none"
              } px-4 py-3`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <span
                className={`text-xs mt-1 block ${
                  msg.fromMe ? "text-violet-200" : "text-zinc-500"
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - Sticky Bottom with Glass Effect */}
      <div className="sticky bottom-0 bg-black/95 backdrop-blur-xl border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Input Field */}
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-6 py-3 rounded-full bg-zinc-900 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-violet-600/50 transition-all"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={message.trim() === ""}
            className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
