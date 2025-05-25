
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import SecondHand from "./pages/SecondHand";
import RentalBooking from "./pages/RentalBooking";
import FoodDelivery from "./pages/FoodDelivery";
import MyUniversity from "./pages/MyUniversity";
import Chemist from "./pages/Chemist";
import Groceries from "./pages/Groceries";
import RoommateFinder from "./pages/RoommateFinder";
import TumGossip from "./pages/TumGossip";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/second-hand" element={<SecondHand />} />
            <Route path="/rental-booking" element={<RentalBooking />} />
            <Route path="/food-delivery" element={<FoodDelivery />} />
            <Route path="/my-university" element={<MyUniversity />} />
            <Route path="/chemist" element={<Chemist />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/roommate-finder" element={<RoommateFinder />} />
            <Route path="/tum-gossip" element={<TumGossip />} />
            <Route path="/cart" element={<Cart />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
