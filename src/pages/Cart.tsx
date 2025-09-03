
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Minus, Plus, Trash2, CreditCard } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import BottomNavigation from "@/components/BottomNavigation";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const handleCheckout = () => {
    const message = `Hi! I'd like to place an order:\n\n${items
      .map(item => `${item.name} x${item.quantity} - KSh ${item.price * item.quantity}`)
      .join('\n')}\n\nTotal: KSh ${getTotalPrice()}\n\nPlease let me know the delivery details.`;
    
    window.open(`https://wa.me/254702752033?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
        <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <ShoppingCart className="w-8 h-8 mr-3" />
                Shopping Cart
              </h1>
              <Button onClick={() => window.history.back()} variant="outline">
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="text-center bg-white/90">
            <CardContent className="pt-16 pb-16">
              <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Start shopping to add items to your cart</p>
              <Button onClick={() => window.location.href = "/"} className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700">
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <ShoppingCart className="w-8 h-8 mr-3" />
              Shopping Cart ({items.length})
            </h1>
            <Button onClick={() => window.history.back()} variant="outline">
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-white/90">
              <CardHeader>
                <CardTitle>Cart Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border rounded-lg">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image || "/placeholder.svg"} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0 w-full sm:w-auto">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                      <p className="font-bold text-tmaxGreen-600">KSh {item.price}</p>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:space-y-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                        />
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">KSh {item.price * item.quantity}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 p-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>KSh 100</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>KSh {getTotalPrice() + 100}</span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700"
                  onClick={handleCheckout}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  You'll be redirected to WhatsApp to complete your order
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default Cart;
