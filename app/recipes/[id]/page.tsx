import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Users, ChevronLeft, Share2 } from "lucide-react";
import { getRecipeById } from "@/lib/notion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 레시피 상세 페이지
 * 개별 레시피의 상세 정보 표시
 */
export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* 상단 네비게이션 */}
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="mr-2 size-4" />
                목록으로
              </Button>
            </Link>
          </div>

          {/* 레시피 상세 정보 */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* 이미지 섹션 */}
            <div className="space-y-4">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                {recipe.image ? (
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <span className="text-muted-foreground">이미지 없음</span>
                  </div>
                )}
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-6">
              {/* 제목 */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {recipe.title}
                </h1>
              </div>

              {/* 메타 정보 */}
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="secondary" className="text-base">
                  {recipe.category}
                </Badge>
                <Badge
                  variant={
                    recipe.difficulty === "초급"
                      ? "default"
                      : recipe.difficulty === "중급"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-base"
                >
                  {recipe.difficulty}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="size-5" />
                  <span>{recipe.cookingTime}분</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="size-5" />
                  <span>{recipe.servings}인분</span>
                </div>
              </div>

              {/* 공유 버튼 */}
              <div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: recipe.title,
                        text: `${recipe.title} 레시피를 확인해보세요`,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("링크가 복사되었습니다");
                    }
                  }}
                >
                  <Share2 className="mr-2 size-4" />
                  공유하기
                </Button>
              </div>

              {/* 재료 섹션 */}
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">필요한 재료</h2>
                <div className="rounded-lg border bg-card p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {recipe.ingredients}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 조리 방법 섹션 */}
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold">조리 방법</h2>
            <div className="rounded-lg border bg-card p-6">
              <p className="whitespace-pre-wrap leading-relaxed">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
