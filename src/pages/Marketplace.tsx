import React, { useState, useEffect } from 'react';
import { Plus, Search, Heart, MessageCircle, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import BottomNavigation from '@/components/BottomNavigation';

interface MarketplaceItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image_url: string | null;
  seller_phone: string | null;
  category: string | null;
  condition: string | null;
  location: string | null;
  created_at: string;
  user_id: string;
}

const Marketplace = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [myItems, setMyItems] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showSellModal, setShowSellModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'used',
    location: '',
    seller_phone: '',
    image_url: ''
  });

  const categories = ['all', 'electronics', 'clothing', 'books', 'furniture', 'sports', 'other'];
  const conditions = ['new', 'used', 'like-new'];

  useEffect(() => {
    fetchItems();
    if (user) {
      fetchMyItems();
    }
  }, [user]);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching items:', error);
      toast({
        title: "Error",
        description: "Failed to load marketplace items",
        variant: "destructive"
      });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const fetchMyItems = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching my items:', error);
    } else {
      setMyItems(data || []);
    }
  };

  const handleSellItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list an item for sale",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('items')
      .insert({
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        location: formData.location,
        seller_phone: formData.seller_phone,
        image_url: formData.image_url,
        user_id: user.id
      });

    if (error) {
      console.error('Error creating item:', error);
      toast({
        title: "Error",
        description: "Failed to list your item",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Your item has been listed successfully!",
        variant: "default"
      });
      setShowSellModal(false);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        condition: 'used',
        location: '',
        seller_phone: '',
        image_url: ''
      });
      fetchItems();
      fetchMyItems();
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Item deleted successfully",
        variant: "default"
      });
      fetchItems();
      fetchMyItems();
    }
  };

  const handleContact = (item: MarketplaceItem) => {
    if (!item.seller_phone) {
      toast({
        title: "No Contact Info",
        description: "Seller phone number not available",
        variant: "destructive"
      });
      return;
    }
    
    const message = `Hi, I'm interested in your item "${item.title}" listed for KSh ${item.price}.`;
    const whatsappUrl = `https://wa.me/${item.seller_phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const ItemCard = ({ item, showActions = false }: { item: MarketplaceItem; showActions?: boolean }) => (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        {item.image_url && (
          <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
            <img 
              src={item.image_url} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg leading-tight">{item.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {item.condition}
            </Badge>
          </div>
          
          <p className="text-2xl font-bold text-primary">KSh {item.price.toLocaleString()}</p>
          
          {item.description && (
            <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
          )}
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{item.location || 'Location not specified'}</span>
            <span>{getTimeAgo(item.created_at)}</span>
          </div>
          
          <div className="flex gap-2 pt-2">
            {showActions ? (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => handleDeleteItem(item.id)}
                className="flex-1"
              >
                Delete
              </Button>
            ) : (
              <Button 
                onClick={() => handleContact(item)} 
                className="flex-1 gap-2"
                disabled={!item.seller_phone}
              >
                <MessageCircle className="h-4 w-4" />
                Contact Seller
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Marketplace</h1>
          <Button
            onClick={() => setShowSellModal(true)}
            size="sm"
            variant="secondary"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Sell Item
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="all-items" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-items">All Items</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>

          <TabsContent value="all-items" className="space-y-4">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Badge>
              ))}
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found matching your criteria.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-listings" className="space-y-4">
            {!user ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Please log in to view your listings.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myItems.map((item) => (
                    <ItemCard key={item.id} item={item} showActions />
                  ))}
                </div>

                {myItems.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">You haven't listed any items yet.</p>
                    <Button onClick={() => setShowSellModal(true)} className="mt-4">
                      List Your First Item
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Sell Item Modal */}
      <Dialog open={showSellModal} onOpenChange={setShowSellModal}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>List Item for Sale</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSellItem} className="space-y-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="price">Price (KSh) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(cat => cat !== 'all').map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition.charAt(0).toUpperCase() + condition.slice(1).replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., TUM Campus, Nairobi"
              />
            </div>

            <div>
              <Label htmlFor="seller_phone">Your Phone Number *</Label>
              <Input
                id="seller_phone"
                value={formData.seller_phone}
                onChange={(e) => setFormData({ ...formData, seller_phone: e.target.value })}
                placeholder="e.g., +254712345678"
                required
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="Optional: Link to item photo"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowSellModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                List Item
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <BottomNavigation />
    </div>
  );
};

export default Marketplace;