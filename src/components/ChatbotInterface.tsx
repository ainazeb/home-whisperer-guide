
import React, { useState } from "react";
import { X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MainMenu from "@/components/chatbot/MainMenu";
import QuestionnairePanel from "@/components/chatbot/QuestionnairePanel";
import ResultsPanel from "@/components/chatbot/ResultsPanel";

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

  const handleSectionSelect = (section: ChatSection) => {
    setCurrentSection(section);
    setShowResults(false);
  };

  const handleBackToMenu = () => {
    setCurrentSection("main");
    setShowResults(false);
  };

  const handleSubmitAnswers = (sectionAnswers: Record<string, any>) => {
    setAnswers({ ...answers, ...sectionAnswers });
    setShowResults(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-4xl h-[80vh] relative overflow-hidden flex flex-col shadow-xl">
        <Button 
          variant="ghost" 
          className="absolute top-2 right-2 rounded-full p-2" 
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
