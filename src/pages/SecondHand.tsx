import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingBag, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SecondHandHeader from "@/components/secondhand/SecondHandHeader";
import SellItemModal from "@/components/secondhand/SellItemModal";
import TabSection from "@/components/secondhand/TabSection";
import SearchResults from "@/components/secondhand/SearchResults";
import BottomNavigation from "@/components/BottomNavigation";

const SecondHand = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const items = [
    {
      id: 1,
      title: "MacBook Pro 13-inch",
      price: 85000,
      originalPrice: 150000,
      description: "Perfect for students, excellent battery life and performance",
      seller: "John Kimani",
      sellerPhone: "+254701234567",
      location: "Main Campus",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      condition: "Like New",
      likes: 15,
      timePosted: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: "electronics"
    },
    {
      id: 2,
      title: "Engineering Textbooks Set",
      price: 3500,
      originalPrice: 8000,
      description: "Complete set of Year 2 Engineering books in excellent condition",
      seller: "Mary Wanjiku",
      sellerPhone: "+254702345678",
      location: "Library Area",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      condition: "Good",
      likes: 8,
      timePosted: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      category: "books"
    },
    {
      id: 3,
      title: "Gaming Chair",
      price: 12000,
      originalPrice: 25000,
      description: "Comfortable gaming chair, perfect for long study sessions",
      seller: "Peter Ochieng",
      sellerPhone: "+254703456789",
      location: "Hostels",
      image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=400&q=80",
      condition: "Excellent",
      likes: 22,
      timePosted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      category: "furniture"
    },
    {
      id: 4,
      title: "Scientific Calculator",
      price: 800,
      originalPrice: 1500,
      description: "Casio FX-991ES Plus, essential for engineering calculations",
      seller: "Grace Muthoni",
      sellerPhone: "+254704567890",
      location: "Engineering Block",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=400&q=80",
      condition: "Like New",
      likes: 5,
      timePosted: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      category: "electronics"
    },
    {
      id: 5,
      title: "Winter Jacket",
      price: 2500,
      originalPrice: 5000,
      description: "Warm winter jacket, size M, perfect for cold weather",
      seller: "David Kiprop",
      sellerPhone: "+254705678901",
      location: "Student Center",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?auto=format&fit=crop&w=400&q=80",
      condition: "Good",
      likes: 12,
      timePosted: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      category: "clothing"
    },
    {
      id: 6,
      title: "Desk Lamp",
      price: 1200,
      originalPrice: 2500,
      description: "LED desk lamp with adjustable brightness, perfect for studying",
      seller: "Sarah Njeri",
      sellerPhone: "+254706789012",
      location: "Hostel C",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80",
      condition: "Excellent",
      likes: 7,
      timePosted: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      category: "furniture"
    }
  ];

  const categories = ["all", "electronics", "books", "clothing", "furniture"];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (itemId: number) => {
    setLikedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleContact = (item: any) => {
    const message = `Hi ${item.seller}! I'm interested in your ${item.title} listed for KSh ${item.price.toLocaleString()}. Is it still available?`;
    const whatsappUrl = `https://wa.me/${item.sellerPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSellItem = (itemData: any) => {
    toast({
      title: "Item Listed!",
      description: "Your item has been posted successfully. Buyers will contact you directly.",
    });
    setIsModalOpen(false);
  };

  const categorizedItems = (category: string) => {
    if (category === "all") return items;
    return items.filter(item => item.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 pb-20">
      <SecondHandHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSellClick={() => setIsModalOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Actions */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for items..."
                className="pl-10 bg-white/80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Sell Item
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`cursor-pointer capitalize ${
                  selectedCategory === category 
                    ? "bg-green-600 hover:bg-green-700" 
                    : "hover:bg-green-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Search Results */}
        <SearchResults 
          searchQuery={searchQuery}
          filteredItems={filteredItems}
          likedItems={likedItems}
          onLike={handleLike}
          onContact={handleContact}
        />

        {/* Category Tabs */}
        {!searchQuery && (
          <TabSection 
            electronics={categorizedItems("electronics")}
            likedItems={likedItems}
            onLike={handleLike}
            onContact={handleContact}
          />
        )}
      </div>

      <SellItemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSellItem}
      />

      <BottomNavigation />
    </div>
  );
};

export default SecondHand;
