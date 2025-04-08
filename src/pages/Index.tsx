
import { useState, useEffect } from "react";
import WelcomeModal from "@/components/WelcomeModal";
import ChatbotInterface from "@/components/ChatbotInterface";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Show welcome modal on first page load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) {
      setShowWelcomeModal(false);
    }
  }, []);
  
  const handleStartChat = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
    setShowChatbot(true);
  };
  
  const toggleChatbot = () => {
    setShowChatbot(prevState => !prevState);
  };
  
  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Home Whisperer Guide</h1>
      <p className="max-w-2xl text-center mb-8">
        Welcome to our platform where we help you make informed decisions about your 
        next home purchase using the latest data and insights.
      </p>
      
      {/* Welcome Modal */}
      {showWelcomeModal && <WelcomeModal onStart={handleStartChat} />}
      
      {/* Main Content */}
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Start Your Home Journey</h2>
            <p className="text-muted-foreground mb-4">
              Click the chat button in the corner to open our Home Buying Assistant and discover your perfect home.
            </p>
          </div>
          <div className="bg-card rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">Data-Driven Decisions</h2>
            <p className="text-muted-foreground mb-4">
              Our assistant uses up-to-date information about neighborhoods, demographics, and future developments.
            </p>
          </div>
        </div>
      </div>
      
      {/* Chatbot Interface */}
      {showChatbot && <ChatbotInterface onClose={toggleChatbot} />}
      
      {/* Floating Chat Button */}
      {!showChatbot && <FloatingChatButton onClick={toggleChatbot} />}
    </div>
  );
};

export default Index;
