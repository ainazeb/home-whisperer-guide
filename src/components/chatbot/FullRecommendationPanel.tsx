
import React, { useState } from "react";
import { ChevronLeft, MapPin, Home, Users, Building2, Train, Laptop } from "lucide-react";
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
}

const FullRecommendationPanel: React.FC<FullRecommendationPanelProps> = ({ answers, onBack }) => {
  const [selectedArea, setSelectedArea] = useState<string>("westside");
  
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
  
  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
  };
  
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
      
      {/* Top Recommendation */}
      <Card className="overflow-hidden border-2 border-blue-200 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-blue-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Top Recommendation</h3>
            <Badge className="bg-blue-600">{areaDetails[selectedArea as keyof typeof areaDetails].recommendationScore}% Match</Badge>
          </div>
        </div>
        <CardContent className="p-0">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={areaDetails[selectedArea as keyof typeof areaDetails].imageUrl} 
                alt={areaDetails[selectedArea as keyof typeof areaDetails].name} 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2">
              <div className="flex items-center mb-3">
                <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                <h4 className="text-xl font-medium">{areaDetails[selectedArea as keyof typeof areaDetails].name}</h4>
              </div>
              <p className="text-muted-foreground mb-4">
                {areaDetails[selectedArea as keyof typeof areaDetails].description}
              </p>
              <h5 className="font-medium mb-2">Key Points:</h5>
              <ul className="space-y-1 mb-4">
                {areaDetails[selectedArea as keyof typeof areaDetails].keyPoints.map((point, index) => (
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
                    {areaDetails[selectedArea as keyof typeof areaDetails].name} has a diverse population that closely aligns with your preference for {answers.householdType || "various household types"}. The area has seen a steady growth in the demographic groups you prefer.
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
                    {areaDetails[selectedArea as keyof typeof areaDetails].name} offers a range of housing options that align with your preferences for {answers.buildingAge || "various building types"}. The average home price in this area is approximately ${selectedArea === "downtown" ? "650,000" : selectedArea === "westside" ? "550,000" : selectedArea === "eastside" ? "480,000" : "420,000"}.
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
                    {areaDetails[selectedArea as keyof typeof areaDetails].name} has {selectedArea === "downtown" ? "significant" : selectedArea === "westside" ? "moderate" : selectedArea === "eastside" ? "substantial" : "limited"} development activity. This aligns with your preference for areas with {answers.development || "balanced development"}.
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
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Neighborhood Retail Hub (2025)</span>
                            </li>
                          </>
                        ) : selectedArea === "eastside" ? (
                          <>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Eastside Arts District Revitalization (2024-2026)</span>
                            </li>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>New Community Center & Library (2025)</span>
                            </li>
                          </>
                        ) : (
                          <>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Expanded Shopping Center (2025)</span>
                            </li>
                            <li className="flex items-start">
                              <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>Community Sports Complex (2026)</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div className="p-3 rounded-lg border">
                      <h5 className="text-sm font-medium mb-1">Construction Activity</h5>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs">Low</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full" 
                            style={{ 
                              width: 
                                selectedArea === "downtown" 
                                  ? "85%" 
                                  : selectedArea === "westside" 
                                    ? "50%" 
                                    : selectedArea === "eastside" 
                                      ? "70%" 
                                      : "30%" 
                            }} 
                          />
                        </div>
                        <span className="text-xs">High</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {selectedArea === "downtown" 
                          ? "High construction activity in several zones" 
                          : selectedArea === "westside" 
                            ? "Moderate, well-managed construction" 
                            : selectedArea === "eastside" 
                              ? "Growing construction activity as area develops" 
                              : "Minimal construction noise and disruption"
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Green Spaces & Amenities</h4>
                  
                  <div className="p-3 rounded-lg border mb-3">
                    <h5 className="text-sm font-medium mb-1">Parks & Recreation</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      {selectedArea === "downtown" 
                        ? "Urban pocket parks and waterfront access" 
                        : selectedArea === "westside" 
                          ? "Excellent network of parks and green corridors" 
                          : selectedArea === "eastside" 
                            ? "Several large parks and river trails" 
                            : "Extensive green spaces and nature preserves"
                      }
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs">Access</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full" 
                          style={{ 
                            width: 
                              selectedArea === "downtown" 
                                ? "70%" 
                                : selectedArea === "westside" 
                                  ? "90%" 
                                  : selectedArea === "eastside" 
                                    ? "75%" 
                                    : "85%" 
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 rounded-lg border mb-3">
                    <h5 className="text-sm font-medium mb-1">Local Amenities</h5>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {["restaurants", "shopping", "education", "healthcare", "fitness", "entertainment"].map(amenity => (
                        <div key={amenity} className="flex items-center text-xs">
                          <div 
                            className={`h-2 w-2 rounded-full mr-1 ${
                              (selectedArea === "downtown" && (amenity === "restaurants" || amenity === "shopping" || amenity === "entertainment")) ||
                              (selectedArea === "westside" && (amenity === "restaurants" || amenity === "education" || amenity === "fitness")) ||
                              (selectedArea === "eastside" && (amenity === "shopping" || amenity === "entertainment")) ||
                              (selectedArea === "suburbs" && (amenity === "education" || amenity === "healthcare"))
                                ? "bg-green-500" 
                                : "bg-blue-300"
                            }`} 
                          />
                          <span className="capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-2" />
                    <p className="text-xs text-muted-foreground">
                      {selectedArea === "downtown" 
                        ? "Excellent dining and nightlife options" 
                        : selectedArea === "westside" 
                          ? "Great balance of all amenities" 
                          : selectedArea === "eastside" 
                            ? "Growing number of shops and restaurants" 
                            : "Good basic amenities with fewer specialty options"
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h5 className="text-sm font-medium mb-1">Future Plans</h5>
                    <p className="text-xs text-muted-foreground">
                      {selectedArea === "downtown" 
                        ? "Major investment in waterfront parks and public plazas planned over next 5 years" 
                        : selectedArea === "westside" 
                          ? "Expanding green corridor network and adding community gardens" 
                          : selectedArea === "eastside" 
                            ? "New cultural center and expanded riverfront access in development" 
                            : "Preserving natural areas while adding recreational facilities"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="transportation" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Transportation Options</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {areaDetails[selectedArea as keyof typeof areaDetails].name} offers {selectedArea === "downtown" ? "excellent" : selectedArea === "westside" ? "very good" : selectedArea === "eastside" ? "good" : "fair"} transportation options that align with your preferences for {answers.transportTypes?.join(", ") || "various transportation methods"}.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border">
                      <h5 className="text-sm font-medium mb-2">Transit Modes</h5>
                      <div className="grid grid-cols-2 gap-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Public Transit</span>
                            <span>{selectedArea === "downtown" ? "95%" : selectedArea === "westside" ? "80%" : selectedArea === "eastside" ? "70%" : "45%"}</span>
                          </div>
                          <Progress value={selectedArea === "downtown" ? 95 : selectedArea === "westside" ? 80 : selectedArea === "eastside" ? 70 : 45} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Cycling</span>
                            <span>{selectedArea === "downtown" ? "85%" : selectedArea === "westside" ? "90%" : selectedArea === "eastside" ? "70%" : "60%"}</span>
                          </div>
                          <Progress value={selectedArea === "downtown" ? 85 : selectedArea === "westside" ? 90 : selectedArea === "eastside" ? 70 : 60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Walking</span>
                            <span>{selectedArea === "downtown" ? "98%" : selectedArea === "westside" ? "85%" : selectedArea === "eastside" ? "75%" : "50%"}</span>
                          </div>
                          <Progress value={selectedArea === "downtown" ? 98 : selectedArea === "westside" ? 85 : selectedArea === "eastside" ? 75 : 50} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Car-friendly</span>
                            <span>{selectedArea === "downtown" ? "60%" : selectedArea === "westside" ? "75%" : selectedArea === "eastside" ? "85%" : "95%"}</span>
                          </div>
                          <Progress value={selectedArea === "downtown" ? 60 : selectedArea === "westside" ? 75 : selectedArea === "eastside" ? 85 : 95} className="h-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border">
                      <h5 className="text-sm font-medium mb-1">Commute Times</h5>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span>To Downtown</span>
                          <span>
                            {selectedArea === "downtown" 
                              ? "0-10 min" 
                              : selectedArea === "westside" 
                                ? "15-25 min" 
                                : selectedArea === "eastside" 
                                  ? "20-30 min" 
                                  : "30-45 min"
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>To Major Employment Centers</span>
                          <span>
                            {selectedArea === "downtown" 
                              ? "5-15 min" 
                              : selectedArea === "westside" 
                                ? "10-20 min" 
                                : selectedArea === "eastside" 
                                  ? "15-25 min" 
                                  : "25-40 min"
                            }
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>To Airport</span>
                          <span>
                            {selectedArea === "downtown" 
                              ? "20-30 min" 
                              : selectedArea === "westside" 
                                ? "25-35 min" 
                                : selectedArea === "eastside" 
                                  ? "15-25 min" 
                                  : "30-45 min"
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Future Transportation</h4>
                  
                  <div className="p-3 rounded-lg border mb-3">
                    <h5 className="text-sm font-medium mb-1">Planned Improvements</h5>
                    <ul className="text-xs space-y-2 mb-3">
                      {selectedArea === "downtown" ? (
                        <>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>New subway line extension (2026)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>Pedestrian-only zones expansion (2025)</span>
                          </li>
                        </>
                      ) : selectedArea === "westside" ? (
                        <>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>Protected bike lane network completion (2025)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>Express bus service expansion (2024)</span>
                          </li>
                        </>
                      ) : selectedArea === "eastside" ? (
                        <>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>Light rail extension (2027)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>New highway interchange (2026)</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>Bus rapid transit corridor (2026)</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                            <span>Road widening project (2025)</span>
                          </li>
                        </>
                      )}
                    </ul>
                    <Separator className="my-2" />
                    <p className="text-xs text-muted-foreground">
                      {selectedArea === "downtown" 
                        ? "Significant investment in transit and pedestrian infrastructure" 
                        : selectedArea === "westside" 
                          ? "Focus on active transportation and transit connections" 
                          : selectedArea === "eastside" 
                            ? "Major transit expansion and road improvements" 
                            : "Road improvements with some transit expansion"
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h5 className="text-sm font-medium mb-1">Impact Analysis</h5>
                    <p className="text-xs text-muted-foreground">
                      {selectedArea === "downtown" 
                        ? "Future transportation projects will further reduce the need for car ownership and improve access to surrounding areas." 
                        : selectedArea === "westside" 
                          ? "Planned improvements will enhance the already strong multimodal transportation options in this area." 
                          : selectedArea === "eastside" 
                            ? "Current transportation limitations will be significantly improved by planned projects over the next 3-5 years." 
                            : "While remaining car-dependent, planned improvements will provide more options for commuters."
                      }
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technology" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Technology Infrastructure</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {areaDetails[selectedArea as keyof typeof areaDetails].name} offers {selectedArea === "downtown" ? "cutting-edge" : selectedArea === "westside" ? "excellent" : selectedArea === "eastside" ? "good" : "basic"} technology infrastructure that aligns with your interest in {answers.smartFeatures?.join(", ") || "smart home features"}.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg border">
                      <h5 className="text-sm font-medium mb-2">Internet Connectivity</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Fiber Coverage</span>
                            <span>{selectedArea === "downtown" ? "95%" : selectedArea === "westside" ? "90%" : selectedArea === "eastside" ? "75%" : "60%"}</span>
                          </div>
                          <Progress value={selectedArea === "downtown" ? 95 : selectedArea === "westside" ? 90 : selectedArea === "eastside" ? 75 : 60} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>5G Coverage</span>
                            <span>{selectedArea === "downtown" ? "100%" : selectedArea === "westside" ? "95%" : selectedArea === "eastside" ? "85%" : "70%"}</span>
                          </div>
                          <Progress value={selectedArea === "downtown" ? 100 : selectedArea === "westside" ? 95 : selectedArea === "eastside" ? 85 : 70} className="h-2" />
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Average internet speeds: {selectedArea === "downtown" ? "1.5 Gbps" : selectedArea === "westside" ? "1 Gbps" : selectedArea === "eastside" ? "900 Mbps" : "650 Mbps"}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 rounded-lg border">
                      <h5 className="text-sm font-medium mb-1">Smart City Initiatives</h5>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {["smart-traffic", "smart-lighting", "public-wifi", "ev-charging", "waste-management", "safety-monitoring"].map(feature => (
                          <div key={feature} className="flex items-center text-xs">
                            <div 
                              className={`h-2 w-2 rounded-full mr-1 ${
                                (selectedArea === "downtown" && (feature === "smart-traffic" || feature === "smart-lighting" || feature === "public-wifi" || feature === "ev-charging" || feature === "safety-monitoring")) ||
                                (selectedArea === "westside" && (feature === "smart-lighting" || feature === "public-wifi" || feature === "ev-charging" || feature === "waste-management")) ||
                                (selectedArea === "eastside" && (feature === "public-wifi" || feature === "ev-charging" || feature === "waste-management")) ||
                                (selectedArea === "suburbs" && (feature === "waste-management"))
                                  ? "bg-green-500" 
                                  : "bg-gray-300"
                              }`} 
                            />
                            <span className="capitalize">{feature.replace(/-/g, " ")}</span>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-2" />
                      <p className="text-xs text-muted-foreground">
                        {selectedArea === "downtown" 
                          ? "Comprehensive smart city initiatives with ongoing innovation programs" 
                          : selectedArea === "westside" 
                            ? "Strong smart city features with active expansion programs" 
                            : selectedArea === "eastside" 
                              ? "Growing smart city implementation with several new initiatives" 
                              : "Basic smart city features with limited coverage"
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Smart Home Readiness</h4>
                  
                  <div className="p-3 rounded-lg border mb-3">
                    <h5 className="text-sm font-medium mb-1">New Construction Features</h5>
                    <ul className="text-xs space-y-2 mb-3">
                      <li className="flex items-start">
                        <div 
                          className={`mr-2 mt-1 h-1.5 w-1.5 rounded-full ${selectedArea === "suburbs" ? "bg-gray-300" : "bg-blue-600"} shrink-0`} 
                        />
                        <span>Smart climate control pre-wiring</span>
                      </li>
                      <li className="flex items-start">
                        <div 
                          className={`mr-2 mt-1 h-1.5 w-1.5 rounded-full ${selectedArea === "suburbs" || selectedArea === "eastside" ? "bg-gray-300" : "bg-blue-600"} shrink-0`} 
                        />
                        <span>Integrated security systems</span>
                      </li>
                      <li className="flex items-start">
                        <div 
                          className={`mr-2 mt-1 h-1.5 w-1.5 rounded-full ${selectedArea === "downtown" ? "bg-blue-600" : "bg-gray-300"} shrink-0`} 
                        />
                        <span>Building-wide automation systems</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" />
                        <span>High-speed internet infrastructure</span>
                      </li>
                    </ul>
                    <Separator className="my-2" />
                    <p className="text-xs text-muted-foreground">
                      {selectedArea === "downtown" 
                        ? "New buildings incorporate extensive smart technology by default" 
                        : selectedArea === "westside" 
                          ? "Most new construction includes significant smart home features" 
                          : selectedArea === "eastside" 
                            ? "Growing trend of smart features in new construction" 
                            : "Basic smart home preparation in newer communities"
                      }
                    </p>
                  </div>
                  
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h5 className="text-sm font-medium mb-1">Future Technology Outlook</h5>
                    <p className="text-xs text-muted-foreground">
                      {selectedArea === "downtown" 
                        ? "This area is at the forefront of smart city and home technology adoption, with multiple pilot programs for emerging technologies." 
                        : selectedArea === "westside" 
                          ? "Strong investment in technology infrastructure makes this area well-positioned for future smart home innovations." 
                          : selectedArea === "eastside" 
                            ? "Rapidly improving technology infrastructure with significant planned investments." 
                            : "Gradual technology improvements with some limitations in more remote areas."
                      }
                    </p>
                  </div>
                  
                  <div className="mt-3 p-3 rounded-lg border">
                    <h5 className="text-sm font-medium mb-1">Technology Alignment</h5>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs">Match with your preferences</span>
                      <span className="text-xs font-medium">
                        {selectedArea === "downtown" 
                          ? "92%" 
                          : selectedArea === "westside" 
                            ? "88%" 
                            : selectedArea === "eastside" 
                              ? "73%" 
                              : "65%"
                        }
                      </span>
                    </div>
                    <Progress 
                      value={
                        selectedArea === "downtown" 
                          ? 92
                          : selectedArea === "westside" 
                            ? 88
                            : selectedArea === "eastside" 
                              ? 73
                              : 65
                      } 
                      className="h-2" 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Final Recommendation */}
      <Card className="border-2 border-indigo-200">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-center mb-4">Your Personalized Story</h3>
          
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 mb-6">
            <p className="italic text-muted-foreground">
              Based on your preferences across all categories, we've crafted this personalized home-buying journey for you:
            </p>
            
            <div className="mt-4 space-y-4">
              <p>
                Imagine waking up in your new home in {areaDetails[selectedArea as keyof typeof areaDetails].name}, where your preferences for {answers.householdType || "your ideal neighborhood demographics"} and {answers.amenities?.join(", ") || "local amenities"} are perfectly matched.
              </p>
              
              <p>
                Your commute to work takes just {selectedArea === "downtown" ? "10" : selectedArea === "westside" ? "20" : selectedArea === "eastside" ? "25" : "35"} minutes using your preferred {answers.transportTypes ? answers.transportTypes[0] : "transportation"} option, and you have easy access to {selectedArea === "downtown" ? "countless restaurants and shops" : selectedArea === "westside" ? "excellent parks and recreational facilities" : selectedArea === "eastside" ? "a growing arts scene and local markets" : "spacious homes and good schools"}.
              </p>
              
              <p>
                In the evenings, you can enjoy the {selectedArea === "downtown" ? "vibrant city atmosphere" : selectedArea === "westside" ? "peaceful parks and trails" : selectedArea === "eastside" ? "emerging restaurant scene" : "quiet suburban setting"}, and your home is equipped with the smart features you value most, including {answers.smartFeatures?.join(", ") || "modern technology amenities"}.
              </p>
              
              <p>
                With {selectedArea === "downtown" ? "substantial" : selectedArea === "westside" ? "thoughtful" : selectedArea === "eastside" ? "promising" : "steady"} development planned for the future, your property investment is well-positioned to grow in value while maintaining the lifestyle elements that matter most to you.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={onBack}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              Return to Results
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FullRecommendationPanel;
