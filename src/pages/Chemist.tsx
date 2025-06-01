import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Pill, Heart, Thermometer, Shield, Search, ShoppingCart, Edit, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Chemist = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingTab, setEditingTab] = useState<any>(null);
  const [newTabForm, setNewTabForm] = useState({
    id: "",
    name: "",
    icon: "Pill"
  });

  // Check if admin mode is enabled
  const checkAdminMode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('admin') === 'true';
  };

  // Initialize admin mode check
  useState(() => {
    setIsAdminMode(checkAdminMode());
  });

  const [chemistTabs, setChemistTabs] = useState([
    { id: "medications", name: "Medications", icon: "Pill" },
    { id: "health-products", name: "Health Products", icon: "Heart" },
    { id: "services", name: "Services", icon: "Thermometer" },
    { id: "emergency", name: "Emergency", icon: "Shield" }
  ]);

  const medications = [
    { 
      id: "med1", 
      name: "Paracetamol 500mg", 
      price: 50, 
      description: "Pain and fever relief", 
      category: "pain-relief", 
      prescription: false, 
      stock: 100,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med2", 
      name: "Ibuprofen 400mg", 
      price: 80, 
      description: "Anti-inflammatory", 
      category: "pain-relief", 
      prescription: false, 
      stock: 50,
      image: "https://images.unsplash.com/photo-1585435557343-3b092031333c?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med3", 
      name: "Amoxicillin 250mg", 
      price: 200, 
      description: "Antibiotic", 
      category: "prescription", 
      prescription: true, 
      stock: 30,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "med4", 
      name: "Vitamin C Tablets", 
      price: 120, 
      description: "Immune system support", 
      category: "vitamins", 
      prescription: false, 
      stock: 75,
      image: "https://images.unsplash.com/photo-1550572017-edd951aa8743?auto=format&fit=crop&w=400&q=80"
    },
      { 
      id: "med5", 
      name: "Kiss condoms", 
      price: 60, 
      description: "Protection muhimu", 
      category: "vitamins", 
      prescription: false, 
      stock: 75,
      image: "https://www.nicepng.com/maxp/u2e6a9i1o0i1o0r5/?auto=format&fit=crop&w=400&q=80"
    },
  ];

  const healthProducts = [
    { 
      id: "health1", 
      name: "Digital Thermometer", 
      price: 800, 
      description: "Accurate temperature measurement", 
      category: "devices", 
      prescription: false, 
      stock: 20,
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "health2", 
      name: "Blood Pressure Monitor", 
      price: 2500, 
      description: "Home BP monitoring", 
      category: "devices", 
      prescription: false, 
      stock: 10,
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "health3", 
      name: "First Aid Kit", 
      price: 1200, 
      description: "Complete emergency kit", 
      category: "emergency", 
      prescription: false, 
      stock: 15,
      image: "https://images.unsplash.com/photo-1603398938277-9c29e5dc1b3e?auto=format&fit=crop&w=400&q=80"
    },
    { 
      id: "health4", 
      name: "Hand Sanitizer 500ml", 
      price: 300, 
      description: "99.9% germ protection", 
      category: "hygiene", 
      prescription: false, 
      stock: 200,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const services = [
    { name: "Prescription Consultation", description: "Get advice on your medications", icon: Pill, price: "Free" },
    { name: "Blood Pressure Check", description: "Quick BP monitoring service", icon: Heart, price: "100" },
    { name: "Temperature Check", description: "Body temperature measurement", icon: Thermometer, price: "50" },
    { name: "Health Screening", description: "Basic health checkup", icon: Shield, price: "500" }
  ];

  const handleAddToCart = (item: any) => {
    if (item.prescription) {
      window.open(`https://wa.me/254702752033?text=Hi, I need to order ${item.name} (prescription required). Please help me with the process.`, '_blank');
    } else {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image || "/placeholder.svg",
        category: "pharmacy"
      });
    }
  };

  const handleEditTab = (tab: any) => {
    setEditingTab(tab);
  };

  const handleSaveTab = () => {
    if (editingTab) {
      setChemistTabs(prev => prev.map(tab => 
        tab.id === editingTab.id ? editingTab : tab
      ));
      setEditingTab(null);
    }
  };

  const handleDeleteTab = (tabId: string) => {
    if (confirm("Are you sure you want to delete this tab?")) {
      setChemistTabs(prev => prev.filter(tab => tab.id !== tabId));
    }
  };

  const handleAddNewTab = () => {
    const newTab = {
      ...newTabForm,
      id: newTabForm.id || `tab_${Date.now()}`
    };
    setChemistTabs(prev => [...prev, newTab]);
    setNewTabForm({
      id: "",
      name: "",
      icon: "Pill"
    });
  };

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHealthProducts = healthProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-green-700">Campus Pharmacy</h1>
              <p className="text-gray-600 mt-2">Your health and wellness partner</p>
            </div>
            <div className="flex items-center space-x-4">
              {isAdminMode && (
                <Badge variant="outline" className="bg-red-100 text-red-800">Admin Mode</Badge>
              )}
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
              placeholder="Search medications and health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/90"
            />
          </div>
        </div>

        {/* Admin Add New Tab */}
        {isAdminMode && (
          <div className="mb-6">
            <Card className="border-2 border-dashed border-green-300">
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

        <Tabs defaultValue={chemistTabs[0]?.id} className="space-y-6">
          <TabsList className="grid w-full bg-white/80" style={{ gridTemplateColumns: `repeat(${chemistTabs.length}, 1fr)` }}>
            {chemistTabs.map((tab) => (
              <div key={tab.id} className="relative group">
                <TabsTrigger 
                  value={tab.id} 
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white w-full"
                >
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

          <TabsContent value="medications" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMedications.map((med) => (
                <Card key={med.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={med.image} 
                      alt={med.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{med.name}</CardTitle>
                        <CardDescription>{med.description}</CardDescription>
                      </div>
                      {med.prescription && <Badge variant="destructive">Prescription Required</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">KSh {med.price}</span>
                      <Badge variant="outline">{med.stock} in stock</Badge>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(med)}
                      disabled={med.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {med.prescription ? 'Request Prescription' : 'Add to Cart'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="health-products" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHealthProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow bg-white/90">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-green-600">KSh {product.price}</span>
                      <Badge variant="outline">{product.stock} in stock</Badge>
                    </div>
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow bg-white/90">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <service.icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">
                        {service.price === "Free" ? "Free" : `KSh ${service.price}`}
                      </span>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => window.open(`https://wa.me/254702752033?text=Hi, I would like to book ${service.name}`, '_blank')}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contacts</h3>
              <p className="text-red-700 mb-4">For medical emergencies, contact these numbers immediately:</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Campus Health Center:</span>
                  <Button size="sm" onClick={() => window.open('tel:+254702752033')}>
                    Call Now
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Ambulance Services:</span>
                  <Button size="sm" onClick={() => window.open('tel:999')}>
                    Call 999
                  </Button>
                </div>
              </div>
            </div>
            
            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle>Emergency Medicine Kit</CardTitle>
                <CardDescription>Quick access to essential emergency medications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => window.open('https://wa.me/254702752033?text=Hi, I need emergency medications. This is urgent.', '_blank')}
                >
                  Request Emergency Kit
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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

export default Chemist;
