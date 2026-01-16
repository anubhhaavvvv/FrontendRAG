"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import { Send, Bot, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { showError, showLoading, dismissToast } from "@/utils/toast";

interface Message {
  text: string;
  isUser: boolean;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    const loadingToastId = showLoading("Processing...");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.response || "No answer found."; // Handle "No answer found"
      const botMessage: Message = { text: botResponseText, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      showError("Failed to get a response from the chatbot. Please try again.");
      const errorMessage: Message = { text: "Failed to get a response from the chatbot. Please try again.", isUser: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
      dismissToast(loadingToastId);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full h-full flex flex-col rounded-xl border border-border bg-card text-foreground shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between h-14 border-b border-[#E5E7EB] p-4 bg-card">
        <CardTitle className="text-lg font-semibold text-[#475467]">RAG Assistant</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-[#475467] hover:bg-muted">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4 bg-background">
        <ScrollArea className="h-full pr-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
          ))}
          {isLoading && (
            <div className="flex w-full mb-4 items-start gap-3 justify-start">
              <Avatar className="h-8 w-8 rounded-full border border-border">
                <AvatarFallback className="bg-secondary text-secondary-foreground rounded-full">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] p-3 rounded-xl bg-secondary text-secondary-foreground rounded-bl-none shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Typing</span>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="sticky bottom-0 flex p-4 h-16 border-t border-[#E5E7EB] bg-card">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 mr-2 h-10 bg-white text-foreground border border-[#E2E8F0] focus:ring-0 focus:border-primary rounded-xl"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="h-10 w-10 p-0 bg-[#475467] hover:bg-[#3730A3] active:scale-95 transition-all duration-200 ease-in-out rounded-xl"
        >
          <Send className="h-5 w-5 text-white" />
          <span className="sr-only">Send message</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Chatbot;