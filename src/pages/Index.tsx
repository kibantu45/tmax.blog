import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, ShoppingCart, Utensils, Fuel, Shirt, Sparkles, Users, RefreshCw, Pill, MessageSquare, Heart, FileText, Mail, Phone, Facebook, Twitter, Instagram, Menu, Search, User, Bell } from "lucide-react";
import ComingSoonCanvas from "@/components/ComingSoonCanvas";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { toast } = useToast();

  // Push notification simulation
  useEffect(() => {
    const showNotifications = () => {
      const notifications = [
        "🔥 Trending: New food delivery options available!",
        "💊 Health Alert: Pharmacy offers 20% off vitamins",
        "📚 Campus Update: Library hours extended this week",
        "🛍️ Special Offer: Free delivery on groceries over KSh 1000"
      ];
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      
      toast({
        title: "📱 Campus Update",
        description: randomNotification,
        duration: 5000,
      });
    };

    // Show first notification after 3 seconds
    const timer1 = setTimeout(showNotifications, 3000);
    
    // Show random notifications every 30 seconds
    const timer2 = setInterval(showNotifications, 30000);

    return () => {
      clearTimeout(timer1);
      clearInterval(timer2);
    };
  }, [toast]);

  const services = [
    {
      title: "Groceries",
      description: "Fresh groceries delivered to your doorstep",
      icon: ShoppingCart,
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50",
      link: "/groceries",
      comingSoon: false
    },
    {
      title: "Food Delivery",
      description: "Delicious meals from campus restaurants",
      icon: Utensils,
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50",
      link: "/food-delivery",
      comingSoon: false
    },
    {
      title: "Gas Delivery",
      description: "Quick gas cylinder refills and installation",
      icon: Fuel,
      color: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-50",
      link: "/gas-delivery",
      comingSoon: false
    },
    {
      title: "Laundry Services",
      description: "Professional laundry and dry cleaning",
      icon: Shirt,
      color: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-50",
      link: "/laundry-services",
      comingSoon: false
    },
    {
      title: "Errand Services",
      description: "Post office and HELB office services",
      icon: FileText,
      color: "from-teal-500 to-cyan-600",
      bgColor: "from-teal-50 to-cyan-50",
      link: "/errand-services",
      comingSoon: false
    },
    {
      title: "Salon & Beauty",
      description: "Hair, nails, and beauty treatments",
      icon: Sparkles,
      color: "from-pink-500 to-rose-600",
      bgColor: "from-pink-50 to-rose-50",
      link: "/salon-beauty",
      comingSoon: false
    },
    {
      title: "Roommate Finder",
      description: "Find compatible roommates near campus",
      icon: Users,
      color: "from-blue-500 to-purple-600",
      bgColor: "from-blue-50 to-purple-50",
      link: "/roommate-finder",
      comingSoon: false
    },
    {
      title: "Rental Booking",
      description: "Find and book student accommodation",
      icon: Home,
      color: "from-green-500 to-blue-600",
      bgColor: "from-green-50 to-blue-50",
      link: "/rental-booking",
      comingSoon: false
    },
    {
      title: "Second Hand",
      description: "Buy and sell used items with students",
      icon: RefreshCw,
      color: "from-yellow-500 to-orange-600",
      bgColor: "from-yellow-50 to-orange-50",
      link: "/second-hand",
      comingSoon: false
    },
    {
      title: "Pharmacy",
      description: "Medicine and health products delivery",
      icon: Pill,
      color: "from-red-500 to-pink-600",
      bgColor: "from-red-50 to-pink-50",
      link: "/chemist",
      comingSoon: false
    },
    {
      title: "Campus Gossip",
      description: "Latest campus news, events and discussions",
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-600",
      bgColor: "from-indigo-50 to-purple-50",
      link: "/tum-gossip",
      comingSoon: false
    },
    {
      title: "Bloom Period Tracker",
      description: "Track your menstrual cycle and health",
      icon: Heart,
      color: "from-pink-500 to-purple-600",
      bgColor: "from-pink-50 to-purple-50",
      link: "/bloom-period-tracker",
      comingSoon: false
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = services.filter(service => 
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-green-50">
                    <Menu className="w-6 h-6 text-green-700" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 bg-gradient-to-b from-green-50 to-yellow-50">
                  <SheetHeader>
                    <SheetTitle className="text-green-700 text-xl font-bold">Tmax Services</SheetTitle>
                    <SheetDescription className="text-green-600">
                      All your campus needs in one place
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-2">
                    {services.map((service) => (
                      <a
                        key={service.title}
                        href={service.link}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200 hover:shadow-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <service.icon className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800">{service.title}</span>
                      </a>
                    ))}
                    <hr className="border-green-200 my-4" />
                    <a
                      href="/about"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">About</span>
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Contact</span>
                    </a>
                    <a
                      href="/terms"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Terms of Use</span>
                    </a>
                    <a
                      href="/privacy"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/60 transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">Privacy Policy</span>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <a href="/" className="text-2xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
                  Tmax
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-64 border-green-200 focus:border-green-400 focus:ring-green-400"
                  />
                </div>
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-green-200 rounded-md shadow-xl z-50 max-h-64 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      searchResults.map((service) => (
                        <a
                          key={service.title}
                          href={service.link}
                          className="flex items-center space-x-3 p-3 hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setShowSearchResults(false);
                            setSearchQuery("");
                          }}
                        >
                          <service.icon className="w-4 h-4 text-green-600" />
                          <div>
                            <div className="font-medium text-sm text-green-800">{service.title}</div>
                            <div className="text-xs text-green-600">{service.description}</div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="p-3 text-green-600 text-sm">No services found</div>
                    )}
                  </div>
                )}
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-green-50">
                <Bell className="w-5 h-5 text-green-700" />
              </Button>
              <Button onClick={() => window.location.href = "/cart"} variant="ghost" size="icon" className="hover:bg-green-50">
                <ShoppingCart className="w-5 h-5 text-green-700" />
              </Button>
              <Button onClick={() => window.location.href = "/login"} variant="outline" className="border-green-300 text-green-700 hover:bg-green-50">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-300 via-yellow-200 to-green-300 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold text-green-900 mb-4 drop-shadow-sm">
            Welcome to Tmax
          </h1>
          <p className="text-xl text-green-800 mb-8 drop-shadow-sm">
            Your one-stop platform for all campus needs.
          </p>
          <Button onClick={() => window.location.href = "/signup"} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-200">
            Get Started
          </Button>
        </div>
      </div>

      {/* Advertisement Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">Featured Advertisement</h3>
          <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-xl p-8 border border-green-200 shadow-lg">
            <img
              src="/lovable-uploads/20233c98-5f17-4311-a23a-2c2cbdb7bb68.png"
              alt="CCC Magazine Advertisement"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
            <div className="mt-4">
              <h4 className="text-xl font-bold text-green-800">CCC Magazine - 2nd Edition</h4>
              <p className="text-green-700 mt-2">Discover the latest campus trends and stories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold text-green-800 mb-8 text-center">
          Explore Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-xl transition-all duration-300 border-green-200 hover:border-green-300 group">
              <a href={service.comingSoon ? "#" : service.link}>
                <div className={`bg-gradient-to-br ${service.bgColor} rounded-t-md p-4 group-hover:scale-105 transition-transform duration-200`}>
                  <service.icon className={`w-8 h-8 text-white bg-gradient-to-r ${service.color} rounded-full p-1`} />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    {service.title}
                    {service.comingSoon && <span className="text-sm text-green-500 ml-2">(Coming Soon)</span>}
                  </h3>
                  <p className="text-green-700">
                    {service.description}
                  </p>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/95 backdrop-blur-md border-t border-green-200 py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Tmax</h3>
              <p className="text-green-700 mb-4">
                Your one-stop platform for all campus needs. We connect students with essential services to make university life easier and more convenient.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-4">Contact Us</h4>
              <div className="space-y-2">
                <div className="flex items-center text-green-700">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>tmax@gmail.com</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+254741297209</span>
                </div>
              </div>
            </div>

            {/* Social Media & Links */}
            <div>
              <h4 className="text-lg font-semibold text-green-800 mb-4">Follow Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-green-700 hover:text-green-900 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-2">
                <a href="/about" className="block text-green-700 hover:text-green-900 transition-colors">About Us</a>
                <a href="/contact" className="block text-green-700 hover:text-green-900 transition-colors">Contact</a>
                <a href="/privacy" className="block text-green-700 hover:text-green-900 transition-colors">Privacy Policy</a>
                <a href="/terms" className="block text-green-700 hover:text-green-900 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-green-200 mt-8 pt-8 text-center">
            <p className="text-green-700">
              &copy; 2024 Tmax. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
