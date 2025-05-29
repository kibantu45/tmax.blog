
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ShoppingCart, Plus, MapPin, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FoodDelivery = () => {
  const { addToCart } = useCart();

  const restaurants = [
    {
      id: "kfc",
      name: "KFC",
      image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?w=400&h=300&fit=crop",
      cuisine: "Fast Food",
      rating: 4.5,
      deliveryTime: "25-35 min",
      deliveryFee: 50,
      location: "Main Campus",
      phone: "254702752033",
      menu: [
        {
          id: "kfc1",
          name: "Zinger Burger Meal",
          price: 650,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
          description: "Spicy chicken burger with fries and drink",
          category: "burgers"
        },
        {
          id: "kfc2", 
          name: "8 Piece Bucket",
          price: 1200,
          image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300&h=200&fit=crop",
          description: "8 pieces of original recipe chicken",
          category: "chicken"
        },
        {
          id: "kfc3",
          name: "Twister Wrap",
          price: 450,
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop", 
          description: "Chicken wrap with vegetables and sauce",
          category: "wraps"
        }
      ]
    },
    {
      id: "dominos",
      name: "Domino's Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
      cuisine: "Pizza",
      rating: 4.3,
      deliveryTime: "30-40 min", 
      deliveryFee: 80,
      location: "Town Center",
      phone: "254702752033",
      menu: [
        {
          id: "dom1",
          name: "Margherita Pizza",
          price: 850,
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
          description: "Classic tomato, mozzarella and basil pizza",
          category: "pizza"
        },
        {
          id: "dom2",
          name: "Pepperoni Pizza", 
          price: 950,
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop",
          description: "Pepperoni with mozzarella cheese",
          category: "pizza"
        },
        {
          id: "dom3",
          name: "Chicken Wings",
          price: 650,
          image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=300&h=200&fit=crop",
          description: "8 pieces of spicy chicken wings",
          category: "sides"
        }
      ]
    },
    {
      id: "subway",
      name: "Subway",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
      cuisine: "Sandwiches",
      rating: 4.4,
      deliveryTime: "20-30 min",
      deliveryFee: 60,
      location: "Student Center", 
      phone: "254702752033",
      menu: [
        {
          id: "sub1",
          name: "Italian BMT",
          price: 550,
          image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=300&h=200&fit=crop",
          description: "Ham, salami, pepperoni with fresh vegetables",
          category: "subs"
        },
        {
          id: "sub2",
          name: "Chicken Teriyaki",
          price: 600,
          image: "https://images.unsplash.com/photo-1627662168223-7df99068099a?w=300&h=200&fit=crop",
          description: "Grilled chicken with teriyaki sauce",
          category: "subs"
        },
        {
          id: "sub3",
          name: "Veggie Delite",
          price: 450,
          image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=300&h=200&fit=crop",
          description: "Fresh vegetables with your choice of sauce",
          category: "subs"
        }
      ]
    }
  ];

  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);

  const handleAddToCart = (item: any, restaurant: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: "Food Delivery",
      provider: restaurant.name
    });
  };

  const handleOrderNow = (item: any, restaurant: any) => {
    const message = `Hi! I'd like to order ${item.name} (KES ${item.price}) from ${restaurant.name}. Please confirm availability and delivery time.`;
    window.open(`https://wa.me/${restaurant.phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-orange-700">Food Delivery</h1>
              <p className="text-gray-600 mt-2">Delicious meals delivered to your doorstep</p>
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={() => window.location.href = "/cart"}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
              <Button onClick={() => window.history.back()} variant="outline">
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRestaurant ? (
          // Restaurant List
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-lg transition-shadow cursor-pointer bg-white/90">
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-500">
                    {restaurant.cuisine}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{restaurant.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{restaurant.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-1" />
                      <span className="text-sm">Delivery Fee: KES {restaurant.deliveryFee}</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                    onClick={() => setSelectedRestaurant(restaurant.id)}
                  >
                    View Menu
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // Restaurant Menu
          (() => {
            const restaurant = restaurants.find(r => r.id === selectedRestaurant)!;
            const menuCategories = Array.from(new Set(restaurant.menu.map(item => item.category)));
            
            return (
              <div>
                <div className="flex items-center mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedRestaurant(null)}
                    className="mr-4"
                  >
                    ← Back to Restaurants
                  </Button>
                  <div>
                    <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{restaurant.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">{restaurant.deliveryTime}</span>
                      <span className="text-sm text-gray-600">Delivery: KES {restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue={menuCategories[0]} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/80">
                    {menuCategories.map(category => (
                      <TabsTrigger 
                        key={category} 
                        value={category}
                        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white capitalize"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {menuCategories.map(category => (
                    <TabsContent key={category} value={category} className="mt-6">
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {restaurant.menu.filter(item => item.category === category).map((item) => (
                          <Card key={item.id} className="hover:shadow-lg transition-shadow bg-white/90">
                            <div className="relative">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-t-lg"
                              />
                            </div>
                            <CardHeader>
                              <CardTitle className="text-lg">{item.name}</CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                              <div className="text-xl font-bold text-orange-600">
                                KES {item.price}
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="flex space-x-2">
                                <Button 
                                  className="flex-1 bg-orange-600 hover:bg-orange-700"
                                  onClick={() => handleAddToCart(item, restaurant)}
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add to Cart
                                </Button>
                                <Button 
                                  variant="outline"
                                  onClick={() => handleOrderNow(item, restaurant)}
                                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                                >
                                  Order Now
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};

export default FoodDelivery;
