import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, TrendingUp, Star, Calendar, Search, ShoppingCart, Home, Utensils, GraduationCap, Pill, Users as UsersIcon, Smartphone, MessageSquare, Menu, Shield, Edit, Trash2, Plus, Eye, Copy, Upload, Droplets } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import Login from "./Login";
import SignUp from "./SignUp";

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
    color: "bg-pastelYellow",
    image: ""
  });

  const communityStats = [
    { label: "Active Students", value: "8.5K", icon: Users, color: "text-tmaxGreen-500" },
    { label: "Services Available", value: "10", icon: TrendingUp, color: "text-pastelYellow-dark" },
    { label: "Campus Locations", value: "12", icon: Star, color: "text-tmaxGreen-600" },
    { label: "Weekly Orders", value: "450+", icon: Calendar, color: "text-pastelYellow-dark" }
  ];

  const [allServices, setAllServices] = useState([
    { id: 1, title: "Student Accommodation", description: "Find your perfect student housing", icon: Home, link: "/rental-booking", color: "bg-pastelYellow", image: "" },
    { id: 2, title: "Food Delivery", description: "Campus restaurants at your door", icon: Utensils, link: "/food-delivery", color: "bg-tmaxGreen-200", image: "" },
    { id: 3, title: "University Resources", description: "Academic support and information", icon: GraduationCap, link: "/my-university", color: "bg-pastelYellow-light", image: "" },
    { id: 4, title: "Pharmacy", description: "Healthcare and medicine delivery", icon: Pill, link: "/chemist", color: "bg-tmaxGreen-100", image: "" },
    { id: 5, title: "Groceries", description: "Fresh groceries delivered", icon: ShoppingCart, link: "/groceries", color: "bg-pastelYellow", image: "" },
    { id: 6, title: "Second-Hand Marketplace", description: "Buy and sell pre-loved items", icon: ShoppingCart, link: "/second-hand", color: "bg-tmaxGreen-200", image: "" },
    { id: 7, title: "Roommate Finder", description: "Find compatible roommates", icon: UsersIcon, link: "/roommate-finder", color: "bg-pastelYellow-light", image: "" },
    { id: 8, title: "Mobile Data", description: "Top up your mobile data", icon: Smartphone, link: "/mobile-data", color: "bg-tmaxGreen-100", image: "" },
    { id: 9, title: "Campus Gossip", description: "Latest campus news and events", icon: MessageSquare, link: "/tum-gossip", color: "bg-pastelYellow", image: "" },
    { id: 10, title: "Period Tracker", description: "Track your cycle with Bloom", icon: Droplets, link: "/period-tracker", color: "bg-pink-200", image: "" }
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

  const handleDuplicateService = (service: any) => {
    const newService = {
      ...service,
      id: Math.max(...allServices.map(s => s.id)) + 1,
      title: `${service.title} (Copy)`
    };
    setAllServices(prev => [...prev, newService]);
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
      id: Math.max(...allServices.map(s => s.id)) + 1,
      icon: Home // Default icon component
    };
    setAllServices(prev => [...prev, newService]);
    setNewServiceForm({
      title: "",
      description: "",
      icon: "Home",
      link: "",
      color: "bg-pastelYellow",
      image: ""
    });
  };

  const handleImageUpload = (serviceId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setAllServices(prev => prev.map(service => 
          service.id === serviceId ? { ...service, image: imageUrl } : service
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderServiceCard = (service: any, index: number, isAdmin = false) => {
    const IconComponent = service.icon;
    return (
      <Card key={service.id || index} className="hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group bg-white/90 relative">
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <Eye className="w-3 h-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Preview: {service.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Service Preview</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Add Menu Items:</label>
                        <Button variant="outline" size="sm" className="w-full mb-2">
                          + Add Food Item
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          + Add Product
                        </Button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Manage Content:</label>
                        <Button variant="outline" size="sm" className="w-full mb-2">
                          Edit Description
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          Upload Photos
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handleEditService(service)}
            >
              <Edit className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => handleDuplicateService(service)}
            >
              <Copy className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-8 w-8 p-0"
              onClick={() => handleDeleteService(service.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
              >
                <Upload className="w-3 h-3" />
              </Button>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => handleImageUpload(service.id, e)}
              />
            </div>
          </div>
        )}
        <CardContent className="p-6 text-center">
          {service.image ? (
            <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-xl">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <IconComponent className="w-8 h-8 text-tmaxGreen-700" />
            </div>
          )}
          <h3 className="font-semibold text-lg mb-2 text-gray-900">{service.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
          <Button 
            className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
            onClick={() => !isAdmin && (window.location.href = service.link)}
            disabled={isAdmin}
          >
            {isAdmin ? "Preview" : "Explore"}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderAdminInterface = () => (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Tmax Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-red-100 text-red-800">Admin Mode</Badge>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  setIsAdminOpen(false);
                }}
              >
                Exit Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tmaxGreen-600 via-white to-tmaxGreen-600 bg-clip-text text-transparent">
            Your Campus, Simplified
          </h2>
          <p className="text-xl text-tmaxGreen-800 max-w-2xl mx-auto mb-8 font-medium">
            Everything you need as a student in one place. From accommodation to food delivery, 
            groceries to university resources - Tmax has got you covered.
          </p>
        </div>

        <div className="mb-12">
          <Card className="border-2 border-dashed border-tmaxGreen-300 bg-gradient-to-r from-tmaxGreen-100 to-pastelYellow-light">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Advertisement Space
                </CardTitle>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-1" />
                      Upload Ad
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("Advertisement image uploaded:", file.name);
                        }
                      }}
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Content
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-tmaxGreen-700 mb-2">Your Advertisement Here</h3>
              <p className="text-tmaxGreen-600 mb-4">Upload your promotional content and reach thousands of students</p>
              <div className="bg-white/80 rounded-lg p-4 border-2 border-dashed border-tmaxGreen-300">
                <p className="text-gray-600 text-sm">Click "Upload Ad" to add your advertisement image</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <Card className="border-2 border-dashed border-tmaxGreen-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Service
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-title">Service Title</Label>
                  <Input
                    id="new-title"
                    placeholder="Service Title"
                    value={newServiceForm.title}
                    onChange={(e) => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="new-description">Description</Label>
                  <Textarea
                    id="new-description"
                    placeholder="Service Description"
                    value={newServiceForm.description}
                    onChange={(e) => setNewServiceForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-link">Service Link</Label>
                  <Input
                    id="new-link"
                    placeholder="Service Link (e.g., /new-service)"
                    value={newServiceForm.link}
                    onChange={(e) => setNewServiceForm(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="new-image">Service Image</Label>
                  <Input
                    id="new-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setNewServiceForm(prev => ({ ...prev, image: event.target?.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <Button onClick={handleAddNewService} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-tmaxGreen-700">All Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => renderServiceCard(service, index, true))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-tmaxGreen-700">Why Choose Tmax?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-tmaxGreen-100 bg-white/90 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Student-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Designed specifically for university students with services that matter to your daily life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/90 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick delivery times and reliable service you can count on for all your campus needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/90 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
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

      <footer className="mt-16 bg-white/90 backdrop-blur-sm border-t border-tmaxGreen-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-tmaxGreen-100 bg-white/90 relative group">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
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
            
            <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <Shield className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Admin Login</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <Button onClick={handleAdminLogin} className="w-full">
                    Login to Admin Panel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  );

  const EditServiceDialog = () => (
    <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Service</DialogTitle>
        </DialogHeader>
        {editingService && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Service Title</Label>
              <Input
                id="edit-title"
                value={editingService.title}
                onChange={(e) => setEditingService(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Service Title"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editingService.description}
                onChange={(e) => setEditingService(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Service Description"
              />
            </div>
            <div>
              <Label htmlFor="edit-link">Service Link</Label>
              <Input
                id="edit-link"
                value={editingService.link}
                onChange={(e) => setEditingService(prev => ({ ...prev, link: e.target.value }))}
                placeholder="Service Link"
              />
            </div>
            <div>
              <Label htmlFor="edit-image">Upload New Image</Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setEditingService(prev => ({ ...prev, image: event.target?.result as string }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
            <Button onClick={handleSaveService} className="w-full">
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  if (isAdminAuthenticated) {
    return (
      <>
        {renderAdminInterface()}
        <EditServiceDialog />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
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

              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = "/login"}
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
                  onClick={() => window.location.href = "/signup"}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tmaxGreen-600 via-white to-tmaxGreen-600 bg-clip-text text-transparent">
            Your Campus, Simplified
          </h2>
          <p className="text-xl text-tmaxGreen-800 max-w-2xl mx-auto mb-8 font-medium">
            Everything you need as a student in one place. From accommodation to food delivery, 
            groceries to university resources - Tmax has got you covered.
          </p>
        </div>

        <div className="mb-12">
          <div className="bg-gradient-to-r from-tmaxGreen-100 to-pastelYellow-light border-2 border-dashed border-tmaxGreen-300 rounded-lg p-8 text-center relative">
            <div className="absolute top-2 right-2">
              <Button size="sm" variant="outline">
                <Edit className="w-4 h-4 mr-1" />
                Edit Ad
              </Button>
            </div>
            <h3 className="text-2xl font-semibold text-tmaxGreen-700 mb-2">Advertisement Space</h3>
            <p className="text-tmaxGreen-600 mb-4">Your ads could be here - Contact us for advertising opportunities</p>
          </div>
        </div>

        <div className="mb-8">
          <Card className="border-2 border-dashed border-tmaxGreen-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Service
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-title">Service Title</Label>
                  <Input
                    id="new-title"
                    placeholder="Service Title"
                    value={newServiceForm.title}
                    onChange={(e) => setNewServiceForm(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="new-description">Description</Label>
                  <Textarea
                    id="new-description"
                    placeholder="Service Description"
                    value={newServiceForm.description}
                    onChange={(e) => setNewServiceForm(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-link">Service Link</Label>
                  <Input
                    id="new-link"
                    placeholder="Service Link (e.g., /new-service)"
                    value={newServiceForm.link}
                    onChange={(e) => setNewServiceForm(prev => ({ ...prev, link: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="new-image">Service Image</Label>
                  <Input
                    id="new-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setNewServiceForm(prev => ({ ...prev, image: event.target?.result as string }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
                <Button onClick={handleAddNewService} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-tmaxGreen-700">All Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => renderServiceCard(service, index, true))}
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-bold mb-6 text-tmaxGreen-700">Why Choose Tmax?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-tmaxGreen-100 bg-white/90 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Student-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Designed specifically for university students with services that matter to your daily life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/90 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick delivery times and reliable service you can count on for all your campus needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/90 relative group">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="outline">
                  <Edit className="w-3 h-3" />
                </Button>
              </div>
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

      <footer className="mt-16 bg-white/90 backdrop-blur-sm border-t border-tmaxGreen-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {communityStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-tmaxGreen-100 bg-white/90 relative group">
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
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
            
            <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                  <Shield className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Admin Login</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                  <Button onClick={handleAdminLogin} className="w-full">
                    Login to Admin Panel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
