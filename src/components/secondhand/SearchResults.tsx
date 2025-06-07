
import ItemCard from "./ItemCard";

interface SearchResultsProps {
  searchQuery: string;
  filteredItems: any[];
  likedItems: number[];
  onLike: (itemId: number) => void;
  onContact: (item: any) => void;
}

const SearchResults = ({ searchQuery, filteredItems, likedItems, onLike, onContact }: SearchResultsProps) => {
  if (!searchQuery) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Search results for "{searchQuery}"</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            isLiked={likedItems.includes(item.id)}
            onLike={onLike}
            onContact={onContact}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
