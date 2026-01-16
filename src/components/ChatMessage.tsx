"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <div
      className={cn(
        "flex w-full mb-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-lg",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;