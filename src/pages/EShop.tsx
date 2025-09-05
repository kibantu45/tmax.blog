import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, MessageCircle, Package2, Store, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import BottomNavigation from '@/components/BottomNavigation';

interface Shop {
  id: string;
  shop_name: string;
  category: string;
  contact_number: string | null;
  description: string | null;
  image_url: string | null;
  created_at?: string;
}

interface ShopProduct {
  id: string;
  shop_id: string;
  name: string;
  price: number;
  stock: number | null;
  image_url: string | null;
  description: string | null;
  category: string | null;
  shops?: Shop;
}

const EShop = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedShop, setSelectedShop] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchShops();
    fetchProducts();
  }, []);

  const fetchShops = async () => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .order('shop_name');

    if (error) {
      console.error('Error fetching shops:', error);
      toast({
        title: "Error",
        description: "Failed to load shops",
        variant: "destructive"
      });
    } else {
      setShops(data || []);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('shop_products')
      .select(`
        *,
        shops (
          id,
          shop_name,
          category,
          contact_number,
          description,
          image_url
        )
      `)
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive"
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  // Filter products based on search, category, and shop
  const filterProducts = () => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesShop = !selectedShop || product.shop_id === selectedShop;
      return matchesSearch && matchesCategory && matchesShop;
    });
  };

  const updateQuantity = (productId: string, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (product: ShopProduct) => {
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url || '/lovable-uploads/vitamin-c.jpg',
        category: "E-Shop",
        provider: product.shops?.shop_name || 'Unknown Shop'
      });
    }
    toast({
      title: "Added to Cart",
      description: `${product.name} x${quantity} added to cart`,
      variant: "default"
    });
  };

  const handleOrderNow = (product: ShopProduct) => {
    const quantity = quantities[product.id] || 1;
    const total = product.price * quantity;
    const shopName = product.shops?.shop_name || 'Shop';
    const contactNumber = product.shops?.contact_number;
    
    if (!contactNumber) {
      toast({
        title: "Contact Info Missing",
        description: "Shop contact information is not available",
        variant: "destructive"
      });
      return;
    }
    
    const message = `Hi! I'd like to order:\n\n${product.name}\nQuantity: ${quantity}\nTotal: KSh ${total.toLocaleString()}\n\nFrom: ${shopName}`;
    const whatsappUrl = `https://wa.me/${contactNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading shops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">E-Shop</h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-4">
        <Tabs defaultValue="shops" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="shops">Shops</TabsTrigger>
            <TabsTrigger value="products">All Products</TabsTrigger>
          </TabsList>

          {/* Shops Tab */}
          <TabsContent value="shops" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shops.map((shop) => (
                <Card key={shop.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => {
                  setSelectedShop(shop.id);
                  setSelectedCategory('all');
                }}>
                  <CardContent className="p-4">
                    {shop.image_url && (
                      <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={shop.image_url} 
                          alt={shop.shop_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Store className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{shop.shop_name}</h3>
                      </div>
                      {shop.description && (
                        <p className="text-muted-foreground text-sm">{shop.description}</p>
                      )}
                      <Badge variant="secondary">{shop.category}</Badge>
                      {shop.contact_number && (
                        <p className="text-sm text-muted-foreground">{shop.contact_number}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              {selectedShop && (
                <Button variant="outline" onClick={() => setSelectedShop(null)} size="sm">
                  ← Back to All Shops
                </Button>
              )}
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              <Badge
                variant={selectedCategory === 'all' ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Badge>
              <Badge
                variant={selectedCategory === 'electronics' ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory('electronics')}
              >
                Electronics
              </Badge>
              <Badge
                variant={selectedCategory === 'clothing' ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory('clothing')}
              >
                Clothing
              </Badge>
              <Badge
                variant={selectedCategory === 'beauty' ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory('beauty')}
              >
                Beauty
              </Badge>
              <Badge
                variant={selectedCategory === 'groceries' ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory('groceries')}
              >
                Groceries
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProducts().map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-4">
                    <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={product.image_url || '/lovable-uploads/vitamin-c.jpg'} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {product.category || 'General'}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground text-sm">{product.description || 'No description available'}</p>
                      <p className="text-2xl font-bold text-primary">KSh {product.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">From: {product.shops?.shop_name || 'Unknown Shop'}</p>
                        {product.stock !== null && (
                          <p className="text-muted-foreground">Stock: {product.stock}</p>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(product.id, -1)}
                          disabled={(quantities[product.id] || 1) <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-medium min-w-[2rem] text-center">
                          {quantities[product.id] || 1}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(product.id, 1)}
                          disabled={product.stock !== null && (quantities[product.id] || 1) >= product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          onClick={() => handleAddToCart(product)} 
                          className="flex-1 gap-2"
                          size="sm"
                          disabled={product.stock === 0}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button 
                          onClick={() => handleOrderNow(product)} 
                          variant="outline" 
                          className="flex-1 gap-2"
                          size="sm"
                          disabled={!product.shops?.contact_number}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Order Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filterProducts().length === 0 && (
              <div className="text-center py-12">
                <Package2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EShop;