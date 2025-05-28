
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Apple, Milk, Sandwich, Coffee, Edit, Plus, Trash2, Phone } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Groceries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingTab, setEditingTab] = useState<any>(null);
  const [newTabForm, setNewTabForm] = useState({
    id: "",
    name: "",
    icon: "Apple",
    products: []
  });

  // Check if admin mode is enabled (you can add proper admin authentication here)
  const checkAdminMode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('admin') === 'true';
  };

  // Initialize admin mode check
  useState(() => {
    setIsAdminMode(checkAdminMode());
  });

  const [groceryTabs, setGroceryTabs] = useState([
    { 
      id: "fruits", 
      name: "Fruits & Vegetables", 
      icon: Apple,
      products: [
        { id: "fruit1", name: "Fresh Bananas", price: 150, description: "Sweet and ripe bananas per kg", stock: 50, unit: "kg" },
        { id: "fruit2", name: "Red Apples", price: 300, description: "Crispy red apples per kg", stock: 30, unit: "kg" },
        { id: "fruit3", name: "Orange Oranges", price: 200, description: "Juicy oranges per kg", stock: 40, unit: "kg" },
        { id: "fruit4", name: "Avocados", price: 400, description: "Fresh avocados per kg", stock: 25, unit: "kg" }
      ]
    },
    { 
      id: "dairy", 
      name: "Dairy Products", 
      icon: Milk,
      products: [
        { id: "dairy1", name: "Fresh Milk", price: 120, description: "1 liter fresh milk", stock: 100, unit: "1L" },
        { id: "dairy2", name: "Greek Yogurt", price: 250, description: "500g creamy yogurt", stock: 50, unit: "500g" },
        { id: "dairy3", name: "Cheese Slices", price: 300, description: "200g processed cheese", stock: 40, unit: "200g" },
        { id: "dairy4", name: "Butter", price: 400, description: "500g unsalted butter", stock: 30, unit: "500g" }
      ]
    },
    { 
      id: "pantry", 
      name: "Pantry Essentials", 
      icon: Sandwich,
      products: [
        { id: "pantry1", name: "White Bread", price: 80, description: "Fresh white bread loaf", stock: 60, unit: "loaf" },
        { id: "pantry2", name: "Rice", price: 180, description: "1kg quality rice", stock: 100, unit: "1kg" },
        { id: "pantry3", name: "Cooking Oil", price: 350, description: "2L vegetable oil", stock: 45, unit: "2L" },
        { id: "pantry4", name: "Sugar", price: 200, description: "2kg white sugar", stock: 80, unit: "2kg" }
      ]
    },
    { 
      id: "beverages", 
      name: "Beverages", 
      icon: Coffee,
      products: [
        { id: "bev1", name: "Instant Coffee", price: 500, description: "200g premium coffee", stock: 35, unit: "200g" },
        { id: "bev2", name: "Black Tea", price: 250, description: "100 tea bags", stock: 40, unit: "100 bags" },
        { id: "bev3", name: "Mineral Water", price: 50, description: "500ml bottled water", stock: 200, unit: "500ml" },
        { id: "bev4", name: "Fresh Juice", price: 150, description: "1L mixed fruit juice", stock: 25, unit: "1L" }
      ]
    }
  ]);

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: "/placeholder.svg",
      category: "groceries"
    });
  };

  const handleOrderNow = (item: any) => {
    // Add to cart first
    handleAddToCart(item);
    
    // Redirect to WhatsApp with order details
    const message = `Hi! I'd like to order ${item.name} for KSh ${item.price}. Please confirm availability and delivery time.`;
    const whatsappUrl = `https://wa.me/+254702752033?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEditTab = (tab: any) => {
    setEditingTab(tab);
  };

  const handleSaveTab = () => {
    if (editingTab) {
      setGroceryTabs(prev => prev.map(tab => 
        tab.id === editingTab.id ? editingTab : tab
      ));
      setEditingTab(null);
    }
  };

  const handleDeleteTab = (tabId: string) => {
    if (confirm("Are you sure you want to delete this tab?")) {
      setGroceryTabs(prev => prev.filter(tab => tab.id !== tabId));
    }
  };

  const handleAddNewTab = () => {
    const newTab = {
      ...newTabForm,
      id: newTabForm.id || `tab_${Date.now()}`,
      icon: Apple, // Default icon
      products: []
    };
    setGroceryTabs(prev => [...prev, newTab]);
    setNewTabForm({
      id: "",
      name: "",
      icon: "Apple",
      products: []
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
            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                onClick={() => handleAddToCart(item)}
                disabled={item.stock === 0}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => handleOrderNow(item)}
                disabled={item.stock === 0}
              >
                <Phone className="w-4 h-4 mr-2" />
                Order Now
              </Button>
            </div>
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
            <div className="flex items-center space-x-4">
              {isAdminMode && (
                <Badge variant="outline" className="bg-red-100 text-red-800">Admin Mode</Badge>
              )}
              <Button 
                variant="outline"
                onClick={() => window.location.href = "/cart"}
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

        {/* Admin Add New Tab */}
        {isAdminMode && (
          <div className="mb-6">
            <Card className="border-2 border-dashed border-tmaxGreen-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Category Tab
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tab-name">Tab Name</Label>
                  <Input
                    id="tab-name"
                    placeholder="Category Name"
                    value={newTabForm.name}
                    onChange={(e) => setNewTabForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="tab-id">Tab ID</Label>
                  <Input
                    id="tab-id"
                    placeholder="category-id"
                    value={newTabForm.id}
                    onChange={(e) => setNewTabForm(prev => ({ ...prev, id: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddNewTab} className="md:col-span-2">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category Tab
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue={groceryTabs[0]?.id} className="space-y-6">
          <TabsList className="grid w-full bg-white/80" style={{ gridTemplateColumns: `repeat(${groceryTabs.length}, 1fr)` }}>
            {groceryTabs.map((tab) => (
              <div key={tab.id} className="relative group">
                <TabsTrigger 
                  value={tab.id} 
                  className="data-[state=active]:bg-tmaxGreen-500 data-[state=active]:text-white w-full"
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </TabsTrigger>
                {isAdminMode && (
                  <div className="absolute top-0 right-0 flex opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md shadow-md">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0"
                      onClick={() => handleEditTab(tab)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="h-6 w-6 p-0"
                      onClick={() => handleDeleteTab(tab.id)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </TabsList>

          {groceryTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {renderItemGrid(tab.products)}
            </TabsContent>
          ))}
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
            <Phone className="w-4 h-4 mr-2" />
            Order via WhatsApp
          </Button>
        </div>
      </div>

      {/* Edit Tab Dialog */}
      <Dialog open={!!editingTab} onOpenChange={() => setEditingTab(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category Tab</DialogTitle>
          </DialogHeader>
          {editingTab && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-tab-name">Tab Name</Label>
                <Input
                  id="edit-tab-name"
                  value={editingTab.name}
                  onChange={(e) => setEditingTab(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Tab Name"
                />
              </div>
              <div>
                <Label htmlFor="edit-tab-id">Tab ID</Label>
                <Input
                  id="edit-tab-id"
                  value={editingTab.id}
                  onChange={(e) => setEditingTab(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Tab ID"
                />
              </div>
              <Button onClick={handleSaveTab} className="w-full">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Groceries;
