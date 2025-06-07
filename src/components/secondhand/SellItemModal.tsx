
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

interface SellFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  condition: string;
  location: string;
  sellerPhone: string;
  images: string[];
}

interface SellItemModalProps {
  isOpen: boolean;
  formData: SellFormData;
  onClose: () => void;
  onFormChange: (data: Partial<SellFormData>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const SellItemModal = ({ 
  isOpen, 
  formData, 
  onClose, 
  onFormChange, 
  onImageUpload, 
  onSubmit 
}: SellItemModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-700">Sell Your Item</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Item Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => onFormChange({ title: e.target.value })}
              placeholder="e.g., MacBook Air M1 2020"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => onFormChange({ description: e.target.value })}
              placeholder="Describe your item's condition, features, etc."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price (KSh) *</label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => onFormChange({ price: e.target.value })}
                placeholder="e.g., 50000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => onFormChange({ category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="electronics">Electronics</option>
                <option value="textbooks">Textbooks</option>
                <option value="furniture">Furniture</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => onFormChange({ condition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="like-new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => onFormChange({ location: e.target.value })}
                placeholder="e.g., Campus West"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your WhatsApp Number *</label>
            <Input
              value={formData.sellerPhone}
              onChange={(e) => onFormChange({ sellerPhone: e.target.value })}
              placeholder="e.g., +254701234567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Photos (Max 5)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Click to upload photos</p>
                </div>
              </label>
              {formData.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {formData.images.map((image, index) => (
                    <img key={index} src={image} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={onSubmit} className="flex-1 bg-green-600 hover:bg-green-700">
              List Item
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellItemModal;
