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

    const loadingToastId = showLoading("Executing command...");

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
      const botMessage: Message = { text: data.response, isUser: false };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      showError("Error: Failed to execute command. Please try again.");
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
    <Card className="w-full max-w-2xl h-[80vh] flex flex-col rounded-none border-2 border-primary shadow-lg shadow-primary/50 bg-black">
      <CardHeader className="border-b-2 border-primary p-3 bg-gray-950">
        <CardTitle className="text-lg font-bold text-primary text-center">
          <span className="text-green-400">user@terminal</span>:<span className="text-blue-400">~/chatbot</span>$
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4 bg-black text-green-400">
        <ScrollArea className="h-full pr-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
          ))}
          {isLoading && (
            <div className="flex w-full mb-2 items-start gap-2 justify-start text-green-400">
              <Avatar className="h-6 w-6 rounded-none">
                <AvatarFallback className="bg-gray-800 text-green-400 rounded-none text-xs">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="p-1">
                <div className="flex items-center space-x-1">
                  <span className="text-sm">Processing...</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex p-3 border-t-2 border-primary bg-gray-950">
        <span className="text-green-400 mr-2">$&gt;</span>
        <Input
          type="text"
          placeholder="Type command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 h-8 bg-input text-foreground border-0 focus:ring-0 focus:outline-none rounded-none px-2 py-1"
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="h-8 w-8 p-0 bg-primary hover:bg-primary/80 active:scale-95 transition-all duration-100 ease-in-out rounded-none ml-2"
        >
          <Send className="h-4 w-4 text-primary-foreground" />
          <span className="sr-only">Send command</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Chatbot;