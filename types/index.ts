import { LucideIcon } from "lucide-react";

/**
 * 네비게이션 아이템 타입
 */
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  external?: boolean;
}

/**
 * 사이트 설정 타입
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  links: {
    github?: string;
    twitter?: string;
  };
}

/**
 * 피처 타입 (랜딩 페이지용)
 */
export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

/**
 * 레시피 타입
 */
export interface Recipe {
  id: string;
  title: string;
  category: string;
  cookingTime: number;
  difficulty: string;
  ingredients: string;
  instructions: string;
  image: string | null;
  servings: number;
  published: boolean;
  createdAt: string;
}

/**
 * 레시피 필터 타입
 */
export interface RecipeFilter {
  category?: string;
  cookingTime?: number;
  search?: string;
}

/**
 * Notion 페이지 속성 타입
 */
export interface NotionRecipeProperties {
  Title: { title: Array<{ plain_text: string }> };
  Category: { select: { name: string } | null };
  CookingTime: { number: number | null };
  Difficulty: { select: { name: string } | null };
  Ingredients: { rich_text: Array<{ plain_text: string }> };
  Instructions: { rich_text: Array<{ plain_text: string }> };
  Image: {
    files: Array<{ file?: { url: string }; external?: { url: string } }>;
  };
  Servings: { number: number | null };
  Published: { checkbox: boolean };
}
