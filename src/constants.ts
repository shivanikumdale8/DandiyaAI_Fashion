import { Dress } from './types';

export const DRESSES: Dress[] = [
  {
    id: '1',
    name: 'Patola Print Red Lehenga',
    description: 'Traditional Gujarati Patola print lehenga choli with intricate geometric patterns and heavy mirror work.',
    price: 3200,
    rentPrice: 650,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&q=80&w=800',
    category: 'Women',
    color: 'Red',
    size: ['S', 'M', 'L'],
    style: 'Traditional',
    featured: true
  },
  {
    id: '2',
    name: 'Emerald & Crimson Masterpiece',
    description: 'Heavily embroidered emerald green and crimson set with traditional Gujarati beadwork and mirror accents.',
    price: 9800,
    rentPrice: 1800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    category: 'Women',
    color: 'Green',
    size: ['S', 'M'],
    style: 'Traditional',
    featured: true
  },
  {
    id: '3',
    name: 'Sunshine Couple Set',
    description: 'Vibrant yellow and green matching set for couples. Perfect for the high energy of Day 1 Navratri.',
    price: 12500,
    rentPrice: 2500,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1598124837130-99ca0925964f?auto=format&fit=crop&q=80&w=800',
    category: 'Couple',
    color: 'Yellow',
    size: ['M', 'L'],
    style: 'Traditional',
    featured: true
  },
  {
    id: '4',
    name: 'Midnight Maroon Soulmate Set',
    description: 'Sophisticated maroon and black coordinated outfits with intricate hand-stitched patterns.',
    price: 14000,
    rentPrice: 2800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
    category: 'Couple',
    color: 'Maroon',
    size: ['M', 'L'],
    style: 'Traditional'
  },
  {
    id: '5',
    name: 'Royal Purple Mirror Ghaghra',
    description: 'Exquisite royal purple and blue Ghaghra Choli set with heavy mirror work and traditional tassels.',
    price: 6500,
    rentPrice: 1200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
    category: 'Women',
    color: 'Purple',
    size: ['S', 'M', 'L'],
    style: 'Traditional'
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Collection', path: '/collection' },
  { name: 'AI Recommendation', path: '/recommend' },
  { name: 'Cart', path: '/cart' },
];
