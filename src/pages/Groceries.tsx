
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Search, Plus, Minus, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNavigation from "@/components/BottomNavigation";

const Groceries = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const groceryItems = [
    {
      id: "onions",
      name: "Red Onions",
      price: 80,
      unit: "per kg",
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80",
      description: "Fresh red onions, perfect for cooking"
    },
    {
      id: "garlic",
      name: "Fresh Garlic",
      price: 200,
      unit: "per 250g",
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=400&q=80",
      description: "Fresh garlic bulbs for flavoring"
    },
    {
      id: "oranges",
      name: "Sweet Oranges",
      price: 150,
      unit: "per kg",
      category: "fruits",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80",
      description: "Juicy sweet oranges, vitamin C rich"
    },
    {
      id: "mangoes",
      name: "Ripe Mangoes",
      price: 120,
      unit: "per piece",
      category: "fruits",
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80",
      description: "Sweet ripe mangoes, locally sourced"
    },
    {
      id: "bananas",
      name: "Fresh Bananas",
      price: 100,
      unit: "per bunch",
      category: "fruits",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=400&q=80",
      description: "Fresh bananas, perfect for snacking"
    },
    {
      id: "carrots",
      name: "Fresh Carrots",
      price: 90,
      unit: "per kg",
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=400&q=80",
      description: "Crunchy fresh carrots, vitamin A rich"
    },
    {
      id: "cabbage",
      name: "Green Cabbage",
      price: 60,
      unit: "per head",
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80",
      description: "Fresh green cabbage for salads and cooking"
    },
    {
      id: "milk",
      name: "Fresh Milk",
      price: 60,
      unit: "per 500ml",
      category: "dairy",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
      description: "Fresh cow milk, pasteurized"
    },
    {
      id: "ginger",
      name: "Fresh Ginger",
      price: 250,
      unit: "per 250g",
      category: "spices",
      image: "https://images.unsplash.com/photo-1599909533908-5e9afeee7201?auto=format&fit=crop&w=400&q=80",
      description: "Fresh ginger root for cooking and tea"
    },
    {
      id: "pilipilihoho",
      name: "Pilipili Hoho (Bell Peppers)",
      price: 30,
      unit: "per piece",
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80",
      description: "Fresh bell peppers, colorful and crunchy"
    },
    {
      id: "dhania",
      name: "Dhania (Coriander)",
      price: 20,
      unit: "per bunch",
      category: "herbs",
      image: "https://images.unsplash.com/photo-1622143623765-46ff90a8139e?auto=format&fit=crop&w=400&q=80",
      description: "Fresh coriander leaves for garnishing"
    },
    {
      id: "tomatoes",
      name: "Fresh Tomatoes",
      price: 120,
      unit: "per kg",
      category: "vegetables",
      image: "https://images.unsplash.com/photo-1546470427-e40b4ba3762b?auto=format&fit=crop&w=400&q=80",
      description: "Fresh red tomatoes, perfect for cooking"
    },
    {
      id: "eggs",
      name: "Fresh Eggs",
      price: 350,
      unit: "per tray (30 pieces)",
      category: "dairy",
      image: "https://images.unsplash.com/photo-1569288063643-5d29ad64df09?auto=format&fit=crop&w=400&q=80",
      description: "Fresh farm eggs, high protein"
    }
  ];

  const categories = ["all", "fruits", "vegetables", "dairy", "spices", "herbs"];

  const [selectedCategory, setSelectedCategory] = useState("all");

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
        category: item.category,
        image: item.image
      });
    }
  };

  const handleOrderNow = (item: any) => {
    const quantity = quantities[item.id] || 1;
    const message = `Hi! I'd like to order: ${item.name} - KES ${item.price} x ${quantity} = KES ${item.price * quantity}. Please confirm availability and delivery.`;
    const whatsappUrl = `https://wa.me/254702752033?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <ShoppingCart className="w-8 h-8 mr-3" />
              Groceries
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
              placeholder="Search groceries..."
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
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "hover:bg-blue-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-white/90 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-square bg-gray-100 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <CardDescription className="text-sm">{item.description}</CardDescription>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">KSh {item.price}</span>
                  <span className="text-sm text-gray-500">{item.unit}</span>
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
                      <Minus className="w-4 h-4" />
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
                    className="w-full bg-blue-600 hover:bg-blue-700"
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
            <p className="text-gray-500">No items found matching your search.</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Groceries;
