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
        "flex w-full mb-4 items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 rounded-full border border-border">
          <AvatarFallback className="bg-secondary text-secondary-foreground rounded-full">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-none" // User messages: blue background, white text
            : "bg-secondary text-secondary-foreground border border-border rounded-bl-none" // Bot messages: light gray background, dark text, border
        )}
      >
        <p className="text-sm">{message}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 rounded-full border border-border">
          <AvatarFallback className="bg-primary text-primary-foreground rounded-full">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;