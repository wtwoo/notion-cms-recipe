import { Client } from "@notionhq/client";
import type { Recipe, NotionRecipeProperties } from "@/types";

/**
 * Notion 클라이언트 초기화
 */
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID || "";

/**
 * Notion 페이지 속성을 Recipe 타입으로 변환
 */
function parseNotionRecipe(page: {
  id: string;
  properties: NotionRecipeProperties;
  created_time: string;
}): Recipe {
  const props = page.properties;

  return {
    id: page.id,
    title: props.Title.title[0]?.plain_text || "제목 없음",
    category: props.Category?.select?.name || "기타",
    cookingTime: props.CookingTime?.number || 0,
    difficulty: props.Difficulty?.select?.name || "초급",
    ingredients:
      props.Ingredients.rich_text.map((t) => t.plain_text).join("") || "",
    instructions:
      props.Instructions.rich_text.map((t) => t.plain_text).join("") || "",
    image:
      props.Image.files[0]?.file?.url ||
      props.Image.files[0]?.external?.url ||
      null,
    servings: props.Servings?.number || 2,
    published: props.Published?.checkbox || false,
    createdAt: page.created_time,
  };
}

/**
 * Notion 데이터베이스에서 모든 레시피 조회 (필터 적용)
 */
export async function getRecipes(filter?: {
  category?: string;
  cookingTime?: number;
  search?: string;
}): Promise<Recipe[]> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filters: any[] = [
      {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
    ];

    // 카테고리 필터
    if (filter?.category) {
      filters.push({
        property: "Category",
        select: {
          equals: filter.category,
        },
      });
    }

    // 조리시간 필터
    if (filter?.cookingTime) {
      filters.push({
        property: "CookingTime",
        number: {
          less_than_or_equal_to: filter.cookingTime,
        },
      });
    }

    // 검색 필터 (제목 기반)
    if (filter?.search) {
      filters.push({
        property: "Title",
        title: {
          contains: filter.search,
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await (notion.databases as any).query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        and: filters,
      },
      sorts: [
        {
          property: "Title",
          direction: "ascending",
        },
      ],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.results.map((page: any) => parseNotionRecipe(page));
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "레시피 조회 중 오류가 발생했습니다";
    console.error("Notion API 오류:", message);
    throw new Error(message);
  }
}

/**
 * Notion 데이터베이스에서 특정 레시피 조회
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = (await notion.pages.retrieve({ page_id: id })) as any;

    if (!page.properties) {
      return null;
    }

    return parseNotionRecipe(page);
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "레시피 조회 중 오류가 발생했습니다";
    console.error("Notion API 오류:", message);
    return null;
  }
}

/**
 * 모든 카테고리 목록 조회
 */
export async function getCategories(): Promise<string[]> {
  try {
     
    const response = (await notion.databases.retrieve({
      database_id: NOTION_DATABASE_ID,
    })) as any;

    const categoryProperty = response.properties?.Category;

    if (categoryProperty?.select?.options) {
      return categoryProperty.select.options.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (option: any) => option.name,
      );
    }

    return [];
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "카테고리 조회 중 오류가 발생했습니다";
    console.error("Notion API 오류:", message);
    return [];
  }
}
