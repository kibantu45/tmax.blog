
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pill, Heart, Thermometer, Shield, Search, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Chemist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const medications = [
    { 
      id: "med1", 
      name: "Paracetamol 500mg", 
      price: 50, 
      description: "Pain and fever relief", 
      category: "pain-relief", 
      prescription: false, 
      stock: 100,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med2", 
      name: "Ibuprofen 400mg", 
      price: 80, 
      description: "Anti-inflammatory", 
      category: "pain-relief", 
      prescription: false, 
      stock: 50,
      image: "https://images.unsplash.com/photo-1585435557343-3b092031333c?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med3", 
      name: "Amoxicillin 250mg", 
      price: 200, 
      description: "Antibiotic", 
      category: "prescription", 
      prescription: true, 
      stock: 30,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med4", 
      name: "Vitamin C Tablets", 
      price: 120, 
      description: "Immune system support", 
      category: "vitamins", 
      prescription: false, 
      stock: 75,
      image: "/lovable-uploads/vitamin-c.jpg"
    },
    { 
      id: "med5", 
      name: "Postinor 2", 
      price: 60, 
      description: "Emergency contraceptive", 
      category: "contraceptive", 
      prescription: false, 
      stock: 75,
      image: "https://www.assetpharmacy.com/wp-content/uploads/2017/09/Postinor-2-Tablets-2-Tablets-2.jpg"
    },
    { 
      id: "med6", 
      name: "Diclofenac 50mg", 
      price: 90, 
      description: "Anti-inflammatory pain relief", 
      category: "pain-relief", 
      prescription: false, 
      stock: 60,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med7", 
      name: "Omeprazole 20mg", 
      price: 150, 
      description: "Acid reducer for stomach ulcers", 
      category: "digestion", 
      prescription: false, 
      stock: 40,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med8", 
      name: "Cetirizine 10mg", 
      price: 70, 
      description: "Antihistamine for allergies", 
      category: "cold-flu", 
      prescription: false, 
      stock: 80,
      image: "https://images.unsplash.com/photo-1585435557343-3b092031333c?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med9", 
      name: "Strepsils Lozenges", 
      price: 120, 
      description: "Sore throat relief", 
      category: "cold-flu", 
      prescription: false, 
      stock: 90,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med10", 
      name: "ABZ Tablets", 
      price: 100, 
      description: "Deworming medication", 
      category: "medications", 
      prescription: false, 
      stock: 40,
      image: "https://images.unsplash.com/photo-1585435557343-3b092031333c?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const services = [
    { name: "Prescription Consultation", description: "Get advice on your medications", icon: Pill, price: "Free" },
    { name: "Blood Pressure Check", description: "Quick BP monitoring service", icon: Heart, price: "100" },
    { name: "Temperature Check", description: "Body temperature measurement", icon: Thermometer, price: "50" },
    { name: "Health Screening", description: "Basic health checkup", icon: Shield, price: "500" }
  ];

  const handleAddToCart = (item: any) => {
    console.log('Adding to cart:', item);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || "/placeholder.svg",
      category: "pharmacy"
    });
  };

  const handleOrderNow = (item: any) => {
    const message = `Hi, I want to order ${item.name} - ${item.description}. Price: KSh ${item.price}`;
    window.open(`https://wa.me/254702752033?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMedicationCard = (med: any, index: number) => (
    <Card key={med.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
        <img 
          src={med.image} 
          alt={med.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{med.name}</CardTitle>
            <CardDescription>{med.description}</CardDescription>
          </div>
          {med.prescription && <Badge variant="destructive" className="animate-pulse">Prescription Required</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-blue-600 animate-pulse">KSh {med.price}</span>
          <Badge variant="outline" className="glass">{med.stock} in stock</Badge>
        </div>
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => handleAddToCart(med)}
            disabled={med.stock === 0}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
            onClick={() => handleOrderNow(med)}
            disabled={med.stock === 0}
          >
            <Phone className="w-4 h-4 mr-2" />
            Order Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header with glassmorphism */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-blue-700 flex items-center">
                <Pill className="w-8 h-8 mr-3 animate-bounce" />
                Campus Pharmacy
              </h1>
              <p className="text-gray-600 mt-2">Your health and wellness partner</p>
            </div>
            <Button onClick={() => window.history.back()} variant="outline" className="glass hover:scale-105 transition-all duration-300">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar with glassmorphism */}
        <div className="mb-8 animate-fade-in">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search medications and health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glass backdrop-blur-lg bg-white/30 border-white/20 hover:bg-white/40 transition-all duration-300"
            />
          </div>
        </div>

        <Tabs defaultValue="medications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glass backdrop-blur-lg bg-white/30 border-white/20">
            <TabsTrigger 
              value="medications" 
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700 transition-all duration-300 hover:scale-105"
            >
              <Pill className="w-4 h-4 mr-2" />
              Medications
            </TabsTrigger>
            <TabsTrigger 
              value="services" 
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-700 transition-all duration-300 hover:scale-105"
            >
              <Heart className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger 
              value="emergency" 
              className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-700 transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-4 h-4 mr-2" />
              Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="medications" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedications.map((med, index) => renderMedicationCard(med, index))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 glass bg-blue-100/50 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600 animate-pulse">
                        {service.price === "Free" ? "Free" : `KSh ${service.price}`}
                      </span>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
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
            <div className="glass backdrop-blur-lg bg-red-50/30 border-red-200/30 rounded-lg p-6 mb-6 animate-fade-in">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contacts</h3>
              <p className="text-red-700 mb-4">For medical emergencies, contact these numbers immediately:</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Campus Health Center:</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300" onClick={() => window.open('tel:+254702752033')}>
                    Call Now
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ambulance Services:</span>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300" onClick={() => window.open('tel:999')}>
                    Call 999
                  </Button>
                </div>
              </div>
            </div>
            
            <Card className="glass backdrop-blur-lg bg-white/30 border-white/20 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-red-800">Emergency Medicine Kit</CardTitle>
                <CardDescription>Quick access to essential emergency medications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-500 shadow-lg animate-pulse"
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
