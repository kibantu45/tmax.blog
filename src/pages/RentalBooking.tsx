
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Bed, Bath, Wifi, Car, Home, Users, Phone, Eye, MessageCircle } from "lucide-react";

const RentalBooking = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const accommodations = [
    {
      id: 1,
      title: "Bedsitter Near Campus",
      price: 10000,
      location: "leisure",
      type: "bedsitter",
      bedrooms: false,
      bathrooms: false,
      amenities: ["elecricity", "water", "security"],
      image: "/lovable-uploads/l1.jpeg",
      available: true,
      sellerPhone: "+254702752033",
      photos: [
        "/lovable-uploads/l1.jpeg",
        "/lovable-uploads/l2.jpeg",
        "/lovable-uploads/l3.jpeg",
        "/lovable-uploads/l4.jpeg",
        "/lovable-uploads/l5.jpeg"
      ]
    },
    {
      id: 2,
      title: "Private Hostel Available",
      price: 4000,
      location: "Near Tum and Kenya Coast",
      type: "hostel",
      bedrooms: false,
      bathrooms: false,
      amenities: ["close to the road", "24/7 water supply", "Wifi available", "token electricity", "clean environment","tight security"],
      image: "https://i.ibb.co/h1Z02v4L/h4.jpg",
      available: true,
      sellerPhone: "+254702752033",
      photos: [
        "https://i.ibb.co/8nKT19mS/h1.jpg",
        "https://i.ibb.co/S412qSHw/h2.jpg",
        "https://i.ibb.co/Q3VkgRPZ/h3.jpg",
        "https://i.ibb.co/h1Z02v4L/h4.jpg"
      ]
    },
    {
      id: 3,
      title: "Spacious 1-Bedroom Apartment",
      price: 450,
      location: "City Center",
      type: "1bedroom",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["WiFi", "Gym", "Security"],
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      available: true,
      sellerPhone: "+254701234569",
      photos: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop"
      ]
    },
    {
      id: 4,
      title: "2 Bedroom Makupa",
      price: 25000,
      location: "Makupa",
      type: "2bedroom",
      bedrooms: 2,
      bathrooms: 1,
      amenities: ["executive finish", "24/7 water supply", "token electricity", "tight security", "close to road"],
      image: "https://i.ibb.co/SwLvCxmj/Whats-App-Image-2025-06-08-at-15-26-30-1.jpg",
      available: true,
      sellerPhone: "+254702752033",
      photos: [
        "https://i.ibb.co/qLQcxqHC/Whats-App-Image-2025-06-08-at-15-26-30-3.jpg",
        "https://i.ibb.co/JWVGYF0k/Whats-App-Image-2025-06-08-at-15-26-30-2.jpg",
        "https://i.ibb.co/SwLvCxmj/Whats-App-Image-2025-06-08-at-15-26-30-1.jpg",
        "https://i.ibb.co/0jPmRJ8d/Whats-App-Image-2025-06-08-at-15-26-30.jpg"
      ]
    },
    {
      id: 5,
      title: "Airbnb Studio 1bedroom",
      price: 3500,
      location: "makupa",
      type: "airbnb",
      bedrooms: 1,
      bathrooms: 1,
      amenities: ["cabro access", "tight security", "near the road", "fully furnished"],
      image: "https://i.ibb.co/cKTGxwR7/Whats-App-Image-2025-06-08-at-14-28-24.jpg",
      available: true,
      sellerPhone: "+254701234571",
      photos: [
        "https://i.ibb.co/DDRxvsQ2/Whats-App-Image-2025-06-08-at-14-28-25-2.jpg",
        "https://i.ibb.co/67kDT7wv/Whats-App-Image-2025-06-08-at-14-28-25-1.jpg",
        "https://i.ibb.co/6736Qy5t/Whats-App-Image-2025-06-08-at-14-28-25.jpg",
        "https://i.ibb.co/bj5WpxcH/Whats-App-Image-2025-06-08-at-14-28-24-2.jpg",
        "https://i.ibb.co/WWJ9rHkj/Whats-App-Image-2025-06-08-at-14-28-24-1.jpg",
        "https://i.ibb.co/cKTGxwR7/Whats-App-Image-2025-06-08-at-14-28-24.jpg"
      ]
    },
    {
      id: 6,
      title: "Single Room",
      price: 3000,
      location: "lights(sokomjinga)",
      type: "single",
      bedrooms: false,
      bathrooms: false,
      amenities: ["near road", "token available", "nice finish"],
      image: "https://i.ibb.co/RWfjv5Y/Whats-App-Image-2025-06-08-at-15-16-19-1.jpg",
      available: true,
      sellerPhone: "+254702752033",
      photos: [
        "https://i.ibb.co/W40LKcP5/Whats-App-Image-2025-06-08-at-15-16-20.jpg",
        "https://i.ibb.co/S4RTg6ns/Whats-App-Image-2025-06-08-at-15-16-19-2.jpg",
        "https://i.ibb.co/RWfjv5Y/Whats-App-Image-2025-06-08-at-15-16-19-1.jpg",
        "https://i.ibb.co/20Ccq23F/Whats-App-Image-2025-06-08-at-15-16-19.jpg"
      ]
    }
  ];

  const filteredAccommodations = selectedFilter === "all" 
    ? accommodations 
    : accommodations.filter(acc => acc.type === selectedFilter);

  const handleWhatsAppContact = (accommodation: any) => {
    const message = `Hi! I'm interested in your ${accommodation.title} listed for KSh ${accommodation.price}/month in ${accommodation.location}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${accommodation.sellerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookNow = (accommodation: any) => {
    const message = `Hi! I'd like to book ${accommodation.title} at KSh ${accommodation.price}/month in ${accommodation.location}. Please confirm availability and booking process.`;
    const whatsappUrl = `https://wa.me/${accommodation.sellerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);
  const [showPhotos, setShowPhotos] = useState(false);

  const viewPhotos = (photos: string[]) => {
    setSelectedPhotos(photos);
    setShowPhotos(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <Home className="text-white font-bold text-lg w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Tmax Housing
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tmaxGreen-600 via-pastelYellow to-tmaxGreen-600 bg-clip-text text-transparent">
            Student Accommodation
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect home away from home. Browse verified student accommodations near campus.
          </p>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-white/80 border border-tmaxGreen-200">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("all")}
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="bedsitter" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("bedsitter")}
            >
              Bedsitters
            </TabsTrigger>
            <TabsTrigger 
              value="hostel" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("hostel")}
            >
              Hostels
            </TabsTrigger>
            <TabsTrigger 
              value="1bedroom" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("1bedroom")}
            >
              1 Bedroom
            </TabsTrigger>
            <TabsTrigger 
              value="2bedroom" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("2bedroom")}
            >
              2 Bedroom
            </TabsTrigger>
            <TabsTrigger 
              value="airbnb" 
              className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white"
              onClick={() => setSelectedFilter("airbnb")}
            >
              Airbnb
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <Card key={accommodation.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group">
              <div className="relative">
                <img 
                  src={accommodation.image} 
                  alt={accommodation.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className={`absolute top-2 right-2 ${
                  accommodation.available ? 'bg-tmaxGreen-500' : 'bg-red-500'
                } text-white`}>
                  {accommodation.available ? 'Available' : 'Occupied'}
                </Badge>
                <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md">
                  <span className="text-lg font-bold text-tmaxGreen-600">KSh {accommodation.price}</span>
                  <span className="text-sm text-gray-600">/month</span>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {accommodation.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{accommodation.location}</span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center text-gray-600">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{accommodation.bedrooms} bed</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{accommodation.bathrooms} bath</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {accommodation.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => viewPhotos(accommodation.photos)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Photos
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    disabled={!accommodation.available}
                    onClick={() => handleWhatsAppContact(accommodation)}
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Inquire
                  </Button>
                  <Button 
                    size="sm"
                    className="flex-1 bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
                    disabled={!accommodation.available}
                    onClick={() => handleBookNow(accommodation)}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Photo Viewer Modal */}
      {showPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowPhotos(false)}>
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Property Photos</h3>
              <Button variant="ghost" onClick={() => setShowPhotos(false)}>×</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedPhotos.map((photo, index) => (
                <img key={index} src={photo} alt={`Property photo ${index + 1}`} className="w-full h-64 object-cover rounded" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalBooking;
