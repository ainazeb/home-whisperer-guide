
import React, { useState } from "react";
import { ChevronLeft, Play, ThumbsUp, Pause, MapPin, Building2, Train, Home, Trees, Edit, Map as MapIcon, MessageCircle, BarChart3, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatSection } from "@/components/ChatbotInterface";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import FullRecommendationPanel from "./FullRecommendationPanel";

interface ResultsPanelProps {
  section: ChatSection;
  answers: Record<string, any>;
  onBack: () => void;
}

const getResultContent = (section: ChatSection, answers: Record<string, any>) => {
  const areas = [
    {
      name: "Downtown District",
      score: 93,
      description: "A vibrant urban center with excellent amenities",
      highlights: ["Walk Score: 95/100", "Transit Score: 98/100", "Modern condos & apartments", "Cultural hotspots"],
      keyFeatures: {
        lifestyle: 90,
        amenities: 95,
        transport: 98,
        safety: 85,
        value: 82
      }
    },
    {
      name: "Westside Village",
      score: 88,
      description: "Family-friendly neighborhood with great schools",
      highlights: ["School Rating: 9/10", "Park Access: 92/100", "Family-oriented", "Quiet streets"],
      keyFeatures: {
        lifestyle: 85,
        amenities: 80,
        transport: 75,
        safety: 95,
        value: 88
      }
    },
    {
      name: "Tech Valley",
      score: 86,
      description: "Modern development with smart infrastructure",
      highlights: ["Innovation Hub", "Smart Home Ready", "Modern Architecture", "Green Buildings"],
      keyFeatures: {
        lifestyle: 88,
        amenities: 85,
        transport: 82,
        safety: 90,
        value: 84
      }
    },
    {
      name: "Heritage District",
      score: 84,
      description: "Historic charm meets modern convenience",
      highlights: ["Historic Buildings", "Artisan Shops", "Cultural Events", "Community Feel"],
      keyFeatures: {
        lifestyle: 92,
        amenities: 78,
        transport: 85,
        safety: 88,
        value: 80
      }
    },
    {
      name: "Green Haven",
      score: 82,
      description: "Eco-friendly community with abundant nature",
      highlights: ["Green Spaces", "Sustainable Living", "Nature Trails", "Community Gardens"],
      keyFeatures: {
        lifestyle: 86,
        amenities: 75,
        transport: 70,
        safety: 92,
        value: 90
      }
    }
  ];

  // Get answer statistics and summaries based on section
  switch (section) {
    case "basic-questions":
      return {
        title: "Your Home Preferences",
        summary: `We've analyzed your basic preferences including budget of ${formatCurrency(answers.budget)}, preferred location in ${formatLocation(answers.location)}, and interest in ${formatBuildingAge(answers.buildingAge)} buildings with features like ${formatFeatures(answers.features)}.`,
        statistics: [
          { label: "Budget Range", value: formatCurrency(answers.budget) },
          { label: "Location Preference", value: formatLocation(answers.location) },
          { label: "Building Age", value: formatBuildingAge(answers.buildingAge) },
          { label: "Desired Features", value: formatFeatures(answers.features) }
        ],
        exploreSuggestion: "Based on your preferences, we recommend exploring urban areas with modern amenities that match your budget constraints.",
        areas: areas
      };
      
    case "demographics":
      return {
        title: "Demographics Analysis",
        summary: `You're interested in neighborhoods with ${formatDemographics(answers.ageGroups)} and prefer areas with ${formatHouseholdType(answers.householdType)}. Future demographic projections are ${formatImportance(answers.futureProjections)} to you.`,
        statistics: [
          { label: "Preferred Age Groups", value: formatDemographics(answers.ageGroups) },
          { label: "Household Types", value: formatHouseholdType(answers.householdType) },
          { label: "Importance of Projections", value: formatImportance(answers.futureProjections) }
        ],
        exploreSuggestion: "Based on your demographic preferences, areas with diverse population composition and growth trends would be most suitable for your needs.",
        areas: areas
      };
      
    case "construction":
      return {
        title: "Development & Green Space",
        summary: `You've indicated that green spaces are ${formatImportance(answers.greenSpace)} to you, with preferred access to ${formatAmenities(answers.amenities)}. You're ${formatDevelopmentComfort(answers.development)} with construction in your area.`,
        statistics: [
          { label: "Green Space Importance", value: formatImportance(answers.greenSpace) },
          { label: "Desired Amenities", value: formatAmenities(answers.amenities) },
          { label: "Construction Comfort", value: formatDevelopmentComfort(answers.development) }
        ],
        exploreSuggestion: "Areas balancing established infrastructure with appropriate levels of ongoing development would best match your comfort with construction activity.",
        areas: areas
      };
      
    case "transportation":
      return {
        title: "Mobility Analysis",
        summary: `Your transportation preferences include access to ${formatTransportation(answers.transportTypes)} with a maximum commute time of ${answers.commuteTime} minutes. Future transportation improvements are ${formatTransportImportance(answers.futureTransport)} to you.`,
        statistics: [
          { label: "Preferred Transport", value: formatTransportation(answers.transportTypes) },
          { label: "Max Commute Time", value: `${answers.commuteTime} minutes` },
          { label: "Future Transit Importance", value: formatTransportImportance(answers.futureTransport) }
        ],
        exploreSuggestion: "Neighborhoods with strong existing transit infrastructure and planned improvements would align well with your mobility priorities.",
        areas: areas
      };
      
    case "smart-home":
      return {
        title: "Technology Profile",
        summary: `You're interested in smart home features like ${formatSmartFeatures(answers.smartFeatures)} and consider smart technology ${formatImportance(answers.smartImportance)} for your home. You prefer a home that's ${formatFutureProof(answers.futureProof)} for future technology.`,
        statistics: [
          { label: "Desired Smart Features", value: formatSmartFeatures(answers.smartFeatures) },
          { label: "Tech Importance", value: formatImportance(answers.smartImportance) },
          { label: "Future-Proofing", value: formatFutureProof(answers.futureProof) }
        ],
        exploreSuggestion: "Newer developments with integrated smart home infrastructure would best accommodate your technology preferences and future-proofing needs.",
        areas: areas
      };
      
    default:
      return {
        title: "Your Results",
        summary: "Thank you for sharing your preferences with us.",
        statistics: [],
        exploreSuggestion: "Based on your selections, we can provide personalized recommendations to help you find your ideal home environment.",
        areas: areas
      };
  };
};

