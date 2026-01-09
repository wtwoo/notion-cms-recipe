import { z } from "zod";

/**
 * 연락처 폼 검증 스키마
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "이름은 2자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일을 입력해주세요"),
  message: z.string().min(10, "메시지는 10자 이상이어야 합니다"),
  subscribe: z.boolean().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * 레시피 검증 스키마
 */
export const recipeSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "제목은 필수입니다"),
  category: z.string().min(1, "카테고리는 필수입니다"),
  cookingTime: z.number().min(1, "조리시간은 1분 이상이어야 합니다"),
  difficulty: z.string().min(1, "난이도는 필수입니다"),
  ingredients: z.string().min(1, "재료는 필수입니다"),
  instructions: z.string().min(1, "조리법은 필수입니다"),
  image: z.string().nullable(),
  servings: z.number().min(1, "인분은 1 이상이어야 합니다"),
  published: z.boolean(),
  createdAt: z.string(),
});

export type RecipeData = z.infer<typeof recipeSchema>;

/**
 * 레시피 필터 검증 스키마
 */
export const recipeFilterSchema = z.object({
  category: z.string().optional(),
  cookingTime: z.number().optional(),
  search: z.string().optional(),
});

export type RecipeFilterData = z.infer<typeof recipeFilterSchema>;
