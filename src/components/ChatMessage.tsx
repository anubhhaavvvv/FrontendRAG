"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser, timestamp }) => {
  // Function to parse message for citations like [1], [2]
  const renderMessageWithCitations = (text: string) => {
    const parts = text.split(/(\[\d+\])/g); // Split by citation markers
    return parts.map((part, index) => {
      if (part.match(/^\[\d+\]$/)) {
        // Render as a badge with hover effect
        return (
          <Badge
            key={index}
            variant="outline"
            className="ml-1 px-1.5 py-0.5 text-xs font-normal bg-muted text-muted-foreground border-muted-foreground/20 hover:underline hover:text-accent cursor-pointer"
          >
            {part}
          </Badge>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div
      className={cn(
        "flex w-full mb-4 items-start gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 rounded-full bg-card">
          <AvatarFallback className="bg-card text-card-foreground rounded-full">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-lg",
          isUser
            ? "bg-primary text-primary-foreground" // User messages: dark gray background, white text
            : "bg-secondary text-secondary-foreground" // Bot messages: slightly lighter dark gray background, light gray text
        )}
      >
        <p className="text-sm flex flex-wrap items-center">
          {renderMessageWithCitations(message)}
        </p>
        <span className={cn("block text-[12px] text-muted-foreground mt-1 font-normal", isUser ? "text-right" : "text-left")}>
          {timestamp}
        </span>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 rounded-full bg-primary">
          <AvatarFallback className="bg-primary text-primary-foreground rounded-full">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;