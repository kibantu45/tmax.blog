
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Bed, Bath, Wifi, Car, Home, Users, Phone, Eye, MessageCircle, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const RentalBooking = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const { data, error } = await supabase
        .from('rentals')
        .select(`
          *,
          rental_photos (
            image_url,
            is_primary
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match the expected format
      const transformedData = data.map(rental => ({
        id: rental.id,
        title: rental.title,
        price: rental.price_per_day,
        location: rental.location,
        type: rental.category,
        bedrooms: rental.category?.includes('bedroom') ? parseInt(rental.category.charAt(0)) || 0 : false,
        bathrooms: rental.category?.includes('bedroom') ? 1 : false,
        amenities: rental.amenities || [],
        image: rental.image_url || (rental.rental_photos?.find((p: any) => p.is_primary)?.image_url) || '/placeholder.svg',
        available: true, // You can add an availability field to the database if needed
        sellerPhone: rental.contact_phone || rental.contact_whatsapp || "+254702752033",
        photos: rental.rental_photos?.map((p: any) => p.image_url) || []
      }));

      setAccommodations(transformedData);
    } catch (error: any) {
      console.error('Error fetching rentals:', error);
      toast({
        title: "Error",
        description: "Failed to load rentals",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-tmaxGreen-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAccommodations.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No rentals available for the selected category.</p>
              </div>
            ) : (
              filteredAccommodations.map((accommodation) => (
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
              ))
            )}
          </div>
        )}
      </div>

      {/* Photo Viewer Modal */}
      {showPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowPhotos(false)}>
          <div className="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Property Photos</h3>
              <Button variant="ghost" onClick={() => setShowPhotos(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            {selectedPhotos.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No additional photos available for this property.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedPhotos.map((photo, index) => (
                  <img 
                    key={index} 
                    src={photo} 
                    alt={`Property photo ${index + 1}`} 
                    className="w-full h-64 object-cover rounded cursor-pointer hover:scale-105 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalBooking;
