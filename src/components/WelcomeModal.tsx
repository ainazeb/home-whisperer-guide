
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface WelcomeModalProps {
  onStart: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && onStart()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl">
            <Home className="mr-2 h-6 w-6 text-primary" />
            Welcome to Home Whisperer
          </DialogTitle>
          <DialogDescription className="text-center pt-2 text-lg">
            Hi there! Ready to explore the future of home buying? Let's discover the best places and properties for you!
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onStart} 
            className="px-8 py-6 text-lg rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
          >
            Start Exploring
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