const ResultsPanel: React.FC<ResultsPanelProps> = ({ section, answers, onBack }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showFullRecommendation, setShowFullRecommendation] = useState(false);
  
  const resultContent = getResultContent(section, answers);
  // Ensure we always have the required properties with defaults if they're missing
  const { 
    title = "Your Results", 
    summary = "Thank you for sharing your preferences with us.", 
    statistics = [],
    exploreSuggestion = "Based on your selections, we can provide personalized recommendations.",
    areas = []
  } = resultContent || {};
  
  const handleGetRecommendation = () => {
    toast({
      title: "Generating comprehensive recommendation...",
      description: "Analyzing all your preferences across categories to find your ideal match.",
      duration: 3000,
    });
    setShowFullRecommendation(true);
  };
  
  const handleModifyAnswers = () => {
    toast({
      title: "Returning to questionnaire",
      description: "You can now modify your answers.",
      duration: 2000,
    });
    onBack();
  };
  
  if (showFullRecommendation) {
    return <FullRecommendationPanel 
      answers={answers} 
      onBack={() => setShowFullRecommendation(false)} 
      areas={areas} 
    />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
          Back to Questions
        </Button>
        <h2 className="text-xl font-semibold flex-1 text-center">
          Your Response Analysis
        </h2>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We've analyzed your answers and prepared a summary of your preferences.
        </p>
      </div>
      
      {/* Answer Summary Card */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-primary" />
            Answer Summary
          </h3>
          <p className="text-muted-foreground mb-6">{summary}</p>
          
          {statistics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {statistics.map((stat, index) => (
                <div key={index} className="bg-muted/50 p-3 rounded-lg border">
                  <h4 className="text-sm font-medium">{stat.label}</h4>
                  <p className="text-sm text-primary-foreground/80">{stat.value}</p>
                </div>
              ))}
            </div>
          )}
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
            <h4 className="font-medium mb-2 flex items-center">
              <MapIcon className="h-4 w-4 mr-2 text-blue-600" />
              Area Recommendations Preview
            </h4>
            <p className="text-sm text-muted-foreground">{exploreSuggestion}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Buttons Card */}
      <Card className="border-2 border-blue-100">
        <CardContent className="p-6">
          <div className="text-center space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Ready to See Your Tailored Recommendations?</h3>
              <p className="text-muted-foreground mb-4">
                Based on your responses, we can generate personalized area recommendations 
                with detailed insights to help you find the perfect home.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={handleModifyAnswers}
                  className="flex items-center"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modify Your Answers
                </Button>
                
                <Button 
                  onClick={handleGetRecommendation}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors transform hover:scale-105"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" /> 
                  Get Full Recommendations
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/30 p-4 rounded-lg border text-center">
                <MapIcon className="h-10 w-10 mx-auto mb-2 text-blue-500" />
                <h4 className="font-medium mb-1">Area Maps</h4>
                <p className="text-xs text-muted-foreground">
                  View detailed maps of recommended neighborhoods
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border text-center">
                <Star className="h-10 w-10 mx-auto mb-2 text-amber-500" />
                <h4 className="font-medium mb-1">Top Matches</h4>
                <p className="text-xs text-muted-foreground">
                  Discover neighborhoods with highest compatibility
                </p>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg border text-center">
                <MessageCircle className="h-10 w-10 mx-auto mb-2 text-green-500" />
                <h4 className="font-medium mb-1">AI Insights</h4>
                <p className="text-xs text-muted-foreground">
                  Get AI-powered analysis of each recommendation
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// All the formatting helper functions
const formatCurrency = (value: number) => {
  return value ? `$${value.toLocaleString()}` : "your budget";
};

