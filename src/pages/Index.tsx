"use client";

import React from "react";
import Chatbot from "@/components/Chatbot";
// Removed Sidebar and MobileSidebar imports
// Removed ResizablePanelGroup imports
// Removed useIsMobile import

const Index = () => {
  // Removed isMobile and isSidebarCollapsed state and logic

  return (
    <div className="flex h-screen w-screen bg-background p-4 md:p-8">
      <Chatbot />
    </div>
  );
};

export default Index;