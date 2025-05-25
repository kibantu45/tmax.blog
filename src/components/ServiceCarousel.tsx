
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, Utensils, GraduationCap, Pill, ShoppingCart, Users, Smartphone, MessageSquare } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Student Accommodation",
    description: "Find your perfect student housing",
    icon: Home,
    link: "/rental-booking",
    color: "bg-pastelYellow"
  },
  {
    id: 2,
    title: "Food Delivery",
    description: "Campus restaurants at your door",
    icon: Utensils,
    link: "/food-delivery",
    color: "bg-tmaxGreen-200"
  },
  {
    id: 3,
    title: "University Resources",
    description: "Academic support and information",
    icon: GraduationCap,
    link: "/my-university",
    color: "bg-pastelYellow-light"
  },
  {
    id: 4,
    title: "Pharmacy",
    description: "Healthcare and medicine delivery",
    icon: Pill,
    link: "/chemist",
    color: "bg-tmaxGreen-100"
  },
  {
    id: 5,
    title: "Groceries",
    description: "Fresh groceries delivered",
    icon: ShoppingCart,
    link: "/groceries",
    color: "bg-pastelYellow"
  },
  {
    id: 6,
    title: "Roommate Finder",
    description: "Find compatible roommates",
    icon: Users,
    link: "/roommate-finder",
    color: "bg-tmaxGreen-200"
  },
  {
    id: 7,
    title: "Mobile Data",
    description: "Top up your mobile data",
    icon: Smartphone,
    link: "/mobile-data",
    color: "bg-pastelYellow-light"
  },
  {
    id: 8,
    title: "Campus Gossip",
    description: "Latest campus news and events",
    icon: MessageSquare,
    link: "/tum-gossip",
    color: "bg-tmaxGreen-100"
  }
];

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = 3;
  const maxIndex = Math.max(0, services.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="w-1/3 flex-shrink-0 px-2">
                <Card className="hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group">
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
              </div>
            );
          })}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-tmaxGreen-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
