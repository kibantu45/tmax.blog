import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Phone, MessageCircle, MapPin, Clock, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import BottomNavigation from "@/components/BottomNavigation";

interface ServiceProvider {
  id: string;
  name: string;
  description: string;
  category: string;
  phone: string;
  whatsapp: string;
  location: string;
  availability: string;
  image_url: string;
  rating: number;
  speciality: string;
}

const ServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categories = ["all", "mamafua", "fundi", "poshomill", "salon", "wifi", "photography", "bakery", "cleaning"];

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      const { data, error } = await supabase
        .from('service_providers')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;
      setProviders(data || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.speciality.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContact = (provider: ServiceProvider) => {
    window.open(`tel:${provider.phone}`, '_blank');
  };

  const handleWhatsApp = (provider: ServiceProvider) => {
    const message = `Hi ${provider.name}! I'm interested in your ${provider.speciality} services. Please provide more information.`;
    window.open(`https://wa.me/${provider.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading service providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center animate-fade-in">
              <MessageCircle className="w-8 h-8 mr-3 animate-bounce" />
              Get Cheap Services
            </h1>
            <Button onClick={() => window.history.back()} variant="outline" className="glass hover:scale-105 transition-all duration-300">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search service providers..."
              className="pl-10 glass backdrop-blur-lg bg-white/30 border-white/20 hover:bg-white/40 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer capitalize transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category 
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg animate-pulse" 
                    : "glass bg-white/20 hover:bg-blue-50/50 backdrop-blur-sm"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Services" : 
                 category === "mamafua" ? "Laundry" :
                 category === "fundi" ? "Technician" :
                 category === "poshomill" ? "Mill Services" :
                 category === "salon" ? "Beauty & Salon" :
                 category === "wifi" ? "WiFi Installation" :
                 category === "photography" ? "Photography" :
                 category === "bakery" ? "Bakery" :
                 category === "cleaning" ? "Cleaning" : category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider, index) => (
            <Card key={provider.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-lg">
                <img 
                  src={provider.image_url || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=400&q=80"} 
                  alt={provider.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{provider.name}</CardTitle>
                    <CardDescription className="text-sm">{provider.speciality}</CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current animate-glow" />
                    <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    {provider.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-green-500" />
                    {provider.availability}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">{provider.description}</p>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleContact(provider)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
                    size="sm"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button 
                    onClick={() => handleWhatsApp(provider)}
                    className="flex-1 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
                    size="sm"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500">No service providers found matching your search.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ServiceProviders;