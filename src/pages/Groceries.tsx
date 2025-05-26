import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Apple, Milk, Sandwich, Coffee } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Groceries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();

  const fruits = [
    { id: "fruit1", name: "Fresh Bananas", price: 150, description: "Sweet and ripe bananas per kg", stock: 50, unit: "kg" },
    { id: "fruit2", name: "Red Apples", price: 300, description: "Crispy red apples per kg", stock: 30, unit: "kg" },
    { id: "fruit3", name: "Orange Oranges", price: 200, description: "Juicy oranges per kg", stock: 40, unit: "kg" },
    { id: "fruit4", name: "Avocados", price: 400, description: "Fresh avocados per kg", stock: 25, unit: "kg" }
  ];

  const dairy = [
    { id: "dairy1", name: "Fresh Milk", price: 120, description: "1 liter fresh milk", stock: 100, unit: "1L" },
    { id: "dairy2", name: "Greek Yogurt", price: 250, description: "500g creamy yogurt", stock: 50, unit: "500g" },
    { id: "dairy3", name: "Cheese Slices", price: 300, description: "200g processed cheese", stock: 40, unit: "200g" },
    { id: "dairy4", name: "Butter", price: 400, description: "500g unsalted butter", stock: 30, unit: "500g" }
  ];

  const pantry = [
    { id: "pantry1", name: "White Bread", price: 80, description: "Fresh white bread loaf", stock: 60, unit: "loaf" },
    { id: "pantry2", name: "Rice", price: 180, description: "1kg quality rice", stock: 100, unit: "1kg" },
    { id: "pantry3", name: "Cooking Oil", price: 350, description: "2L vegetable oil", stock: 45, unit: "2L" },
    { id: "pantry4", name: "Sugar", price: 200, description: "2kg white sugar", stock: 80, unit: "2kg" }
  ];

  const beverages = [
    { id: "bev1", name: "Instant Coffee", price: 500, description: "200g premium coffee", stock: 35, unit: "200g" },
    { id: "bev2", name: "Black Tea", price: 250, description: "100 tea bags", stock: 40, unit: "100 bags" },
    { id: "bev3", name: "Mineral Water", price: 50, description: "500ml bottled water", stock: 200, unit: "500ml" },
    { id: "bev4", name: "Fresh Juice", price: 150, description: "1L mixed fruit juice", stock: 25, unit: "1L" }
  ];

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: "/placeholder.svg",
      quantity: 1,
      category: "groceries"
    });
  };

  const filterItems = (items: any[]) => {
    return items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderItemGrid = (items: any[]) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filterItems(items).map((item) => (
        <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white/90">
          <CardHeader>
            <CardTitle className="text-lg">{item.name}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold text-tmaxGreen-600">KSh {item.price}</span>
                <span className="text-sm text-gray-500 ml-1">/{item.unit}</span>
              </div>
              <Badge variant="outline">{item.stock} in stock</Badge>
            </div>
            <Button 
              className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
              onClick={() => handleAddToCart(item)}
              disabled={item.stock === 0}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow via-pastelYellow-light to-pastelYellow-dark">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-tmaxGreen-700">Campus Groceries</h1>
              <p className="text-gray-600 mt-2">Fresh groceries delivered to your doorstep</p>
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
              placeholder="Search groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/90"
            />
          </div>
        </div>

        <Tabs defaultValue="fruits" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80">
            <TabsTrigger value="fruits" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Apple className="w-4 h-4 mr-2" />
              Fruits & Vegetables
            </TabsTrigger>
            <TabsTrigger value="dairy" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Milk className="w-4 h-4 mr-2" />
              Dairy Products
            </TabsTrigger>
            <TabsTrigger value="pantry" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Sandwich className="w-4 h-4 mr-2" />
              Pantry Essentials
            </TabsTrigger>
            <TabsTrigger value="beverages" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
              <Coffee className="w-4 h-4 mr-2" />
              Beverages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fruits" className="space-y-6">
            {renderItemGrid(fruits)}
          </TabsContent>

          <TabsContent value="dairy" className="space-y-6">
            {renderItemGrid(dairy)}
          </TabsContent>

          <TabsContent value="pantry" className="space-y-6">
            {renderItemGrid(pantry)}
          </TabsContent>

          <TabsContent value="beverages" className="space-y-6">
            {renderItemGrid(beverages)}
          </TabsContent>
        </Tabs>

        {/* Quick Order Section */}
        <div className="mt-12 bg-white/90 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-tmaxGreen-700 mb-4">Quick Order via WhatsApp</h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Send us a message with your grocery list and we'll help you get everything you need.
          </p>
          <Button 
            className="bg-green-600 hover:bg-green-700"
            onClick={() => window.open('https://wa.me/254702752033?text=Hi, I would like to place a grocery order. Here is my list:', '_blank')}
          >
            Order via WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Groceries;
