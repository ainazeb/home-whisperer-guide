
import React, { useState } from "react";
import { ChevronLeft, Play, ThumbsUp, Pause, MapPin, Building2, Train, Home, Trees } from "lucide-react";
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

  switch (section) {
    case "basic-questions":
      return {
        title: "Your Ideal Home Profile",
        summary: `Based on our analysis of your preferences and ${areas.length} distinct neighborhoods, we've identified several excellent matches. Your budget of ${formatCurrency(answers.budget)} and lifestyle preferences align particularly well with ${areas[0].name} and ${areas[1].name}, offering an optimal balance of amenities and value.`,
        recommendation: `Primary Recommendation: ${areas[0].name} (${areas[0].score}% match)\n${areas[0].description}. Key highlights include ${areas[0].highlights.join(", ")}.\n\nAlternative Options:\n${areas.slice(1).map(area => `- ${area.name} (${area.score}% match): ${area.description}`).join("\n")}`,
        areas: areas
      };
      
    case "demographics":
      return {
        title: "Neighborhood Demographics",
        summary: `You're interested in areas with ${formatDemographics(answers.ageGroups)} and prefer neighborhoods with ${formatHouseholdType(answers.householdType)}. The demographic projections are ${formatImportance(answers.futureProjections)} to you.`,
        recommendation: "Based on your preferences, the Riverdale district would be an excellent match. It has a growing population of your preferred demographic groups and is projected to maintain this trend over the next 20 years according to city planning data.",
        areas: areas
      };
      
    case "construction":
      return {
        title: "Development & Green Space",
        summary: `Access to green spaces is ${formatImportance(answers.greenSpace)} for you, and you want to be near amenities like ${formatAmenities(answers.amenities)}. You've indicated that you're ${formatDevelopmentComfort(answers.development)} with ongoing construction.`,
        recommendation: "The Westgate area matches your preferences well. It has extensive parks and green spaces, while also featuring your desired amenities. The area has a moderate amount of planned development that shouldn't be disruptive based on your comfort level with construction.",
        areas: areas
      };
      
    case "transportation":
      return {
        title: "Mobility & Transportation",
        summary: `You need access to ${formatTransportation(answers.transportTypes)} and prefer a maximum commute time of ${answers.commuteTime} minutes. Future transportation improvements are ${formatTransportImportance(answers.futureTransport)} to you.`,
        recommendation: "The Oakridge neighborhood offers excellent transportation options matching your preferences. The area is well-connected with your preferred transit types and has several planned improvements that will further enhance mobility in the coming years.",
        areas: areas
      };
      
    case "smart-home":
      return {
        title: "Smart Home Technology Profile",
        summary: `You're interested in smart home features like ${formatSmartFeatures(answers.smartFeatures)} and rate the importance of smart technology as ${formatImportance(answers.smartImportance)}. You want a home that's ${formatFutureProof(answers.futureProof)} for future technology.`,
        recommendation: "The newly developed TechRidge properties would be perfect for your smart home preferences. These homes come with many of your desired features pre-installed and have infrastructure ready for future upgrades. The neighborhood also has advanced fiber connectivity and smart city initiatives.",
        areas: areas
      };
      
    default:
      return {
        title: "Your Results",
        summary: "Thank you for sharing your preferences with us.",
        recommendation: "Based on your selections, we've compiled some initial recommendations. For more detailed insights, please contact our specialists.",
        areas: areas
      };
  };
};

