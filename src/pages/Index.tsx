
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Home, ShoppingCart, Utensils, Fuel, Shirt, Sparkles, Users, RefreshCw, Pill, MessageSquare, Heart, FileText, Mail, Phone, Facebook, Twitter, Instagram, Menu, Search, User } from "lucide-react";
import ComingSoonCanvas from "@/components/ComingSoonCanvas";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

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
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-green-700">Tmax Services</SheetTitle>
                    <SheetDescription>
                      All your campus needs in one place
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {services.map((service) => (
                      <a
                        key={service.title}
                        href={service.link}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <service.icon className="w-5 h-5 text-green-600" />
                        <span className="font-medium">{service.title}</span>
                      </a>
                    ))}
                    <hr className="border-green-200" />
                    <a
                      href="/about"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="font-medium">About</span>
                    </a>
                    <a
                      href="/contact"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Phone className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Contact</span>
                    </a>
                  </div>
                </SheetContent>
              </Sheet>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <a href="/" className="text-2xl font-bold text-green-800">
                  Tmax
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                {showSearchResults && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
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
                            <div className="font-medium text-sm">{service.title}</div>
                            <div className="text-xs text-gray-500">{service.description}</div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="p-3 text-gray-500 text-sm">No services found</div>
                    )}
                  </div>
                )}
              </div>
              <Button onClick={() => window.location.href = "/cart"} variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
              </Button>
              <Button onClick={() => window.location.href = "/login"} variant="outline">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-200 to-yellow-200 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-green-900 mb-4">
            Welcome to Tmax
          </h1>
          <p className="text-lg text-green-800 mb-8">
            Your one-stop platform for all campus needs.
          </p>
          <Button onClick={() => window.location.href = "/signup"} className="bg-green-600 hover:bg-green-700 text-white">
            Get Started
          </Button>
        </div>
      </div>

      {/* Advertisement Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-green-800 mb-4">Featured Advertisement</h3>
          <div className="bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg p-8 border border-green-200">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
              alt="Campus Services Advertisement"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
            <div className="mt-4">
              <h4 className="text-xl font-bold text-green-800">Transform Your Campus Experience</h4>
              <p className="text-green-700 mt-2">Discover convenience at your fingertips with Tmax services</p>
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
            <Card key={service.title} className="hover:shadow-lg transition-shadow border-green-200">
              <a href={service.comingSoon ? "#" : service.link}>
                <div className={`bg-gradient-to-br ${service.bgColor} rounded-t-md p-4`}>
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
      <footer className="bg-white/90 backdrop-blur-sm border-t border-green-200 py-12">
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
                <a href="#" className="text-green-700 hover:text-green-900">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-green-700 hover:text-green-900">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-green-700 hover:text-green-900">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <div className="space-y-2">
                <a href="/about" className="block text-green-700 hover:text-green-900">About Us</a>
                <a href="/contact" className="block text-green-700 hover:text-green-900">Contact</a>
                <a href="#" className="block text-green-700 hover:text-green-900">Privacy Policy</a>
                <a href="#" className="block text-green-700 hover:text-green-900">Terms of Service</a>
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
