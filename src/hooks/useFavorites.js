import { useLocalStorage } from './useLocalStorage';
import { toast } from '@/components/ui/use-toast';

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const isFavorite = prev.includes(propertyId);
      if (isFavorite) {
        toast({ title: "ลบออกจากรายการโปรดแล้ว" });
        return prev.filter(id => id !== propertyId);
      } else {
        toast({ title: "เพิ่มในรายการโปรดแล้ว!" });
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId) => {
    return favorites.includes(propertyId);
  };

  return { favorites, toggleFavorite, isFavorite };
};