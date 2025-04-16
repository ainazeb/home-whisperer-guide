import React, { useState } from "react";
import { ChevronLeft, MapPin, Home, Users, Building2, Train, Laptop, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatSection } from "@/components/ChatbotInterface";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface FullRecommendationPanelProps {
  answers: Record<string, any>;
  onBack: () => void;
  areas?: {
    name: string;
    score: number;
    description: string;
    highlights: string[];
    keyFeatures: {
      lifestyle: number;
      amenities: number;
      transport: number;
      safety: number;
      value: number;
    };
  }[];
}

const areaImages = {
  "Downtown District": "https://images.unsplash.com/photo-1466442929976-97f336a657be",
  "Westside Village": "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  "Tech Valley": "https://images.unsplash.com/photo-1500673922987-e212871fec22",
  "Heritage District": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "Green Haven": "https://images.unsplash.com/photo-1518005020951-eccb494ad742"
};

const FullRecommendationPanel: React.FC<FullRecommendationPanelProps> = ({ answers, onBack, areas = [] }) => {
  // Initialize selectedArea with the first area from the provided areas prop if available
  // Otherwise default to "westside"
  const initialSelectedArea = areas && areas.length > 0 ? areas[0].name : "westside";
  const [selectedArea, setSelectedArea] = useState<string>(initialSelectedArea);
  
  // Prepare data for spider chart from the selected area
  const getRadarData = (area: typeof areas[0]) => {
    return [
      { subject: 'Lifestyle', value: area.keyFeatures.lifestyle },
      { subject: 'Amenities', value: area.keyFeatures.amenities },
      { subject: 'Transport', value: area.keyFeatures.transport },
      { subject: 'Safety', value: area.keyFeatures.safety },
      { subject: 'Value', value: area.keyFeatures.value }
    ];
  };
  
  // Spider chart data for area comparison
  const areaComparisonData = [
    {
      subject: 'Price Match',
      westside: 80,
      downtown: 60,
      eastside: 90,
      suburbs: 95,
      fullMark: 100,
    },
    {
      subject: 'Amenities',
      westside: 92,
      downtown: 95,
      eastside: 75,
      suburbs: 60,
      fullMark: 100,
    },
    {
      subject: 'Transportation',
      westside: 85,
      downtown: 98,
      eastside: 82,
      suburbs: 65,
      fullMark: 100,
    },
    {
      subject: 'Future Growth',
      westside: 90,
      downtown: 85,
      eastside: 70,
      suburbs: 75,
      fullMark: 100,
    },
    {
      subject: 'Demographics',
      westside: 88,
      downtown: 78,
      eastside: 85,
      suburbs: 80,
      fullMark: 100,
    },
  ];
  
  // Bar chart data for price comparison
  const priceComparisonData = [
    {
      name: 'Studio',
      westside: 1850,
      downtown: 2200,
      eastside: 1650,
      suburbs: 1450,
    },
    {
      name: '1-Bedroom',
      westside: 2400,
      downtown: 2800,
      eastside: 2100,
      suburbs: 1900,
    },
    {
      name: '2-Bedroom',
      westside: 3200,
      downtown: 3800,
      eastside: 2900,
      suburbs: 2500,
    },
    {
      name: '3-Bedroom',
      westside: 4200,
      downtown: 5000,
      eastside: 3700,
      suburbs: 3200,
    },
  ];
  
  // Area details
  const areaDetails = {
    westside: {
      name: "Westside",
      description: "The Westside area offers the perfect balance of urban amenities and green spaces. With excellent schools, diverse dining options, and well-maintained parks, it's ideal for families and professionals alike. The area is experiencing moderate growth with several new developments planned that will enhance the neighborhood without disrupting its character.",
      keyPoints: [
        "92% match with your amenity preferences",
        "Excellent green spaces and parks",
        "Strong future development outlook",
        "Great transportation options"
      ],
      imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      recommendationScore: 93
    },
    downtown: {
      name: "Downtown",
      description: "Downtown offers a vibrant urban experience with countless restaurants, cultural venues, and shopping destinations within walking distance. The area features excellent public transportation and is ideal for those who prefer a car-free lifestyle. While housing prices are higher, the convenience and amenities justify the premium for many residents.",
      keyPoints: [
        "98% match with your transportation preferences",
        "Highest concentration of restaurants and entertainment",
        "Excellent walkability score",
        "Modern high-rise apartments with views"
      ],
      imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      recommendationScore: 82
    },
    eastside: {
      name: "Eastside",
      description: "The Eastside is an up-and-coming area that offers excellent value for money. With a mix of historic homes and new developments, it appeals to a diverse population. The area is seeing significant investment in public spaces and transportation infrastructure, making it a smart choice for those looking to buy in an area with appreciation potential.",
      keyPoints: [
        "90% match with your price range preferences",
        "Strong community feel with local events",
        "Improving transportation options",
        "Good mix of historic charm and modern amenities"
      ],
      imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      recommendationScore: 76
    },
    suburbs: {
      name: "Suburbs",
      description: "The suburban areas offer spacious homes with yards, good schools, and a peaceful environment. While commute times are longer, many residents find the trade-off worthwhile for the extra space and quieter surroundings. Recent improvements in cycling infrastructure have made it easier to combine suburban living with active transportation options.",
      keyPoints: [
        "95% match with your budget preferences",
        "Largest homes and lots for the price",
        "Excellent school districts",
        "Quieter, family-friendly neighborhoods"
      ],
      imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500&q=80",
      recommendationScore: 68
    }
  };
  
  // Find the selected area in the provided areas array
  const selectedAreaFromProps = areas.find(area => area.name === selectedArea);
  
  // Helper function to check if selectedArea is from the hardcoded areaDetails or from the props.areas
  const isAreaFromProps = !!selectedAreaFromProps;
  
  // Helper function to get the appropriate area data
  const getAreaData = () => {
    if (isAreaFromProps) {
      return {
        name: selectedAreaFromProps?.name || "",
        description: selectedAreaFromProps?.description || "",
        keyPoints: selectedAreaFromProps?.highlights || [],
        imageUrl: areaImages[selectedAreaFromProps?.name as keyof typeof areaImages] || "https://images.unsplash.com/photo-1466442929976-97f336a657be",
        recommendationScore: selectedAreaFromProps?.score || 0
      };
    } else {
      // Handle traditional way for the hardcoded areas
      const areaKey = selectedArea as keyof typeof areaDetails;
      return areaDetails[areaKey] || areaDetails.westside; // Default to westside if not found
    }
  };
  
  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
  };
  
  // Get the current area data based on selection
  const currentAreaData = getAreaData();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-2">
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Results
        </Button>
        <h2 className="text-xl font-semibold flex-1 text-center">
          Full Area Recommendation
        </h2>
      </div>
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Your Ideal Home Areas
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your responses across all categories, we've analyzed which areas best match your preferences. 
          Explore the details below to find your perfect neighborhood.
        </p>
      </div>
      
      {/* Top Recommendations Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {areas && areas.length > 0 ? (
          areas.map((area, index) => (
            <Card 
              key={area.name}
              className={`${selectedArea === area.name ? 'border-2 border-blue-500' : ''} transition-all duration-300 hover:shadow-lg cursor-pointer`}
              onClick={() => setSelectedArea(area.name)}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={areaImages[area.name as keyof typeof areaImages] || "https://images.unsplash.com/photo-1466442929976-97f336a657be"} 
                    alt={area.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500">
                      {area.score}% Match
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    {index === 0 && <Star className="w-4 h-4 text-yellow-500 mr-2" />}
                    {area.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {area.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-center text-xs text-blue-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          ["westside", "downtown", "eastside", "suburbs"].map((area) => (
            <Card 
              key={area}
              className={`${selectedArea === area ? 'border-2 border-blue-500' : ''} transition-all duration-300 hover:shadow-lg cursor-pointer`}
              onClick={() => handleAreaSelect(area)}
            >
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={areaDetails[area as keyof typeof areaDetails].imageUrl} 
                    alt={areaDetails[area as keyof typeof areaDetails].name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-500">
                      {areaDetails[area as keyof typeof areaDetails].recommendationScore}% Match
                    </Badge>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 flex items-center">
                    {area === "westside" && <Star className="w-4 h-4 text-yellow-500 mr-2" />}
                    {areaDetails[area as keyof typeof areaDetails].name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{areaDetails[area as keyof typeof areaDetails].description.substring(0, 100)}...</p>
                  <div className="grid grid-cols-2 gap-2">
                    {areaDetails[area as keyof typeof areaDetails].keyPoints.slice(0, 2).map((point, idx) => (
                      <div key={idx} className="flex items-center text-xs text-blue-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-1.5" />
                        {point.substring(0, 30)}...
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Top Recommendation */}
      <Card className="overflow-hidden border-2 border-blue-200 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Top Recommendation</h3>
            <Badge className="bg-blue-600">{currentAreaData.recommendationScore}% Match</Badge>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={currentAreaData.imageUrl} 
                alt={currentAreaData.name} 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="text-xl font-medium">{currentAreaData.name}</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                {currentAreaData.description}
              </p>
              <h5 className="font-medium mb-2">Key Points:</h5>
              <ul className="space-y-1 mb-4">
                {currentAreaData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* The rest of the component remains unchanged */}
      {/* Area Comparison */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Area Comparison</h3>
          
          <div className="grid grid-cols-4 gap-2 mb-6">
            {["westside", "downtown", "eastside", "suburbs"].map((area) => (
              <Button
                key={area}
                variant={selectedArea === area ? "default" : "outline"}
                onClick={() => handleAreaSelect(area)}
                className={`text-xs py-1 px-2 h-auto ${selectedArea === area ? "bg-blue-600" : ""}`}
              >
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </Button>
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Spider Chart */}
            <div className="h-80">
              <h4 className="text-sm font-medium mb-2 text-center">Area Score Comparison</h4>
              <ChartContainer config={{
                westside: { color: '#3b82f6' },
                downtown: { color: '#6366f1' },
                eastside: { color: '#8b5cf6' },
                suburbs: { color: '#a855f7' }
              }} className="h-full">
                <RadarChart outerRadius={90} width={730} height={250} data={areaComparisonData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Westside" dataKey="westside" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  <Radar name="Downtown" dataKey="downtown" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                  <Radar name="Eastside" dataKey="eastside" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
                  <Radar name="Suburbs" dataKey="suburbs" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ChartContainer>
            </div>
            
            {/* Price Comparison */}
            <div className="h-80">
              <h4 className="text-sm font-medium mb-2 text-center">Price Comparison ($/month)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="westside" name="Westside" fill="#3b82f6" />
                  <Bar dataKey="downtown" name="Downtown" fill="#6366f1" />
                  <Bar dataKey="eastside" name="Eastside" fill="#8b5cf6" />
                  <Bar dataKey="suburbs" name="Suburbs" fill="#a855f7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Area Details Tabs */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Detailed Area Analysis</h3>
          <Tabs defaultValue="demographics" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="demographics" className="text-xs">
                <Users className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Demographics</span>
              </TabsTrigger>
              <TabsTrigger value="housing" className="text-xs">
                <Home className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Housing</span>
              </TabsTrigger>
              <TabsTrigger value="development" className="text-xs">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Development</span>
              </TabsTrigger>
              <TabsTrigger value="transportation" className="text-xs">
                <Train className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Transport</span>
              </TabsTrigger>
              <TabsTrigger value="technology" className="text-xs">
                <Laptop className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Technology</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="demographics" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Population Demographics</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentAreaData.name} has a diverse population that closely aligns with your preference for {answers.householdType || "various household types"}. The area has seen a steady growth in the demographic groups you prefer.
                  </p>
                  
                  <h5 className="text-sm font-medium mb-2">Age Distribution</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Young Adults (18-34)</span>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Middle Age (35-54)</span>
                        <span>41%</span>
                      </div>
                      <Progress value={41} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Senior (55+)</span>
                        <span>27%</span>
                      </div>
                      <Progress value={27} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Household Composition</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Singles</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Couples without Children</span>
                        <span>31%</span>
                      </div>
                      <Progress value={31} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Families with Children</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Multi-generational</span>
                        <span>6%</span>
                      </div>
                      <Progress value={6} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h5 className="text-sm font-medium mb-1">Future Projection</h5>
                    <p className="text-xs text-muted-foreground">
                      Based on current trends, this area is expected to see a 7% increase in {answers.householdType || "your preferred demographic"} over the next 5 years.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="housing" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Housing Overview</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentAreaData.name} offers a range of housing options that align with your preferences for {answers.buildingAge || "various building types"}. The average home price in this area is approximately ${selectedArea === "downtown" ? "650,000" : selectedArea === "westside" ? "550,000" : selectedArea === "eastside" ? "480,000" : "420,000"}.
                  </p>
                  
                  <h5 className="text-sm font-medium mb-2">Property Types</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Apartments</span>
                        <span>{selectedArea === "downtown" ? "68%" : selectedArea === "westside" ? "45%" : selectedArea === "eastside" ? "38%" : "20%"}</span>
                      </div>
                      <Progress value={selectedArea === "downtown" ? 68 : selectedArea === "westside" ? 45 : selectedArea === "eastside" ? 38 : 20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Townhouses</span>
                        <span>{selectedArea === "downtown" ? "20%" : selectedArea === "westside" ? "30%" : selectedArea === "eastside" ? "37%" : "25%"}</span>
                      </div>
                      <Progress value={selectedArea === "downtown" ? 20 : selectedArea === "westside" ? 30 : selectedArea === "eastside" ? 37 : 25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Single-Family Homes</span>
                        <span>{selectedArea === "downtown" ? "12%" : selectedArea === "westside" ? "25%" : selectedArea === "eastside" ? "25%" : "55%"}</span>
                      </div>
                      <Progress value={selectedArea === "downtown" ? 12 : selectedArea === "westside" ? 25 : selectedArea === "eastside" ? 25 : 55} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Market Trends</h4>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between mb-1">
                        <h5 className="text-sm font-medium">Price Trend (Last 5 Years)</h5>
                        <span className="text-xs text-green-600 font-medium">
                          +{selectedArea === "downtown" ? "18%" : selectedArea === "westside" ? "22%" : selectedArea === "eastside" ? "26%" : "14%"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedArea === "downtown" ? "Steady growth with recent stabilization" : selectedArea === "westside" ? "Strong consistent growth" : selectedArea === "eastside" ? "Rapid appreciation as area develops" : "Moderate, stable growth"}
                      </p>
                    </div>
                    
                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between mb-1">
                        <h5 className="text-sm font-medium">Avg. Days on Market</h5>
                        <span className="text-xs font-medium">
                          {selectedArea === "downtown" ? "24 days" : selectedArea === "westside" ? "18 days" : selectedArea === "eastside" ? "28 days" : "32 days"}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedArea === "downtown" ? "Quick turnover for well-priced units" : selectedArea === "westside" ? "Very competitive market" : selectedArea === "eastside" ? "Becoming more competitive" : "Less competitive than urban areas"}
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h5 className="text-sm font-medium mb-1">Value Retention</h5>
                      <p className="text-xs text-muted-foreground">
                        Properties in this area have historically maintained their value well during market downturns, with {selectedArea === "downtown" ? "excellent" : selectedArea === "westside" ? "very good" : selectedArea === "eastside" ? "good" : "moderate"} appreciation during upswings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="development" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Development Projects</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {currentAreaData.name} has {selectedArea === "downtown" ? "significant" : selectedArea === "westside" ? "moderate" : selectedArea === "eastside" ? "substantial" : "limited"} development activity. This aligns with your preference for areas with {answers.development || "balanced development"}.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border">
                      <h5 className="text-sm font-medium mb-1">Major Projects</h5>
                      <ul className="text-xs space-y-2">
                        {selectedArea === "downtown" ? (
                          <>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Central Transit Hub Expansion (2025-2027)</span>
                            </li>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Riverfront Mixed-Use Development (2024-2026)</span>
                            </li>
                          </>
                        ) : selectedArea === "westside" ? (
                          <>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Westside Commons Park Expansion (2024-2025)</span>
                            </li>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"
