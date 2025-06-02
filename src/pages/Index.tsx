import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, Utensils, Flame, Shirt, Users, Home, BookOpen, Car, ShoppingCart, Pill, GraduationCap, MessageSquare, Heart, Scissors } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  const essentialServices = [
    {
      title: "Groceries",
      description: "Fresh produce & essentials",
      icon: ShoppingBag,
      color: "bg-green-100",
      textColor: "text-green-700",
      link: "/groceries"
    },
    {
      title: "Food Delivery",
      description: "Meals from local restaurants",
      icon: Utensils,
      color: "bg-orange-100",
      textColor: "text-orange-700",
      link: "/food-delivery"
    },
    {
      title: "Gas Delivery",
      description: "Cooking gas to your door",
      icon: Flame,
      color: "bg-red-100",
      textColor: "text-red-700",
      link: "/gas-delivery"
    },
    {
      title: "Laundry Services",
      description: "Wash, dry & fold services",
      icon: Shirt,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      link: "/laundry-services"
    }
  ];

  const accommodationServices = [
    {
      title: "Roommate Finder",
      description: "Find compatible roommates",
      icon: Users,
      color: "bg-purple-100",
      textColor: "text-purple-700",
      link: "/roommate-finder"
    },
    {
      title: "Rental Booking",
      description: "Student-friendly accommodations",
      icon: Home,
      color: "bg-yellow-100",
      textColor: "text-yellow-700",
      link: "/rental-booking"
    },
    {
      title: "Second Hand",
      description: "Buy & sell used items",
      icon: ShoppingCart,
      color: "bg-emerald-100",
      textColor: "text-emerald-700",
      link: "/second-hand"
    }
  ];

  const campusServices = [
    {
      title: "Chemist",
      description: "Medications & health products",
      icon: Pill,
      color: "bg-pink-100",
      textColor: "text-pink-700",
      link: "/chemist"
    },
    {
      title: "My University",
      description: "Campus resources & info",
      icon: GraduationCap,
      color: "bg-indigo-100",
      textColor: "text-indigo-700",
      link: "/my-university"
    },
    {
      title: "TUM Gossip",
      description: "Campus news & discussions",
      icon: MessageSquare,
      color: "bg-amber-100",
      textColor: "text-amber-700",
      link: "/tum-gossip"
    },
    {
      title: "Bloom Period Tracker",
      description: "Track your menstrual cycle",
      icon: Heart,
      color: "bg-rose-100",
      textColor: "text-rose-700",
      link: "/bloom-period-tracker"
    },
    {
      title: "Errand Services",
      description: "Get help with daily tasks",
      icon: ShoppingBag,
      color: "bg-cyan-100",
      textColor: "text-cyan-700",
      link: "/errand-services"
    },
    {
      title: "Salon & Beauty",
      description: "Hair, nails & beauty services",
      icon: Scissors,
      color: "bg-fuchsia-100",
      textColor: "text-fuchsia-700",
      link: "/salon-beauty"
    }
  ];

  const filteredServices = [...essentialServices, ...accommodationServices, ...campusServices].filter(
    service => service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-pastelYellow-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                  Tmax
                </h1>
                <p className="text-sm text-gray-600">Campus Life Simplified</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                  <Button size="sm" onClick={() => window.location.href = '/profile'}>
                    Profile
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.href = '/login'}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => window.location.href = '/signup'}>
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Everything You Need, <span className="text-tmaxGreen-600">All in One Place</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From groceries to laundry, roommates to study resources - we've got your campus life covered.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for services..."
              className="pl-10 bg-white/80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Services Tabs */}
        {searchQuery ? (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">Search Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80"
                  onClick={() => window.location.href = service.link}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center`}>
                        <service.icon className={`w-6 h-6 ${service.textColor}`} />
                      </div>
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <Tabs defaultValue="essentials" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/80">
              <TabsTrigger value="essentials" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Essentials
              </TabsTrigger>
              <TabsTrigger value="accommodation" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Accommodation
              </TabsTrigger>
              <TabsTrigger value="campus" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Campus Life
              </TabsTrigger>
            </TabsList>

            <TabsContent value="essentials" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {essentialServices.map((service, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80"
                    onClick={() => window.location.href = service.link}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center`}>
                          <service.icon className={`w-6 h-6 ${service.textColor}`} />
                        </div>
                        <div>
                          <CardTitle>{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accommodation" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodationServices.map((service, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80"
                    onClick={() => window.location.href = service.link}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center`}>
                          <service.icon className={`w-6 h-6 ${service.textColor}`} />
                        </div>
                        <div>
                          <CardTitle>{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="campus" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {campusServices.map((service, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80"
                    onClick={() => window.location.href = service.link}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center`}>
                          <service.icon className={`w-6 h-6 ${service.textColor}`} />
                        </div>
                        <div>
                          <CardTitle>{service.title}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Featured Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-2">New</Badge>
            <h2 className="text-2xl font-bold text-gray-800">Featured Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-pink-50 to-rose-100 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/bloom-period-tracker"}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-pink-500 mb-2">Women's Health</Badge>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Bloom Period Tracker</h3>
                    <p className="text-gray-600 mb-4">Track your cycle, monitor symptoms, and get personalized insights.</p>
                    <Button className="bg-pink-600 hover:bg-pink-700">
                      <Heart className="w-4 h-4 mr-2" />
                      Try Now
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <Heart className="w-24 h-24 text-pink-300" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-100 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/my-university"}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge className="bg-indigo-500 mb-2">Campus Resources</Badge>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">My University Hub</h3>
                    <p className="text-gray-600 mb-4">Access academic resources, campus events, and student services.</p>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Explore
                    </Button>
                  </div>
                  <div className="hidden md:block">
                    <GraduationCap className="w-24 h-24 text-indigo-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
