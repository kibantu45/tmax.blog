
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50">
        <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                  <ShoppingCart className="text-white font-bold text-lg w-6 h-6" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
              </div>
              <Button 
                className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
                onClick={() => window.location.href = "/"}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-400" />
          <h2 className="text-3xl font-bold mb-4 text-gray-700">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to get started!</p>
          <Button 
            className="bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white"
            onClick={() => window.location.href = "/food-delivery"}
          >
            Browse Food
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastelYellow-light via-white to-tmaxGreen-50">
      <header className="bg-white/90 backdrop-blur-sm border-b border-tmaxGreen-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pastelYellow to-tmaxGreen-500 flex items-center justify-center">
                <ShoppingCart className="text-white font-bold text-lg w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-tmaxGreen-600 to-pastelYellow bg-clip-text text-transparent">
                Shopping Cart ({itemCount})
              </h1>
            </div>
            <Button 
              className="bg-gradient-to-r from-tmaxGreen-500 to-pastelYellow hover:from-tmaxGreen-600 hover:to-pastelYellow-dark"
              onClick={() => window.location.href = "/"}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden border-tmaxGreen-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600 capitalize">{item.category}</p>
                      <p className="text-tmaxGreen-600 font-bold">£{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-tmaxGreen-200">
              <CardHeader>
                <CardTitle className="text-tmaxGreen-700">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>£2.99</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>£{(total + 2.99).toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full bg-tmaxGreen-600 hover:bg-tmaxGreen-700 text-white">
                  Proceed to Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
