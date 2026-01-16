"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

const MobileSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-foreground/80 hover:bg-accent/20 hover:text-accent">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64 bg-surface glass-effect glassmorphism-shadow border-r-[var(--border)]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;