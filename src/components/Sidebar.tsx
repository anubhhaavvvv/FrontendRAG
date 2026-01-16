"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, Settings, History, Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  // Placeholder for chat history items
  const chatHistory = [
    { id: "1", title: "Dashboard Overview" },
    { id: "2", title: "Q3 Sales Report" },
    { id: "3", title: "Marketing Campaign Analysis" },
    { id: "4", title: "Customer Feedback Summary" },
    { id: "5", title: "Product Launch Strategy" },
    { id: "6", title: "Financial Projections 2024" },
    { id: "7", title: "HR Onboarding Process" },
    { id: "8", title: "IT Infrastructure Audit" },
    { id: "9", title: "Supply Chain Optimization" },
    { id: "10", title: "Competitor Analysis" },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-surface glass-effect glassmorphism-shadow p-4 rounded-[var(--radius)] transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16 items-center" : "w-64"
      )}
    >
      <div className={cn("flex items-center mb-6", isCollapsed ? "justify-center" : "justify-between")}>
        {!isCollapsed && <h2 className="text-lg font-bold text-foreground">RAG Chatbot</h2>}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-foreground/80 hover:bg-accent/20 hover:text-accent">
          <Plus className="h-5 w-5" />
          <span className="sr-only">New Chat</span>
        </Button>
      </div>

      <div className="mb-4">
        <Button
          className={cn(
            "w-full justify-center bg-accent opacity-60 hover:opacity-80 text-accent-foreground font-bold rounded-lg transition-all duration-200 ease-in-out",
            isCollapsed ? "px-2 py-2 h-10" : "px-4 py-2 h-10"
          )}
        >
          <Plus className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
          {!isCollapsed && <span className="text-[14px]">New Chat</span>}
        </Button>
      </div>

      <div className="flex-1 overflow-hidden mb-4">
        <h3 className={cn("text-[14px] font-bold text-foreground/80 mb-2", isCollapsed && "sr-only")}>History</h3>
        <ScrollArea className="h-full pr-2">
          <nav className="space-y-2">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start text-foreground/80 hover:bg-accent/20 hover:text-accent glass-effect glassmorphism-shadow",
                  isCollapsed ? "px-2 py-2 h-10" : "px-4 py-2 h-10"
                )}
              >
                <MessageSquare className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span className="text-[13px] font-medium truncate">{chat.title}</span>}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </div>

      <div className="mt-auto">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-foreground/80 hover:bg-accent/20 hover:text-accent glass-effect glassmorphism-shadow",
            isCollapsed ? "px-2 py-2 h-10" : "px-4 py-2 h-10"
          )}
        >
          <Settings className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span className="text-[13px] font-medium">Settings</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;