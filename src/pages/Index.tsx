"use client";

import Chatbot from "@/components/Chatbot";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-black p-4">
      <Chatbot />
      <MadeWithDyad />
    </div>
  );
};

export default Index;