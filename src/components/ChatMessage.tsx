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
        "flex w-full mb-4 items-start gap-3 font-mono", // Ensure monospace font
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 rounded-none border border-primary">
          <AvatarFallback className="bg-black text-primary rounded-none">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-none border border-primary", // Sharp borders
          isUser
            ? "bg-muted text-foreground" // User messages: dark background, terminal green text
            : "bg-black text-primary" // Bot messages: black background, primary green text
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 rounded-none border border-primary">
          <AvatarFallback className="bg-muted text-foreground rounded-none">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;