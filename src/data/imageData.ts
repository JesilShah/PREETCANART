// Define the Image interface
/*export interface Image {
  id: string;
  categoryId: string;
  url: string;
  alt: string;
}

/*
  IMPORTANT: To add or modify images, simply update this array with new entries.
  Each image should have:
  - id: A unique identifier
  - categoryId: The category it belongs to (must match a category id from categoryData.ts)
  - url: The path to the image (will be added by you)
  - alt: Alternative text for accessibility
*/

// Sample image data (empty placeholders - replace with actual images)
/*const imageData: Image[] = [
  // RAKHIS
  {
    id: "MOTI RAKHI",
    categoryId: "rakhis",
    url: "C:/Users/Jesil/Downloads/project-bolt-sb1-s8ri77td/project1/src/assets/images/RAKHIS/MOTI RAKHIS.jpeg",  // Add your image path
    alt: "Traditional rakhi design"
  },
  {
    id: "rakhi-2",
    categoryId: "rakhis",
    url: "",
    alt: "Handcrafted rakhi"
  },
  
  // COUPLE RAKHIS
  {
    id: "couple-rakhi-1",
    categoryId: "couple-rakhis",
    url: "",
    alt: "Couple rakhi design"
  },
  {
    id: "couple-rakhi-2",
    categoryId: "couple-rakhis",
    url: "",
    alt: "Matching couple rakhi set"
  },
  
  // BHABHI RAKHIS
  {
    id: "bhabhi-rakhi-1",
    categoryId: "bhabhi-rakhis",
    url: "",
    alt: "Elegant bhabhi rakhi"
  },
  {
    id: "bhabhi-rakhi-2",
    categoryId: "bhabhi-rakhis",
    url: "",
    alt: "Decorative bhabhi rakhi"
  },
  
  // BRACELETS
  {
    id: "bracelet-1",
    categoryId: "bracelets",
    url: "",
    alt: "Stylish rakhi bracelet"
  },
  {
    id: "bracelet-2",
    categoryId: "bracelets",
    url: "",
    alt: "Modern rakhi bracelet design"
  },
  
  // RAKHI PANJHA
  {
    id: "panjha-1",
    categoryId: "rakhi-panjha",
    url: "",
    alt: "Traditional rakhi panjha"
  },
  {
    id: "panjha-2",
    categoryId: "rakhi-panjha",
    url: "",
    alt: "Decorative rakhi panjha"
  }
];

// Function to get images by category
export const getImagesByCategory = (categoryId: string): Image[] => {
  return imageData.filter(image => image.categoryId === categoryId);
};

// Function to get an image by its ID
export const getImageById = (imageId: string): Image | undefined => {
  return imageData.find(image => image.id === imageId);
};

// Function to add a new image (for when you want to add more images)
export const addImage = (image: Image): void => {
  imageData.push(image);
};

// Function to remove an image by ID (for when you want to remove images)
export const removeImage = (imageId: string): void => {
  const index = imageData.findIndex(image => image.id === imageId);
  if (index !== -1) {
    imageData.splice(index, 1);
  }
};*/






export interface Image {
  id: string;
  categoryId: string;
  url: string;
  alt: string;
}

// ✅ Import local images
import rakhi1 from '../assets/images/rakhis/moti-rakhis.jpeg';
import rakhi2 from '../assets/images/rakhis/BLUE FLOWER IMITATION.jpeg';
import rakhi3 from '../assets/images/rakhis/SWASTIK RAKHIS.jpeg';
import rakhi4 from '../assets/images/rakhis/BINDI IMITATION RAKHI.jpeg';
import rakhi5 from '../assets/images/rakhis/BLUE STONE IMITATION RAKHI.jpeg';
import rakhi6 from '../assets/images/rakhis/BLUE STONE DROP RAKHI.jpeg';
import rakhi7 from '../assets/images/rakhis/KRISHNA RAKHI.jpeg';
import rakhi8 from '../assets/images/rakhis/RUDRAKSHA KUNDAN RAKHI.jpeg';
import rakhi9 from '../assets/images/rakhis/TRISHUL RAKHI.jpeg';
import rakhi10 from '../assets/images/rakhis/BADAMEE RAKHI.jpeg';
import rakhi11 from '../assets/images/rakhis/BIRDIE SET PASTEL.jpeg';
import rakhi12 from '../assets/images/rakhis/BIRDIE SET RED.jpeg';
import rakhi13 from '../assets/images/rakhis/QUIRKY RUGBY WHITE.jpeg';
import rakhi14 from '../assets/images/rakhis/KRISHNA RAKHI.jpeg';
import rakhi15 from '../assets/images/rakhis/KUNDAN STONE.jpg';
import rakhi16 from '../assets/images/rakhis/MOP RAKHI.jpg';

import bracelet1 from '../assets/images/rakhis/SHREENATHJI BRACELET.jpeg';

import bhabhiRakhi1 from '../assets/images/rakhis/QUIRKY RUGBY WHITE.jpeg';
import bhabhiRakhi2 from '../assets/images/rakhis/MS BHABHI BRACELET.jpeg';
import bhabhiRakhi3 from '../assets/images/rakhis/MS CHARMS BRACELET.jpeg';
import bhabhiRakhi4 from '../assets/images/rakhis/IMITATION BHABHI BRACELETS.jpeg';
import bhabhiRakhi5 from '../assets/images/rakhis/IMITATION BRACELETS.jpeg';



