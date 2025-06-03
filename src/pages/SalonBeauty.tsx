
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scissors, Clock, Star, Phone, MapPin, ShoppingCart, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const SalonBeauty = () => {
  const { addToCart } = useCart();
  
  const beautyProviders = [
    {
      id: 1,
      name: "Glamour Beauty Salon",
      rating: 4.9,
      location: "Campus Center",
      whatsapp: "+254702752033",
      services: [
        { id: "beauty1", name: "Hair Cut & Styling", price: 500, image: "💇‍♀️", description: "Professional hair cutting and styling" },
        { id: "beauty2", name: "Manicure & Pedicure", price: 800, image: "💅", description: "Complete nail care service" },
        { id: "beauty3", name: "Facial Treatment", price: 1200, image: "🧴", description: "Deep cleansing facial treatment" },
        { id: "beauty4", name: "Hair Braiding", price: 1500, image: "💁‍♀️", description: "Professional hair braiding styles" }
      ]
    },
    {
      id: 2,
      name: "Gents Barber Shop",
      rating: 4.7,
      location: "Near Hostels",
      whatsapp: "+254702752034",
      services: [
        { id: "beauty5", name: "Classic Haircut", price: 200, image: "✂️", description: "Traditional men's haircut" },
        { id: "beauty6", name: "Beard Trimming", price: 150, image: "🧔", description: "Professional beard grooming" },
        { id: "beauty7", name: "Shave & Trim", price: 300, image: "🪒", description: "Complete shaving service" },
        { id: "beauty8", name: "Hair Wash", price: 100, image: "🧴", description: "Hair washing and conditioning" }
      ]
    },
    {
      id: 3,
      name: "Beauty Express",
      rating: 4.8,
      location: "Student Center",
      whatsapp: "+254702752035",
      services: [
        { id: "beauty9", name: "Eyebrow Threading", price: 200, image: "👁️", description: "Precise eyebrow shaping" },
        { id: "beauty10", name: "Makeup Application", price: 1000, image: "💄", description: "Professional makeup for events" },
        { id: "beauty11", name: "Hair Relaxing", price: 800, image: "🌀", description: "Chemical hair relaxing treatment" },
        { id: "beauty12", name: "Lash Extensions", price: 1500, image: "👁️‍🗨️", description: "Semi-permanent lash extensions" }
      ]
    }
  ];

  const handleAddToCart = (service: any, provider: any) => {
    addToCart({
      id: `${service.id}_${provider.id}`,
      name: `${service.name}`,
      price: service.price,
      image: service.image,
      category: "Beauty Services",
      provider: provider.name
    });
  };

  const handleBookNow = (provider: any, service: any) => {
    const message = `Hi ${provider.name}! I'd like to book: ${service.name} - KES ${service.price}. Please confirm availability.`;
    const whatsappUrl = `https://wa.me/${provider.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Salon & Beauty
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/cart"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
              <Button 
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Beauty & Grooming Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional beauty and grooming services right on campus
          </p>
        </div>

        <div className="space-y-8">
          {beautyProviders.map((provider) => (
            <Card key={provider.id} className="border-pink-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-pink-800">{provider.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
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
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Salon
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {provider.services.map((service) => (
                    <Card key={service.id} className="border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">{service.image}</div>
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                        <div className="text-xl font-bold text-pink-600 mb-4">KES {service.price}</div>
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-pink-600 hover:bg-pink-700"
                            onClick={() => handleAddToCart(service, provider)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
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
    </div>
  );
};

export default SalonBeauty;
