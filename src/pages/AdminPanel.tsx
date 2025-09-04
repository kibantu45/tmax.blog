import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, Edit, Trash2, Upload, Save, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("medicines");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  // Data states
  const [medicines, setMedicines] = useState([]);
  const [groceries, setGroceries] = useState([]);
  const [eshopProducts, setEshopProducts] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchAllData();
    }
  }, [isAdmin]);

  const checkAdminAccess = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      setIsAdmin(!!data);
    } catch (error) {
      console.log('Not an admin user');
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const [medicinesRes, groceriesRes, eshopRes, servicesRes, rentalsRes] = await Promise.all([
        supabase.from('medicines').select('*').order('created_at', { ascending: false }),
        supabase.from('groceries').select('*').order('created_at', { ascending: false }),
        supabase.from('eshop_products').select('*').order('created_at', { ascending: false }),
        supabase.from('service_providers').select('*').order('created_at', { ascending: false }),
        supabase.from('rentals').select('*, rental_photos(*)').order('created_at', { ascending: false })
      ]);

      setMedicines(medicinesRes.data || []);
      setGroceries(groceriesRes.data || []);
      setEshopProducts(eshopRes.data || []);
      setServiceProviders(servicesRes.data || []);
      setRentals(rentalsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive"
      });
    }
  };

  const handleSave = async () => {
    try {
      let table: string;
      if (activeTab === "eshop") table = "eshop_products";
      else if (activeTab === "services") table = "service_providers";
      else table = activeTab;
      
      if (editingItem) {
        const { error } = await supabase
          .from(table as any)
          .update(formData)
          .eq('id', editingItem.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Item updated successfully" });
      } else {
        const { error } = await supabase
          .from(table as any)
          .insert(formData);
        
        if (error) throw error;
        toast({ title: "Success", description: "Item created successfully" });
      }
      
      setEditingItem(null);
      setFormData({});
      fetchAllData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      let table: string;
      if (activeTab === "eshop") table = "eshop_products";
      else if (activeTab === "services") table = "service_providers";
      else table = activeTab;
      
      const { error } = await supabase
        .from(table as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: "Success", description: "Item deleted successfully" });
      fetchAllData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const renderForm = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Name</label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price</label>
            <Input
              type="number"
              value={formData.price || ''}
              onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
              placeholder="Enter price"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Image URL</label>
          <Input
            value={formData.image_url || ''}
            onChange={(e) => setFormData({...formData, image_url: e.target.value})}
            placeholder="Enter image URL"
          />
        </div>
      </>
    );

    if (activeTab === "medicines") {
      return (
        <div className="space-y-4">
          {commonFields}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pain-relief">Pain Relief</SelectItem>
                  <SelectItem value="antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="vitamins">Vitamins</SelectItem>
                  <SelectItem value="cold-flu">Cold & Flu</SelectItem>
                  <SelectItem value="digestion">Digestion</SelectItem>
                  <SelectItem value="contraceptive">Contraceptive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Stock</label>
              <Input
                type="number"
                value={formData.stock || ''}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                placeholder="Enter stock"
              />
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "services") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mamafua">Laundry</SelectItem>
                  <SelectItem value="fundi">Technician</SelectItem>
                  <SelectItem value="poshomill">Mill Services</SelectItem>
                  <SelectItem value="salon">Beauty & Salon</SelectItem>
                  <SelectItem value="wifi">WiFi Installation</SelectItem>
                  <SelectItem value="photography">Photography</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter description"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={formData.phone || ''}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="Enter phone"
              />
            </div>
            <div>
              <label className="text-sm font-medium">WhatsApp</label>
              <Input
                value={formData.whatsapp || ''}
                onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                placeholder="Enter WhatsApp"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input
                value={formData.location || ''}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Enter location"
              />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {commonFields}
        <div>
          <label className="text-sm font-medium">Category</label>
          <Input
            value={formData.category || ''}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            placeholder="Enter category"
          />
        </div>
      </div>
    );
  };

  const renderDataTable = (data: any[]) => (
    <div className="space-y-4">
      {data.map((item) => (
        <Card key={item.id} className="glass backdrop-blur-lg bg-white/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{item.name || item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="outline">KSh {item.price || item.price_per_day}</Badge>
                  <Badge variant="outline">{item.category}</Badge>
                  {item.stock && <Badge variant="outline">{item.stock} in stock</Badge>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingItem(item);
                    setFormData(item);
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Checking admin access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Admin Access Required</h2>
            <p className="text-gray-600 mb-4">Please log in to access the admin panel.</p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 mx-auto text-red-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-4">You don't have admin privileges to access this panel.</p>
            <Button onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 glass backdrop-blur-lg bg-white/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <Shield className="w-6 h-6 mr-2" />
                  Admin Panel
                </CardTitle>
                <CardDescription>Manage all content and data</CardDescription>
              </div>
              <Button onClick={() => window.location.href = '/'}>
                Back to Home
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Panel */}
          <Card className="lg:col-span-1 glass backdrop-blur-lg bg-white/30">
            <CardHeader>
              <CardTitle className="flex items-center">
                {editingItem ? <Edit className="w-5 h-5 mr-2" /> : <Plus className="w-5 h-5 mr-2" />}
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderForm()}
              <div className="flex gap-2 mt-6">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                {editingItem && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingItem(null);
                      setFormData({});
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Data Panel */}
          <Card className="lg:col-span-2 glass backdrop-blur-lg bg-white/30">
            <CardHeader>
              <CardTitle>Manage Content</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-5 w-full mb-6">
                  <TabsTrigger value="medicines">Medicines</TabsTrigger>
                  <TabsTrigger value="groceries">Groceries</TabsTrigger>
                  <TabsTrigger value="eshop">E-shop</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="rentals">Rentals</TabsTrigger>
                </TabsList>

                <TabsContent value="medicines" className="space-y-4">
                  {renderDataTable(medicines)}
                </TabsContent>

                <TabsContent value="groceries" className="space-y-4">
                  {renderDataTable(groceries)}
                </TabsContent>

                <TabsContent value="eshop" className="space-y-4">
                  {renderDataTable(eshopProducts)}
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                  {renderDataTable(serviceProviders)}
                </TabsContent>

                <TabsContent value="rentals" className="space-y-4">
                  {renderDataTable(rentals)}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;