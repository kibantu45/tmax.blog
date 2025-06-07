
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";

interface SecondHandHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSellClick: () => void;
}

const SecondHandHeader = ({ searchQuery, onSearchChange, onSellClick }: SecondHandHeaderProps) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-yellow-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-400 to-green-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">
              Tmax Marketplace
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-64"
              />
              <Button variant="ghost" size="sm">
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600"
              onClick={onSellClick}
            >
              <Plus className="w-4 h-4 mr-2" />
              Sell Item
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SecondHandHeader;
