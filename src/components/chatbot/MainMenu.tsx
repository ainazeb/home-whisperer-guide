
import React from "react";
import { Home, Users, Building2, Train, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChatSection } from "@/components/ChatbotInterface";

interface MainMenuProps {
  onSelect: (section: ChatSection) => void;
  sectionProgress: Record<ChatSection, { completed: boolean; answers: Record<string, any> }>;
  completedSections: number;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelect, sectionProgress, completedSections }) => {
  const totalProgress = (completedSections / 5) * 100;

  const menuItems = [
    {
      id: "basic-questions" as ChatSection,
      icon: Home,
      title: "Basic Questions",
      description: "Tell us about your ideal home preferences",
    },
    {
      id: "demographics" as ChatSection,
      icon: Users,
      title: "Demographics",
      description: "Explore neighborhood demographics",
    },
    {
      id: "construction" as ChatSection,
      icon: Building2,
      title: "Development",
      description: "Learn about area construction and amenities",
    },
    {
      id: "transportation" as ChatSection,
      icon: Train,
      title: "Transportation",
      description: "Discover mobility options",
    },
    {
      id: "smart-home" as ChatSection,
      icon: Laptop,
      title: "Smart Home",
      description: "Explore technology features",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Home Buying Assistant</h2>
        <p className="text-muted-foreground mb-4">
          Complete any section to get personalized recommendations. Your progress is automatically saved.
        </p>
        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{completedSections}/5 sections completed</span>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </div>
      </div>

      <div className="grid gap-4">
        {menuItems.map((item) => (
          <Card
            key={item.id}
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              sectionProgress[item.id].completed ? 'border-green-200 bg-green-50' : ''
            }`}
            onClick={() => onSelect(item.id)}
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <item.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.title}</h3>
                  {sectionProgress[item.id].completed && (
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
