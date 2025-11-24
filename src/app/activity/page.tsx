"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ActivityCard from "@/components/core/ActivityCard";
import { MOCK_USERS } from "@/lib/data";

type TabType = "requests" | "history";

export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<TabType>("requests");

  // Filter users based on active tab
  const requestUsers = MOCK_USERS.filter((user) => user.status === "rated_me");
  const historyUsers = MOCK_USERS.filter(
    (user) => user.status === "matched" || user.status === "rejected"
  );

  const displayUsers = activeTab === "requests" ? requestUsers : historyUsers;

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Activity</h1>
          <p className="text-gray-400">See who rated you and your history</p>
        </div>

        {/* Tab System */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("requests")}
            className="relative px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <span
              className={
                activeTab === "requests" ? "text-white" : "text-gray-400"
              }
            >
              Requests
            </span>
            {requestUsers.length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-primary text-white">
                {requestUsers.length}
              </span>
            )}
            {activeTab === "requests" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/20 border border-primary rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className="relative px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <span
              className={
                activeTab === "history" ? "text-white" : "text-gray-400"
              }
            >
              History
            </span>
            {historyUsers.length > 0 && (
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-card border border-white/10 text-gray-300">
                {historyUsers.length}
              </span>
            )}
            {activeTab === "history" && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary/20 border border-primary rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {displayUsers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                {activeTab === "requests"
                  ? "No pending requests"
                  : "No activity history yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayUsers.map((user) => (
                <ActivityCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
