"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { MOCK_USERS } from "@/lib/data";

export default function MatchesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter for matched users
  const matchedUsers = MOCK_USERS.filter((user) => user.status === "matched");

  // Mock last messages and times
  const mockChats = matchedUsers.map((user) => ({
    ...user,
    lastMessage: "Hey! How are you doing?",
    lastMessageTime: "2m",
    unread: true,
  }));

  // Filter based on search
  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-xl border-b border-white/10">
        <div className="px-6 pt-8 pb-4">
          <h1 className="text-4xl font-bold mb-4">Messages</h1>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="divide-y divide-white/10">
        {filteredChats.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-white/40">
              {searchQuery ? "No matches found" : "No matches yet"}
            </p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors"
            >
              {/* Avatar */}
              <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={chat.image}
                  alt={chat.name}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>

              {/* Middle: Name & Last Message */}
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-white truncate">
                  {chat.name}
                </h3>
                <p className="text-sm text-gray-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Right: Time & Unread Indicator */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className="text-xs text-gray-400">
                  {chat.lastMessageTime}
                </span>
                {chat.unread && (
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
