export interface BazarPrice {
  bazarName: string;
  price: number;
}

export interface Product {
  id: number;
  slug?: string;
  name: string;
  emoji: string;
  category: string;
  unit: string;
  currentPrice: number;
  previousPrice: number;
  priceChangePercent: number;
  marketSummary?: string;
  minPrice?: number;
  maxPrice?: number;
  avgPrice?: number;
  bazarPrices?: BazarPrice[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export function toBanglaNumeral(num: number | string): string {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
}

export function formatBanglaPrice(price: number): string {
  const formatted = new Intl.NumberFormat('bn-BD').format(price);
  return `${formatted} টাকা`;
}

export function getFormattedBanglaDate(): string {
  if (typeof window === "undefined") {
    return ""; 
  }
  return new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
  });
}