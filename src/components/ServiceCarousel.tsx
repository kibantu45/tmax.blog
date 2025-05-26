import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home, Utensils, GraduationCap, Pill, ShoppingCart, Users, Smartphone, MessageSquare, Edit, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: 1,
    title: "Student Accommodation",
    description: "Find your perfect student housing",
    icon: Home,
    link: "/rental-booking",
    color: "bg-pastelYellow",
    subtabs: [
      { id: "hostels", name: "Hostels", items: [] },
      { id: "apartments", name: "Apartments", items: [] },
      { id: "rooms", name: "Single Rooms", items: [] }
    ]
  },
  {
    id: 2,
    title: "Food Delivery",
    description: "Campus restaurants at your door",
    icon: Utensils,
    link: "/food-delivery",
    color: "bg-tmaxGreen-200",
    subtabs: [
      { id: "meals", name: "Meals", items: [] },
      { id: "snacks", name: "Snacks", items: [] },
      { id: "beverages", name: "Beverages", items: [] }
    ]
  },
  {
    id: 3,
    title: "University Resources",
    description: "Academic support and information",
    icon: GraduationCap,
    link: "/my-university",
    color: "bg-pastelYellow-light",
    subtabs: [
      { id: "library", name: "Library", items: [] },
      { id: "courses", name: "Courses", items: [] },
      { id: "events", name: "Events", items: [] }
    ]
  },
  {
    id: 4,
    title: "Pharmacy",
    description: "Healthcare and medicine delivery",
    icon: Pill,
    link: "/chemist",
    color: "bg-tmaxGreen-100",
    subtabs: [
      { id: "medications", name: "Medications", items: [] },
      { id: "health-products", name: "Health Products", items: [] },
      { id: "services", name: "Services", items: [] },
      { id: "emergency", name: "Emergency", items: [] }
    ]
  },
  {
    id: 5,
    title: "Groceries",
    description: "Fresh groceries delivered",
    icon: ShoppingCart,
    link: "/groceries",
    color: "bg-pastelYellow",
    subtabs: [
      { id: "fruits", name: "Fruits & Vegetables", items: [] },
      { id: "dairy", name: "Dairy Products", items: [] },
      { id: "pantry", name: "Pantry Essentials", items: [] },
      { id: "beverages", name: "Beverages", items: [] }
    ]
  },
  {
    id: 6,
    title: "Roommate Finder",
    description: "Find compatible roommates",
    icon: Users,
    link: "/roommate-finder",
    color: "bg-tmaxGreen-200",
    subtabs: [
      { id: "profiles", name: "Profiles", items: [] },
      { id: "preferences", name: "Preferences", items: [] }
    ]
  },
  {
    id: 7,
    title: "Mobile Data",
    description: "Top up your mobile data",
    icon: Smartphone,
    link: "/mobile-data",
    color: "bg-pastelYellow-light",
    subtabs: [
      { id: "bundles", name: "Data Bundles", items: [] },
      { id: "airtime", name: "Airtime", items: [] }
    ]
  },
  {
    id: 8,
    title: "Campus Gossip",
    description: "Latest campus news and events",
    icon: MessageSquare,
    link: "/tum-gossip",
    color: "bg-tmaxGreen-100",
    subtabs: [
      { id: "news", name: "News", items: [] },
      { id: "events", name: "Events", items: [] },
      { id: "discussions", name: "Discussions", items: [] }
    ]
  }
];

