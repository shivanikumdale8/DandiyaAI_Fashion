export interface Dress {
  id: string;
  name: string;
  description: string;
  price: number;
  rentPrice: number;
  rating?: number;
  image: string;
  category: 'Women' | 'Men' | 'Couple' | 'Kids';
  color: string;
  size: string[];
  style: 'Traditional' | 'Modern' | 'Indo-Western';
  featured?: boolean;
}

export type NavratriDay = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface RecommendationCriteria {
  budget: number;
  favoriteColor: string;
  day: NavratriDay;
  style: string;
}
