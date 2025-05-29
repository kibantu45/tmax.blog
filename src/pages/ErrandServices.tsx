
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, Star, ShoppingCart, Plus, FileText, Building, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ErrandServices = () => {
  const { addToCart } = useCart();

  const errandProviders = [
    {
      id: "postoffice",
      name: "Post Office Services",
      deliveryTime: "Same Day",
      rating: 4.8,
      location: "Main Post Office",
      phone: "+254702752033",
      icon: Package,
      services: [
        {
          id: "po1",
          name: "Document Collection",
          price: 150,
          image: "📄",
          description: "Collect official documents from post office"
        },
        {
          id: "po2",
          name: "Mail Posting",
          price: 100,
          image: "✉️",
          description: "Post letters and packages on your behalf"
        },
        {
          id: "po3",
          name: "Parcel Collection",
          price: 200,
          image: "📦",
          description: "Collect parcels and packages from post office"
        },
        {
          id: "po4",
          name: "Postal Address Verification",
          price: 250,
          image: "🏠",
          description: "Verify postal address for official purposes"
        },
        {
          id: "po5",
          name: "Express Mail Service",
          price: 300,
          image: "⚡",
          description: "Send urgent mail via express service"
        },
        {
          id: "po6",
          name: "Money Order Services",
          price: 180,
          image: "💰",
          description: "Send or receive money orders"
        }
      ]
    },
    {
      id: "helb",
      name: "HELB Services",
      deliveryTime: "1-2 Days",
      rating: 4.6,
      location: "HELB Offices",
      phone: "+254702752033",
      icon: Building,
      services: [
        {
          id: "helb1",
          name: "Application Submission",
          price: 300,
          image: "📋",
          description: "Submit HELB loan application forms"
        },
        {
          id: "helb2",
          name: "Document Collection",
          price: 250,
          image: "📁",
          description: "Collect HELB documents and certificates"
        },
        {
          id: "helb3",
          name: "Status Inquiry",
          price: 150,
          image: "❓",
          description: "Check loan application status"
        },
        {
          id: "helb4",
          name: "Appeal Submission",
          price: 400,
          image: "⚖️",
          description: "Submit loan appeal documents"
        },
        {
          id: "helb5",
          name: "Disbursement Inquiry",
          price: 200,
          image: "💳",
          description: "Check loan disbursement status"
        },
        {
          id: "helb6",
          name: "Form Collection",
          price: 100,
          image: "📝",
          description: "Collect HELB application forms"
        },
        {
          id: "helb7",
          name: "Loan Statement Request",
          price: 180,
          image: "📊",
          description: "Request detailed loan statement"
        },
        {
          id: "helb8",
          name: "Contact Update",
          price: 120,
          image: "📞",
          description: "Update contact information with HELB"
        }
      ]
    }
  ];

  const handleAddToCart = (service: any, provider: any) => {
    addToCart({
      id: `${service.id}_${provider.id}`,
      name: `${service.name} - ${provider.name}`,
      price: service.price,
      image: service.image,
      category: "Errand Services",
      provider: provider.name
    });
  };

  const handleOrderNow = (provider: any, service: any) => {
    const message = `Hi! I need help with ${provider.name}. Service: ${service.name} - KES ${service.price}. ${service.description}. Please confirm availability and timeline.`;
    const whatsappUrl = `https://wa.me/${provider.phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Errand Services
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
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
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
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Professional Errand Services</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save time with our reliable errand running services for official matters
          </p>
        </div>

        <Tabs defaultValue="postoffice" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/80">
            <TabsTrigger value="postoffice" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Post Office Services
            </TabsTrigger>
            <TabsTrigger value="helb" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              <Building className="w-4 h-4 mr-2" />
              HELB Services
            </TabsTrigger>
          </TabsList>

          {errandProviders.map((provider) => {
            const ProviderIcon = provider.icon;
            return (
              <TabsContent key={provider.id} value={provider.id} className="space-y-6">
                <Card className="border-blue-200 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                          <ProviderIcon className="w-8 h-8 text-white" />
                        </div>
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
                              <span className="text-sm">{provider.location}</span>
                            </div>
                          </div>
                          <Badge className="mt-2 bg-green-100 text-green-800">Professional Service</Badge>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleOrderNow(provider, { name: "General Inquiry", description: "General service inquiry" })}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Contact via WhatsApp
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <Plus className="w-4 h-4 mr-2" />
                                Add to Cart
                              </Button>
                              <Button 
                                variant="outline" 
                                className="w-full"
                                onClick={() => handleOrderNow(provider, service)}
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
              </TabsContent>
            );
          })}
        </Tabs>

        <Card className="mt-12 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-blue-800 mb-4">How Our Errand Services Work</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-1">Choose Service</h4>
                <p className="text-sm text-gray-600">Select the errand service you need</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-1">Provide Details</h4>
                <p className="text-sm text-gray-600">Share specific requirements and documents</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-1">We Handle It</h4>
                <p className="text-sm text-gray-600">Our team completes your errand professionally</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-1">Delivery</h4>
                <p className="text-sm text-gray-600">Receive your documents or confirmation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">Why Choose Our Errand Services?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-2">
                <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Professional & Reliable</h4>
                  <p className="text-sm text-gray-600">Experienced team handling official matters with care</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Time-Saving</h4>
                  <p className="text-sm text-gray-600">Focus on your studies while we handle bureaucracy</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Real-time Updates</h4>
                  <p className="text-sm text-gray-600">Stay informed throughout the process</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Service Coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Post Office - All branches in the city</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-green-500" />
                <span className="text-sm">HELB Offices - Main and regional offices</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <span className="text-sm">Campus Delivery - Direct to your location</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-500" />
                <span className="text-sm">Operating Hours - 8AM to 5PM, Monday to Friday</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ErrandServices;
