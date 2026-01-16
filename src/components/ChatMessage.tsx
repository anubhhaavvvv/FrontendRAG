"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component is available

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  // Function to parse message for citations like [1], [2]
  const renderMessageWithCitations = (text: string) => {
    const parts = text.split(/(\[\d+\])/g); // Split by citation markers
    return parts.map((part, index) => {
      if (part.match(/^\[\d+\]$/)) {
        // Render as a badge
        return (
          <Badge
            key={index}
            variant="outline"
            className="ml-1 px-1.5 py-0.5 text-xs font-normal bg-muted text-muted-foreground border-muted-foreground/20"
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
            ? "bg-primary text-primary-foreground rounded-br-none" // User messages: soft indigo background, white text
            : "bg-secondary text-secondary-foreground border border-[#E8E8E8] rounded-bl-none" // Bot messages: white background, light gray border, dark text
        )}
      >
        <p className="text-sm flex flex-wrap items-center">
          {renderMessageWithCitations(message)}
        </p>
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