import { Product, Category } from './utils';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  'https://openapi.programming-hero.com/api/bazardor';

export async function fetchProducts(category?: string): Promise<Product[]> {
  try {
    const url = category
      ? `${BASE_URL}/products?category=${encodeURIComponent(category)}`
      : `${BASE_URL}/products`;

    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch products');

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchSingleProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${BASE_URL}/products/${slug}`);
    if (!res.ok) return null;

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}