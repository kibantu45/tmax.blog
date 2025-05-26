
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pill, Heart, Thermometer, Shield, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Chemist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const medications = [
    { id: "med1", name: "Paracetamol 500mg", price: 50, description: "Pain and fever relief", category: "pain-relief", prescription: false, stock: 100 },
    { id: "med2", name: "Ibuprofen 400mg", price: 80, description: "Anti-inflammatory", category: "pain-relief", prescription: false, stock: 50 },
    { id: "med3", name: "Amoxicillin 250mg", price: 200, description: "Antibiotic", category: "prescription", prescription: true, stock: 30 },
    { id: "med4", name: "Vitamin C Tablets", price: 120, description: "Immune system support", category: "vitamins", prescription: false, stock: 75 }
  ];

  const healthProducts = [
    { id: "health1", name: "Digital Thermometer", price: 800, description: "Accurate temperature measurement", category: "devices", prescription: false, stock: 20 },
    { id: "health2", name: "Blood Pressure Monitor", price: 2500, description: "Home BP monitoring", category: "devices", prescription: false, stock: 10 },
    { id: "health3", name: "First Aid Kit", price: 1200, description: "Complete emergency kit", category: "emergency", prescription: false, stock: 15 },
    { id: "health4", name: "Hand Sanitizer 500ml", price: 300, description: "99.9% germ protection", category: "hygiene", prescription: false, stock: 200 }
  ];

  const services = [
    { name: "Prescription Consultation", description: "Get advice on your medications", icon: Pill, price: "Free" },
    { name: "Blood Pressure Check", description: "Quick BP monitoring service", icon: Heart, price: "100" },
    { name: "Temperature Check", description: "Body temperature measurement", icon: Thermometer, price: "50" },
    { name: "Health Screening", description: "Basic health checkup", icon: Shield, price: "500" }
  ];

  const handleAddToCart = (item: any) => {
    if (item.prescription) {
      window.open(`https://wa.me/254702752033?text=Hi, I need to order ${item.name} (prescription required). Please help me with the process.`, '_blank');
    } else {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: "/placeholder.svg",
        category: "pharmacy"
      });
    }
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHealthProducts = healthProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-tmaxGreen-700">Campus Pharmacy</h1>
              <p className="text-gray-600 mt-2">Your health and wellness partner</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search medications and health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/90"
            />
          </div>
        </div>

        <Tabs defaultValue="medications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="medications" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Medications
            </TabsTrigger>
            <TabsTrigger value="health-products" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Health Products
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Services
            </TabsTrigger>
            <TabsTrigger value="emergency" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medications" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedications.map((med) => (
                <Card key={med.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{med.name}</CardTitle>
                        <CardDescription>{med.description}</CardDescription>
                      </div>
                      {med.prescription && <Badge variant="destructive">Prescription Required</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-tmaxGreen-600">KSh {med.price}</span>
                      <Badge variant="outline">{med.stock} in stock</Badge>
                    </div>
                    <Button 
                      className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                      onClick={() => handleAddToCart(med)}
                      disabled={med.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {med.prescription ? 'Request Prescription' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health-products" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHealthProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-tmaxGreen-600">KSh {product.price}</span>
                      <Badge variant="outline">{product.stock} in stock</Badge>
                    </div>
                    <Button 
                      className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-tmaxGreen-100 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-tmaxGreen-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-tmaxGreen-600">
                        {service.price === "Free" ? "Free" : `KSh ${service.price}`}
                      </span>
                      <Button 
                        className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                        onClick={() => window.open(`https://wa.me/254702752033?text=Hi, I would like to book ${service.name}`, '_blank')}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contacts</h3>
              <p className="text-red-700 mb-4">For medical emergencies, contact these numbers immediately:</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Campus Health Center:</span>
                  <Button size="sm" onClick={() => window.open('tel:+254702752033')}>
                    Call Now
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ambulance Services:</span>
                  <Button size="sm" onClick={() => window.open('tel:999')}>
                    Call 999
                  </Button>
                </div>
              </div>
            </div>
            
            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle>Emergency Medicine Kit</CardTitle>
                <CardDescription>Quick access to essential emergency medications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need emergency medications. This is urgent.', '_blank')}
                >
                  Request Emergency Kit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Chemist;
