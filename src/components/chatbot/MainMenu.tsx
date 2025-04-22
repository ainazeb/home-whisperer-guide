
import React from "react";
import { Home, Users, Building2, Train, Laptop, ChevronRight, MessageCircle, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChatSection } from "@/components/ChatbotInterface";
import { motion } from "framer-motion";

interface MainMenuProps {
  onSelect: (section: ChatSection) => void;
  sectionProgress: Record<ChatSection, { completed: boolean; answers: Record<string, any> }>;
  completedSections: number;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelect, sectionProgress, completedSections }) => {
  const totalProgress = (completedSections / 5) * 100;

  const handleGetRecommendations = () => {
    // Show full recommendations view instead of going to questions
    onSelect("results");
  };

  const menuItems = [
    {
      id: "basic-questions" as ChatSection,
      icon: Home,
      title: "Basic Questions",
      description: "Tell us about your ideal home preferences",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: "demographics" as ChatSection,
      icon: Users,
      title: "Demographics",
      description: "Explore neighborhood demographics",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: "construction" as ChatSection,
      icon: Building2,
      title: "Development",
      description: "Learn about area construction and amenities",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: "transportation" as ChatSection,
      icon: Train,
      title: "Transportation",
      description: "Discover mobility options",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      id: "smart-home" as ChatSection,
      icon: Laptop,
      title: "Smart Home",
      description: "Explore technology features",
      gradient: "from-indigo-500 to-violet-500"
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
        >
          <Bot className="h-12 w-12 text-white" />
        </motion.div>
        
        <motion.h2 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
        >
          Home Buying Assistant
        </motion.h2>
        <p className="text-muted-foreground mb-4">
          Complete any section to get personalized recommendations. Your progress is automatically saved.
        </p>
        <div className="max-w-md mx-auto mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{completedSections}/5 sections completed</span>
          </div>
          <div className="relative h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-blue-500 to-violet-500"
            />
          </div>
        </div>

        {completedSections > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Button
              onClick={handleGetRecommendations}
              className="px-6 py-6 text-lg rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="mr-2 h-6 w-6" />
              View Full Recommendations
            </Button>
          </motion.div>
        )}
      </div>

      <div className="grid gap-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className={`group p-4 cursor-pointer transition-all hover:shadow-lg transform hover:scale-[1.02] ${
                sectionProgress[item.id].completed ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50'
              }`}
              onClick={() => onSelect(item.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${item.gradient} transform transition-transform group-hover:scale-110 shadow-md`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    {sectionProgress[item.id].completed ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 animate-pulse">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-blue-100 text-blue-700">
                        <ChevronRight className="h-4 w-4 mr-1" />
                        Start
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  {sectionProgress[item.id].completed && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 flex items-center text-xs text-green-600"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />
                      All questions answered
                    </motion.div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MainMenu;
