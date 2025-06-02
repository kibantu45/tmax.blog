
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, Utensils, Flame, Shirt, Users, Home, BookOpen, Car, ShoppingCart, Pill, GraduationCap, MessageSquare, Heart, Scissors, Menu, X, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";
import ServiceCarousel from "@/components/ServiceCarousel";

const Index = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const allServices = [
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
    },
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
    },
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

  const filteredServices = searchQuery 
    ? allServices.filter(service => 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allServices;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50 pb-20">
      {/* Navigation Menu */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Tmax
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-tmaxGreen-600 transition-colors">Services</a>
              <a href="/about" className="text-gray-700 hover:text-tmaxGreen-600 transition-colors">About Us</a>
              <a href="/contact" className="text-gray-700 hover:text-tmaxGreen-600 transition-colors">Contact</a>
              
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-tmaxGreen-600">Services</a>
                <a href="/about" className="block px-3 py-2 text-gray-700 hover:text-tmaxGreen-600">About Us</a>
                <a href="/contact" className="block px-3 py-2 text-gray-700 hover:text-tmaxGreen-600">Contact</a>
                {user ? (
                  <div className="px-3 py-2">
                    <span className="text-sm text-gray-600 block mb-2">Hi, {user.email?.split('@')[0]}</span>
                    <Button size="sm" onClick={() => window.location.href = '/profile'}>
                      Profile
                    </Button>
                  </div>
                ) : (
                  <div className="px-3 py-2 space-y-2">
                    <Button variant="outline" size="sm" onClick={() => window.location.href = '/login'} className="w-full">
                      Login
                    </Button>
                    <Button size="sm" onClick={() => window.location.href = '/signup'} className="w-full">
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

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

        {/* Advertisement Carousel */}
        <ServiceCarousel />

        {/* Services Grid - Free Layout */}
        <div id="services" className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Our Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredServices.map((service, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 hover:scale-105 duration-200"
                onClick={() => window.location.href = service.link}
              >
                <CardHeader className="pb-2 text-center">
                  <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mx-auto mb-3`}>
                    <service.icon className={`w-6 h-6 ${service.textColor}`} />
                  </div>
                  <CardTitle className="text-sm md:text-base">{service.title}</CardTitle>
                  <CardDescription className="text-xs md:text-sm">{service.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

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

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <h3 className="text-xl font-bold">Tmax</h3>
              </div>
              <p className="text-gray-300">
                Your one-stop platform for all campus life needs. Making student life easier, one service at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Popular Services</h4>
              <ul className="space-y-2">
                <li><a href="/groceries" className="text-gray-300 hover:text-white transition-colors">Groceries</a></li>
                <li><a href="/food-delivery" className="text-gray-300 hover:text-white transition-colors">Food Delivery</a></li>
                <li><a href="/laundry-services" className="text-gray-300 hover:text-white transition-colors">Laundry Services</a></li>
                <li><a href="/chemist" className="text-gray-300 hover:text-white transition-colors">Pharmacy</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-tmaxGreen-400" />
                  <span className="text-gray-300">support@tmax.co.ke</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-tmaxGreen-400" />
                  <span className="text-gray-300">+254 702 752 033</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-tmaxGreen-400" />
                  <span className="text-gray-300">Nairobi, Kenya</span>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 Tmax. All rights reserved. Empowering campus life across Kenya.
            </p>
          </div>
        </div>
      </footer>

      <BottomNavigation />
    </div>
  );
};

export default Index;
