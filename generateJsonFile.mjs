import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ✅ Emulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// List of categories/folders to scan
const categories = [
  'rakhis',
  'bracelets',
  'couple-rakhis',
  'immitation-jewellery',
  'kids-rakhis',
  'resin-rakhis',
];

// Input base folder (relative to this script)
const baseInputPath = path.join(__dirname, 'public/images');

// Output folder for JSON files
const outputPath = path.join(__dirname, 'public/data');

// Ensure output folder exists
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const generateImageLists = () => {
  const allImages = [];

  categories.forEach((category) => {
    const folderPath = path.join(baseInputPath, category);
    if (!fs.existsSync(folderPath)) {
      console.warn(`Folder not found: ${folderPath}`);
      return;
    }

    const files = fs
      .readdirSync(folderPath)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    const imageData = files.map((filename) => ({
      id: filename.replace(/\.\w+$/, ''), // remove extension
      categoryId: category,
      url: `/images/${category}/${filename}`,
      alt: filename.replace(/\.\w+$/, '').replace(/[-_]/g, ' '),
    }));

    // Write per-category JSON file
    fs.writeFileSync(
      path.join(outputPath, `${category}.json`),
      JSON.stringify(imageData, null, 2),
      'utf8'
    );

    allImages.push(...imageData);
  });

  // Optional: Write combined file
  fs.writeFileSync(
    path.join(outputPath, `all-images.json`),
    JSON.stringify(allImages, null, 2),
    'utf8'
  );

  console.log('✅ Image JSON files generated successfully.');
};

generateImageLists();
