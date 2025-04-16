
import React from "react";
import { MessageCircle, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface AIStoryProps {
  areaName: string;
  answers: Record<string, any>;
}

const AIStorytellingSection: React.FC<AIStoryProps> = ({ areaName, answers }) => {
  // Generate a personalized story based on user answers
  const generateStory = () => {
    const lifestylePreference = answers.lifestylePreference || "urban";
    const budget = answers.budget || "moderate";
    const familySize = answers.familySize || "small";
    
    return `Based on your preferences for a ${lifestylePreference} lifestyle and ${familySize} family size, 
    let me paint a picture of your life in ${areaName}. 
    
    Imagine starting your day in a home that perfectly matches your ${budget} budget while exceeding your expectations. 
    The neighborhood seamlessly blends modern amenities with a strong sense of community, 
    making it an ideal place for your lifestyle.
    
    Your daily routine would be enhanced by the area's strategic location and thoughtfully designed infrastructure. 
    The community here shares your values and interests, creating an environment where you'll feel right at home 
    from day one.
    
    Looking ahead, ${areaName}'s development plans and property value trends suggest this could be not just a home, 
    but a wise investment in your future. The area's growth aligns perfectly with your long-term goals.`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">AI Assistant's Perspective</h3>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="flex-grow space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-muted-foreground whitespace-pre-line">
                  {generateStory()}
                </p>
              </motion.div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium mb-2">Personalized Insights</h4>
                <ul className="space-y-2">
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start"
                  >
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-sm">
                      This area's {answers.priorityFeature || "amenities"} perfectly match your lifestyle preferences
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start"
                  >
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-sm">
                      Future development plans align with your long-term goals
                    </span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-start"
                  >
                    <div className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-sm">
                      Community demographics suggest strong social compatibility
                    </span>
                  </motion.li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AIStorytellingSection;
