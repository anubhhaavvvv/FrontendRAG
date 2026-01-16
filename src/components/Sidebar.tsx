"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, Settings, History, Plus } from "lucide-react";

interface SidebarProps {
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
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

      <nav className="flex-1 space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-foreground/80 hover:bg-accent/20 hover:text-accent glass-effect glassmorphism-shadow",
            isCollapsed ? "px-2 py-2 h-10" : "px-4 py-2 h-10"
          )}
        >
          <MessageSquare className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span className="text-[13px] font-medium">New Chat</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-foreground/80 hover:bg-accent/20 hover:text-accent glass-effect glassmorphism-shadow",
            isCollapsed ? "px-2 py-2 h-10" : "px-4 py-2 h-10"
          )}
        >
          <History className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
          {!isCollapsed && <span className="text-[13px] font-medium">History</span>}
        </Button>
      </nav>

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