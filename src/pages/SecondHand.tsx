import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Star, Clock, MapPin, Search, Filter, Plus, Upload, Phone } from "lucide-react";

const SecondHand = () => {
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSellForm, setShowSellForm] = useState(false);
  const [sellFormData, setSellFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "electronics",
    condition: "good",
    location: "",
    sellerPhone: "",
    images: [] as string[]
  });

  // Get search query from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  const handleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleWhatsAppContact = (item: any) => {
    const message = `Hi! I'm interested in your ${item.title} listed for KSh ${item.price}. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/+254702752033?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSellerContact = (item: any) => {
    const message = `Hi! I'm interested in your ${item.title} listed for KSh ${item.price}. Could you please provide more details?`;
    const phone = item.sellerPhone || "+254702752033";
    const whatsappUrl = `https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you'd upload these to a server
      // For now, we'll create mock URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&id=${Date.now()}-${index}`
      );
      setSellFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
      }));
    }
  };

  const handleSellSubmit = () => {
    if (!sellFormData.title || !sellFormData.price || !sellFormData.sellerPhone) {
      alert("Please fill in all required fields");
      return;
    }
    // In a real app, you'd save this to a database
    alert("Item listed successfully! Buyers will contact you on WhatsApp.");
    setShowSellForm(false);
    setSellFormData({
      title: "",
      description: "",
      price: "",
      category: "electronics",
      condition: "good",
      location: "",
      sellerPhone: "",
      images: []
    });
  };

  const electronics = [
    {
      id: 1,
      title: "Iphone 12pro",
      price: 27999,
      originalPrice: 30000,
      description: "256gb storage, battery changed,wifi not working can be fixed, face id-yes.",
      seller: "massive",
      sellerPhone: "+254793754495",
      location: "Mombasa",
      image: "/lovable-uploads/254793754495.jpg.jpeg",
      condition: "Like New",
      likes: 24,
      timePosted: "7th June"
    },
    {
      id: 2,
      title: "iPhone 13 Pro",
      price: 65000,
      originalPrice: 99900,
      description: "Minor scratches on back, screen protector applied since day 1.",
      seller: "Sarah Kim",
      sellerPhone: "+254701234568",
      location: "Campus East",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      condition: "Good",
      likes: 18,
      timePosted: "5 hours ago"
    }
  ];

  // Filter items based on search query
  const filteredElectronics = electronics.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="text-xl font-bold text-green-600">KSh {item.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500 line-through">KSh {item.originalPrice.toLocaleString()}</div>
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
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleSellerContact(item)}>
              <Phone className="w-3 h-3 mr-1" />
              Contact
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
              <div className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600"
                onClick={() => setShowSellForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
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

        {/* Search Results */}
        {searchQuery && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Search results for "{searchQuery}"</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredElectronics.map(renderItemCard)}
            </div>
          </div>
        )}

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
              {electronics.map(renderItemCard)}
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
                  Save money on expensive textbooks! Find course materials from students who've completed the classes. 
                  Filter by course code, edition, and condition to find exactly what you need.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electronics.map(renderItemCard)}
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
                  Save money on expensive textbooks! Find course materials from students who've completed the classes. 
                  Filter by course code, edition, and condition to find exactly what you need.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {electronics.map(renderItemCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Sell Item Modal */}
      {showSellForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-700">Sell Your Item</h2>
              <Button variant="ghost" onClick={() => setShowSellForm(false)}>×</Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Item Title *</label>
                <Input
                  value={sellFormData.title}
                  onChange={(e) => setSellFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., MacBook Air M1 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={sellFormData.description}
                  onChange={(e) => setSellFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your item's condition, features, etc."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Price (KSh) *</label>
                  <Input
                    type="number"
                    value={sellFormData.price}
                    onChange={(e) => setSellFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="e.g., 50000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={sellFormData.category}
                    onChange={(e) => setSellFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="textbooks">Textbooks</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <select
                    value={sellFormData.condition}
                    onChange={(e) => setSellFormData(prev => ({ ...prev, condition: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="like-new">Like New</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <Input
                    value={sellFormData.location}
                    onChange={(e) => setSellFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Campus West"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Your WhatsApp Number *</label>
                <Input
                  value={sellFormData.sellerPhone}
                  onChange={(e) => setSellFormData(prev => ({ ...prev, sellerPhone: e.target.value }))}
                  placeholder="e.g., +254701234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Photos (Max 5)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">Click to upload photos</p>
                    </div>
                  </label>
                  {sellFormData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {sellFormData.images.map((image, index) => (
                        <img key={index} src={image} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button variant="outline" onClick={() => setShowSellForm(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSellSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
                  List Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondHand;
