
import React from "react";
import { Home, Users, Building2, Train, Laptop } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatSection } from "@/components/ChatbotInterface";

interface MainMenuProps {
  onSelect: (section: ChatSection) => void;
}

interface MenuItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, description, icon, onClick }) => (
  <Button 
    variant="outline" 
    className="h-auto flex flex-col items-center text-left p-6 hover:bg-accent transition-all duration-300"
    onClick={onClick}
  >
    <div className="mb-4 text-4xl">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </Button>
);

const MainMenu: React.FC<MainMenuProps> = ({ onSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Home Buying Assistant</h2>
        <p className="text-muted-foreground">
          What would you like to explore today? Choose from the options below.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MenuItem
          title="Basic Questions"
          description="Define your budget, location, and property preferences."
          icon="🏡"
          onClick={() => onSelect("basic-questions")}
        />
        
        <MenuItem
          title="Demographics"
          description="Who lives here now, and what will it look like in 20 years?"
          icon="👥"
          onClick={() => onSelect("demographics")}
        />
        
        <MenuItem
          title="Construction & Development"
          description="Learn about green spaces, malls, and planned projects."
          icon="🏗️"
          onClick={() => onSelect("construction")}
        />
        
        <MenuItem
          title="Transportation"
          description="Compare current and future mobility options."
          icon="🚇"
          onClick={() => onSelect("transportation")}
        />
        
        <MenuItem
          title="Smart Home Tech"
          description="Discover smart-ready homes and infrastructure."
          icon="🤖"
          onClick={() => onSelect("smart-home")}
        />
      </div>
    </div>
  );
};

export default MainMenu;