const ResultsPanel: React.FC<ResultsPanelProps> = ({ section, answers, onBack }) => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [areaExpanded, setAreaExpanded] = useState<string | null>(null);
  const [showFullRecommendation, setShowFullRecommendation] = useState(false);
  
  const resultContent = getResultContent(section, answers);
  // Ensure we always have the required properties with defaults if they're missing
  const { 
    title = "Your Results", 
    summary = "Thank you for sharing your preferences with us.", 
    recommendation = "Based on your selections, we've compiled some initial recommendations.",
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
  
  const handleSaveResults = () => {
    toast({
      title: "Results saved successfully!",
      description: "Your preferences and results have been saved to your account.",
      duration: 3000,
    });
  };
  
  const toggleAudioPlay = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 1;
        setAudioProgress(progress);
        if (progress >= 100) {
          setIsPlaying(false);
          clearInterval(interval);
          setAudioProgress(0);
          
          toast({
            title: "Audio summary completed",
            description: "The full audio summary has finished playing.",
            duration: 2000,
          });
        }
      }, 100);
    } else {
      setAudioProgress(0);
      
      toast({
        title: "Audio paused",
        description: "You can resume the audio summary at any time.",
        duration: 2000,
      });
    }
  };
  
  const handleAreaClick = (areaId: string) => {
    setAreaExpanded(areaExpanded === areaId ? null : areaId);
    
    if (areaExpanded !== areaId) {
      toast({
        title: areaId === 'map' ? "Map view expanded" : areaId === 'preview' ? "Area preview expanded" : "Data insights expanded",
        description: "Click again to collapse this section.",
        duration: 2000,
      });
    }
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
          Back to Menu
        </Button>
        <h2 className="text-xl font-semibold flex-1 text-center">
          Your Results
        </h2>
      </div>
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          Based on your preferences, we've compiled some insights for you.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`overflow-hidden transition-all duration-500 ${areaExpanded === 'map' ? 'md:col-span-2' : ''}`}>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <div 
              className={`${areaExpanded === 'map' ? 'h-96' : 'h-64'} bg-blue-100 flex items-center justify-center relative cursor-pointer transition-all duration-500`} 
              onClick={() => handleAreaClick('map')}
            >
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2 flex items-center justify-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Area Map
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {areaExpanded === 'map' ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
                      {Array.isArray(areas) && areas.map((area, index) => (
                        <div key={area.name} className="bg-blue-50 p-3 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                          <div className="text-2xl mb-2">{index === 0 ? '🌟' : '📍'}</div>
                          <p className="text-sm font-medium text-blue-700">{area.name}</p>
                          <p className="text-xs text-blue-600">{area.score}% Match</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-4xl mb-2 animate-bounce">🗺️</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className={`overflow-hidden transition-all duration-500 ${areaExpanded === 'preview' ? 'md:col-span-2' : ''}`}>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <div 
              className={`${areaExpanded === 'preview' ? 'h-96' : 'h-64'} bg-green-100 flex items-center justify-center relative cursor-pointer transition-all duration-500`}
              onClick={() => handleAreaClick('preview')}
            >
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2">Area Preview</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🏘️</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🌳</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🏢</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center">
                    <div className="text-4xl animate-pulse">🛣️</div>
                  </div>
                </div>
                {areaExpanded === 'preview' && (
                  <div className="mt-4 animate-fade-in">
                    <Button size="sm" variant="outline" className="text-xs" onClick={(e) => e.stopPropagation()}>View Gallery</Button>
                    <Button size="sm" variant="outline" className="text-xs ml-2" onClick={(e) => e.stopPropagation()}>Street View</Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`md:col-span-2 transition-all duration-500 ${areaExpanded === 'chart' ? 'md:col-span-3' : ''}`}>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => handleAreaClick('chart')}>
              Area Comparison {areaExpanded === 'chart' ? '(Click to Collapse)' : '(Click to Expand)'}
            </h3>
            <div className={`${areaExpanded === 'chart' ? 'h-96' : 'h-48'} bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center transition-all duration-500`}
                onClick={() => handleAreaClick('chart')}>
              <div className="text-center w-full p-4">
                {areaExpanded === 'chart' ? (
                  <div className="w-full animate-fade-in">
                    <h4 className="text-sm font-medium mb-4">Area Comparison Based on Your Preferences</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Array.isArray(areas) && areas.map((area) => (
                        <div key={area.name} className="flex flex-col items-center">
                          <div className={`h-${area.score} w-16 bg-blue-400 rounded-t-lg transform transition-all duration-700 hover:scale-y-110 hover:bg-blue-500`}
                               style={{ height: `${area.score}px` }}>
                          </div>
                          <p className="text-xs mt-1 font-medium">{area.name}</p>
                          <p className="text-xs text-blue-700">{area.score}%</p>
                          <div className="mt-2 text-xs text-gray-600">
                            {Array.isArray(area.highlights) && area.highlights.slice(0, 2).map((highlight, idx) => (
                              <div key={idx} className="flex items-center mb-1">
                                <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="text-4xl mb-2 animate-pulse">📊</div>
                    <p className="text-sm text-purple-700">Click to view detailed area comparison</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Audio Summary</h3>
            <div className="h-48 bg-amber-50 rounded-lg border border-amber-100 flex flex-col items-center justify-center p-4">
              <div className={`text-4xl mb-4 ${isPlaying ? 'animate-pulse' : ''}`}>🎧</div>
              <p className="text-sm text-amber-700 mb-4">Listen to our AI narration</p>
              {isPlaying && (
                <div className="w-full mb-4">
                  <Progress value={audioProgress} className="h-2" />
                </div>
              )}
              <Button 
                className="gap-2 hover:bg-amber-600 transition-colors" 
                onClick={(e) => {
                  e.preventDefault();
                  toggleAudioPlay();
                }}
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause Audio
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Play Audio
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4">Detailed Analysis</h3>
          <div className="space-y-4">
            <p className="text-muted-foreground">{summary}</p>
            <h4 className="font-medium mb-2">Our Recommendations</h4>
            <div className="space-y-4">
              {Array.isArray(areas) && areas.map((area, index) => (
                <div key={area.name} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-medium flex items-center">
                        {index === 0 ? <ThumbsUp className="w-4 h-4 mr-2 text-green-500" /> : 
                         index === 1 ? <Building2 className="w-4 h-4 mr-2 text-blue-500" /> :
                         index === 2 ? <Train className="w-4 h-4 mr-2 text-purple-500" /> :
                         index === 3 ? <Home className="w-4 h-4 mr-2 text-amber-500" /> :
                         <Trees className="w-4 h-4 mr-2 text-green-500" />}
                        {area.name}
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">{area.description}</p>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">{area.score}%</span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {Array.isArray(area.highlights) && area.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Modify Your Answers
        </Button>
        <div className="space-x-4">
          <Button 
            variant="secondary" 
            onClick={handleSaveResults}
            className="hover:bg-gray-200 transition-colors"
          >
            Save Results
          </Button>
          <Button 
            onClick={handleGetRecommendation}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-colors transform hover:scale-105"
          >
            <ThumbsUp className="mr-2 h-5 w-5" /> 
            Get Full Recommendation
          </Button>
        </div>
      </div>
    </div>
  );
};

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
