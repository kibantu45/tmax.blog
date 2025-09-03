import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Star, Search, Plus, Phone, Package, Droplets, Wheat } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNavigation from "@/components/BottomNavigation";

const EShop = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const products = [
    // Cooking Oils
    { 
      id: "oil1", 
      name: "Cooking Oil", 
      price: 280, 
      description: "Pure cooking oil - 500ml", 
      image: "/lovable-uploads/vitamin-c.jpg", 
      category: "oils", 
      store: "Fresh Mart", 
      whatsapp: "+254702752033" 
    },
    { 
      id: "oil2", 
      name: "Sunflower Oil", 
      price: 320, 
      description: "Premium sunflower oil - 500ml", 
      image: "/lovable-uploads/vitamin-c.jpg", 
      category: "oils", 
      store: "Fresh Mart", 
      whatsapp: "+254702752033" 
    },
    { 
      id: "oil3", 
      name: "Olive Oil", 
      price: 450, 
      description: "Extra virgin olive oil - 250ml", 
      image: "/lovable-uploads/vitamin-c.jpg", 
      category: "oils", 
      store: "Fresh Mart", 
      whatsapp: "+254702752033" 
    },

    // Sugar & Sweeteners
    { 
      id: "sugar1", 
      name: "White Sugar", 
      price: 180, 
      description: "Pure white sugar - 2kg", 
      image: "/lovable-uploads/closeup-shot-oranges-top-each-other-white-surface-great-background.jpg", 
      category: "sugar", 
      store: "Sweet Shop", 
      whatsapp: "+254702752034" 
    },
    { 
      id: "sugar2", 
      name: "Brown Sugar", 
      price: 220, 
      description: "Natural brown sugar - 1kg", 
      image: "/lovable-uploads/closeup-shot-oranges-top-each-other-white-surface-great-background.jpg", 
      category: "sugar", 
      store: "Sweet Shop", 
      whatsapp: "+254702752034" 
    },
    { 
      id: "sugar3", 
      name: "Honey", 
      price: 380, 
      description: "Pure natural honey - 500g", 
      image: "/lovable-uploads/closeup-shot-oranges-top-each-other-white-surface-great-background.jpg", 
      category: "sugar", 
      store: "Sweet Shop", 
      whatsapp: "+254702752034" 
    },

    // Flour & Grains
    { 
      id: "flour1", 
      name: "All Purpose Flour", 
      price: 160, 
      description: "Premium all purpose flour - 2kg", 
      image: "/lovable-uploads/l1.jpeg", 
      category: "flour", 
      store: "Grain Store", 
      whatsapp: "+254702752035" 
    },
    { 
      id: "flour2", 
      name: "Wheat Flour", 
      price: 140, 
      description: "Whole wheat flour - 2kg", 
      image: "/lovable-uploads/l2.jpeg", 
      category: "flour", 
      store: "Grain Store", 
      whatsapp: "+254702752035" 
    },
    { 
      id: "flour3", 
      name: "Maize Flour", 
      price: 120, 
      description: "Fine maize flour - 2kg", 
      image: "/lovable-uploads/l3.jpeg", 
      category: "flour", 
      store: "Grain Store", 
      whatsapp: "+254702752035" 
    },

    // Spices & Condiments
    { 
      id: "spice1", 
      name: "Salt", 
      price: 50, 
      description: "Iodized table salt - 500g", 
      image: "/lovable-uploads/l4.jpeg", 
      category: "spices", 
      store: "Spice Corner", 
      whatsapp: "+254702752036" 
    },
    { 
      id: "spice2", 
      name: "Black Pepper", 
      price: 180, 
      description: "Ground black pepper - 100g", 
      image: "/lovable-uploads/l5.jpeg", 
      category: "spices", 
      store: "Spice Corner", 
      whatsapp: "+254702752036" 
    },
    { 
      id: "spice3", 
      name: "Curry Powder", 
      price: 120, 
      description: "Mixed curry powder - 100g", 
      image: "/lovable-uploads/l4.jpeg", 
      category: "spices", 
      store: "Spice Corner", 
      whatsapp: "+254702752036" 
    },
  ];

  const categories = ["all", "oils", "sugar", "flour", "spices"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: "E-Shop",
        provider: product.store
      });
    }
  };

  const handleOrderNow = (product: any) => {
    const quantity = quantities[product.id] || 1;
    const message = `Hi ${product.store}! I'd like to order: ${product.name} - KES ${product.price} x ${quantity} = KES ${product.price * quantity}. Please confirm availability and delivery time.`;
    const whatsappUrl = `https://wa.me/${product.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "oils": return <Droplets className="w-4 h-4" />;
      case "sugar": return <Star className="w-4 h-4" />;
      case "flour": return <Wheat className="w-4 h-4" />;
      case "spices": return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "oils": return "Cooking Oils";
      case "sugar": return "Sugar & Sweeteners";
      case "flour": return "Flour & Grains";
      case "spices": return "Spices & Condiments";
      default: return "All Products";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 pb-20">
      {/* Header */}
      <header className="glass backdrop-blur-xl bg-white/20 border-b border-white/30 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center animate-fade-in">
              <ShoppingCart className="w-8 h-8 mr-3 animate-bounce" />
              E-Shop
            </h1>
            <Button onClick={() => window.history.back()} variant="outline" className="glass hover:scale-105 transition-all duration-300">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="all" className="space-y-6" onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5 bg-white/80">
            <TabsTrigger value="all" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger value="oils" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Droplets className="w-4 h-4 mr-2" />
              Oils
            </TabsTrigger>
            <TabsTrigger value="sugar" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Sugar
            </TabsTrigger>
            <TabsTrigger value="flour" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Wheat className="w-4 h-4 mr-2" />
              Flour
            </TabsTrigger>
            <TabsTrigger value="spices" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              <Package className="w-4 h-4 mr-2" />
              Spices
            </TabsTrigger>
          </TabsList>

          {/* Search Bar */}
          <div className="relative max-w-md animate-fade-in">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 glass backdrop-blur-lg bg-white/30 border-white/20 hover:bg-white/40 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts
                  .filter(product => category === "all" || product.category === category)
                  .map((product, index) => (
                    <Card key={product.id} className="glass backdrop-blur-lg bg-white/30 hover:bg-white/40 border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-lg">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center">
                          {getCategoryIcon(product.category)}
                          <span className="ml-2">{product.name}</span>
                        </CardTitle>
                        <CardDescription className="text-sm">{product.description}</CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-orange-600 animate-pulse">KSh {product.price}</span>
                          <span className="text-sm text-gray-500">{product.store}</span>
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
                              onClick={() => updateQuantity(product.id, -1)}
                            >
                              <Plus className="w-4 h-4 rotate-45" />
                            </Button>
                            <span className="w-8 text-center font-semibold">{quantities[product.id] || 1}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-8 h-8 p-0 glass hover:scale-110 transition-all duration-200"
                              onClick={() => updateQuantity(product.id, 1)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-all duration-300 shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button 
                            onClick={() => handleOrderNow(product)}
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

              {filteredProducts.filter(product => category === "all" || product.category === category).length === 0 && (
                <div className="text-center py-12 animate-fade-in">
                  <p className="text-gray-500">No products found in {getCategoryName(category)}.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EShop;