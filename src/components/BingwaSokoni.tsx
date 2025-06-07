
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, MessageSquare, Star } from "lucide-react";

const BingwaSokoni = () => {
  const bundles = [
    {
      id: 1,
      name: "Student Cheapest Bundles",
      description: "Purchase bundles even with okoa jahazi",
      price: "select your package",
      originalPrice: false,
      items: ["24hrs deals", "sms deals", "weekly mins deals", "weekly data deals", "monthly data deals"],
      rating: 4.8,
      reviews: 45,
      image: "/loveable-uploads/bingwa.png"
    }
  ];

  const handleOrderBundle = (bundle: any) => {
    const message = `Hi! I'm interested in the "${bundle.name}" bundle for ${bundle.price}. Please provide more details about availability and delivery.`;
    window.open(`https://wa.me/254702752033?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Bingwa Sokoni Bundles</h2>
        <p className="text-gray-600">Curated bundles for student life - Save money with our combo deals!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <Card key={bundle.id} className="bg-white/90 hover:shadow-lg transition-shadow overflow-hidden">
            <div className="aspect-video bg-gray-100 overflow-hidden">
              <img 
                src={bundle.image} 
                alt={bundle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{bundle.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{bundle.description}</p>
                </div>
                <Badge className="bg-green-500">Save</Badge>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(bundle.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({bundle.reviews} reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Includes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {bundle.items.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-green-600">{bundle.price}</span>
                  <span className="text-sm text-gray-500 line-through ml-2">{bundle.originalPrice}</span>
                </div>
              </div>

              <Button 
                onClick={() => handleOrderBundle(bundle)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Order via WhatsApp
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BingwaSokoni;
