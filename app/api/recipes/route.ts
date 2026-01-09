import { NextRequest, NextResponse } from "next/server";
import { getRecipes } from "@/lib/notion";

/**
 * GET /api/recipes
 * 레시피 목록 조회 (필터 적용 가능)
 *
 * 쿼리 파라미터:
 * - category: 카테고리 필터 (한식, 양식, 중식, 일식, 기타)
 * - cookingTime: 조리시간 필터 (분 단위, 이하 조건)
 * - search: 제목 검색
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get("category") || undefined;
    const cookingTimeParam = searchParams.get("cookingTime");
    const search = searchParams.get("search") || undefined;

    const cookingTime = cookingTimeParam
      ? parseInt(cookingTimeParam, 10)
      : undefined;

    const recipes = await getRecipes({
      category,
      cookingTime,
      search,
    });

    return NextResponse.json({
      success: true,
      data: recipes,
      count: recipes.length,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "레시피 조회 중 오류가 발생했습니다";

    console.error("API Route 오류:", message);

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
