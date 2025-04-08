
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 animate-pulse"
    >
      <MessageCircle className="h-8 w-8 text-white" />
      <span className="sr-only">Open Home Buying Assistant</span>
      <span className="absolute -top-2 -right-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">New</span>
    </Button>
  );
};

export default FloatingChatButton;
