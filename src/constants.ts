import { Dress } from './types';

export const DRESSES: Dress[] = [
  {
    id: '1',
    name: 'Patola Print Red Lehenga',
    description: 'Traditional Gujarati Patola print lehenga choli with intricate geometric patterns and heavy mirror work.',
    price: 3200,
    rentPrice: 650,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1756483551860-2b312666ac53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF2cmF0cmklMjBvdXRmaXRzfGVufDB8fDB8fHww',
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
    image: 'https://plus.unsplash.com/premium_photo-1718570265593-8e46d7ef65ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG5hdnJhdHJpJTIwb3V0Zml0c3xlbnwwfHwwfHx8MA%3D%3D',
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
  },
  {
    id: '6',
    name: 'Desert Rose Chaniya Choli',
    description: 'A beautiful and vibrant traditional outfit perfect for Navratri dancing.',
    price: 4500,
    rentPrice: 850,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1595967734995-5809d4cd5216?auto=format&fit=crop&q=80&w=800',
    category: 'Women',
    color: 'Pink',
    size: ['S', 'M', 'L'],
    style: 'Traditional',
    featured: true
  }
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Collection', path: '/collection' },
  { name: 'AI Recommendation', path: '/recommend' },
  { name: 'Cart', path: '/cart' },
];
