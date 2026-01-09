import Link from "next/link";
import Image from "next/image";
import { Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Recipe } from "@/types";

interface RecipeCardProps {
  recipe: Recipe;
}

/**
 * 레시피 카드 컴포넌트
 * 레시피 목록에서 개별 레시피를 카드 형식으로 표시
 */
export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        {/* 이미지 섹션 */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {recipe.image ? (
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <span className="text-muted-foreground">이미지 없음</span>
            </div>
          )}
        </div>

        {/* 콘텐츠 섹션 */}
        <div className="space-y-3 p-4">
          {/* 제목 */}
          <h3 className="line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {recipe.title}
          </h3>

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 카테고리 배지 */}
            <Badge variant="secondary">{recipe.category}</Badge>

            {/* 난이도 배지 */}
            <Badge
              variant={
                recipe.difficulty === "초급"
                  ? "default"
                  : recipe.difficulty === "중급"
                    ? "secondary"
                    : "destructive"
              }
            >
              {recipe.difficulty}
            </Badge>
          </div>

          {/* 조리시간 및 인분 */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="size-4" />
              <span>{recipe.cookingTime}분</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="size-4" />
              <span>{recipe.servings}인분</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
