
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shirt, Clock, Star, Phone, MapPin, Droplets } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const LaundryServices = () => {
  const { addItem } = useCart();
  
  const laundryProviders = [
    {
      id: 1,
      name: "Campus Clean Laundry",
      deliveryTime: "24-48 hours",
      rating: 4.9,
      pickup: true,
      whatsapp: "+254702752033",
      services: [
        { id: 1, name: "Wash & Fold (per kg)", price: 150, image: "👔", description: "Basic washing and folding service" },
        { id: 2, name: "Wash & Iron (per kg)", price: 200, image: "👕", description: "Washing, drying and professional ironing" },
        { id: 3, name: "Dry Cleaning (per item)", price: 300, image: "🧥", description: "Professional dry cleaning service" },
        { id: 4, name: "Bedding Set Cleaning", price: 500, image: "🛏️", description: "Complete bedding set wash and dry" }
      ]
    },
    {
      id: 2,
      name: "Quick Wash Express",
      deliveryTime: "Same day",
      rating: 4.7,
      pickup: true,
      whatsapp: "+254702752033",
      services: [
        { id: 5, name: "Express Wash (per kg)", price: 180, image: "⚡", description: "Same day washing service" },
        { id: 6, name: "Delicate Care (per item)", price: 250, image: "🌸", description: "Special care for delicate fabrics" },
        { id: 7, name: "Shoe Cleaning", price: 200, image: "👟", description: "Professional shoe cleaning and care" },
        { id: 8, name: "Blanket Cleaning", price: 400, image: "🧵", description: "Heavy blanket and comforter cleaning" }
      ]
    },
    {
      id: 3,
      name: "Eco Fresh Laundry",
      deliveryTime: "48-72 hours",
      rating: 4.8,
      pickup: true,
      whatsapp: "+254702752033",
      services: [
        { id: 9, name: "Eco Wash (per kg)", price: 170, image: "🌿", description: "Environmentally friendly washing" },
        { id: 10, name: "Stain Removal", price: 100, image: "🧽", description: "Specialized stain removal treatment" },
        { id: 11, name: "Fabric Softening", price: 50, image: "💧", description: "Extra fabric softening treatment" },
        { id: 12, name: "Bulk Laundry (10kg+)", price: 120, image: "📦", description: "Discounted rate for bulk washing" }
      ]
    }
  ];

  const handleAddToCart = (service: any, provider: any) => {
    addItem({
      id: service.id,
      name: `${service.name} - ${provider.name}`,
      price: service.price,
      image: service.image,
      category: "Laundry Services"
    });
  };

  const handleWhatsAppOrder = (provider: any, service?: any) => {
    const message = service 
      ? `Hi ${provider.name}! I'd like to book: ${service.name} - KES ${service.price}`
      : `Hi ${provider.name}! I'd like to inquire about your laundry services.`;
    
    const whatsappUrl = `https://wa.me/${provider.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Laundry Services
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Professional Laundry Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional washing, drying, and ironing services with pickup and delivery
          </p>
        </div>

        <div className="space-y-8">
          {laundryProviders.map((provider) => (
            <Card key={provider.id} className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-blue-800">{provider.name}</CardTitle>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{provider.deliveryTime}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">Campus Service</span>
                      </div>
                    </div>
                    {provider.pickup && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Free Pickup & Delivery</Badge>
                    )}
                  </div>
                  <Button
                    onClick={() => handleWhatsAppOrder(provider)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact via WhatsApp
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
                        <div className="text-xl font-bold text-blue-600 mb-4">KES {service.price}</div>
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleAddToCart(service, provider)}
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleWhatsAppOrder(provider, service)}
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

        <Card className="mt-12 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">How Our Laundry Service Works</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-1">Schedule Pickup</h4>
                <p className="text-sm text-gray-600">Book pickup via WhatsApp</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-1">Professional Cleaning</h4>
                <p className="text-sm text-gray-600">Expert washing and care</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-1">Quality Check</h4>
                <p className="text-sm text-gray-600">Thorough inspection</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-1">Delivery</h4>
                <p className="text-sm text-gray-600">Clean clothes delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaundryServices;
