"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FilterSection } from "@/components/filter-section";
import { RecipeCard } from "@/components/recipe-card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Recipe } from "@/types";

/**
 * 메인 페이지
 * 레시피 목록 및 필터 기능 제공
 */
export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 필터 상태
  const [category, setCategory] = useState("all");
  const [cookingTime, setCookingTime] = useState("all");
  const [search, setSearch] = useState("");

  // 레시피 조회
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (category !== "all") {
          params.append("category", category);
        }

        if (cookingTime !== "all") {
          params.append("cookingTime", cookingTime);
        }

        if (search.trim()) {
          params.append("search", search.trim());
        }

        const queryString = params.toString();
        const url = `/api/recipes${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        const data = (await response.json()) as {
          success: boolean;
          data?: Recipe[];
          error?: string;
        };

        if (!response.ok || !data.success) {
          throw new Error(data.error || "레시피 조회에 실패했습니다");
        }

        setRecipes(data.data || []);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다";
        setError(message);
        console.error("레시피 조회 오류:", message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [category, cookingTime, search]);

  // 필터 초기화
  const handleReset = () => {
    setCategory("all");
    setCookingTime("all");
    setSearch("");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* 헤더 */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              레시피 카탈로그
            </h1>
            <p className="mt-2 text-muted-foreground">
              맛있는 레시피를 찾아보세요
            </p>
          </div>

          {/* 필터 섹션 */}
          <div className="mb-8">
            <FilterSection
              category={category}
              cookingTime={cookingTime}
              search={search}
              onCategoryChange={setCategory}
              onCookingTimeChange={setCookingTime}
              onSearchChange={setSearch}
              onReset={handleReset}
            />
          </div>

          {/* 레시피 그리드 */}
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-video w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold text-destructive">
                  오류가 발생했습니다
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
          ) : recipes.length === 0 ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <div className="text-center">
                <p className="text-lg font-semibold">레시피가 없습니다</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  필터 조건을 변경해보세요
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
