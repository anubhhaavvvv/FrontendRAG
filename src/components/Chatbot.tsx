"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ChatMessage from "./ChatMessage";
import { Send } from "lucide-react";
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

    const loadingToastId = showLoading("Thinking...");

    try {
      const response = await fetch("http://localhost:8000/chat", { // Assuming your FastAPI backend is at this URL and endpoint
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
      const botMessage: Message = { text: data.response, isUser: false }; // Assuming your backend returns { "response": "..." }
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      showError("Failed to get a response from the chatbot. Please try again.");
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
    <Card className="w-full max-w-2xl h-[80vh] flex flex-col shadow-lg rounded-lg">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-lg font-semibold text-center">RAG Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-4 bg-background">
        <ScrollArea className="h-full pr-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
          ))}
          {isLoading && (
            <div className="flex w-full mb-4 items-start gap-3 justify-start">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-muted">
                  <Bot className="h-5 w-5 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="max-w-[70%] p-3 rounded-xl bg-muted text-muted-foreground rounded-bl-none">
                <div className="flex items-center space-x-1">
                  <span className="sr-only">Bot is typing</span>
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
      <CardFooter className="flex p-4 border-t bg-card">
        <Input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 mr-2 h-10"
          disabled={isLoading}
        />
        <Button onClick={handleSendMessage} disabled={isLoading} className="h-10 w-10 p-0">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Chatbot;