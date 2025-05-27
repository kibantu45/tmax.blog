
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, Plus, Utensils, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const FoodDelivery = () => {
  const { addItem } = useCart();

  const restaurants = [
    {
      id: 1,
      name: "Campus Café",
      rating: 4.5,
      deliveryTime: "20-30 min",
      cuisine: "International",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop",
      popular: true
    },
    {
      id: 2,
      name: "Pizza Express",
      rating: 4.2,
      deliveryTime: "25-35 min",
      cuisine: "Italian",
      image: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=200&fit=crop",
      popular: false
    },
    {
      id: 3,
      name: "Asian Fusion",
      rating: 4.7,
      deliveryTime: "30-40 min",
      cuisine: "Asian",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=200&fit=crop",
      popular: true
    }
  ];

  const menuItems = [
    {
      id: "food1",
      name: "Chicken Caesar Salad",
      description: "Fresh romaine lettuce with grilled chicken and parmesan",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop",
      category: "salads"
    },
    {
      id: "food2",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella and basil",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=200&fit=crop",
      category: "pizza"
    },
    {
      id: "food3",
      name: "Beef Burger",
      description: "Juicy beef patty with lettuce, tomato and cheese",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      category: "burgers"
    },
    {
      id: "food4",
      name: "Chicken Pad Thai",
      description: "Traditional Thai noodles with chicken and vegetables",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=300&h=200&fit=crop",
      category: "asian"
    }
  ];

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
  };

  const handleOrderNow = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category
    });
    
    // Redirect to WhatsApp with order details
    const message = `Hi! I'd like to order ${item.name} for £${item.price}. Please confirm availability and delivery time.`;
    const whatsappUrl = `https://wa.me/+254702752033?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <Utensils className="text-white font-bold text-lg w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Tmax Food
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/cart"}
              >
                View Cart
              </Button>
              <Button 
                className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-tmaxGreen-600 via-pastelYellow to-tmaxGreen-600 bg-clip-text text-transparent">
            Campus Food Delivery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delicious meals from campus restaurants delivered right to your door.
          </p>
        </div>

        {/* Popular Restaurants */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-tmaxGreen-700">Popular Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group">
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {restaurant.popular && (
                    <Badge className="absolute top-2 left-2 bg-pastelYellow text-tmaxGreen-700">
                      Popular
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">{restaurant.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{restaurant.deliveryTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Menu Items */}
        <section>
          <h3 className="text-2xl font-bold mb-4 text-tmaxGreen-700">Featured Menu Items</h3>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white/80 border border-tmaxGreen-200 mb-6">
              <TabsTrigger value="all" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                All
              </TabsTrigger>
              <TabsTrigger value="salads" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Salads
              </TabsTrigger>
              <TabsTrigger value="pizza" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="burgers" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Burgers
              </TabsTrigger>
              <TabsTrigger value="asian" className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white">
                Asian
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {menuItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-tmaxGreen-200">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-32 object-cover"
                    />
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{item.name}</h4>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-tmaxGreen-600">£{item.price}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleAddToCart(item)}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
                          onClick={() => handleOrderNow(item)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Order Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
};

export default FoodDelivery;
