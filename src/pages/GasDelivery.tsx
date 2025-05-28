
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, MapPin, Clock, Phone, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const GasDelivery = () => {
  const { addItem } = useCart();
  
  const gasProviders = [
    {
      id: 1,
      name: "Total Gas Kenya",
      deliveryTime: "30-45 mins",
      rating: 4.8,
      freeDelivery: true,
      whatsapp: "+254702752033",
      products: [
        { id: 1, name: "6kg Gas Cylinder Refill", price: 1200, image: "🔥", description: "Standard 6kg gas cylinder refill" },
        { id: 2, name: "13kg Gas Cylinder Refill", price: 2400, image: "🔥", description: "Large 13kg gas cylinder refill" },
        { id: 3, name: "New 6kg Cylinder + Gas", price: 3500, image: "🔥", description: "New 6kg cylinder with gas included" }
      ]
    },
    {
      id: 2,
      name: "K-Gas",
      deliveryTime: "45-60 mins",
      rating: 4.6,
      freeDelivery: true,
      whatsapp: "+254702752033",
      products: [
        { id: 4, name: "6kg Gas Cylinder Refill", price: 1150, image: "🔥", description: "Quality 6kg gas cylinder refill" },
        { id: 5, name: "13kg Gas Cylinder Refill", price: 2300, image: "🔥", description: "Large 13kg gas cylinder refill" },
        { id: 6, name: "Gas Stove Installation", price: 1500, image: "🔧", description: "Professional gas stove installation service" }
      ]
    },
    {
      id: 3,
      name: "Pro Gas",
      deliveryTime: "40-55 mins",
      rating: 4.7,
      freeDelivery: false,
      whatsapp: "+254702752033",
      products: [
        { id: 7, name: "6kg Gas Cylinder Refill", price: 1180, image: "🔥", description: "Premium 6kg gas cylinder refill" },
        { id: 8, name: "13kg Gas Cylinder Refill", price: 2350, image: "🔥", description: "Premium 13kg gas cylinder refill" },
        { id: 9, name: "Gas Leak Detection Service", price: 800, image: "🔍", description: "Professional gas leak detection and repair" }
      ]
    }
  ];

  const handleAddToCart = (product: any, provider: any) => {
    addItem({
      id: product.id,
      name: `${product.name} - ${provider.name}`,
      price: product.price,
      image: product.image,
      category: "Gas Services"
    });
  };

  const handleWhatsAppOrder = (provider: any, product?: any) => {
    const message = product 
      ? `Hi ${provider.name}! I'd like to order: ${product.name} - KES ${product.price}`
      : `Hi ${provider.name}! I'd like to inquire about your gas delivery services.`;
    
    const whatsappUrl = `https://wa.me/${provider.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <Fuel className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Gas Delivery
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Gas Delivery Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick and reliable gas cylinder refills delivered to your doorstep
          </p>
        </div>

        <div className="space-y-8">
          {gasProviders.map((provider) => (
            <Card key={provider.id} className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl text-orange-800">{provider.name}</CardTitle>
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
                        <span className="text-sm">Campus Delivery</span>
                      </div>
                    </div>
                    {provider.freeDelivery && (
                      <Badge className="mt-2 bg-green-100 text-green-800">Free Delivery</Badge>
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
                <div className="grid md:grid-cols-3 gap-6">
                  {provider.products.map((product) => (
                    <Card key={product.id} className="border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">{product.image}</div>
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                        <div className="text-xl font-bold text-orange-600 mb-4">KES {product.price}</div>
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleAddToCart(product, provider)}
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleWhatsAppOrder(provider, product)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Order Now
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

        <Card className="mt-12 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-orange-800 mb-4">How Gas Delivery Works</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-1">Choose Provider</h4>
                <p className="text-sm text-gray-600">Select your preferred gas provider</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-1">Place Order</h4>
                <p className="text-sm text-gray-600">Order via WhatsApp or add to cart</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-1">Delivery</h4>
                <p className="text-sm text-gray-600">Gas delivered to your location</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-1">Installation</h4>
                <p className="text-sm text-gray-600">Professional setup if needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GasDelivery;
