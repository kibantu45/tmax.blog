
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shirt, Clock, Star, Phone, MapPin, ShoppingCart, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNavigation from "@/components/BottomNavigation";

const LaundryServices = () => {
  const { addToCart } = useCart();
  
  const laundryProviders = [
    {
      id: 1,
      name: "QuickWash Laundry",
      rating: 4.8,
      location: "Campus Center",
      whatsapp: "+254702752033",
      services: [
        { id: "laundry1", name: "Washing & Ironing", price: 200, image: "👔", description: "Complete wash and iron service" },
        { id: "laundry2", name: "Dry Cleaning", price: 300, image: "🧥", description: "Professional dry cleaning" },
        { id: "laundry3", name: "Express Service", price: 350, image: "⚡", description: "Same day service" },
        { id: "laundry4", name: "Bulk Washing", price: 150, image: "👕", description: "Per kg bulk washing" }
      ]
    },
    {
      id: 2,
      name: "Fresh Clean",
      rating: 4.6,
      location: "Near Hostels",
      whatsapp: "+254702752034",
      services: [
        { id: "laundry5", name: "Student Package", price: 400, image: "🎒", description: "Weekly laundry package" },
        { id: "laundry6", name: "Bedding Service", price: 250, image: "🛏️", description: "Sheets and pillowcases" },
        { id: "laundry7", name: "Shoe Cleaning", price: 100, image: "👟", description: "Shoe wash and polish" },
        { id: "laundry8", name: "Curtain Cleaning", price: 200, image: "🪟", description: "Curtain wash service" }
      ]
    },
    {
      id: 3,
      name: "Campus Cleaners",
      rating: 4.7,
      location: "Main Gate",
      whatsapp: "+254702752035",
      services: [
        { id: "laundry9", name: "Pickup & Delivery", price: 500, image: "🚚", description: "Door to door service" },
        { id: "laundry10", name: "Delicate Items", price: 180, image: "🧺", description: "Special care for delicates" },
        { id: "laundry11", name: "Stain Removal", price: 120, image: "🧽", description: "Tough stain treatment" },
        { id: "laundry12", name: "Fabric Softening", price: 80, image: "🌸", description: "Fabric softener service" }
      ]
    }
  ];

  const handleAddToCart = (service: any, provider: any) => {
    addToCart({
      id: `${service.id}_${provider.id}`,
      name: `${service.name}`,
      price: service.price,
      image: service.image,
      category: "Laundry Services",
      provider: provider.name
    });
  };

  const handleBookNow = (provider: any, service: any) => {
    const message = `Hi ${provider.name}! I'd like to book: ${service.name} - KES ${service.price}. Please confirm availability.`;
    const whatsappUrl = `https://wa.me/${provider.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-20">
      {/* Header with glassmorphism */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center animate-float">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent animate-fade-in">
                Laundry Services
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/cart"}
                className="glass hover:scale-105 transition-all duration-300"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 hover:scale-105 transition-all duration-300"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Professional Laundry Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Keep your clothes fresh and clean with our reliable campus laundry services
          </p>
        </div>

        <div className="space-y-8">
          {laundryProviders.map((provider, providerIndex) => (
            <Card key={provider.id} className="glass backdrop-blur-lg bg-white/30 border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in" style={{animationDelay: `${providerIndex * 200}ms`}}>
              <CardHeader className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 glass">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-blue-800">{provider.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center animate-glow">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{provider.location}</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBookNow(provider, null)}
                    className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {provider.services.map((service, serviceIndex) => (
                    <Card key={service.id} className="glass bg-white/20 hover:bg-white/40 border-white/20 hover:shadow-md transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: `${(providerIndex * 4 + serviceIndex) * 100}ms`}}>
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3 animate-float" style={{animationDelay: `${serviceIndex * 200}ms`}}>{service.image}</div>
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="text-xl font-bold text-blue-600 mb-4 animate-pulse">KES {service.price}</div>
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300"
                            onClick={() => handleAddToCart(service, provider)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full glass hover:scale-105 transition-all duration-300"
                            onClick={() => handleBookNow(provider, service)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Book Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default LaundryServices;
