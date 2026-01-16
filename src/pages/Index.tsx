"use client";

import React, { useState } from "react";
import Chatbot from "@/components/Chatbot";
import Sidebar from "@/components/Sidebar";
import MobileSidebar from "@/components/MobileSidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (isMobile) {
    return (
      <div className="flex flex-col h-screen w-screen bg-background p-4 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <MobileSidebar />
          <h1 className="text-lg font-bold text-foreground">RAG Chatbot</h1>
          {/* Placeholder for any right-aligned mobile header elements */}
          <div className="w-10"></div>
        </div>
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-background p-4 md:p-8">
      <ResizablePanelGroup direction="horizontal" className="w-full h-full rounded-[var(--radius)]">
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={25}
          collapsible={true}
          collapsedSize={5}
          onCollapse={() => setIsSidebarCollapsed(true)}
          onExpand={() => setIsSidebarCollapsed(false)}
          className="min-w-[64px]"
        >
          <Sidebar isCollapsed={isSidebarCollapsed} />
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-border hover:bg-accent/50 transition-colors duration-200" />
        <ResizablePanel defaultSize={80}>
          <Chatbot />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Index;