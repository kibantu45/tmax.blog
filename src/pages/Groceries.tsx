
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Star, Clock, MapPin, Plus, Phone, Search, Apple, Beef, Milk } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNavigation from "@/components/BottomNavigation";

const Groceries = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const groceryItems = [
    // Fresh Produce
    { id: "grocery1", name: "Fresh Bananas", price: 10, description: "Sweet ripe bananas", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80", category: "produce", store: "Fresh Market", whatsapp: "+254702752033" },
    { id: "grocery2", name: "Tomatoes", price: 10, description: "Fresh red tomatoes", image: "https://i.ibb.co/TMtQjfRL/tomatoes.jpg", category: "produce", store: "Fresh Market", whatsapp: "+254702752033" },
    { id: "grocery3", name: "Carrots", price: 10, description: "Organic carrots", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80", category: "produce", store: "Fresh Market", whatsapp: "+254702752033" },
    { id: "grocery4", name: "sukuma wiki", price: 10, description: "Mixed green leafy vegetables", image: "https://i.ibb.co/7Jjk7dRg/sukuma.jpg", category: "produce", store: "Fresh Market", whatsapp: "+254702752033" },
     { id: "grocery5", name: "onion", price: 10, description: "Red onions", image: "https://i.ibb.co/Jj5v9xPD/onions.jpg", category: "produce", store: "Fresh Market", whatsapp: "+254702752033" },
    
    // Dairy Products
    { id: "grocery6", name: "Fresh Milk", price: 60, description: "500ml fresh milk", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80", category: "dairy", store: "Dairy Corner", whatsapp: "+254702752034" },
    { id: "grocery7", name: "yogurt", price: 60, description: "300ml sweet natural yogurt", image: "https://i.ibb.co/Y4KHsHfN/yogurt.jpg", category: "dairy", store: "Dairy Corner", whatsapp: "+254702752034" },
    { id: "grocery8", name: "cupcakes", price: 25, description: "sweet cupcakes", image: "https://i.ibb.co/Z6DYT2pP/cupcakes.jpg", category: "dairy", store: "Dairy Corner", whatsapp: "+254702752033" },
    { id: "grocery9", name: "Eggs", price: 480, description: "One tray of eggs", image: "https://i.ibb.co/zWkcPNPW/eggs.jpg", category: "dairy", store: "Dairy Corner", whatsapp: "+254702752034" },
    
    // Meat Products
    { id: "grocery10", name: "Chicken", price: 500, description: "Fresh chicken - 1kg", image: "https://i.ibb.co/7J7Kc8n5/chick.jpg", category: "meat", store: "Butchery Plus", whatsapp: "+254702752033" },
    { id: "grocery11", name: "beef", price: 300, description: "Fresh beef", image: "https://i.ibb.co/PvM52KPf/beef.jpg", category: "meat", store: "Butchery Plus", whatsapp: "+254702752033" },
  ];

  const categories = ["all", "produce", "dairy", "meat"];

  const filteredItems = groceryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateQuantity = (itemId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 1) + change)
    }));
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        category: "Groceries",
        provider: item.store
      });
    }
  };

  const handleOrderNow = (item: any) => {
    const quantity = quantities[item.id] || 1;
    const message = `Hi ${item.store}! I'd like to order: ${item.name} - KES ${item.price} x ${quantity} = KES ${item.price * quantity}. Please confirm availability and delivery time.`;
    const whatsappUrl = `https://wa.me/${item.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pb-20">
      {/* Header with glassmorphism */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center animate-fade-in">
              <ShoppingCart className="w-8 h-8 mr-3 animate-bounce" />
              Groceries
            </h1>
            <Button onClick={() => window.history.back()} variant="outline" className="glass hover:scale-105 transition-all duration-300">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter with glassmorphism */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search groceries..."
              className="pl-10 glass backdrop-blur-lg bg-white/30 border-white/20 hover:bg-white/40 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer capitalize transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category 
                    ? "bg-green-600 hover:bg-green-700 shadow-lg animate-pulse" 
                    : "glass bg-white/20 hover:bg-green-50/50 backdrop-blur-sm"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "produce" ? "Fresh Produce" : category === "dairy" ? "Dairy Products" : category === "meat" ? "Meat & Fish" : category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Items Grid with enhanced effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <Card key={item.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-lg">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="text-sm">{item.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600 animate-pulse">KSh {item.price}</span>
                  <span className="text-sm text-gray-500">{item.store}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 glass hover:scale-110 transition-all duration-200"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{quantities[item.id] || 1}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0 glass hover:scale-110 transition-all duration-200"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={() => handleOrderNow(item)}
                    variant="outline"
                    className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 glass hover:scale-105 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-gray-500">No grocery items found matching your search.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Groceries;
