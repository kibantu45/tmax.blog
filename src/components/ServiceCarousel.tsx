
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Utensils, 
  Bed, 
  ShoppingCart, 
  GraduationCap, 
  Pill, 
  Home,
  Users,
  MessageSquare,
  Calendar,
  Fuel,
  Scissors,
  Car,
  Cake,
  Palette,
  Camera,
  Phone,
  MapPin,
  Clock,
  Star
} from "lucide-react";

const ServiceCarousel = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceDialog, setShowServiceDialog] = useState(false);

  const mainServices = [
    {
      title: "Food Delivery",
      description: "Order delicious meals from campus restaurants",
      icon: Utensils,
      color: "from-orange-500 to-red-500",
      href: "/food-delivery",
      category: "food"
    },
    {
      title: "Student Housing",
      description: "Find your perfect accommodation near campus",
      icon: Bed,
      color: "from-blue-500 to-purple-500", 
      href: "/rental-booking",
      category: "housing"
    },
    {
      title: "Second-Hand Market",
      description: "Buy and sell pre-loved items within the community",
      icon: ShoppingCart,
      color: "from-green-500 to-teal-500",
      href: "/second-hand",
      category: "marketplace"
    },
    {
      title: "My University",
      description: "Access academic resources and university services",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-500",
      href: "/my-university",
      category: "academic"
    },
    {
      title: "Chemist",
      description: "Order medications and health products online",
      icon: Pill,
      color: "from-pink-500 to-rose-500",
      href: "/chemist",
      category: "health"
    },
    {
      title: "Groceries",
      description: "Fresh groceries delivered to your doorstep",
      icon: Home,
      color: "from-emerald-500 to-green-500",
      href: "/groceries",
      category: "groceries"
    },
    {
      title: "Roommate Finder",
      description: "Connect with potential roommates and flatmates",
      icon: Users,
      color: "from-yellow-500 to-orange-500",
      href: "/roommate-finder",
      category: "social"
    },
    {
      title: "TUM Gossip",
      description: "Stay updated with campus news and discussions",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
      href: "/tum-gossip",
      category: "social"
    },
    {
      title: "Bloom Period Tracker",
      description: "Track your menstrual cycle and reproductive health",
      icon: Calendar,
      color: "from-pink-500 to-purple-500",
      href: "/period-tracker",
      category: "health"
    }
  ];

  const discoverServices = [
    {
      title: "Gas Delivery",
      description: "Fast gas cylinder delivery to your doorstep",
      icon: Fuel,
      color: "from-orange-500 to-red-500",
      providers: [
        {
          name: "Total Gas Kenya",
          location: "Nairobi CBD",
          whatsapp: "+254702752033",
          description: "Leading gas supplier with 30+ years experience. Offers 6kg & 13kg refills with free delivery.",
          services: ["6kg Refill - KES 1200", "13kg Refill - KES 2400", "Free Delivery within 5km"],
          rating: 4.8,
          deliveryTime: "30-45 mins"
        },
        {
          name: "K-Gas",
          location: "Westlands",
          whatsapp: "+254702752033",
          description: "Premium gas services with professional installation. Known for quality and reliability.",
          services: ["6kg Refill - KES 1150", "13kg Refill - KES 2300", "Gas Stove Installation"],
          rating: 4.6,
          deliveryTime: "45-60 mins"
        },
        {
          name: "Pro Gas",
          location: "Karen",
          whatsapp: "+254702752033",
          description: "Professional gas solutions with leak detection services. Safety-first approach.",
          services: ["6kg Refill - KES 1180", "13kg Refill - KES 2350", "Leak Detection - KES 800"],
          rating: 4.7,
          deliveryTime: "40-55 mins"
        }
      ]
    },
    {
      title: "Laundry Services",
      description: "Professional laundry and dry cleaning services",
      icon: Scissors,
      color: "from-blue-500 to-cyan-500",
      providers: [
        {
          name: "CleanMax Laundry",
          location: "Campus Gate",
          whatsapp: "+254702752033",
          description: "Student-friendly laundry service with same-day delivery. Eco-friendly detergents used.",
          services: ["Wash & Fold - KES 200/kg", "Dry Cleaning - KES 300/item", "Same Day Service"],
          rating: 4.5,
          deliveryTime: "24 hours"
        },
        {
          name: "Fresh Wash",
          location: "Hostels Area",
          whatsapp: "+254702752033",
          description: "Express laundry service specializing in student clothing. Free pickup and delivery.",
          services: ["Express Wash - KES 150/kg", "Ironing - KES 50/item", "Free Pickup/Delivery"],
          rating: 4.3,
          deliveryTime: "12 hours"
        },
        {
          name: "Elite Cleaners",
          location: "Town Center",
          whatsapp: "+254702752033",
          description: "Premium laundry service with 24/7 operations. Specialized in delicate fabrics.",
          services: ["Premium Service - KES 400/kg", "Stain Removal Specialist", "24hr Service"],
          rating: 4.8,
          deliveryTime: "6 hours"
        }
      ]
    },
    {
      title: "Boda Boda",
      description: "Quick and affordable motorcycle transport",
      icon: Car,
      color: "from-green-500 to-emerald-500",
      providers: [
        {
          name: "Campus Riders",
          location: "Main Gate",
          whatsapp: "+254702752033",
          description: "Trusted campus transport with verified riders. Specializes in short-distance trips.",
          services: ["Short Distance - KES 50", "Long Distance - KES 100", "Package Delivery"],
          rating: 4.4,
          deliveryTime: "5-10 mins"
        },
        {
          name: "Quick Rides",
          location: "Hostel Zone",
          whatsapp: "+254702752033",
          description: "24/7 motorcycle service with GPS tracking. Offers campus tours and shopping trips.",
          services: ["Campus Tours - KES 80", "Shopping Trips - KES 120", "24/7 Service"],
          rating: 4.2,
          deliveryTime: "3-8 mins"
        },
        {
          name: "Safe Transport",
          location: "Library Area",
          whatsapp: "+254702752033",
          description: "Safety-focused transport with female riders available. Night rides with GPS tracking.",
          services: ["Night Rides - KES 150", "Lady Riders Available", "GPS Tracking"],
          rating: 4.7,
          deliveryTime: "5-12 mins"
        }
      ]
    },
    {
      title: "Cake & Catering",
      description: "Custom cakes and event catering services",
      icon: Cake,
      color: "from-pink-500 to-rose-500",
      providers: [
        {
          name: "Sweet Delights",
          location: "Town Market",
          whatsapp: "+254702752033",
          description: "Custom cake specialists with 10+ years experience. Famous for birthday and wedding cakes.",
          services: ["Birthday Cakes - KES 1500", "Wedding Cakes - KES 5000", "Custom Designs"],
          rating: 4.9,
          deliveryTime: "24-48 hours"
        },
        {
          name: "Party Masters",
          location: "Catering Hall",
          whatsapp: "+254702752033",
          description: "Full-service event catering company. Handles everything from small parties to large events.",
          services: ["Event Catering - KES 500/person", "Buffet Setup", "Full Event Planning"],
          rating: 4.6,
          deliveryTime: "3-7 days"
        },
        {
          name: "Cake Studio",
          location: "Arts District",
          whatsapp: "+254702752033",
          description: "Artistic cake designs and themed creations. Accepts same-day orders for cupcakes.",
          services: ["Themed Cakes - KES 2000", "Cupcakes - KES 100/dozen", "Same Day Orders"],
          rating: 4.4,
          deliveryTime: "2-24 hours"
        }
      ]
    },
    {
      title: "Graphic Design",
      description: "Professional design and creative services",
      icon: Palette,
      color: "from-purple-500 to-indigo-500",
      providers: [
        {
          name: "Creative Hub",
          location: "Tech Center",
          whatsapp: "+254702752033",
          description: "Student-focused design studio offering affordable rates. Specializes in academic presentations.",
          services: ["Logo Design - KES 3000", "Business Cards - KES 500", "Academic Posters - KES 800"],
          rating: 4.5,
          deliveryTime: "2-3 days"
        },
        {
          name: "Design Pro",
          location: "Media House",
          whatsapp: "+254702752033",
          description: "Professional design agency with corporate clients. Offers complete branding packages.",
          services: ["Branding Package - KES 8000", "Web Design - KES 15000", "Social Media Graphics"],
          rating: 4.8,
          deliveryTime: "5-10 days"
        },
        {
          name: "Art Station",
          location: "Student Center",
          whatsapp: "+254702752033",
          description: "Quick turnaround design service for students. Affordable rates for assignments.",
          services: ["Assignment Design - KES 1000", "Presentation Templates", "Quick Edits - KES 200"],
          rating: 4.2,
          deliveryTime: "24 hours"
        }
      ]
    },
    {
      title: "Photoshoot Services",
      description: "Professional photography for all occasions",
      icon: Camera,
      color: "from-yellow-500 to-orange-500",
      providers: [
        {
          name: "Campus Shots",
          location: "Photography Studio",
          whatsapp: "+254702752033",
          description: "Campus photography specialists. Perfect for graduation photos and portraits.",
          services: ["Portrait Session - KES 2500", "Graduation Photos - KES 4000", "Event Coverage"],
          rating: 4.7,
          deliveryTime: "3-5 days"
        },
        {
          name: "Picture Perfect",
          location: "Art Gallery",
          whatsapp: "+254702752033",
          description: "High-end photography studio offering fashion and product photography services.",
          services: ["Fashion Shoot - KES 6000", "Product Photography - KES 3000", "Photo Editing"],
          rating: 4.9,
          deliveryTime: "7-10 days"
        },
        {
          name: "Memories Studio",
          location: "Main Campus",
          whatsapp: "+254702752033",
          description: "Quick photo services for ID and passport photos. Same-day printing available.",
          services: ["ID Photos - KES 200", "Passport Photos - KES 300", "Same Day Prints"],
          rating: 4.3,
          deliveryTime: "Same day"
        }
      ]
    },
    {
      title: "Tuktuk Service",
      description: "Eco-friendly three-wheeler transport",
      icon: Car,
      color: "from-teal-500 to-cyan-500",
      providers: [
        {
          name: "Campus Tuktuks",
          location: "Transport Hub",
          whatsapp: "+254702752033",
          description: "Campus-based tuktuk service perfect for group transport and luggage delivery.",
          services: ["Short Rides - KES 80", "Group Transport - KES 200", "Luggage Service"],
          rating: 4.4,
          deliveryTime: "5-15 mins"
        },
        {
          name: "Eco Rides",
          location: "Green Zone",
          whatsapp: "+254702752033",
          description: "Electric tuktuk service promoting eco-friendly transport. Silent and clean rides.",
          services: ["Electric Rides - KES 100", "Silent Transport", "Eco-Friendly Option"],
          rating: 4.6,
          deliveryTime: "8-12 mins"
        },
        {
          name: "Tourist Tuktuks",
          location: "Visitor Center",
          whatsapp: "+254702752033",
          description: "Guided tuktuk tours around campus and city. Includes knowledgeable tour guides.",
          services: ["City Tours - KES 500", "Historical Sites Tour", "Guide Included"],
          rating: 4.8,
          deliveryTime: "30-60 mins"
        }
      ]
    },
    {
      title: "Salon & Beauty",
      description: "Professional beauty and grooming services",
      icon: Scissors,
      color: "from-rose-500 to-pink-500",
      providers: [
        {
          name: "Glamour Salon",
          location: "Beauty Plaza",
          whatsapp: "+254702752033",
          description: "Full-service salon offering haircuts, styling, and facial treatments. Student discounts available.",
          services: ["Haircut & Style - KES 800", "Manicure - KES 500", "Facial Treatment - KES 1200"],
          rating: 4.6,
          deliveryTime: "Same day"
        },
        {
          name: "Nail Tech Pro",
          location: "Student Mall",
          whatsapp: "+254702752033",
          description: "Specialized nail salon with latest nail art techniques. Gel and acrylic services available.",
          services: ["Gel Nails - KES 1200", "Nail Art - KES 800", "Pedicure - KES 600"],
          rating: 4.7,
          deliveryTime: "2-3 hours"
        },
        {
          name: "Gents Barber",
          location: "Men's Corner",
          whatsapp: "+254702752033",
          description: "Traditional barbershop for men. Offers classic cuts and modern styling services.",
          services: ["Haircut - KES 300", "Beard Trim - KES 200", "Hot Towel Shave - KES 400"],
          rating: 4.5,
          deliveryTime: "1 hour"
        }
      ]
    }
  ];

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setShowServiceDialog(true);
  };

  const handleWhatsAppContact = (provider: any) => {
    const message = `Hi ${provider.name}! I'm interested in your services. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/${provider.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToServices = () => {
    document.getElementById('discover-services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Services Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Campus Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Everything you need for university life, all in one place
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-3"
            onClick={scrollToServices}
          >
            Discover More Services
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white border-0`}
                    onClick={() => window.location.href = service.href}
                  >
                    Explore Service
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Discover Services Section */}
        <div id="discover-services-section" className="pt-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Discover More Services
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Additional services to make your campus life even more convenient
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <CardHeader className="pb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-center text-sm">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge className="bg-blue-100 text-blue-800">
                      {service.providers.length} Providers
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Service Providers Dialog */}
      {showServiceDialog && selectedService && (
        <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <selectedService.icon className="w-6 h-6 mr-2" />
                {selectedService.title} Providers
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6">
              {selectedService.providers.map((provider: any, index: number) => (
                <Card key={index} className="border-gray-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-gray-900">{provider.name}</CardTitle>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-medium">{provider.rating}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span className="text-sm">{provider.deliveryTime}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{provider.location}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleWhatsAppContact(provider)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Contact Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{provider.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Services Offered:</h4>
                      <ul className="list-disc list-inside text-gray-600 space-y-1">
                        {provider.services.map((service: string, serviceIndex: number) => (
                          <li key={serviceIndex} className="text-sm">{service}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ServiceCarousel;
