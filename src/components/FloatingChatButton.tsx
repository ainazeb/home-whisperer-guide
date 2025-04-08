
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
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg z-50 flex items-center justify-center"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="sr-only">Open Home Buying Assistant</span>
    </Button>
  );
};

export default FloatingChatButton;
