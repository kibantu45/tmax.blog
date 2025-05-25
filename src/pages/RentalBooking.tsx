
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Bed, Bath, Wifi, Car, Home, Users } from "lucide-react";

const RentalBooking = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const accommodations = [
    {
      id: 1,
      title: "Modern Studio Apartment",
      price: 450,
      location: "Campus West",
      type: "studio",
      bedrooms: 0,
      bathrooms: 1,
      amenities: ["WiFi", "Parking", "Laundry"],
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      available: true
    },
    {
      id: 2,
      title: "Shared 2-Bedroom House",
      price: 300,
      location: "Campus East",
      type: "shared",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["WiFi", "Garden", "Parking"],
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      available: true
    },
    {
      id: 3,
      title: "Private 1-Bedroom Flat",
      price: 550,
      location: "City Center",
      type: "private",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Gym", "Security"],
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      available: false
    }
  ];

  const filteredAccommodations = selectedFilter === "all" 
    ? accommodations 
    : accommodations.filter(acc => acc.type === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <Home className="text-white font-bold text-lg w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Tmax Housing
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tmaxGreen-600 via-pastelYellow to-tmaxGreen-600 bg-clip-text text-transparent">
            Student Accommodation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect home away from home. Browse verified student accommodations near campus.
          </p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 border border-tmaxGreen-200">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("all")}
            >
              All Types
            </TabsTrigger>
            <TabsTrigger 
              value="studio" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("studio")}
            >
              Studios
            </TabsTrigger>
            <TabsTrigger 
              value="shared" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("shared")}
            >
              Shared
            </TabsTrigger>
            <TabsTrigger 
              value="private" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("private")}
            >
              Private
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group">
              <div className="relative">
                <img 
                  src={accommodation.image} 
                  alt={accommodation.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-2 right-2 ${
                  accommodation.available ? 'bg-tmaxGreen-500' : 'bg-red-500'
                } text-white`}>
                  {accommodation.available ? 'Available' : 'Occupied'}
                </Badge>
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md">
                  <span className="text-lg font-bold text-tmaxGreen-600">£{accommodation.price}</span>
                  <span className="text-sm text-gray-600">/month</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {accommodation.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{accommodation.location}</span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center text-gray-600">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{accommodation.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{accommodation.bathrooms} bath</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {accommodation.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
                  disabled={!accommodation.available}
                >
                  {accommodation.available ? 'Book Now' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalBooking;
