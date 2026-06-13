// Define the Category interface
export interface Category {
  id: string;
  name: string;
  description: string;
}

// Category data
export const categoryData: Category[] = [
  {
    id: 'rakhis',
    name: 'Rakhi Catalogue',
    description:
      'Our beautiful collection of traditional rakhis, handcrafted with love and care.',
  },
  {
    id: 'couple-rakhis',
    name: 'Couple Rakhi Catalogue',
    description:
      'Special rakhis designed for couples, celebrating the bond between siblings and their partners.',
  },
  {
    id: 'kids-rakhis',
    name: 'Kids Rakhi Catalogue',
    description:
      'Quirky and playful rakhis designed specifically for kids, celebrating the special relationship.',
  },
  {
    id: 'bracelets',
    name: 'Bracelet Catalogue',
    description:
      'Stylish bracelets that can be worn beyond the festival, keeping the bond alive throughout the year.',
  },
  {
    id: 'resin-rakhis',
    name: 'Resin Rakhi Catalogue',
    description:
      'Resin rakhis designed specifically for this special event and relationship',
  },
  {
    id: 'immitation-jewellery',
    name: 'Immitation Jewellery',
    description:
      'Beautiful immitation jewellery that combine tradition with modern aesthetic.',
  },
  {
    id: 'christmas',
    name: 'Christmas',
    description: 'Christmas jewellery for special event',
  },
];
