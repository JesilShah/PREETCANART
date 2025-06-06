export interface Image {
  id: string;
  categoryId: string;
  url: string;
  alt: string;
  price: string;
}

import allImageData from './all-images.json';

const imageData: Image[] = allImageData;

// Accessor functions
export const getImagesByCategory = (categoryId: string): Image[] => {
  return imageData.filter((image) => image.categoryId === categoryId);
};

const imageMap: Record<string, Image> = Object.fromEntries(
  imageData.map((img) => [img.id, img])
);

export const getImageById = (imageId: string): Image | undefined => {
  return imageMap[imageId];
};

export const addImage = (image: Image): void => {
  imageData.push(image);
};

export const removeImage = (imageId: string): void => {
  const index = imageData.findIndex((image) => image.id === imageId);
  if (index !== -1) {
    imageData.splice(index, 1);
  }
};
