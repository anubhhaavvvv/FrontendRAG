"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={cn(
        "flex w-full mb-2 items-start gap-2 font-mono text-sm",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-6 w-6 rounded-none">
          <AvatarFallback className="bg-gray-800 text-green-400 rounded-none text-xs">
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] p-1 border border-primary/50 rounded-none",
          isUser
            ? "bg-primary/20 text-primary-foreground"
            : "bg-gray-900 text-foreground"
        )}
      >
        <p>{message}</p>
      </div>
      {isUser && (
        <Avatar className="h-6 w-6 rounded-none">
          <AvatarFallback className="bg-primary/50 text-primary-foreground rounded-none text-xs">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;