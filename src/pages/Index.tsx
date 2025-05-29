import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ShoppingCart, Utensils, Fuel, Shirt, Sparkles, Users, RefreshCw, Pill, MessageSquare, Heart, FileText } from "lucide-react";

const Index = () => {
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
      comingSoon: true
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="text-2xl font-bold text-gray-800">
              Tmax Campus Connect
            </a>
            <Button onClick={() => window.location.href = "/login"} variant="outline">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-200 to-pink-200 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to Tmax Campus Connect
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Your one-stop platform for all campus needs.
          </p>
          <Button onClick={() => window.location.href = "/signup"} className="bg-purple-600 hover:bg-purple-700 text-white">
            Get Started
          </Button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
          Explore Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <a href={service.comingSoon ? "#" : service.link}>
                <div className={`bg-gradient-to-br ${service.bgColor} rounded-t-md p-4`}>
                  <service.icon className={`w-8 h-8 text-white bg-gradient-to-r ${service.color} rounded-full p-1`} />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {service.title}
                    {service.comingSoon && <span className="text-sm text-gray-500 ml-2">(Coming Soon)</span>}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/90 backdrop-blur-sm border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            &copy; 2024 Tmax Campus Connect. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
