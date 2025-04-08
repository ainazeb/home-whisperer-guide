
import React, { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainMenu from "@/components/chatbot/MainMenu";
import QuestionnairePanel from "@/components/chatbot/QuestionnairePanel";
import ResultsPanel from "@/components/chatbot/ResultsPanel";
import { useToast } from "@/hooks/use-toast";

interface ChatbotInterfaceProps {
  onClose: () => void;
}

export type ChatSection = 
  | "main" 
  | "basic-questions" 
  | "demographics" 
  | "construction" 
  | "transportation" 
  | "smart-home";

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState<ChatSection>("main");
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleSectionSelect = (section: ChatSection) => {
    setCurrentSection(section);
    setShowResults(false);
    
    toast({
      title: "Section selected",
      description: `Loading the ${sectionToDisplayName(section)} questionnaire.`,
      duration: 2000,
    });
  };

  const handleBackToMenu = () => {
    setCurrentSection("main");
    setShowResults(false);
    
    toast({
      title: "Returning to main menu",
      description: "Your progress has been saved.",
      duration: 2000,
    });
  };

  const handleSubmitAnswers = (sectionAnswers: Record<string, any>) => {
    setAnswers({ ...answers, ...sectionAnswers });
    setShowResults(true);
    
    toast({
      title: "Generating results",
      description: "Analyzing your preferences...",
      duration: 2000,
    });
  };
  
  // Helper function to convert section IDs to display names
  const sectionToDisplayName = (section: ChatSection): string => {
    switch (section) {
      case "basic-questions": return "Basic Questions";
      case "demographics": return "Demographics";
      case "construction": return "Development & Construction";
      case "transportation": return "Transportation";
      case "smart-home": return "Smart Home";
      default: return "Main Menu";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <Card className="w-full max-w-4xl h-[80vh] relative overflow-hidden flex flex-col shadow-xl animate-scale-in">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 rounded-full p-2 hover:bg-gray-100 transition-colors" 
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <CardContent className="flex-grow overflow-auto p-0">
          <div className="p-6 h-full">
            {currentSection === "main" && (
              <MainMenu onSelect={handleSectionSelect} />
            )}
            
            {currentSection !== "main" && !showResults && (
              <QuestionnairePanel 
                section={currentSection} 
                onBack={handleBackToMenu}
                onSubmit={handleSubmitAnswers}
              />
            )}
            
            {currentSection !== "main" && showResults && (
              <ResultsPanel 
                section={currentSection} 
                answers={answers}
                onBack={() => setShowResults(false)}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotInterface;
