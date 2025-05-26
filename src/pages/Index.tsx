
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, TrendingUp, Star, Calendar, Search, ShoppingCart, Home, Utensils, GraduationCap, Pill, Users as UsersIcon, Smartphone, MessageSquare, Menu, Shield, Edit, Trash2, Plus, Eye } from "lucide-react";
import ServiceCarousel from "@/components/ServiceCarousel";
import { useCart } from "@/contexts/CartContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { itemCount } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState("overview");

  // Admin form states
  const [editingService, setEditingService] = useState<any>(null);
  const [newServiceForm, setNewServiceForm] = useState({
    title: "",
    description: "",
    icon: "Home",
    link: "",
    color: "bg-pastelYellow"
  });

  const communityStats = [
    { label: "Active Students", value: "8.5K", icon: Users, color: "text-tmaxGreen-500" },
    { label: "Services Available", value: "8", icon: TrendingUp, color: "text-pastelYellow-dark" },
    { label: "Campus Locations", value: "12", icon: Star, color: "text-tmaxGreen-600" },
    { label: "Weekly Orders", value: "450+", icon: Calendar, color: "text-pastelYellow-dark" }
  ];

  const [allServices, setAllServices] = useState([
    { id: 1, title: "Student Accommodation", description: "Find your perfect student housing", icon: Home, link: "/rental-booking", color: "bg-pastelYellow" },
    { id: 2, title: "Food Delivery", description: "Campus restaurants at your door", icon: Utensils, link: "/food-delivery", color: "bg-tmaxGreen-200" },
    { id: 3, title: "University Resources", description: "Academic support and information", icon: GraduationCap, link: "/my-university", color: "bg-pastelYellow-light" },
    { id: 4, title: "Pharmacy", description: "Healthcare and medicine delivery", icon: Pill, link: "/chemist", color: "bg-tmaxGreen-100" },
    { id: 5, title: "Groceries", description: "Fresh groceries delivered", icon: ShoppingCart, link: "/groceries", color: "bg-pastelYellow" },
    { id: 6, title: "Second-Hand Marketplace", description: "Buy and sell pre-loved items", icon: ShoppingCart, link: "/second-hand", color: "bg-tmaxGreen-200" },
    { id: 7, title: "Roommate Finder", description: "Find compatible roommates", icon: UsersIcon, link: "/roommate-finder", color: "bg-pastelYellow-light" },
    { id: 8, title: "Mobile Data", description: "Top up your mobile data", icon: Smartphone, link: "/mobile-data", color: "bg-tmaxGreen-100" },
    { id: 9, title: "Campus Gossip", description: "Latest campus news and events", icon: MessageSquare, link: "/tum-gossip", color: "bg-pastelYellow" }
  ]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/second-hand?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "24216464") {
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid password");
    }
  };

  const handleDeleteService = (serviceId: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setAllServices(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
  };

  const handleSaveService = () => {
    if (editingService) {
      setAllServices(prev => prev.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    }
  };

  const handleAddNewService = () => {
    const newService = {
      ...newServiceForm,
      id: Math.max(...allServices.map(s => s.id)) + 1
    };
    setAllServices(prev => [...prev, newService]);
    setNewServiceForm({
      title: "",
      description: "",
      icon: "Home",
      link: "",
      color: "bg-pastelYellow"
    });
  };

  const renderAdminOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {communityStats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setActiveAdminTab("services")}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
            <Button variant="outline" onClick={() => setActiveAdminTab("services")}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Services
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminServices = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Service Title"
            value={newServiceForm.title}
            onChange={(e) => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            placeholder="Service Description"
            value={newServiceForm.description}
            onChange={(e) => setNewServiceForm(prev => ({ ...prev, description: e.target.value }))}
          />
          <Input
            placeholder="Service Link (e.g., /new-service)"
            value={newServiceForm.link}
            onChange={(e) => setNewServiceForm(prev => ({ ...prev, link: e.target.value }))}
          />
          <Button onClick={handleAddNewService} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allServices.map((service) => (
          <Card key={service.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditService(service)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteService(service.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{service.link}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingService && (
        <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Service</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editingService.title}
                onChange={(e) => setEditingService(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Service Title"
              />
              <Textarea
                value={editingService.description}
                onChange={(e) => setEditingService(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Service Description"
              />
              <Input
                value={editingService.link}
                onChange={(e) => setEditingService(prev => ({ ...prev, link: e.target.value }))}
                placeholder="Service Link"
              />
              <Button onClick={handleSaveService} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Tmax
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-tmaxGreen-500 text-white hover:bg-tmaxGreen-600">
                      <Menu className="w-4 h-4 mr-2" />
                      Services
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="bg-white p-4 min-w-[300px]">
                      <div className="grid gap-2">
                        {allServices.map((service, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            className="justify-start text-left"
                            onClick={() => window.location.href = service.link}
                          >
                            <service.icon className="w-4 h-4 mr-2" />
                            {service.title}
                          </Button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="px-3 py-1 border border-tmaxGreen-200 rounded-md text-sm"
                />
                <Button variant="ghost" size="sm" onClick={handleSearch}>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              
              <Button variant="ghost" size="sm" className="relative" onClick={() => window.location.href = "/cart"}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tmaxGreen-600 via-white to-tmaxGreen-600 bg-clip-text text-transparent">
            Your Campus, Simplified
          </h2>
          <p className="text-xl text-tmaxGreen-800 max-w-2xl mx-auto mb-8 font-medium">
            Everything you need as a student in one place. From accommodation to food delivery, 
            groceries to university resources - Tmax has got you covered.
          </p>
        </div>

        {/* Ad Space */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-tmaxGreen-100 to-pastelYellow-light border-2 border-dashed border-tmaxGreen-300 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold text-tmaxGreen-700 mb-2">Advertisement Space</h3>
            <p className="text-tmaxGreen-600">Your ads could be here - Contact us for advertising opportunities</p>
          </div>
        </div>

        {/* All Services Listed */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-tmaxGreen-700">All Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group bg-white/90">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-tmaxGreen-700" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <Button 
                      className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
                      onClick={() => window.location.href = service.link}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-tmaxGreen-700">Why Choose Tmax?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-tmaxGreen-100 bg-white/90">
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Student-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Designed specifically for university students with services that matter to your daily life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/90">
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick delivery times and reliable service you can count on for all your campus needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/90">
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">All-in-One Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  From accommodation to groceries, everything you need is available in one convenient app.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer with Stats and Admin Panel */}
      <footer className="mt-16 bg-white/90 backdrop-blur-sm border-t border-tmaxGreen-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-tmaxGreen-100 bg-white/90">
                <CardContent className="pt-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-center text-gray-600">
              <p>&copy; 2024 Tmax. Your trusted campus companion.</p>
            </div>
            
            {/* Admin Panel Button */}
            <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <Shield className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Admin Panel</DialogTitle>
                </DialogHeader>
                {!isAdminAuthenticated ? (
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                    />
                    <Button onClick={handleAdminLogin} className="w-full">
                      Login
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Tabs value={activeAdminTab} onValueChange={setActiveAdminTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="services">Services</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="overview" className="mt-6">
                        {renderAdminOverview()}
                      </TabsContent>
                      
                      <TabsContent value="services" className="mt-6">
                        {renderAdminServices()}
                      </TabsContent>
                      
                      <TabsContent value="settings" className="mt-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Admin Settings</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <Button 
                              onClick={() => {
                                setIsAdminAuthenticated(false);
                                setAdminPassword("");
                                setIsAdminOpen(false);
                              }} 
                              variant="destructive"
                              className="w-full"
                            >
                              Logout
                            </Button>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
