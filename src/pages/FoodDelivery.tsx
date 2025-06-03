
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, Star, Clock, MapPin, Plus, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const FoodDelivery = () => {
  const { addToCart } = useCart();
  
  const restaurants = [
    {
      id: 1,
      name: "Campus Eats",
      cuisine: "Local Kenyan",
      rating: 4.8,
      deliveryTime: "20-30 mins",
      deliveryFee: "Free",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80",
      whatsapp: "+254702752033",
      menu: [
        { id: "food1", name: "Ugali & Sukuma Wiki", price: 150, description: "Traditional Kenyan meal", image: "🍽️" },
        { id: "food2", name: "Nyama Choma", price: 300, description: "Grilled meat with sides", image: "🥩" },
        { id: "food3", name: "Pilau Rice", price: 200, description: "Spiced rice with meat", image: "🍚" },
        { id: "food4", name: "Chapati & Beans", price: 120, description: "Flatbread with beans", image: "🫓" }
      ]
    },
    {
      id: 2,
      name: "Quick Bites",
      cuisine: "Fast Food",
      rating: 4.5,
      deliveryTime: "15-25 mins",
      deliveryFee: "50",
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=80",
      whatsapp: "+254702752033",
      menu: [
        { id: "food5", name: "Chicken Burger", price: 250, description: "Crispy chicken burger", image: "🍔" },
        { id: "food6", name: "French Fries", price: 100, description: "Golden crispy fries", image: "🍟" },
        { id: "food7", name: "Pizza Slice", price: 180, description: "Margherita pizza slice", image: "🍕" },
        { id: "food8", name: "Sausage Roll", price: 80, description: "Hot sausage roll", image: "🌭" }
      ]
    },
    {
      id: 3,
      name: "Healthy Corner",
      cuisine: "Healthy",
      rating: 4.7,
      deliveryTime: "25-35 mins",
      deliveryFee: "Free",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
      whatsapp: "+254702752033",
      menu: [
        { id: "food9", name: "Caesar Salad", price: 220, description: "Fresh romaine lettuce salad", image: "🥗" },
        { id: "food10", name: "Grilled Chicken", price: 280, description: "Lean grilled chicken breast", image: "🍗" },
        { id: "food11", name: "Fruit Bowl", price: 150, description: "Mixed seasonal fruits", image: "🍓" },
        { id: "food12", name: "Smoothie", price: 120, description: "Fresh fruit smoothie", image: "🥤" }
      ]
    }
  ];

  const handleAddToCart = (item: any, restaurant: any) => {
    addToCart({
      id: `${item.id}_${restaurant.id}`,
      name: `${item.name}`,
      price: item.price,
      image: item.image,
      category: "Food Delivery",
      provider: restaurant.name
    });
  };

  const handleOrderNow = (restaurant: any, item: any) => {
    const message = `Hi ${restaurant.name}! I'd like to order: ${item.name} - KES ${item.price}. Please confirm availability and delivery time.`;
    const whatsappUrl = `https://wa.me/${restaurant.whatsapp.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Food Delivery
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/cart"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Cart
              </Button>
              <Button 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Delicious Meals Delivered</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Order from your favorite campus restaurants and get food delivered to your doorstep
          </p>
        </div>

        <div className="space-y-8">
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <CardTitle className="text-2xl text-orange-800">{restaurant.name}</CardTitle>
                      <p className="text-gray-600">{restaurant.cuisine} Cuisine</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{restaurant.deliveryTime}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">Campus Delivery</span>
                        </div>
                      </div>
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        {restaurant.deliveryFee === "Free" ? "Free Delivery" : `KES ${restaurant.deliveryFee} Delivery`}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleOrderNow(restaurant, null)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Restaurant
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {restaurant.menu.map((item) => (
                    <Card key={item.id} className="border-gray-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-4 text-center">
                        <div className="text-4xl mb-3">{item.image}</div>
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="text-xl font-bold text-orange-600 mb-4">KES {item.price}</div>
                        <div className="space-y-2">
                          <Button 
                            className="w-full bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleAddToCart(item, restaurant)}
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => handleOrderNow(restaurant, item)}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Order Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDelivery;
