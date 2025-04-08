
import { useState, useEffect } from "react";
import WelcomeModal from "@/components/WelcomeModal";
import ChatbotInterface from "@/components/ChatbotInterface";
import FloatingChatButton from "@/components/FloatingChatButton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Home, Users, Building2, Train, Laptop } from "lucide-react";

const Index = () => {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  
  // Show welcome modal on first page load
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    if (hasSeenWelcome) {
      setShowWelcomeModal(false);
    }
  }, []);
  
  const handleStartChat = () => {
    localStorage.setItem("hasSeenWelcome", "true");
    setShowWelcomeModal(false);
    setShowChatbot(true);
  };
  
  const toggleChatbot = () => {
    setShowChatbot(prevState => !prevState);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-blue-50 p-4 flex flex-col items-center">
      <header className="w-full max-w-6xl mt-12 mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Home Whisperer</h1>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
          Welcome to our platform where we help you make informed decisions about your 
          next home purchase using the latest data and insights.
        </p>
      </header>
      
      {/* Welcome Modal */}
      {showWelcomeModal && <WelcomeModal onStart={handleStartChat} />}
      
      {/* Main Content */}
      <div className="max-w-6xl w-full mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="overflow-hidden border-2 border-blue-200 shadow-md">
            <div className="h-40 bg-blue-100 flex items-center justify-center">
              <div className="text-5xl">🏡</div>
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Home className="mr-2 h-5 w-5 text-blue-600" />
                Find Your Dream Home
              </h2>
              <p className="text-muted-foreground">
                Our AI assistant analyzes thousands of properties to match your unique preferences and budget.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-2 border-green-200 shadow-md">
            <div className="h-40 bg-green-100 flex items-center justify-center">
              <div className="text-5xl">📊</div>
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Data-Driven Decisions
              </h2>
              <p className="text-muted-foreground">
                Make confident choices with demographic trends, future development plans, and transport forecasts.
              </p>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-2 border-purple-200 shadow-md">
            <div className="h-40 bg-purple-100 flex items-center justify-center">
              <div className="text-5xl">🚀</div>
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 flex items-center">
                <Laptop className="mr-2 h-5 w-5 text-purple-600" />
                Future-Ready Living
              </h2>
              <p className="text-muted-foreground">
                Discover homes with smart technology and infrastructure built for tomorrow's innovations.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-indigo-100">
            <CardTitle className="text-2xl text-center">How It Works</CardTitle>
            <CardDescription className="text-center">
              Our AI assistant guides you through a personalized home-buying journey
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">1</div>
                <h3 className="font-medium mb-2">Share Preferences</h3>
                <p className="text-sm text-muted-foreground">Tell us about your ideal home and neighborhood</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">2</div>
                <h3 className="font-medium mb-2">Explore Demographics</h3>
                <p className="text-sm text-muted-foreground">Understand who lives there now and in the future</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">3</div>
                <h3 className="font-medium mb-2">View Development</h3>
                <p className="text-sm text-muted-foreground">Learn about upcoming construction and amenities</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">4</div>
                <h3 className="font-medium mb-2">Check Transportation</h3>
                <p className="text-sm text-muted-foreground">Compare current and future mobility options</p>
              </div>
              
              <div className="p-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-3">5</div>
                <h3 className="font-medium mb-2">Get Recommendations</h3>
                <p className="text-sm text-muted-foreground">Receive personalized property suggestions</p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="font-medium mb-4">Ready to start your home-buying journey?</p>
              <Button 
                onClick={toggleChatbot}
                className="px-6 py-6 text-lg rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Open Home Buying Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chatbot Interface */}
      {showChatbot && <ChatbotInterface onClose={toggleChatbot} />}
      
      {/* Floating Chat Button */}
      {!showChatbot && <FloatingChatButton onClick={toggleChatbot} />}
    </div>
  );
};

export default Index;
