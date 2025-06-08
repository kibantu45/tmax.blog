
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Utensils, Star, Clock, MapPin, Plus, ShoppingCart, Phone, Search } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNavigation from "@/components/BottomNavigation";

const FoodDelivery = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const allMenuItems = [
    // Campus Eats
    { id: "food1", name: "Ugali & Sukuma Wiki", price: 150, description: "Traditional Kenyan meal", image: "🍽️", category: "local", restaurant: "Campus Eats", whatsapp: "+254702752033" },
    { id: "food2", name: "Nyama Choma", price: 300, description: "Grilled meat with sides", image: "🥩", category: "local", restaurant: "Campus Eats", whatsapp: "+254702752033" },
    { id: "food3", name: "Pilau Rice", price: 200, description: "Spiced rice with meat", image: "🍚", category: "local", restaurant: "Campus Eats", whatsapp: "+254702752033" },
    { id: "food4", name: "Chapati & Beans", price: 120, description: "Flatbread with beans", image: "🫓", category: "local", restaurant: "Campus Eats", whatsapp: "+254702752033" },
    
    // Quick Bites
    { id: "food5", name: "Chicken Burger", price: 250, description: "Crispy chicken burger", image: "🍔", category: "fastfood", restaurant: "Quick Bites", whatsapp: "+254702752033" },
    { id: "food6", name: "French Fries", price: 100, description: "Golden crispy fries", image: "🍟", category: "fastfood", restaurant: "Quick Bites", whatsapp: "+254702752033" },
    { id: "food7", name: "Pizza Slice", price: 180, description: "Margherita pizza slice", image: "🍕", category: "fastfood", restaurant: "Quick Bites", whatsapp: "+254702752033" },
    { id: "food8", name: "Sausage Roll", price: 80, description: "Hot sausage roll", image: "🌭", category: "fastfood", restaurant: "Quick Bites", whatsapp: "+254702752033" },
    
    // Healthy Corner
    { id: "food9", name: "Caesar Salad", price: 220, description: "Fresh romaine lettuce salad", image: "🥗", category: "healthy", restaurant: "Healthy Corner", whatsapp: "+254702752033" },
    { id: "food10", name: "Grilled Chicken", price: 280, description: "Lean grilled chicken breast", image: "🍗", category: "healthy", restaurant: "Healthy Corner", whatsapp: "+254702752033" },
    { id: "food11", name: "Fruit Bowl", price: 150, description: "Mixed seasonal fruits", image: "🍓", category: "healthy", restaurant: "Healthy Corner", whatsapp: "+254702752033" },
    { id: "food12", name: "Smoothie", price: 120, description: "Fresh fruit smoothie", image: "🥤", category: "healthy", restaurant: "Healthy Corner", whatsapp: "+254702752033" }
  ];

  const categories = ["all", "local", "fastfood", "healthy"];

  const filteredItems = allMenuItems.filter(item => {
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
        category: "Food Delivery",
        provider: item.restaurant
      });
    }
  };

  const handleOrderNow = (item: any) => {
    const quantity = quantities[item.id] || 1;
    const message = `Hi ${item.restaurant}! I'd like to order: ${item.name} - KES ${item.price} x ${quantity} = KES ${item.price * quantity}. Please confirm availability and delivery time.`;
    const whatsappUrl = `https://wa.me/${item.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Utensils className="w-8 h-8 mr-3" />
              Food Delivery
            </h1>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search food..."
              className="pl-10 bg-white/80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer capitalize ${
                  selectedCategory === category 
                    ? "bg-orange-600 hover:bg-orange-700" 
                    : "hover:bg-orange-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "local" ? "Local Kenyan" : category === "fastfood" ? "Fast Food" : category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-white/90 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
                <span className="text-6xl">{item.image}</span>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="text-sm">{item.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">KSh {item.price}</span>
                  <span className="text-sm text-gray-500">{item.restaurant}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </Button>
                    <span className="w-8 text-center">{quantities[item.id] || 1}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={() => handleOrderNow(item)}
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50"
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
          <div className="text-center py-12">
            <p className="text-gray-500">No food items found matching your search.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default FoodDelivery;