const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingSubtab, setEditingSubtab] = useState<any>(null);
  const [newSubtabForm, setNewSubtabForm] = useState({
    id: "",
    name: "",
    items: []
  });

  const itemsPerView = 3;
  const maxIndex = Math.max(0, services.length - itemsPerView);

  // Check if admin mode is enabled
  const checkAdminMode = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('admin') === 'true';
  };

  // Initialize admin mode check
  useEffect(() => {
    setIsAdminMode(checkAdminMode());
  }, []);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleServiceDoubleClick = (service: any) => {
    if (isAdminMode) {
      setEditingService(service);
    }
  };

  const handleEditSubtab = (subtab: any) => {
    setEditingSubtab(subtab);
  };

  const handleSaveSubtab = () => {
    if (editingSubtab && editingService) {
      const updatedSubtabs = editingService.subtabs.map((subtab: any) => 
        subtab.id === editingSubtab.id ? editingSubtab : subtab
      );
      setEditingService({ ...editingService, subtabs: updatedSubtabs });
      setEditingSubtab(null);
    }
  };

  const handleDeleteSubtab = (subtabId: string) => {
    if (confirm("Are you sure you want to delete this subtab?")) {
      const updatedSubtabs = editingService.subtabs.filter((subtab: any) => subtab.id !== subtabId);
      setEditingService({ ...editingService, subtabs: updatedSubtabs });
    }
  };

  const handleAddNewSubtab = () => {
    const newSubtab = {
      ...newSubtabForm,
      id: newSubtabForm.id || `subtab_${Date.now()}`
    };
    setEditingService({ 
      ...editingService, 
      subtabs: [...editingService.subtabs, newSubtab] 
    });
    setNewSubtabForm({
      id: "",
      name: "",
      items: []
    });
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="w-1/3 flex-shrink-0 px-2">
                <Card 
                  className="hover:shadow-lg transition-all duration-300 border-tmaxGreen-200 group relative"
                  onDoubleClick={() => handleServiceDoubleClick(service)}
                  style={{ cursor: isAdminMode ? 'pointer' : 'default' }}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-8 h-8 text-tmaxGreen-700" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <Button 
                      className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
                      onClick={() => window.location.href = service.link}
                    >
                      Explore
                    </Button>
                    {isAdminMode && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                          Double-click to edit
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg"
        onClick={nextSlide}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              currentIndex === index ? 'bg-tmaxGreen-600' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>

      {/* Service Subtabs Edit Dialog */}
      <Dialog open={!!editingService} onOpenChange={() => setEditingService(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Subtabs for {editingService?.title}</DialogTitle>
          </DialogHeader>
          {editingService && (
            <div className="space-y-6">
              {/* Add New Subtab */}
              <Card className="border-2 border-dashed border-tmaxGreen-300">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Subtab
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subtab-name">Subtab Name</Label>
                      <Input
                        id="subtab-name"
                        placeholder="Subtab Name"
                        value={newSubtabForm.name}
                        onChange={(e) => setNewSubtabForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subtab-id">Subtab ID</Label>
                      <Input
                        id="subtab-id"
                        placeholder="subtab-id"
                        value={newSubtabForm.id}
                        onChange={(e) => setNewSubtabForm(prev => ({ ...prev, id: e.target.value }))}
                      />
                    </div>
                    <Button onClick={handleAddNewSubtab} className="md:col-span-2">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Subtab
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing Subtabs */}
              <div className="space-y-3">
                <h4 className="font-semibold">Existing Subtabs</h4>
                {editingService.subtabs.map((subtab: any) => (
                  <Card key={subtab.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-medium">{subtab.name}</h5>
                          <p className="text-sm text-gray-500">ID: {subtab.id}</p>
                        </div>
                        <div className="flex space-x-2">
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
                            variant="destructive"
                            onClick={() => handleDeleteSubtab(subtab.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Individual Subtab Dialog */}
      <Dialog open={!!editingSubtab} onOpenChange={() => setEditingSubtab(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Subtab</DialogTitle>
          </DialogHeader>
          {editingSubtab && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-subtab-name">Subtab Name</Label>
                <Input
                  id="edit-subtab-name"
                  value={editingSubtab.name}
                  onChange={(e) => setEditingSubtab(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Subtab Name"
                />
              </div>
              <div>
                <Label htmlFor="edit-subtab-id">Subtab ID</Label>
                <Input
                  id="edit-subtab-id"
                  value={editingSubtab.id}
                  onChange={(e) => setEditingSubtab(prev => ({ ...prev, id: e.target.value }))}
                  placeholder="Subtab ID"
                />
              </div>
              <Button onClick={handleSaveSubtab} className="w-full">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceCarousel;
