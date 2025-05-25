
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, TrendingUp, Star, Calendar, Search, ShoppingCart } from "lucide-react";
import ServiceCarousel from "@/components/ServiceCarousel";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const { itemCount } = useCart();

  const communityStats = [
    { label: "Active Students", value: "8.5K", icon: Users, color: "text-tmaxGreen-500" },
    { label: "Services Available", value: "8", icon: TrendingUp, color: "text-pastelYellow-dark" },
    { label: "Campus Locations", value: "12", icon: Star, color: "text-tmaxGreen-600" },
    { label: "Weekly Orders", value: "450+", icon: Calendar, color: "text-pastelYellow-dark" }
  ];

  const quickActions = [
    { title: "Order Food", description: "Quick delivery from campus restaurants", link: "/food-delivery", color: "bg-tmaxGreen-100" },
    { title: "Find Housing", description: "Browse student accommodation options", link: "/rental-booking", color: "bg-pastelYellow-light" },
    { title: "Buy & Sell", description: "Second-hand marketplace for students", link: "/second-hand", color: "bg-tmaxGreen-100" },
    { title: "Campus Resources", description: "University information and support", link: "/my-university", color: "bg-pastelYellow-light" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50">
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
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" size="sm" className="relative" onClick={() => window.location.href = "/cart"}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </Badge>
                )}
              </Button>
              <Button className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark">
                Join Tmax
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-tmaxGreen-600 via-pastelYellow to-tmaxGreen-600 bg-clip-text text-transparent">
            Your Campus, Simplified
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Everything you need as a student in one place. From accommodation to food delivery, 
            groceries to university resources - Tmax has got you covered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark">
              Explore Services
            </Button>
            <Button size="lg" variant="outline" className="border-tmaxGreen-200 hover:bg-tmaxGreen-50">
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-tmaxGreen-100 bg-white/80">
              <CardContent className="pt-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Carousel */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-tmaxGreen-700">Our Services</h3>
          <ServiceCarousel />
        </section>

        {/* Quick Actions */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-tmaxGreen-700">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-tmaxGreen-100 group cursor-pointer">
                <CardContent className={`p-6 ${action.color} group-hover:bg-opacity-80 transition-colors`}>
                  <h4 className="font-semibold text-lg mb-2 text-tmaxGreen-800">{action.title}</h4>
                  <p className="text-tmaxGreen-700 text-sm mb-4">{action.description}</p>
                  <Button 
                    size="sm" 
                    className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
                    onClick={() => window.location.href = action.link}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-tmaxGreen-700">Why Choose Tmax?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-tmaxGreen-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Student-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Designed specifically for university students with services that matter to your daily life.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/80">
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Fast & Reliable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Quick delivery times and reliable service you can count on for all your campus needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-tmaxGreen-100 bg-white/80">
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

      {/* Footer */}
      <footer className="mt-16 bg-white/80 backdrop-blur-sm border-t border-tmaxGreen-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Tmax. Your trusted campus companion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
