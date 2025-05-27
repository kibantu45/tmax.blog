import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Utensils, 
  Bed, 
  ShoppingCart, 
  Truck, 
  GraduationCap, 
  Pill, 
  Home,
  Users,
  MessageSquare,
  Calendar,
  Edit,
  Trash2,
  Plus,
  Eye,
  Upload
} from "lucide-react";

const ServiceCarousel = () => {
  const [showSubtabDialog, setShowSubtabDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [subtabs, setSubtabs] = useState<any[]>([]);
  const [editingSubtab, setEditingSubtab] = useState<any>(null);
  const [newSubtab, setNewSubtab] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: ""
  });

  // Check if in admin mode
  const isAdminMode = new URLSearchParams(window.location.search).get('admin') === 'true';

  const services = [
    {
      title: "Food Delivery",
      description: "Order delicious meals from campus restaurants",
      icon: Utensils,
      color: "from-orange-500 to-red-500",
      href: "/food-delivery",
      category: "food"
    },
    {
      title: "Student Housing",
      description: "Find your perfect accommodation near campus",
      icon: Bed,
      color: "from-blue-500 to-purple-500", 
      href: "/rental-booking",
      category: "housing"
    },
    {
      title: "Second-Hand Market",
      description: "Buy and sell pre-loved items within the community",
      icon: ShoppingCart,
      color: "from-green-500 to-teal-500",
      href: "/second-hand",
      category: "marketplace"
    },
    {
      title: "My University",
      description: "Access academic resources and university services",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-500",
      href: "/my-university",
      category: "academic"
    },
    {
      title: "Chemist",
      description: "Order medications and health products online",
      icon: Pill,
      color: "from-pink-500 to-rose-500",
      href: "/chemist",
      category: "health"
    },
    {
      title: "Groceries",
      description: "Fresh groceries delivered to your doorstep",
      icon: Home,
      color: "from-emerald-500 to-green-500",
      href: "/groceries",
      category: "groceries"
    },
    {
      title: "Roommate Finder",
      description: "Connect with potential roommates and flatmates",
      icon: Users,
      color: "from-yellow-500 to-orange-500",
      href: "/roommate-finder",
      category: "social"
    },
    {
      title: "TUM Gossip",
      description: "Stay updated with campus news and discussions",
      icon: MessageSquare,
      color: "from-purple-500 to-pink-500",
      href: "/tum-gossip",
      category: "social"
    },
    {
      title: "Bloom Period Tracker",
      description: "Track your menstrual cycle and reproductive health",
      icon: Calendar,
      color: "from-pink-500 to-purple-500",
      href: "/period-tracker",
      category: "health"
    }
  ];

  const handleServiceDoubleClick = (service: any) => {
    if (!isAdminMode) return;
    
    setSelectedService(service);
    // Load existing subtabs for this service (mock data for now)
    const mockSubtabs = [
      {
        id: 1,
        title: "Sample Item 1",
        description: "Sample description",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop",
        price: "25.99",
        category: service.category
      }
    ];
    setSubtabs(mockSubtabs);
    setShowSubtabDialog(true);
  };

  const handlePreview = (service: any) => {
    window.open(service.href, '_blank');
  };

  const handleAddSubtab = () => {
    if (newSubtab.title && newSubtab.description) {
      const id = Date.now();
      setSubtabs([...subtabs, { ...newSubtab, id }]);
      setNewSubtab({
        title: "",
        description: "",
        image: "",
        price: "",
        category: selectedService?.category || ""
      });
    }
  };

  const handleEditSubtab = (subtab: any) => {
    setEditingSubtab(subtab);
    setNewSubtab(subtab);
  };

  const handleUpdateSubtab = () => {
    if (editingSubtab) {
      setSubtabs(subtabs.map(s => s.id === editingSubtab.id ? { ...newSubtab, id: editingSubtab.id } : s));
      setEditingSubtab(null);
      setNewSubtab({
        title: "",
        description: "",
        image: "",
        price: "",
        category: selectedService?.category || ""
      });
    }
  };

  const handleDeleteSubtab = (id: number) => {
    setSubtabs(subtabs.filter(s => s.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a server
      const mockUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=200&fit=crop&id=${Date.now()}`;
      setNewSubtab({ ...newSubtab, image: mockUrl });
    }
  };

  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Campus Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need for university life, all in one place
          </p>
          {isAdminMode && (
            <Badge className="mt-4 bg-red-500 text-white">
              Admin Mode: Double-click services to manage subtabs
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 overflow-hidden ${
                  isAdminMode ? 'ring-2 ring-blue-300' : ''
                }`}
                onDoubleClick={() => handleServiceDoubleClick(service)}
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {isAdminMode && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreview(service);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white border-0`}
                    onClick={() => window.location.href = service.href}
                  >
                    Explore Service
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Subtab Management Dialog */}
      {showSubtabDialog && selectedService && (
        <Dialog open={showSubtabDialog} onOpenChange={setShowSubtabDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Manage {selectedService.title} Items</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Add/Edit Form */}
              <Card>
                <CardHeader>
                  <CardTitle>{editingSubtab ? 'Edit Item' : 'Add New Item'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Item Title"
                      value={newSubtab.title}
                      onChange={(e) => setNewSubtab({ ...newSubtab, title: e.target.value })}
                    />
                    <Input
                      placeholder="Price"
                      value={newSubtab.price}
                      onChange={(e) => setNewSubtab({ ...newSubtab, price: e.target.value })}
                    />
                  </div>
                  <Textarea
                    placeholder="Description"
                    value={newSubtab.description}
                    onChange={(e) => setNewSubtab({ ...newSubtab, description: e.target.value })}
                  />
                  <div>
                    <label className="block text-sm font-medium mb-2">Image</label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1"
                      />
                      {newSubtab.image && (
                        <img src={newSubtab.image} alt="Preview" className="w-16 h-16 object-cover rounded" />
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={editingSubtab ? handleUpdateSubtab : handleAddSubtab}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {editingSubtab ? 'Update Item' : 'Add Item'}
                    </Button>
                    {editingSubtab && (
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setEditingSubtab(null);
                          setNewSubtab({
                            title: "",
                            description: "",
                            image: "",
                            price: "",
                            category: selectedService?.category || ""
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Existing Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subtabs.map((subtab) => (
                  <Card key={subtab.id} className="overflow-hidden">
                    {subtab.image && (
                      <img src={subtab.image} alt={subtab.title} className="w-full h-32 object-cover" />
                    )}
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{subtab.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{subtab.description}</p>
                      {subtab.price && (
                        <p className="font-bold text-green-600 mb-3">${subtab.price}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditSubtab(subtab)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteSubtab(subtab.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ServiceCarousel;
