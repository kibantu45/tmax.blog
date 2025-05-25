
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, MessageCircle, Star, Clock, MapPin, Search, Filter } from "lucide-react";

const SecondHand = () => {
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const handleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const electronics = [
    {
      id: 1,
      title: "MacBook Air M1 2020",
      price: 850,
      originalPrice: 1200,
      description: "Excellent condition, barely used. Includes charger and box.",
      seller: "Alex Chen",
      location: "Campus West",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      condition: "Like New",
      likes: 24,
      timePosted: "2 hours ago"
    },
    {
      id: 2,
      title: "iPhone 13 Pro",
      price: 650,
      originalPrice: 999,
      description: "Minor scratches on back, screen protector applied since day 1.",
      seller: "Sarah Kim",
      location: "Campus East",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      condition: "Good",
      likes: 18,
      timePosted: "5 hours ago"
    }
  ];

  const textbooks = [
    {
      id: 3,
      title: "Calculus: Early Transcendentals",
      price: 45,
      originalPrice: 280,
      description: "8th Edition, minimal highlighting. Great for Math 101-102.",
      seller: "Mike Johnson",
      location: "Library Area",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
      condition: "Good",
      likes: 12,
      timePosted: "1 day ago"
    },
    {
      id: 4,
      title: "Organic Chemistry Textbook",
      price: 60,
      originalPrice: 350,
      description: "Latest edition with solution manual included. No writing inside.",
      seller: "Emma Wilson",
      location: "Science Building",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      condition: "Excellent",
      likes: 15,
      timePosted: "3 hours ago"
    }
  ];

  const furniture = [
    {
      id: 5,
      title: "Study Desk with Chair",
      price: 120,
      originalPrice: 300,
      description: "Perfect for dorm room. Includes matching chair and desk lamp.",
      seller: "David Park",
      location: "Student Housing",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      condition: "Good",
      likes: 8,
      timePosted: "6 hours ago"
    }
  ];

  const clothing = [
    {
      id: 6,
      title: "University Hoodie Collection",
      price: 25,
      originalPrice: 65,
      description: "3 hoodies in different colors, size M. Official university merchandise.",
      seller: "Lisa Rodriguez",
      location: "Campus Center",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
      condition: "Good",
      likes: 6,
      timePosted: "4 hours ago"
    }
  ];

  const renderItemCard = (item: any) => (
    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-yellow-200 group">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => handleLike(item.id)}
          className={`absolute top-2 right-2 ${likedItems.includes(item.id) ? 'text-red-500 bg-white/80' : 'text-gray-600 bg-white/60'} hover:bg-white/90`}
        >
          <Heart className={`w-4 h-4 ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
        </Button>
        <Badge className={`absolute top-2 left-2 ${
          item.condition === 'Like New' ? 'bg-green-500' : 
          item.condition === 'Excellent' ? 'bg-blue-500' : 'bg-yellow-500'
        } text-white`}>
          {item.condition}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
            {item.title}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">${item.price}</div>
            <div className="text-sm text-gray-500 line-through">${item.originalPrice}</div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${item.seller}&background=random`} />
              <AvatarFallback className="text-xs">{item.seller.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{item.seller}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{item.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{item.timePosted}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-gray-500">
              <Heart className="w-3 h-3" />
              <span className="text-xs">{item.likes + (likedItems.includes(item.id) ? 1 : 0)}</span>
            </div>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="w-3 h-3 mr-1" />
              Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-yellow-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-400 to-green-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
                Tmax Marketplace
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600">
                Sell Item
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 via-yellow-600 to-green-600 bg-clip-text text-transparent">
            Second-Hand Marketplace
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Buy and sell pre-loved items within the university community. Find great deals and give your items a new home.
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="electronics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 border border-yellow-200">
            <TabsTrigger value="electronics" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Electronics
            </TabsTrigger>
            <TabsTrigger value="textbooks" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Textbooks
            </TabsTrigger>
            <TabsTrigger value="furniture" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Furniture
            </TabsTrigger>
            <TabsTrigger value="clothing" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
              Clothing
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="electronics" className="space-y-6">
            <Card className="border-yellow-200 bg-white/80">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Electronics & Gadgets
                </CardTitle>
                <CardDescription>
                  Discover laptops, phones, tablets, and other electronic devices from fellow students. 
                  All items are verified and come with seller ratings for your peace of mind.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electronics.map(renderItemCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="textbooks" className="space-y-6">
            <Card className="border-yellow-200 bg-white/80">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Textbooks & Study Materials
                </CardTitle>
                <CardDescription>
                  Save money on expensive textbooks! Find course materials from students who've completed the classes. 
                  Filter by course code, edition, and condition to find exactly what you need.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {textbooks.map(renderItemCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="furniture" className="space-y-6">
            <Card className="border-yellow-200 bg-white/80">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Furniture & Dorm Essentials
                </CardTitle>
                <CardDescription>
                  Furnish your dorm or apartment with quality pre-owned furniture. From study desks to bed frames, 
                  find everything you need to make your space comfortable and functional.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {furniture.map(renderItemCard)}
            </div>
          </TabsContent>
          
          <TabsContent value="clothing" className="space-y-6">
            <Card className="border-yellow-200 bg-white/80">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Clothing & Accessories
                </CardTitle>
                <CardDescription>
                  Refresh your wardrobe sustainably! Browse through clothes, shoes, and accessories from other students. 
                  Perfect for finding unique pieces or university merchandise at great prices.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clothing.map(renderItemCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecondHand;
