
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
      title: "Blades Emporium001",
      description: "Available now ",
      image: "/lovable-uploads/emporium.jpg",
      price: "New stock alert",
      rating: 4.8,
      badge: "Fast",
      link: "https://www.instagram.com/blades_emporium001?igsh=MTg5dmVma3J0aHA1MQ==",
      bgColor: "bg-gradient-to-r from-green-600 to-emerald-700"
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
