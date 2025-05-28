import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { 
  Home, Users, ShoppingCart, Calendar, Truck, Package, 
  Shield, Search, Menu, Plus, Edit, Eye, Copy, Trash2,
  Fuel, Car, Cake, Palette, Camera, Scissors, Heart,
  Mail, Phone, Facebook, Twitter, Instagram
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import ServiceCarousel from "@/components/ServiceCarousel";
import ComingSoonCanvas from "@/components/ComingSoonCanvas";

const Index = () => {
  const { itemCount } = useCart();
  
  // Admin state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [editingService, setEditingService] = useState<any>(null);
  
  // Services state
  const [services, setServices] = useState([
    { title: "Second Hand", description: "Buy and sell pre-owned items", icon: Package, image: "/placeholder.svg", link: "/second-hand", id: 1 },
    { title: "Rental Booking", description: "Accommodation and room rentals", icon: Home, image: "/placeholder.svg", link: "/rental-booking", id: 2 },
    { title: "Food Delivery", description: "Order meals from local restaurants", icon: Truck, image: "/placeholder.svg", link: "/food-delivery", id: 3 },
    { title: "My University", description: "University resources and information", icon: Calendar, image: "/placeholder.svg", link: "/my-university", id: 4 },
    { title: "Chemist", description: "Pharmacy and medical supplies", icon: Heart, image: "/placeholder.svg", link: "/chemist", id: 5 },
    { title: "Groceries", description: "Fresh groceries and daily essentials", icon: ShoppingCart, image: "/placeholder.svg", link: "/groceries", id: 6 },
    { title: "Roommate Finder", description: "Find compatible roommates", icon: Users, image: "/placeholder.svg", link: "/roommate-finder", id: 7 },
    { title: "Period Tracker", description: "Comprehensive menstrual health tracking", icon: Heart, image: "/placeholder.svg", link: "/period-tracker", id: 8 }
  ]);

  const [detailedServices] = useState([
    { 
      title: "Gas Delivery", 
      description: "Fast gas cylinder delivery", 
      icon: Fuel, 
      image: "/placeholder.svg", 
      link: "/gas-delivery", 
      id: 9,
      subtabs: [
        { name: "Total Gas Kenya", location: "Nairobi CBD", whatsapp: "+254702752033", services: ["6kg Refill - KES 1200", "13kg Refill - KES 2400", "Free Delivery"] },
        { name: "K-Gas", location: "Westlands", whatsapp: "+254702752033", services: ["6kg Refill - KES 1150", "13kg Refill - KES 2300", "Installation Service"] },
        { name: "Pro Gas", location: "Karen", whatsapp: "+254702752033", services: ["6kg Refill - KES 1180", "Leak Detection - KES 800"] }
      ]
    },
    { 
      title: "Laundry Services", 
      description: "Professional laundry and dry cleaning", 
      icon: Scissors, 
      image: "/placeholder.svg", 
      link: "/laundry", 
      id: 10,
      subtabs: [
        { name: "CleanMax Laundry", location: "Campus Gate", whatsapp: "+254702752033", services: ["Wash & Fold - KES 200/kg", "Dry Cleaning - KES 300/item", "Same Day Service"] },
        { name: "Fresh Wash", location: "Hostels Area", whatsapp: "+254702752033", services: ["Express Wash - KES 150/kg", "Ironing - KES 50/item", "Free Pickup/Delivery"] },
        { name: "Elite Cleaners", location: "Town Center", whatsapp: "+254702752033", services: ["Premium Service - KES 400/kg", "Stain Removal", "24hr Service"] }
      ]
    },
    { 
      title: "Boda Boda", 
      description: "Quick motorcycle transport", 
      icon: Car, 
      image: "/placeholder.svg", 
      link: "/boda-boda", 
      id: 11,
      subtabs: [
        { name: "Campus Riders", location: "Main Gate", whatsapp: "+254702752033", services: ["Short Distance - KES 50", "Long Distance - KES 100", "Package Delivery"] },
        { name: "Quick Rides", location: "Hostel Zone", whatsapp: "+254702752033", services: ["Campus Tours - KES 80", "Shopping Trips - KES 120", "24/7 Service"] },
        { name: "Safe Transport", location: "Library Area", whatsapp: "+254702752033", services: ["Night Rides - KES 150", "Lady Riders Available", "GPS Tracking"] }
      ]
    },
    { 
      title: "Cake & Catering", 
      description: "Custom cakes and event catering", 
      icon: Cake, 
      image: "/placeholder.svg", 
      link: "/cake-catering", 
      id: 12,
      subtabs: [
        { name: "Sweet Delights", location: "Town Market", whatsapp: "+254702752033", services: ["Birthday Cakes - KES 1500", "Wedding Cakes - KES 5000", "Custom Designs"] },
        { name: "Party Masters", location: "Catering Hall", whatsapp: "+254702752033", services: ["Event Catering - KES 500/person", "Buffet Setup", "Full Service"] },
        { name: "Cake Studio", location: "Arts District", whatsapp: "+254702752033", services: ["Themed Cakes - KES 2000", "Cupcakes - KES 100/dozen", "Same Day Orders"] }
      ]
    },
    { 
      title: "Graphic Design", 
      description: "Professional design services", 
      icon: Palette, 
      image: "/placeholder.svg", 
      link: "/graphic-design", 
      id: 13,
      subtabs: [
        { name: "Creative Hub", location: "Tech Center", whatsapp: "+254702752033", services: ["Logo Design - KES 3000", "Business Cards - KES 500", "Posters - KES 800"] },
        { name: "Design Pro", location: "Media House", whatsapp: "+254702752033", services: ["Branding Package - KES 8000", "Web Design - KES 15000", "Social Media Graphics"] },
        { name: "Art Station", location: "Student Center", whatsapp: "+254702752033", services: ["Assignment Design - KES 1000", "Presentation Templates", "Quick Edits"] }
      ]
    },
    { 
      title: "Photoshoot Services", 
      description: "Professional photography", 
      icon: Camera, 
      image: "/placeholder.svg", 
      link: "/photoshoot", 
      id: 14,
      subtabs: [
        { name: "Campus Shots", location: "Photography Studio", whatsapp: "+254702752033", services: ["Portrait Session - KES 2500", "Graduation Photos - KES 4000", "Event Coverage"] },
        { name: "Picture Perfect", location: "Art Gallery", whatsapp: "+254702752033", services: ["Fashion Shoot - KES 6000", "Product Photography", "Photo Editing"] },
        { name: "Memories Studio", location: "Main Campus", whatsapp: "+254702752033", services: ["ID Photos - KES 200", "Passport Photos - KES 300", "Same Day Prints"] }
      ]
    },
    { 
      title: "Tuktuk Service", 
      description: "Three-wheeler transport", 
      icon: Car, 
      image: "/placeholder.svg", 
      link: "/tuktuk", 
      id: 15,
      subtabs: [
        { name: "Campus Tuktuks", location: "Transport Hub", whatsapp: "+254702752033", services: ["Short Rides - KES 80", "Group Transport - KES 200", "Luggage Service"] },
        { name: "Eco Rides", location: "Green Zone", whatsapp: "+254702752033", services: ["Electric Tuktuks", "Silent Rides - KES 100", "Eco-Friendly"] },
        { name: "Tourist Tuktuks", location: "Visitor Center", whatsapp: "+254702752033", services: ["City Tours - KES 500", "Historical Sites", "Guide Included"] }
      ]
    },
    { 
      title: "Salon & Beauty", 
      description: "Beauty and grooming services", 
      icon: Scissors, 
      image: "/placeholder.svg", 
      link: "/salon-beauty", 
      id: 16,
      subtabs: [
        { name: "Glamour Salon", location: "Beauty Plaza", whatsapp: "+254702752033", services: ["Haircut & Style - KES 800", "Manicure - KES 500", "Facial Treatment"] },
        { name: "Nail Tech Pro", location: "Student Mall", whatsapp: "+254702752033", services: ["Gel Nails - KES 1200", "Nail Art - KES 800", "Pedicure - KES 600"] },
        { name: "Gents Barber", location: "Men's Corner", whatsapp: "+254702752033", services: ["Haircut - KES 300", "Beard Trim - KES 200", "Hot Towel Shave"] }
      ]
    }
  ]);

  const [newServiceForm, setNewServiceForm] = useState({
    title: "",
    description: "",
    link: "",
    image: ""
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdminAuthenticated(true);
      setIsAdminOpen(false);
      setAdminPassword("");
    }
  };

  const handleAddNewService = () => {
    if (newServiceForm.title && newServiceForm.description && newServiceForm.link) {
      const newService = {
        ...newServiceForm,
        icon: Package,
        id: Date.now()
      };
      setServices([...services, newService]);
      setNewServiceForm({ title: "", description: "", link: "", image: "" });
    }
  };

  const handleEditService = (service: any) => {
    setEditingService({ ...service });
  };

  const handleSaveService = () => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? editingService : s));
      setEditingService(null);
    }
  };

  const handleDeleteService = (serviceId: number) => {
    setServices(services.filter(s => s.id !== serviceId));
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const communityStats = [
    { icon: Users, value: "2,500+", label: "Active Students", color: "text-tmaxGreen-500" },
    { icon: Package, value: "500+", label: "Daily Orders", color: "text-blue-500" },
    { icon: Truck, value: "15 min", label: "Avg Delivery", color: "text-orange-500" },
    { icon: Heart, value: "4.8★", label: "User Rating", color: "text-pink-500" }
  ];

  const allServices = [...services, ...detailedServices];

  const renderServiceCard = (service: any, index: number, showActions = false) => (
    <Card key={index} className="hover:shadow-lg transition-all duration-300 border-tmaxGreen-100 bg-white/90 relative group">
      {showActions && isAdminAuthenticated && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <div className="flex space-x-1">
            <Button size="sm" variant="outline" onClick={() => console.log("View", service)}>
              <Eye className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleEditService(service)}>
              <Edit className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => console.log("Copy", service)}>
              <Copy className="w-3 h-3" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleDeleteService(service.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-tmaxGreen-100 to-pastelYellow-light flex items-center justify-center">
          <service.icon className="w-8 h-8 text-tmaxGreen-600" />
        </div>
        <CardTitle className="text-xl text-tmaxGreen-700">{service.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-4">{service.description}</p>
        {service.subtabs && (
          <div className="mb-4 text-sm text-gray-500">
            {service.subtabs.length} providers available
          </div>
        )}
        <Button 
          className="w-full bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
          onClick={() => window.location.href = service.link}
        >
          Explore Service
        </Button>
      </CardContent>
    </Card>
  );

  const renderAdminInterface = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={() => setIsAdminAuthenticated(false)} variant="outline">
            Logout
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allServices.map((service, index) => renderServiceCard(service, index, true))}
        </div>
      </div>
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
          <Button 
            size="lg"
            className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark text-lg px-8 py-3"
            onClick={scrollToServices}
          >
            Discover Services
          </Button>
        </div>

        {/* Coming Soon Ads Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-tmaxGreen-700 text-center">Featured Promotions</h3>
          <ComingSoonCanvas />
        </section>

        {/* Services Section */}
        <ServiceCarousel />

        {/* Why Choose Tmax Section */}
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

      <footer className="mt-16 bg-white/90 backdrop-blur-sm border-t border-tmaxGreen-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

            <div className="flex items-center space-x-4">
              <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Us
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Contact Information</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-tmaxGreen-600" />
                      <span>tmax@gmail.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-tmaxGreen-600" />
                      <span>+254702752033</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">Follow us:</span>
                      <Facebook className="w-5 h-5 text-blue-600" />
                      <Twitter className="w-5 h-5 text-blue-400" />
                      <Instagram className="w-5 h-5 text-pink-600" />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
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
        </div>
      </footer>
    </div>
  );
};

export default Index;
