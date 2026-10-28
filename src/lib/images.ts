import type { ImageMetadata } from 'astro';

// Pictures live in src/assets/images/. Articles refer to them by file name only.
const images = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

export function findImage(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  const hit = images[`/src/assets/images/${name}`];
  if (!hit) {
    throw new Error(
      `The image "${name}" was not found. Save the file in src/assets/images/ (jpg, png, webp or avif) and use its exact file name.`,
    );
  }
  return hit.default;
}
