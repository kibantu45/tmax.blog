
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MapPin, Clock, Phone } from "lucide-react";

interface ItemCardProps {
  item: {
    id: number;
    title: string;
    price: number;
    originalPrice: number;
    description: string;
    seller: string;
    sellerPhone: string;
    location: string;
    image: string;
    condition: string;
    likes: number;
    timePosted: string;
  };
  isLiked: boolean;
  onLike: (itemId: number) => void;
  onContact: (item: any) => void;
}

const ItemCard = ({ item, isLiked, onLike, onContact }: ItemCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-yellow-200 group">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onLike(item.id)}
          className={`absolute top-2 right-2 ${isLiked ? 'text-red-500 bg-white/80' : 'text-gray-600 bg-white/60'} hover:bg-white/90`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        <Badge className={`absolute top-2 left-2 ${
          item.condition === 'Like New' ? 'bg-green-500' : 
          item.condition === 'Excellent' ? 'bg-blue-500' : 'bg-yellow-500'
        } text-white`}>
          {item.condition}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
            {item.title}
          </h3>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">KSh {item.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500 line-through">KSh {item.originalPrice.toLocaleString()}</div>
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${item.seller}&background=random`} />
              <AvatarFallback className="text-xs">{item.seller.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">{item.seller}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{item.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-500">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{item.timePosted}</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-gray-500">
              <Heart className="w-3 h-3" />
              <span className="text-xs">{item.likes + (isLiked ? 1 : 0)}</span>
            </div>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => onContact(item)}>
              <Phone className="w-3 h-3 mr-1" />
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