/*import coupleRakhi1 from '../assets/images/COUPLE RAKHIS/couple-rakhi-1.jpeg';
import coupleRakhi2 from '../assets/images/COUPLE RAKHIS/couple-rakhi-2.jpeg';   

import bracelet2 from '../assets/images/BRACELETS/bracelet-2.jpeg';

import panjha1 from '../assets/images/RAKHI PANJHA/panjha-1.jpeg';
import panjha2 from '../assets/images/RAKHI PANJHA/panjha-2.jpeg';*/

const imageData: Image[] = [
  // RAKHIS
  {
    id: "MOTI RAKHI",
    categoryId: "rakhis",                   
    url: rakhi1,
    alt: "Traditional rakhi design"
  },
  {
    id: "BLUE FLOWER IMITATION",
    categoryId: "rakhis",
    url: rakhi2,
    alt: "Handcrafted rakhi"
  },
  {
    id: "SWASTIK RAKHIS",                                 
    categoryId: "rakhis",
    url: rakhi3,
    alt: "Handcrafted rakhi"                 
  },
  {
    id: "BINDI IMITATION RAKHI",
    categoryId: "rakhis",
    url: rakhi4,
    alt: "Handcrafted rakhi"               
  },
  {
    id: "BLUE STONE IMITATION RAKHI",
    categoryId: "rakhis",
    url: rakhi5,
    alt: "Handcrafted rakhi"            
  },
  {
    id: "BLUE STONE DROP RAKHI",
    categoryId: "rakhis",
    url: rakhi6,
    alt: "Handcrafted rakhi"            
  },
  {
    id: "KRISHNA RAKHI",
    categoryId: "rakhis",
    url: rakhi7,
    alt: "Handcrafted rakhi"           
  },
  {
    id: "RUDRAKSHA KUNDAN RAKHI",
    categoryId: "rakhis",
    url: rakhi8,
    alt: "Handcrafted rakhi"
  },
  {
    id: "TRISHUL RAKHI",
    categoryId: "rakhis",
    url: rakhi9,
    alt: "Handcrafted rakhi"              
  },
  {
    id: "BADAMEE RAKHI",
    categoryId: "rakhis",
    url: rakhi10,
    alt: "Handcrafted rakhi"
  },
  {
    id: "BIRDIE SET PASTEL",
    categoryId: "rakhis",
    url: rakhi11,
    alt: "Handcrafted rakhi"                 
  },
  {
    id: "BIRDIE SET RED",
    categoryId: "rakhis",
    url: rakhi12,
    alt: "Handcrafted rakhi"
  },
  {
    id: "QUIRKY RUGBY WHITE",
    categoryId: "rakhis",
    url: rakhi13,
    alt: "Handcrafted rakhi"
  },
  {
    id: "KRISHNA RAKHI",
    categoryId: "rakhis",
    url: rakhi14,
    alt: "Handcrafted rakhi"
  },
  {
    id: "KUNDAN STONE RAKHI",
    categoryId: "rakhis",
    url: rakhi15,
    alt: "Handcrafted rakhi"
  },
  {
    id: "MOP RAKHI",
    categoryId: "rakhis",
    url: rakhi16,
    alt: "Handcrafted rakhi"
  },
// BRACELETS
  {
    id: "SHREENATHJI BRACELET",
    categoryId: "bracelets",
    url: bracelet1,
    alt: "Stylish rakhi bracelet"
  },
// BHABHI RAKHIS
  {
    id: "QUIRKY RUGBY WHITE",
    categoryId: "bhabhi-rakhis",
    url: bhabhiRakhi1,
    alt: "Elegant bhabhi rakhi"
  },
  {
    id: "MS BHABHI BRACELET",
    categoryId: "bhabhi-rakhis",
    url: bhabhiRakhi2,
    alt: "Decorative bhabhi rakhi"
  },
  {
    id: "MS CHARMS BRACELET",
    categoryId: "bhabhi-rakhis",
    url: bhabhiRakhi3,
    alt: "Decorative bhabhi rakhi"
  },
  {
    id: "IMITATION BHABHI BRACELETS",
    categoryId: "bhabhi-rakhis",
    url: bhabhiRakhi4,
    alt: "Decorative bhabhi rakhi"
  },
  {
    id: "IMITATION BRACELETS",
    categoryId: "bhabhi-rakhis",
    url: bhabhiRakhi5,
    alt: "Decorative bhabhi rakhi"
  },

/*  {
    id: "couple-rakhi-1",
    categoryId: "couple-rakhis",
    url: coupleRakhi1,
    alt: "Couple rakhi design"
  },
  {
    id: "couple-rakhi-2",
    categoryId: "couple-rakhis",
    url: coupleRakhi2,
    alt: "Matching couple rakhi set"
  },

  {
    id: "bracelet-2",
    categoryId: "bracelets",
    url: bracelet2,
    alt: "Modern rakhi bracelet design"
  },

  {
    id: "panjha-1",
    categoryId: "rakhi-panjha",
    url: panjha1,
    alt: "Traditional rakhi panjha"
  },
  {
    id: "panjha-2",
    categoryId: "rakhi-panjha",
    url: panjha2,
    alt: "Decorative rakhi panjha"
  }*/
];

// Accessor functions
export const getImagesByCategory = (categoryId: string): Image[] => {
  return imageData.filter(image => image.categoryId === categoryId);
};

export const getImageById = (imageId: string): Image | undefined => {
  return imageData.find(image => image.id === imageId);
};

export const addImage = (image: Image): void => {
  imageData.push(image);
};

export const removeImage = (imageId: string): void => {
  const index = imageData.findIndex(image => image.id === imageId);
  if (index !== -1) {
    imageData.splice(index, 1);
  }
};
