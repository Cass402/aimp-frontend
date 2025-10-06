"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count?: number;
}

export function NotificationBadge({ count = 0 }: NotificationBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success" as const,
      title: "Asset Performance",
      message: "Solar Farm exceeded generation target by 12%",
      time: "2m ago",
      read: false,
    },
    {
      id: "2",
      type: "info" as const,
      title: "Market Update",
      message: "Energy prices increased 3.2% - optimal selling window",
      time: "15m ago",
      read: false,
    },
    {
      id: "3",
      type: "warning" as const,
      title: "Maintenance Scheduled",
      message: "Panel cleaning scheduled for tomorrow 6:00 AM",
      time: "1h ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-xl transition-all duration-200",
          "text-(--text-secondary) hover:text-(--text-primary)",
          "hover:bg-(--glass-surface-primary) focus-visible:u-focus-ring",
          isOpen && "bg-(--glass-surface-primary) text-(--text-primary)"
        )}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <span className="text-xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-critical-primary text-white text-xs font-semibold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full mt-2 w-96 max-w-[90vw] z-50",
            "glass-panel glass-panel-elevated rounded-2xl p-4",
            "animate-in slide-in-from-top-2 duration-200"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-(--text-primary)">
              Notifications
            </h3>
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-(--text-tertiary) hover:text-(--text-primary) transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-(--text-tertiary) text-sm">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification.id)}
                  className={cn(
                    "w-full text-left p-3 rounded-xl transition-all duration-200",
                    notification.read
                      ? "opacity-60 hover:opacity-80"
                      : "bg-(--glass-surface-primary) hover:bg-(--glass-surface-primary)",
                    "focus-visible:u-focus-ring"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">
                      {notification.type === "success" && "✅"}
                      {notification.type === "info" && "ℹ️"}
                      {notification.type === "warning" && "⚠️"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-(--text-primary) text-sm">
                          {notification.title}
                        </span>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-(--trust-primary)" />
                        )}
                      </div>
                      <p className="text-xs text-(--text-secondary) line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-xs text-(--text-tertiary) mt-1 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
