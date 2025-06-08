
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, MessageCircle, User, MapPin, DollarSign, Calendar } from "lucide-react";

const RoommateFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const availableRoommates = [
    {
      id: "rm1",
      name: "Boogie.",
      age: false,
      course: false ,
      year: "any year",
      budget: "2bedroom 18000",
      location: "Hongera",
      preferences: ["male roommate"],
      contact: "+254792823310",
      description: " urgently Looking for a responsible roommate to share a 2-bedroom."
    },
    {
      id: "rm2",
      name: "boogie.",
      age: false,
      course: "Business",
      year: "Any",
      budget: "onebedroom-8000",
      location: "lights",
      preferences: ["Male"],
      contact: "+254792823310",
      description: "urgent male roommate needed."
    },
    {
      id: "rm3",
      name: "boogie",
      age: false,
      course: "Business",
      year: "3rd Year",
      budget: "one bedroom-12000",
      location: "sparki-lights",
      preferences: ["male"],
      contact: "+254792823310",
      description: "Male roommates needed."
    }
  ];

  const roomRequests = [
    {
      id: "req1",
      title: "2-Bedroom Apartment Near Campus",
      budget: "20000-25000",
      location: "Within 2km of campus",
      moveIn: "January 2025",
      requirements: ["Furnished", "WiFi included", "Security"],
      postedBy: "Alex K.",
      contact: "+254701234570"
    },
    {
      id: "req2",
      title: "Single Room in Shared House",
      budget: "8000-12000",
      location: "Walking distance to campus",
      moveIn: "February 2025",
      requirements: ["Shared kitchen", "Parking space", "Laundry"],
      postedBy: "Maria S.",
      contact: "+254701234571"
    }
  ];

  const tips = [
    {
      title: "Safety First",
      description: "Always meet potential roommates in public places and verify their student status.",
      icon: "🛡️"
    },
    {
      title: "Set Clear Expectations",
      description: "Discuss cleaning schedules, guest policies, and shared expenses upfront.",
      icon: "📋"
    },
    {
      title: "Check References",
      description: "Ask for references from previous roommates or landlords when possible.",
      icon: "✅"
    },
    {
      title: "Legal Protection",
      description: "Ensure all agreements are documented and understand your rights as a tenant.",
      icon: "⚖️"
    }
  ];

  const handleContactRoommate = (name: string, contact: string) => {
    const message = `Hi ${name}, I saw your roommate listing on Tmax and I'm interested in connecting. Can we discuss the details?`;
    window.open(`https://wa.me/${contact.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredRoommates = availableRoommates.filter(roommate =>
    roommate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roommate.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    roommate.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-tmaxGreen-700">Roommate Finder</h1>
              <p className="text-gray-600 mt-2">Find your perfect roommate and housing solution</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search by name, course, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/90"
            />
          </div>
        </div>

        <Tabs defaultValue="find-roommate" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="find-roommate" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Find Roommate
            </TabsTrigger>
            <TabsTrigger value="room-requests" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Room Requests
            </TabsTrigger>
            <TabsTrigger value="post-listing" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Post Listing
            </TabsTrigger>
            <TabsTrigger value="tips" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Safety Tips
            </TabsTrigger>
          </TabsList>

          <TabsContent value="find-roommate" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoommates.map((roommate) => (
                <Card key={roommate.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-tmaxGreen-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-tmaxGreen-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{roommate.name}</CardTitle>
                        <CardDescription>{roommate.course} - {roommate.year}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{roommate.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {roommate.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      KSh {roommate.budget}/month
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {roommate.preferences.map((pref, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                      onClick={() => handleContactRoommate(roommate.name, roommate.contact)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contact via WhatsApp
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="room-requests" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {roomRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">{request.title}</CardTitle>
                    <CardDescription>Posted by {request.postedBy}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      KSh {request.budget}/month
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {request.location}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Move-in: {request.moveIn}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {request.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                      onClick={() => window.open(`https://wa.me/${request.contact.replace('+', '')}?text=Hi, I saw your room request on Tmax and I might have something that fits your needs.`, '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Respond to Request
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="post-listing" className="space-y-6">
            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle>Post Your Roommate Listing</CardTitle>
                <CardDescription>Let others know you're looking for a roommate or have space available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Your name" />
                  <Input placeholder="Course/Year" />
                  <Input placeholder="Budget range (KSh)" />
                  <Input placeholder="Preferred location" />
                </div>
                <Input placeholder="Brief description of what you're looking for" />
                <Input placeholder="Your WhatsApp number" />
                <Button 
                  className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                  onClick={() => window.open('https://wa.me/254702752033?text=Hi, I would like to post a roommate listing on Tmax. Please help me with the process.', '_blank')}
                >
                  Submit Listing
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{tip.icon}</span>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{tip.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Need Help?</h3>
                <p className="text-yellow-700 mb-4">
                  Our team is here to help you find the perfect roommate safely. Contact us if you have any concerns or need assistance.
                </p>
                <Button 
                  className="bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need help with roommate finding on Tmax.', '_blank')}
                >
                  Get Help
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoommateFinder;
