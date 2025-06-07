
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import ItemCard from "./ItemCard";

interface TabSectionProps {
  electronics: any[];
  likedItems: number[];
  onLike: (itemId: number) => void;
  onContact: (item: any) => void;
}

const TabSection = ({ electronics, likedItems, onLike, onContact }: TabSectionProps) => {
  const renderItemCard = (item: any) => (
    <ItemCard
      key={item.id}
      item={item}
      isLiked={likedItems.includes(item.id)}
      onLike={onLike}
      onContact={onContact}
    />
  );

  return (
    <Tabs defaultValue="electronics" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 border border-yellow-200">
        <TabsTrigger value="electronics" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
          Electronics
        </TabsTrigger>
        <TabsTrigger value="textbooks" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
          Textbooks
        </TabsTrigger>
        <TabsTrigger value="furniture" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
          Furniture
        </TabsTrigger>
        <TabsTrigger value="clothing" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
          Clothing
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="electronics" className="space-y-6">
        <Card className="border-yellow-200 bg-white/80">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Electronics & Gadgets
            </CardTitle>
            <CardDescription>
              Discover laptops, phones, tablets, and other electronic devices from fellow students. 
              All items are verified and come with seller ratings for your peace of mind.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electronics.map(renderItemCard)}
        </div>
      </TabsContent>
      
      <TabsContent value="textbooks" className="space-y-6">
        <Card className="border-yellow-200 bg-white/80">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Textbooks & Study Materials
            </CardTitle>
            <CardDescription>
              Save money on expensive textbooks! Find course materials from students who've completed the classes. 
              Filter by course code, edition, and condition to find exactly what you need.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electronics.map(renderItemCard)}
        </div>
      </TabsContent>
      
      <TabsContent value="furniture" className="space-y-6">
        <Card className="border-yellow-200 bg-white/80">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Furniture & Dorm Essentials
            </CardTitle>
            <CardDescription>
              Save money on expensive textbooks! Find course materials from students who've completed the classes. 
              Filter by course code, edition, and condition to find exactly what you need.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electronics.map(renderItemCard)}
        </div>
      </TabsContent>
      
      <TabsContent value="clothing" className="space-y-6">
        <Card className="border-yellow-200 bg-white/80">
          <CardHeader>
            <CardTitle className="text-green-700 flex items-center">
              <Star className="w-5 h-5 mr-2" />
              Clothing & Accessories
            </CardTitle>
            <CardDescription>
              Save money on expensive textbooks! Find course materials from students who've completed the classes. 
              Filter by course code, edition, and condition to find exactly what you need.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {electronics.map(renderItemCard)}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabSection;
