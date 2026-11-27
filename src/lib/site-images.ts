import hero from '@/assets/hero.webp.asset.json';
import horeca from '@/assets/horeca.webp.asset.json';
import food from '@/assets/food.webp.asset.json';
import furniture from '@/assets/furniture.webp.asset.json';
import textiles from '@/assets/textiles.webp.asset.json';
import packaging from '@/assets/packaging.webp.asset.json';
import industrial from '@/assets/industrial.webp.asset.json';
import construction from '@/assets/construction.webp.asset.json';
import custom from '@/assets/custom.webp.asset.json';
import { categories, products } from '@/lib/sorsme';

export type ImageOverride = { src: string; zoom: number; x: number; y: number };

export type ImageSlot = {
  id: string;
  label: string;
  group: string;
  page: string;
  width: number;
  height: number;
  defaultSrc: string;
  defaultX: number;
  defaultY: number;
};

const catImage: Record<string, string> = {
  horeca: horeca.url,
  food: food.url,
  furniture: furniture.url,
  textiles: textiles.url,
  packaging: packaging.url,
  industrial: industrial.url,
  construction: construction.url,
  custom: custom.url,
};

export const imageSlots: ImageSlot[] = [
  { id: 'home-hero-main', label: 'Hero background photo', group: 'Home page', page: '/', width: 480, height: 400, defaultSrc: hero.url, defaultX: 8, defaultY: 50 },
  { id: 'home-hero-tableware', label: 'Hero collage — tableware', group: 'Home page', page: '/', width: 360, height: 200, defaultSrc: horeca.url, defaultX: 50, defaultY: 65 },
  { id: 'home-hero-furniture', label: 'Hero collage — furniture', group: 'Home page', page: '/', width: 260, height: 240, defaultSrc: furniture.url, defaultX: 50, defaultY: 50 },
  { id: 'home-hero-restaurant', label: 'Hero collage — restaurant', group: 'Home page', page: '/', width: 340, height: 225, defaultSrc: hero.url, defaultX: 75, defaultY: 70 },
  { id: 'home-hero-industrial', label: 'Hero collage — industrial', group: 'Home page', page: '/', width: 200, height: 170, defaultSrc: industrial.url, defaultX: 50, defaultY: 50 },
  { id: 'home-hero-textiles', label: 'Hero collage — textiles', group: 'Home page', page: '/', width: 180, height: 175, defaultSrc: textiles.url, defaultX: 50, defaultY: 50 },
  { id: 'home-benefits', label: '“Why SorsMe?” photo', group: 'Home page', page: '/', width: 400, height: 250, defaultSrc: hero.url, defaultX: 6, defaultY: 50 },
  { id: 'page-hero', label: 'Page header banner', group: 'Shared sections', page: 'About, Categories, Packages…', width: 1280, height: 355, defaultSrc: hero.url, defaultX: 50, defaultY: 50 },
  { id: 'horeca-showcase', label: 'Horeca page photo', group: 'Content pages', page: '/horeca', width: 800, height: 256, defaultSrc: horeca.url, defaultX: 50, defaultY: 50 },
  { id: 'about-intro', label: 'About page photo', group: 'Content pages', page: '/about', width: 560, height: 275, defaultSrc: furniture.url, defaultX: 50, defaultY: 50 },
  ...categories.map((c) => ({ id: `category-${c.id}`, label: `${c.name} tile`, group: 'Category tiles', page: '/', width: 300, height: 200, defaultSrc: catImage[c.id] ?? c.image, defaultX: 50, defaultY: 50 })),
  ...products.map((p) => ({ id: `product-${p.id}`, label: p.name, group: 'Product examples', page: '/products', width: 320, height: 246, defaultSrc: p.image, defaultX: 50, defaultY: 50 })),
];

export function getSlot(id: string): ImageSlot | undefined {
  return imageSlots.find((s) => s.id === id);
}

const STORAGE_KEY = 'sorsme-site-images-v1';

export function loadOverrides(): Record<string, ImageOverride> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function saveOverrides(overrides: Record<string, ImageOverride>): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    return true;
  } catch {
    return false;
  }
}

export function resizeImageFile(file: File, maxWidth = 1600, maxHeight = 1600, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Please choose an image file.'));
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Could not load the image.'));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width, maxHeight / img.height);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas is not supported in this browser.'));
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const isPng = file.type === 'image/png';
        const dataUrl = canvas.toDataURL(isPng ? 'image/png' : 'image/jpeg', isPng ? undefined : quality);
        resolve(dataUrl);
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}
