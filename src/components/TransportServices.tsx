
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Star } from "lucide-react";

const TransportServices = () => {
  const bodaBodaOperators = [
    {
      id: 1,
      name: "John Mwangi",
      phone: "+254701234567",
      location: "TUM Main Gate",
      rating: 4.8,
      speciality: "Campus to City rides",
      availability: "24/7"
    },
    {
      id: 2,
      name: "Peter Kamau",
      phone: "+254702345678",
      location: "TUM Hostels",
      rating: 4.9,
      speciality: "Quick campus rides",
      availability: "6AM - 10PM"
    },
    {
      id: 3,
      name: "David Kiprotich",
      phone: "+254703456789",
      location: "TUM Library",
      rating: 4.7,
      speciality: "Long distance rides",
      availability: "24/7"
    }
  ];

  const tukTukOperators = [
    {
      id: 1,
      name: "Mary Wanjiku",
      phone: "+254704567890",
      location: "TUM Main Campus",
      rating: 4.6,
      speciality: "Group transport",
      availability: "6AM - 8PM",
      capacity: "3-4 passengers"
    },
    {
      id: 2,
      name: "Samuel Otieno",
      phone: "+254705678901",
      location: "TUM Gate B",
      rating: 4.8,
      speciality: "Shopping trips",
      availability: "7AM - 9PM",
      capacity: "3-4 passengers"
    }
  ];

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  return (
    <div className="space-y-8">
      {/* Boda Boda Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🏍️ Boda Boda Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bodaBodaOperators.map((operator) => (
            <Card key={operator.id} className="bg-white/90 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{operator.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{operator.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{operator.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{operator.availability}</span>
                </div>
                <p className="text-sm text-blue-600 font-medium">{operator.speciality}</p>
                <Button 
                  onClick={() => handleCall(operator.phone)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call {operator.phone}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tuk Tuk Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          🛺 Tuk Tuk Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tukTukOperators.map((operator) => (
            <Card key={operator.id} className="bg-white/90 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{operator.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{operator.rating}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{operator.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{operator.availability}</span>
                </div>
                <p className="text-sm text-green-600 font-medium">Capacity: {operator.capacity}</p>
                <p className="text-sm text-blue-600 font-medium">{operator.speciality}</p>
                <Button 
                  onClick={() => handleCall(operator.phone)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call {operator.phone}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="text-center">
            <h4 className="font-semibold text-blue-800 mb-2">24/7 Emergency Transport</h4>
            <p className="text-blue-600 text-sm mb-3">For urgent transport needs</p>
            <Button onClick={() => handleCall("+254702752033")} className="bg-red-600 hover:bg-red-700">
              <Phone className="w-4 h-4 mr-2" />
              Emergency: +254 702 752 033
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransportServices;
