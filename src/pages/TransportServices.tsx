
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Bike } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import TransportServices from "@/components/TransportServices";

const TransportServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Car className="w-8 h-8 mr-3" />
              Transport Services
            </h1>
            <button onClick={() => window.history.back()} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TransportServices />
      </div>

      <BottomNavigation />
    </div>
  );
};

export default TransportServicesPage;
