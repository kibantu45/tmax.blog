
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Groceries from '@/pages/Groceries';
import FoodDelivery from '@/pages/FoodDelivery';
import GasDelivery from '@/pages/GasDelivery';
import LaundryServices from '@/pages/LaundryServices';
import RoommateFinder from '@/pages/RoommateFinder';
import RentalBooking from '@/pages/RentalBooking';
import SecondHand from '@/pages/SecondHand';
import Chemist from '@/pages/Chemist';
import MyUniversity from '@/pages/MyUniversity';
import Cart from '@/pages/Cart';
import TumGossip from '@/pages/TumGossip';
import PeriodTracker from '@/pages/PeriodTracker';
import BloomPeriodTracker from '@/pages/BloomPeriodTracker';
import ErrandServices from '@/pages/ErrandServices';
import SalonBeauty from '@/pages/SalonBeauty';

// Education pages
import MenstrualCycle from '@/pages/education/MenstrualCycle';
import NutritionDuringPeriod from '@/pages/education/NutritionDuringPeriod';
import FertilityAndOvulation from '@/pages/education/FertilityAndOvulation';
import ManagingPMS from '@/pages/education/ManagingPMS';
import ExerciseDuringCycle from '@/pages/education/ExerciseDuringCycle';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/groceries" element={<Groceries />} />
            <Route path="/food-delivery" element={<FoodDelivery />} />
            <Route path="/gas-delivery" element={<GasDelivery />} />
            <Route path="/laundry-services" element={<LaundryServices />} />
            <Route path="/salon-beauty" element={<SalonBeauty />} />
            <Route path="/roommate-finder" element={<RoommateFinder />} />
            <Route path="/rental-booking" element={<RentalBooking />} />
            <Route path="/second-hand" element={<SecondHand />} />
            <Route path="/chemist" element={<Chemist />} />
            <Route path="/my-university" element={<MyUniversity />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/tum-gossip" element={<TumGossip />} />
            <Route path="/period-tracker" element={<PeriodTracker />} />
            <Route path="/bloom-period-tracker" element={<BloomPeriodTracker />} />
            <Route path="/errand-services" element={<ErrandServices />} />
            
            {/* Education routes */}
            <Route path="/education/menstrual-cycle" element={<MenstrualCycle />} />
            <Route path="/education/nutrition-during-period" element={<NutritionDuringPeriod />} />
            <Route path="/education/fertility-and-ovulation" element={<FertilityAndOvulation />} />
            <Route path="/education/managing-pms" element={<ManagingPMS />} />
            <Route path="/education/exercise-during-cycle" element={<ExerciseDuringCycle />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