const formatLocation = (value: string) => {
  switch (value) {
    case "downtown": return "downtown areas";
    case "suburbs": return "suburban communities";
    case "rural": return "rural settings";
    default: return "various locations";
  }
};

const formatBuildingAge = (value: string) => {
  switch (value) {
    case "new": return "newly constructed";
    case "medium": return "moderately aged";
    case "old": return "established, older";
    default: return "";
  }
};

const formatFeatures = (values: string[]) => {
  if (!values || !values.length) return "various amenities";
  
  const featureMap: Record<string, string> = {
    garden: "private outdoor space",
    parking: "dedicated parking",
    smart: "smart home technology",
    pool: "swimming facilities"
  };
  
  return values.map(v => featureMap[v] || v).join(", ");
};

const formatDemographics = (values: string[]) => {
  if (!values || !values.length) return "a diverse population";
  
  const demoMap: Record<string, string> = {
    young: "young professionals",
    families: "family households",
    seniors: "senior residents"
  };
  
  return values.map(v => demoMap[v] || v).join(", ");
};

const formatHouseholdType = (value: string) => {
  switch (value) {
    case "singles": return "predominantly single residents";
    case "couples": return "couples without children";
    case "families": return "families with children";
    case "mixed": return "a mix of different household types";
    default: return "various household compositions";
  }
};

const formatImportance = (value: number) => {
  if (!value) return "somewhat important";
  
  const importanceMap: Record<number, string> = {
    1: "not very important",
    2: "slightly important",
    3: "moderately important",
    4: "quite important",
    5: "extremely important"
  };
  
  return importanceMap[value] || "important";
};

const formatAmenities = (values: string[]) => {
  if (!values || !values.length) return "various local amenities";
  
  const amenityMap: Record<string, string> = {
    restaurants: "dining options",
    malls: "shopping centers",
    parks: "parks and recreation areas",
    schools: "educational institutions",
    gyms: "fitness facilities"
  };
  
  return values.map(v => amenityMap[v] || v).join(", ");
};

const formatDevelopmentComfort = (value: string) => {
  switch (value) {
    case "yes": return "comfortable with";
    case "limited": return "accepting of limited";
    case "no": return "not interested in";
    default: return "selective about";
  }
};

const formatTransportation = (values: string[]) => {
  if (!values || !values.length) return "various transportation options";
  
  const transportMap: Record<string, string> = {
    subway: "subway/metro lines",
    bus: "bus routes",
    bike: "bike paths",
    car: "car-friendly infrastructure",
    walk: "walkable streets"
  };
  
  return values.map(v => transportMap[v] || v).join(", ");
};

const formatTransportImportance = (value: string) => {
  switch (value) {
    case "very": return "very important";
    case "somewhat": return "somewhat important";
    case "not": return "not a priority";
    default: return "a consideration";
  }
};

const formatSmartFeatures = (values: string[]) => {
  if (!values || !values.length) return "various smart technologies";
  
  const featureMap: Record<string, string> = {
    thermostat: "climate control systems",
    security: "security monitoring",
    lights: "automated lighting",
    voice: "voice control assistants",
    appliances: "connected appliances"
  };
  
  return values.map(v => featureMap[v] || v).join(", ");
};

const formatFutureProof = (value: string) => {
  switch (value) {
    case "fully": return "fully prepared";
    case "partial": return "somewhat ready";
    case "basic": return "equipped with basic capabilities";
    default: return "adaptable";
  }
};

export default ResultsPanel;
