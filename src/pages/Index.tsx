
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
  Shield
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import ServiceCarousel from "@/components/ServiceCarousel";
import BingwaSokoni from "@/components/BingwaSokoni";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const { user } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    { 
      title: "Groceries", 
      description: "Fresh produce and essentials", 
      icon: ShoppingCart, 
      color: "bg-green-500",
      link: "/groceries" 
    },
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
      title: "Second Hand", 
      description: "Buy & sell used items", 
      icon: Heart, 
      color: "bg-yellow-500",
      link: "/second-hand" 
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
      title: "Errand Services", 
      description: "Personal assistance", 
      icon: Zap, 
      color: "bg-violet-500",
      link: "/errand-services" 
    }
  ];

  const featuredServices = [
    {
      title: "Bloom Period Tracker",
      description: "Track your menstrual cycle and health",
      icon: Calendar,
      color: "bg-pink-500",
      link: "/bloom-period-tracker"
    }
  ];

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">TMAX</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">About Us</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Hello, {user.email}</span>
                  <Button variant="outline" size="sm" onClick={() => window.location.href = '/profile'}>
                    Profile
                  </Button>
                </div>
              ) : (
                <div className="hidden sm:flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => window.location.href = '/login'}>
                    Login
                  </Button>
                  <Button size="sm" onClick={() => window.location.href = '/signup'}>
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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Campus
            <span className="text-blue-600"> Lifestyle</span>
            <br />
            <span className="text-green-600">Simplified</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Everything you need for university life - from groceries to services, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start Shopping
            </Button>
            <Button size="lg" variant="outline">
              Explore Services
            </Button>
          </div>
        </div>
      </section>

      {/* Advertisement Carousel */}
      <section className="py-8">
        <ServiceCarousel />
      </section>

      {/* Featured Services */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer bg-white/90" onClick={() => window.location.href = service.link}>
                <CardHeader>
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Access Service
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 sm:px-6 lg:px-8" id="services">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg bg-white/90"
            />
            <ShoppingCart className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer bg-white/90" onClick={() => window.location.href = service.link}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bingwa Sokoni Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <BingwaSokoni />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">TMAX</h3>
              <p className="text-gray-400 mb-4">
                Your one-stop solution for all campus lifestyle needs.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com/tmaxkenya" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com/tmaxkenya" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com/tmaxkenya" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com/tmaxkenya" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="https://wa.me/254702752033?text=Hi%20Hustle%20Sasa!" className="text-gray-400 hover:text-green-400 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>TUM Campus, Nairobi</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+254 702 752 033</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@tmax.co.ke</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-blue-400">Newsletter</h4>
              <p className="text-gray-400 mb-4">Stay updated with our latest offers and services.</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-gray-800 border-gray-700 text-white"
                />
                <Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TMAX. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <BottomNavigation />
    </div>
  );
};

export default Index;
