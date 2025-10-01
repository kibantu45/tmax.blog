import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  Users, 
  MessageSquare, 
  Calendar, 
  Utensils, 
  Truck, 
  Shirt, 
  Scissors, 
  Home, 
  BookOpen, 
  Fuel, 
  Car, 
  Pill,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  Heart,
  Zap,
  Shield,
  Globe,
  Wrench
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import ServiceCarousel from "@/components/ServiceCarousel";
import BingwaSokoni from "@/components/BingwaSokoni";
import BottomNavigation from "@/components/BottomNavigation";
import { WebViewModal } from "@/components/WebViewModal";

const Index = () => {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);

  const services = [
    { 
      title: "Food Delivery", 
      description: "Delicious meals delivered", 
      icon: Utensils, 
      color: "bg-orange-500",
      link: "/food-delivery" 
    },
    { 
      title: "Gas Delivery", 
      description: "Quick gas cylinder refills", 
      icon: Fuel, 
      color: "bg-red-500",
      link: "/gas-delivery" 
    },
    { 
      title: "Laundry Services", 
      description: "Professional cleaning", 
      icon: Shirt, 
      color: "bg-blue-500",
      link: "/laundry-services" 
    },
    { 
      title: "Salon & Beauty", 
      description: "Beauty and grooming", 
      icon: Scissors, 
      color: "bg-pink-500",
      link: "/salon-beauty" 
    },
    { 
      title: "Roommate Finder", 
      description: "Find compatible roommates", 
      icon: Users, 
      color: "bg-purple-500",
      link: "/roommate-finder" 
    },
    { 
      title: "Rental Booking", 
      description: "Affordable accommodation", 
      icon: Home, 
      color: "bg-indigo-500",
      link: "/rental-booking" 
    },
    { 
      title: "Marketplace", 
      description: "Buy & sell secondhand items", 
      icon: Heart, 
      color: "bg-yellow-500",
      link: "/marketplace" 
    },
    { 
      title: "Chemist", 
      description: "Medicines and health products", 
      icon: Pill, 
      color: "bg-teal-500",
      link: "/chemist" 
    },
    { 
      title: "My University", 
      description: "University services", 
      icon: BookOpen, 
      color: "bg-cyan-500",
      link: "/my-university" 
    },
    { 
      title: "TUM Gossip", 
      description: "Campus news and discussions", 
      icon: MessageSquare, 
      color: "bg-rose-500",
      link: "/tum-gossip" 
    },
    { 
      title: "Transport Services", 
      description: "Boda Boda & Tuk Tuk rides", 
      icon: Car, 
      color: "bg-amber-500",
      link: "/transport-services" 
    },
    { 
      title: "E-Shop", 
      description: "Cooking oils, sugar, flour & more", 
      icon: ShoppingCart, 
      color: "bg-orange-500",
      link: "/e-shop" 
    },
    { 
      title: "Errand Services", 
      description: "Personal assistance", 
      icon: Zap, 
      color: "bg-violet-500",
      link: "/errand-services" 
    },
    { 
      title: "Get Cheap Services", 
      description: "Find affordable service providers", 
      icon: Wrench, 
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
      link: "/service-providers"
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <div className="flex items-center space-x-3 animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">TMAX</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              <a href="#services" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">Services</a>
              <a href="/about" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">About Us</a>
              <a href="/contact" className="px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium">Contact</a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3 animate-fade-in">
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">Hello, {user.email?.split('@')[0]}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.location.href = '/profile'}
                    className="rounded-lg border-2 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    Profile
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex space-x-2 animate-fade-in">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.location.href = '/login'}
                    className="rounded-lg border-2 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => window.location.href = '/signup'}
                    className="rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-2">
                <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">Services</a>
                <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">About Us</a>
                <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors px-4 py-2">Contact</a>
                {!user && (
                  <div className="flex space-x-2 px-4 pt-2">
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/login'}>
                      Login
                    </Button>
                    <Button size="sm" onClick={() => window.location.href = '/signup'}>
                      Sign Up
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="mb-6 animate-fade-in">
            <Badge className="px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-700 border-2 border-blue-200 hover:bg-blue-100 transition-colors">
              🎓 Your Campus Super App
            </Badge>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Your Campus
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"> Lifestyle</span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Simplified</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Everything you need for university life - from groceries to services, all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200" 
              onClick={scrollToServices}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start Shopping
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg rounded-xl border-2 hover:border-blue-600 hover:bg-blue-50 transition-all duration-200"
              onClick={scrollToServices}
            >
              Explore Services
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-blue-100 hover:shadow-lg transition-all duration-200">
              <Zap className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
              <p className="text-sm text-gray-600 text-center">Get your orders in minutes</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-green-100 hover:shadow-lg transition-all duration-200">
              <Shield className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payments</h3>
              <p className="text-sm text-gray-600 text-center">Safe and trusted transactions</p>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-purple-100 hover:shadow-lg transition-all duration-200">
              <Star className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Quality Service</h3>
              <p className="text-sm text-gray-600 text-center">Verified providers only</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Carousel */}
      <section className="py-8">
        <ServiceCarousel />
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8" id="services">
        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <Input
              type="text"
              placeholder="🔍 Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 h-14 text-lg bg-white/90 backdrop-blur-sm border-2 border-blue-100 rounded-2xl shadow-lg hover:shadow-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
            <ShoppingCart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-green-700 bg-clip-text text-transparent">Our Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Choose from our wide range of services designed specifically for students</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredServices.map((service, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer bg-white/95 backdrop-blur-sm border-2 border-transparent hover:border-blue-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => service.link ? navigate(service.link) : setIsWebViewOpen(true)}
              >
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-blue-700 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bingwa Sokoni Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="animate-fade-in">
          <BingwaSokoni />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">T</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">TMAX</h3>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your one-stop solution for all campus lifestyle needs.
              </p>
              <div className="flex space-x-3">
                <a href="https://facebook.com/hustlesasa" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-200">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/hustlesasa" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:bg-gray-700 transition-all duration-200">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/hustlesasa" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:bg-gray-700 transition-all duration-200">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/hustlesasa" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-all duration-200">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://wa.me/254702752033?text=Hi%20Hustle%20Sasa!" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-200">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-bold text-lg mb-6 text-blue-400">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/about" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Contact</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 flex items-center"><ChevronRight className="w-4 h-4 mr-1" /> Privacy Policy</a></li>
              </ul>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-bold text-lg mb-6 text-blue-400">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start hover:text-white transition-colors">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-blue-400" />
                  <span className="leading-relaxed">TUM Campus, Nairobi</span>
                </div>
                <div className="flex items-center hover:text-white transition-colors">
                  <Phone className="w-5 h-5 mr-3 text-green-400" />
                  <span>+254 702 752 033</span>
                </div>
                <div className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-5 h-5 mr-3 text-purple-400" />
                  <span>info@tmax.co.ke</span>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-bold text-lg mb-6 text-blue-400">Newsletter</h4>
              <p className="text-gray-400 mb-4 leading-relaxed">Stay updated with our latest offers and services.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-lg bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <Button className="rounded-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm sm:text-base">&copy; 2024 TMAX. All rights reserved. Made with ❤️ for students.</p>
          </div>
        </div>
      </footer>

      <BottomNavigation />
      
      <WebViewModal
        isOpen={isWebViewOpen}
        onClose={() => setIsWebViewOpen(false)}
        url="https://tmax.co.ke"
        title="Official Tmax Website"
      />
    </div>
  );
};

export default Index;
