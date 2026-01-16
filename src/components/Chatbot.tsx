"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import { Send, Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { showError, showLoading, dismissToast } from "@/utils/toast";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
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

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
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
      const botResponseText = data.response || "No answer found."; 
      const botMessage: Message = {
        text: botResponseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      showError("Failed to get a response from the chatbot. Please try again.");
      const errorMessage: Message = {
        text: "Failed to get a response from the chatbot. Please try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
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
    <div className="flex h-screen w-screen flex-col bg-[#FEF9EF] p-6 md:p-12">
      <Card className="w-full h-full flex flex-col rounded-[var(--radius)] bg-[var(--card)] text-foreground glass-effect glassmorphism-shadow">
        <CardHeader className="flex flex-row items-center justify-center h-[60px] p-4 bg-surface text-foreground rounded-t-[calc(var(--radius)-2px)] border-b border-border glass-effect">
          <CardTitle className="text-[14px] font-bold text-[#374151]">RAG Assistant</CardTitle>
          <div className="h-full w-[1px] bg-[#E5E7EB] ml-4" />
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden p-4 md:p-6 bg-background">
          <ScrollArea className="h-full pr-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isUser={msg.isUser} timestamp={msg.timestamp} />
            ))}
            {isLoading && (
              <div className="flex w-full mb-4 items-start gap-3 justify-start">
                <Avatar className="h-8 w-8 rounded-full bg-secondary glass-effect">
                  <AvatarFallback className="bg-secondary text-secondary-foreground rounded-full">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] p-3 rounded-lg bg-secondary text-secondary-foreground rounded-bl-none glass-effect glassmorphism-shadow">
                  <div className="flex items-center space-x-2">
                    <span className="text-[13px]">Typing</span>
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
        <CardFooter className="sticky bottom-0 flex p-4 h-[70px] bg-surface rounded-b-[calc(var(--radius)-2px)] border-t border-border glass-effect">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 mr-2 h-10 bg-input text-foreground border border-border focus:ring-2 focus:ring-accent focus:ring-offset-0 rounded-xl"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="h-10 w-10 p-0 bg-accent opacity-60 hover:opacity-80 active:scale-95 transition-all duration-200 ease-in-out rounded-lg hover:scale-[1.02] hover:shadow-sm text-[#6B7280] hover:text-[#4B5563]"
          >
            <Send className="h-5 w-5 text-accent-foreground" />
            <span className="sr-only">Send message</span>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chatbot;