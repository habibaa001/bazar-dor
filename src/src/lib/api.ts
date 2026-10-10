import { Product, Category } from './utils';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.api-store.workers.dev/api/bazardor';

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = category ? `${BASE_URL}/products?category=${category}` : `${BASE_URL}/products`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchSingleProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}