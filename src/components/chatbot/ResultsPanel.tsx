
import React from "react";
import { ChevronLeft, Play, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatSection } from "@/components/ChatbotInterface";
import { useToast } from "@/hooks/use-toast";

interface ResultsPanelProps {
  section: ChatSection;
  answers: Record<string, any>;
  onBack: () => void;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ section, answers, onBack }) => {
  const { toast } = useToast();
  
  // Get result content based on section and answers
  const { title, summary, recommendation } = getResultContent(section, answers);
  
  const handleGetRecommendation = () => {
    toast({
      title: "Generating comprehensive recommendation...",
      description: "Analyzing all your preferences across categories to find your ideal match.",
      duration: 3000,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5" />
          Back
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
        {/* Map Visualization */}
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <div className="h-64 bg-blue-100 flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2">Area Map</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {/* Placeholder for map */}
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-sm text-blue-700">Interactive map visualization</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Area Images */}
        <Card>
          <CardContent className="p-0 overflow-hidden rounded-lg">
            <div className="h-64 bg-green-100 flex items-center justify-center">
              <div className="text-center p-4">
                <h3 className="text-lg font-medium mb-2">Area Preview</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 flex items-center justify-center">
                    <div className="text-4xl">🏘️</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 flex items-center justify-center">
                    <div className="text-4xl">🌳</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 flex items-center justify-center">
                    <div className="text-4xl">🏢</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg border border-green-200 flex items-center justify-center">
                    <div className="text-4xl">🛣️</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Data Chart */}
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Data Insights</h3>
            <div className="h-48 bg-purple-50 rounded-lg border border-purple-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-sm text-purple-700">Data visualization chart</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Audio Summary */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Audio Summary</h3>
            <div className="h-48 bg-amber-50 rounded-lg border border-amber-100 flex flex-col items-center justify-center p-4">
              <div className="text-4xl mb-4">🎧</div>
              <p className="text-sm text-amber-700 mb-4">Listen to our AI narration</p>
              <Button className="gap-2">
                <Play className="h-4 w-4" /> Play Audio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Text Summary */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-medium mb-4">Summary</h3>
          <p className="mb-4 text-muted-foreground">{summary}</p>
          <h4 className="font-medium mb-2">Our Recommendation</h4>
          <p className="text-muted-foreground">{recommendation}</p>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Modify Your Answers
        </Button>
        <div className="space-x-4">
          <Button variant="secondary">
            Save Results
          </Button>
          <Button 
            onClick={handleGetRecommendation}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
          >
            <ThumbsUp className="mr-2 h-5 w-5" /> 
            Get Full Recommendation
          </Button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate result content based on section and answers
function getResultContent(section: ChatSection, answers: Record<string, any>) {
  switch (section) {
    case "basic-questions":
      return {
        title: "Your Ideal Home Profile",
        summary: `Based on your budget of ${formatCurrency(answers.budget)} and preference for ${formatLocation(answers.location)}, we've analyzed the best options for you. You're looking for a ${formatBuildingAge(answers.buildingAge)} property with features like ${formatFeatures(answers.features)}.`,
        recommendation: "We recommend exploring properties in the northern part of the Downtown area, where you'll find the best mix of your desired features within your budget range. These properties typically offer good value retention and match your preference for amenities."
      };
      
    case "demographics":
      return {
        title: "Neighborhood Demographics",
        summary: `You're interested in areas with ${formatDemographics(answers.ageGroups)} and prefer neighborhoods with ${formatHouseholdType(answers.householdType)}. The demographic projections are ${formatImportance(answers.futureProjections)} to you.`,
        recommendation: "Based on your preferences, the Riverdale district would be an excellent match. It has a growing population of your preferred demographic groups and is projected to maintain this trend over the next 20 years according to city planning data."
      };
      
    case "construction":
      return {
        title: "Development & Green Space",
        summary: `Access to green spaces is ${formatImportance(answers.greenSpace)} for you, and you want to be near amenities like ${formatAmenities(answers.amenities)}. You've indicated that you're ${formatDevelopmentComfort(answers.development)} with ongoing construction.`,
        recommendation: "The Westgate area matches your preferences well. It has extensive parks and green spaces, while also featuring your desired amenities. The area has a moderate amount of planned development that shouldn't be disruptive based on your comfort level with construction."
      };
      
    case "transportation":
      return {
        title: "Mobility & Transportation",
        summary: `You need access to ${formatTransportation(answers.transportTypes)} and prefer a maximum commute time of ${answers.commuteTime} minutes. Future transportation improvements are ${formatTransportImportance(answers.futureTransport)} to you.`,
        recommendation: "The Oakridge neighborhood offers excellent transportation options matching your preferences. The area is well-connected with your preferred transit types and has several planned improvements that will further enhance mobility in the coming years."
      };
      
    case "smart-home":
      return {
        title: "Smart Home Technology Profile",
        summary: `You're interested in smart home features like ${formatSmartFeatures(answers.smartFeatures)} and rate the importance of smart technology as ${formatImportance(answers.smartImportance)}. You want a home that's ${formatFutureProof(answers.futureProof)} for future technology.`,
        recommendation: "The newly developed TechRidge properties would be perfect for your smart home preferences. These homes come with many of your desired features pre-installed and have infrastructure ready for future upgrades. The neighborhood also has advanced fiber connectivity and smart city initiatives."
      };
      
    default:
      return {
        title: "Your Results",
        summary: "Thank you for sharing your preferences with us.",
        recommendation: "Based on your selections, we've compiled some initial recommendations. For more detailed insights, please contact our specialists."
      };
  }
}

// Helper formatting functions
function formatCurrency(value: number) {
  return value ? `$${value.toLocaleString()}` : "your budget";
}

function formatLocation(value: string) {
  switch (value) {
    case "downtown": return "downtown areas";
    case "suburbs": return "suburban communities";
    case "rural": return "rural settings";
    default: return "various locations";
  }
}

function formatBuildingAge(value: string) {
  switch (value) {
    case "new": return "newly constructed";
    case "medium": return "moderately aged";
    case "old": return "established, older";
    default: return "";
  }
}

function formatFeatures(values: string[]) {
  if (!values || !values.length) return "various amenities";
  
  const featureMap: Record<string, string> = {
    garden: "private outdoor space",
    parking: "dedicated parking",
    smart: "smart home technology",
    pool: "swimming facilities"
  };
  
  return values.map(v => featureMap[v] || v).join(", ");
}

function formatDemographics(values: string[]) {
  if (!values || !values.length) return "a diverse population";
  
  const demoMap: Record<string, string> = {
    young: "young professionals",
    families: "family households",
    seniors: "senior residents"
  };
  
  return values.map(v => demoMap[v] || v).join(", ");
}

function formatHouseholdType(value: string) {
  switch (value) {
    case "singles": return "predominantly single residents";
    case "couples": return "couples without children";
    case "families": return "families with children";
    case "mixed": return "a mix of different household types";
    default: return "various household compositions";
  }
}

function formatImportance(value: number) {
  if (!value) return "somewhat important";
  
  const importanceMap: Record<number, string> = {
    1: "not very important",
    2: "slightly important",
    3: "moderately important",
    4: "quite important",
    5: "extremely important"
  };
  
  return importanceMap[value] || "important";
}

function formatAmenities(values: string[]) {
  if (!values || !values.length) return "various local amenities";
  
  const amenityMap: Record<string, string> = {
    restaurants: "dining options",
    malls: "shopping centers",
    parks: "parks and recreation areas",
    schools: "educational institutions",
    gyms: "fitness facilities"
  };
  
  return values.map(v => amenityMap[v] || v).join(", ");
}

function formatDevelopmentComfort(value: string) {
  switch (value) {
    case "yes": return "comfortable with";
    case "limited": return "accepting of limited";
    case "no": return "not interested in";
    default: return "selective about";
  }
}

function formatTransportation(values: string[]) {
  if (!values || !values.length) return "various transportation options";
  
  const transportMap: Record<string, string> = {
    subway: "subway/metro lines",
    bus: "bus routes",
    bike: "bike paths",
    car: "car-friendly infrastructure",
    walk: "walkable streets"
  };
  
  return values.map(v => transportMap[v] || v).join(", ");
}

function formatTransportImportance(value: string) {
  switch (value) {
    case "very": return "very important";
    case "somewhat": return "somewhat important";
    case "not": return "not a priority";
    default: return "a consideration";
  }
}

function formatSmartFeatures(values: string[]) {
  if (!values || !values.length) return "various smart technologies";
  
  const featureMap: Record<string, string> = {
    thermostat: "climate control systems",
    security: "security monitoring",
    lights: "automated lighting",
    voice: "voice control assistants",
    appliances: "connected appliances"
  };
  
  return values.map(v => featureMap[v] || v).join(", ");
}

function formatFutureProof(value: string) {
  switch (value) {
    case "fully": return "fully prepared";
    case "partial": return "somewhat ready";
    case "basic": return "equipped with basic capabilities";
    default: return "adaptable";
  }
}

export default ResultsPanel;
