
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Truck } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const ServiceCarousel = () => {
  const advertisements = [
    {
      id: 1,
      title: "CCC Magazine",
      description: "The latest edition of CCC Magazine - 2nd Edition",
      image: "/lovable-uploads/7349f6be-f149-42a3-b2f7-77924eabd7a9.png",
      price: "Available Now",
      rating: 4.9,
      badge: "New Edition",
      link: "https://wa.me/254702752033?text=Hi, I'm interested in the CCC Magazine 2nd Edition",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
    {
      id: 2,
      title: "Cane Carter Gallery",
      description: "Premium art pieces and custom frames for your space",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80",
      price: "From KSh 2,500",
      rating: 4.9,
      badge: "Featured",
      link: "https://wa.me/254702752033?text=Hi, I'm interested in Cane Carter Gallery services",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-800"
    },
    {
      id: 3,
      title: "Blades Emporium001",
      description: "Get your orders delivered ",
      image: "https://www.instagram.com/p/DJTZfHls5Q6/?igsh=cm9mZDB0cm1xeTRp",
      price: "now open",
      rating: 4.8,
      badge: "Fast",
      link: "https://www.instagram.com/blades_emporium001?igsh=MTg5dmVma3J0aHA1MQ==",
      bgColor: "bg-gradient-to-r from-green-600 to-emerald-700"
    },
    {
      id: 4,
      title: "Student Discounts",
      description: "Save up to 50% on all campus essentials",
      image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=800&q=80",
      price: "Up to 50% off",
      rating: 4.7,
      badge: "Hot Deal",
      link: "https://wa.me/254702752033?text=Hi, I want to know about student discounts",
      bgColor: "bg-gradient-to-r from-blue-600 to-indigo-700"
    },
    {
      id: 5,
      title: "Campus Fresh Market",
      description: "Fresh organic produce delivered to your doorstep",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
      price: "From KSh 200",
      rating: 4.9,
      badge: "Organic",
      link: "https://wa.me/254702752033?text=Hi, I'm interested in fresh organic produce",
      bgColor: "bg-gradient-to-r from-green-500 to-teal-600"
    },
    {
      id: 6,
      title: "Study Buddy Services",
      description: "Find study partners and academic support",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      price: "Free to join",
      rating: 4.6,
      badge: "New",
      link: "https://wa.me/254702752033?text=Hi, I want to join Study Buddy Services",
      bgColor: "bg-gradient-to-r from-blue-600 to-indigo-700"
    }
  ];

  return (
    <div className="mb-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {advertisements.map((ad) => (
            <CarouselItem key={ad.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className={`${ad.bgColor} p-6 text-white relative`}>
                    <Badge className="absolute top-4 right-4 bg-white/20 text-white border-white/30">
                      {ad.badge}
                    </Badge>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(ad.rating) ? 'text-yellow-300 fill-current' : 'text-white/50'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm">{ad.rating}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
                    <p className="text-white/90 text-sm mb-4">{ad.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">{ad.price}</span>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        onClick={() => window.open(ad.link, '_blank')}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img 
                        src={ad.image} 
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
};

export default ServiceCarousel;
