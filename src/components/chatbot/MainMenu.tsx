
import React from "react";
import { Home, Users, Building2, Train, Laptop } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatSection } from "@/components/ChatbotInterface";
import { motion } from "framer-motion";

interface MainMenuProps {
  onSelect: (section: ChatSection) => void;
}

interface MenuItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  delay: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, description, icon, onClick, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1, duration: 0.5 }}
  >
    <Button 
      variant="outline" 
      className="h-auto flex flex-col items-center text-left p-6 hover:bg-accent transition-all duration-300 w-full"
      onClick={onClick}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Button>
  </motion.div>
);

const MainMenu: React.FC<MainMenuProps> = ({ onSelect }) => {
  const menuItems = [
    {
      section: "basic-questions" as ChatSection,
      title: "Basic Questions",
      description: "Define your budget, location, and property preferences.",
      icon: "🏡"
    },
    {
      section: "demographics" as ChatSection,
      title: "Demographics",
      description: "Who lives here now, and what will it look like in 20 years?",
      icon: "👥"
    },
    {
      section: "construction" as ChatSection,
      title: "Construction & Development",
      description: "Learn about green spaces, malls, and planned projects.",
      icon: "🏗️"
    },
    {
      section: "transportation" as ChatSection,
      title: "Transportation",
      description: "Compare current and future mobility options.",
      icon: "🚇"
    },
    {
      section: "smart-home" as ChatSection,
      title: "Smart Home Tech",
      description: "Discover smart-ready homes and infrastructure.",
      icon: "🤖"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2">Home Buying Assistant</h2>
        <p className="text-muted-foreground">
          What would you like to explore today? Choose from the options below.
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.section}
            title={item.title}
            description={item.description}
            icon={item.icon}
            onClick={() => onSelect(item.section)}
            delay={index}
          />
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <Card className="p-4 border-dashed">
          <p className="text-sm text-muted-foreground">
            Complete all sections for a comprehensive home buying recommendation tailored to your preferences
          </p>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;
