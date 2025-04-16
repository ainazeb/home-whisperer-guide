import React, { useState, useEffect } from "react";
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

interface SectionProgress {
  completed: boolean;
  answers: Record<string, any>;
}

const ChatbotInterface: React.FC<ChatbotInterfaceProps> = ({ onClose }) => {
  const [currentSection, setCurrentSection] = useState<ChatSection>("main");
  const [showResults, setShowResults] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Record<ChatSection, SectionProgress>>({
    "main": { completed: false, answers: {} },
    "basic-questions": { completed: false, answers: {} },
    "demographics": { completed: false, answers: {} },
    "construction": { completed: false, answers: {} },
    "transportation": { completed: false, answers: {} },
    "smart-home": { completed: false, answers: {} }
  });
  const { toast } = useToast();

  useEffect(() => {
    const savedProgress = localStorage.getItem('chatbotProgress');
    if (savedProgress) {
      setSectionProgress(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatbotProgress', JSON.stringify(sectionProgress));
  }, [sectionProgress]);

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

  const handleSubmitAnswers = (sectionAnswers: Record<string, any>, section: ChatSection) => {
    setSectionProgress(prev => ({
      ...prev,
      [section]: {
        completed: true,
        answers: sectionAnswers
      }
    }));
    
    setShowResults(true);
    
    toast({
      title: "Section completed",
      description: "Your answers have been saved. You can now view results or continue with other sections.",
      duration: 2000,
    });
  };

  const getAllAnswers = () => {
    return Object.entries(sectionProgress).reduce((acc, [key, value]) => {
      return {
        ...acc,
        ...value.answers
      };
    }, {});
  };

  const getCompletedSectionsCount = () => {
    return Object.values(sectionProgress).filter(section => section.completed).length;
  };
  
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
              <MainMenu 
                onSelect={handleSectionSelect} 
                sectionProgress={sectionProgress}
                completedSections={getCompletedSectionsCount()}
              />
            )}
            
            {currentSection !== "main" && !showResults && (
              <QuestionnairePanel 
                section={currentSection} 
                onBack={handleBackToMenu}
                onSubmit={(answers) => handleSubmitAnswers(answers, currentSection)}
                initialAnswers={sectionProgress[currentSection].answers}
              />
            )}
            
            {currentSection !== "main" && showResults && (
              <ResultsPanel 
                section={currentSection} 
                answers={getAllAnswers()}
                sectionAnswers={sectionProgress[currentSection].answers}
                onBack={() => setShowResults(false)}
                onModifyAnswers={() => setShowResults(false)}
                completedSections={getCompletedSectionsCount()}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotInterface;
