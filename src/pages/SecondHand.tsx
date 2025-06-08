
import { useState, useEffect } from "react";
import SecondHandHeader from "@/components/secondhand/SecondHandHeader";
import SearchResults from "@/components/secondhand/SearchResults";
import TabSection from "@/components/secondhand/TabSection";
import SellItemModal from "@/components/secondhand/SellItemModal";

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

  const handleFormChange = (data: Partial<typeof sellFormData>) => {
    setSellFormData(prev => ({ ...prev, ...data }));
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
      title: "Study table",
      price: 1500,
      originalPrice: 2500,
      description: "new paint, Good as new.",
      seller: "Monteh",
      sellerPhone: "+254702213756",
      location: "Tum main campus",
      image: "https://i.ibb.co/pv3y3b0j/Whats-App-Image-2025-06-08-at-12-49-54-1.jpg",
      condition: "Good",
      likes: 18,
      timePosted: "8th june"
    }
  ];

  // Filter items based on search query
  const filteredElectronics = electronics.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100">
      <SecondHandHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSellClick={() => setShowSellForm(true)}
      />

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

        <SearchResults
          searchQuery={searchQuery}
          filteredItems={filteredElectronics}
          likedItems={likedItems}
          onLike={handleLike}
          onContact={handleSellerContact}
        />

        <TabSection
          electronics={electronics}
          likedItems={likedItems}
          onLike={handleLike}
          onContact={handleSellerContact}
        />
      </div>

      <SellItemModal
        isOpen={showSellForm}
        formData={sellFormData}
        onClose={() => setShowSellForm(false)}
        onFormChange={handleFormChange}
        onImageUpload={handleImageUpload}
        onSubmit={handleSellSubmit}
      />
    </div>
  );
};

export default SecondHand;
