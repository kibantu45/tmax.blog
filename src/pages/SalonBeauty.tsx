import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Phone, MapPin, Star, Clock, Scissors, Sparkles } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const SalonBeauty = () => {
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showProviderDialog, setShowProviderDialog] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const salonProviders = [
    {
      id: 1,
      name: "Glamour Salon",
      location: "Beauty Plaza",
      whatsapp: "+254702752033",
      rating: 4.6,
      deliveryTime: "Same day",
      description: "Full-service salon offering haircuts, styling, and facial treatments. Student discounts available.",
      services: [
        {
          id: 1,
          name: "Haircut & Style",
          price: 800,
          image: "/placeholder.svg",
          description: "Professional haircut with styling"
        },
        {
          id: 2,
          name: "Braids & Extensions",
          price: 1500,
          image: "/placeholder.svg",
          description: "Beautiful braiding and extension services"
        },
        {
          id: 3,
          name: "Hair Coloring",
          price: 2000,
          image: "/placeholder.svg",
          description: "Professional hair coloring service"
        },
        {
          id: 4,
          name: "Facial Treatment",
          price: 1200,
          image: "/placeholder.svg",
          description: "Relaxing facial treatment and skincare"
        }
      ]
    },
    {
      id: 2,
      name: "Nail Tech Pro",
      location: "Student Mall",
      whatsapp: "+254702752033",
      rating: 4.7,
      deliveryTime: "2-3 hours",
      description: "Specialized nail salon with latest nail art techniques. Gel and acrylic services available.",
      services: [
        {
          id: 5,
          name: "Gel Nails",
          price: 1200,
          image: "/placeholder.svg",
          description: "Long-lasting gel manicure"
        },
        {
          id: 6,
          name: "Nail Art",
          price: 800,
          image: "/placeholder.svg",
          description: "Creative nail art designs"
        },
        {
          id: 7,
          name: "Pedicure",
          price: 600,
          image: "/placeholder.svg",
          description: "Relaxing foot care and pedicure"
        },
        {
          id: 8,
          name: "Acrylic Nails",
          price: 1500,
          image: "/placeholder.svg",
          description: "Durable acrylic nail extensions"
        }
      ]
    },
    {
      id: 3,
      name: "Gents Barber",
      location: "Men's Corner",
      whatsapp: "+254702752033",
      rating: 4.5,
      deliveryTime: "1 hour",
      description: "Traditional barbershop for men. Offers classic cuts and modern styling services.",
      services: [
        {
          id: 9,
          name: "Haircut",
          price: 300,
          image: "/placeholder.svg",
          description: "Classic men's haircut"
        },
        {
          id: 10,
          name: "Beard Trim",
          price: 200,
          image: "/placeholder.svg",
          description: "Professional beard trimming"
        },
        {
          id: 11,
          name: "Hot Towel Shave",
          price: 400,
          image: "/placeholder.svg",
          description: "Traditional hot towel shave"
        },
        {
          id: 12,
          name: "Hair & Beard Combo",
          price: 450,
          image: "/placeholder.svg",
          description: "Complete grooming package"
        }
      ]
    }
  ];

  const handleAddToCart = (service: any, provider: any) => {
    addToCart({
      id: `salon-${provider.id}-${service.id}`,
      name: `${service.name} - ${provider.name}`,
      price: service.price,
      quantity: 1,
      image: service.image
    });
    toast({
      title: "Added to Cart",
      description: `${service.name} from ${provider.name} has been added to your cart.`,
    });
  };

  const handleWhatsAppContact = (provider: any, service?: any) => {
    const message = service 
      ? `Hi ${provider.name}! I'm interested in ${service.name} service. Could you please provide more information?`
      : `Hi ${provider.name}! I'm interested in your services. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/${provider.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Salon & Beauty</h1>
            </div>
            <Button onClick={() => window.location.href = "/cart"} variant="outline">
              Cart
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-pink-500 mr-2" />
            <h2 className="text-3xl font-bold text-gray-800">Beauty & Grooming Services</h2>
          </div>
          <p className="text-lg text-gray-600">Professional beauty services for your campus needs</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="hair">Hair Services</TabsTrigger>
            <TabsTrigger value="nails">Nail Services</TabsTrigger>
            <TabsTrigger value="men">Men's Grooming</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {salonProviders.map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Scissors className="w-5 h-5 mr-2 text-pink-500" />
                        {provider.name}
                      </CardTitle>
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
                    </div>
                    <Button
                      onClick={() => handleWhatsAppContact(provider)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                  <p className="text-gray-700 mt-2">{provider.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {provider.services.map((service) => (
                      <Card key={service.id} className="border-gray-200">
                        <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              KES {service.price}
                            </Badge>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleAddToCart(service, provider)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleWhatsAppContact(provider, service)}
                            >
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
          </TabsContent>

          <TabsContent value="hair">
            {salonProviders.filter(p => p.name === "Glamour Salon").map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Scissors className="w-5 h-5 mr-2 text-pink-500" />
                        {provider.name}
                      </CardTitle>
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
                    </div>
                    <Button
                      onClick={() => handleWhatsAppContact(provider)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                  <p className="text-gray-700 mt-2">{provider.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {provider.services.map((service) => (
                      <Card key={service.id} className="border-gray-200">
                        <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              KES {service.price}
                            </Badge>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleAddToCart(service, provider)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleWhatsAppContact(provider, service)}
                            >
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
          </TabsContent>

          <TabsContent value="nails">
            {salonProviders.filter(p => p.name === "Nail Tech Pro").map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Scissors className="w-5 h-5 mr-2 text-pink-500" />
                        {provider.name}
                      </CardTitle>
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
                    </div>
                    <Button
                      onClick={() => handleWhatsAppContact(provider)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                  <p className="text-gray-700 mt-2">{provider.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {provider.services.map((service) => (
                      <Card key={service.id} className="border-gray-200">
                        <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              KES {service.price}
                            </Badge>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleAddToCart(service, provider)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleWhatsAppContact(provider, service)}
                            >
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
          </TabsContent>

          <TabsContent value="men">
            {salonProviders.filter(p => p.name === "Gents Barber").map((provider) => (
              <Card key={provider.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <Scissors className="w-5 h-5 mr-2 text-pink-500" />
                        {provider.name}
                      </CardTitle>
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
                    </div>
                    <Button
                      onClick={() => handleWhatsAppContact(provider)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                  <p className="text-gray-700 mt-2">{provider.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {provider.services.map((service) => (
                      <Card key={service.id} className="border-gray-200">
                        <div className="aspect-square bg-gray-100 rounded-t-lg flex items-center justify-center">
                          <img 
                            src={service.image} 
                            alt={service.name}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              KES {service.price}
                            </Badge>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <Button
                              size="sm"
                              className="flex-1 bg-blue-600 hover:bg-blue-700"
                              onClick={() => handleAddToCart(service, provider)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              onClick={() => handleWhatsAppContact(provider, service)}
                            >
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalonBeauty;
