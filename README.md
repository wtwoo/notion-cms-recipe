# 🍳 Notion CMS 레시피 카탈로그

Notion을 CMS로 활용하여 레시피 데이터를 관리하고, 웹에서 실시간으로 조회 및 필터링할 수 있는 동적 레시피 플랫폼입니다.

## 🎯 프로젝트 개요

- **프로젝트명:** 레시피 카탈로그 (Recipe Catalog)
- **목적:** Notion API 기반 CMS로 레시피 데이터 중앙 집중식 관리 및 동적 웹 플랫폼 제공
- **CMS 선택 이유:** 비개발자도 Notion에서 직접 콘텐츠 관리 가능, 별도 백엔드 DB 불필요, 빠른 프로토타이핑

## 🎨 주요 기능

- **Notion API 기반 동적 조회:** 실시간 레시피 데이터 조회 및 캐싱 (ISR)
- **반응형 레이아웃:** 모바일 1열, 태블릿 2열, 데스크톱 4열의 그리드 레이아웃
- **검색 및 필터:** 카테고리, 조리시간, 제목 기반 실시간 검색
- **상세 페이지:** 동적 라우트로 이미지, 재료, 조리법 단계별 표시
- **공유 기능:** 클립보드 복사, 링크 공유 기능

## 🛠 기술 스택

| 계층                 | 기술                               |
| -------------------- | ---------------------------------- |
| **Framework**        | Next.js 16.1.1 (App Router)        |
| **Language**         | TypeScript 5 (strict mode)         |
| **Styling**          | Tailwind CSS 4 + shadcn/ui         |
| **Forms**            | React Hook Form 7.70.0 + Zod 4.3.5 |
| **State Management** | Zustand 5.0.9                      |
| **Icons**            | Lucide React 0.562.0               |
| **CMS**              | Notion API                         |
| **Other**            | date-fns, next-themes, usehooks-ts |

## 🚀 빠른 시작

### 전제 조건

- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# Lint 검사
npm run lint
```

## 📁 프로젝트 구조

```
app/                              # Next.js App Router
├── page.tsx                       # 메인 페이지 (레시피 카탈로그)
├── recipes/
│   └── [id]/
│       └── page.tsx              # 레시피 상세 페이지
├── api/
│   └── recipes.ts                # Notion API 통합
└── layout.tsx                    # 루트 레이아웃

components/
├── ui/                           # shadcn/ui 컴포넌트
├── layout/                       # Header, Footer
└── recipes/                      # 레시피 관련 컴포넌트
    ├── recipe-card.tsx
    ├── recipe-grid.tsx
    ├── filter-section.tsx
    └── recipe-detail.tsx

lib/
├── utils.ts                      # cn() - 클래스명 병합
├── validations.ts                # Zod 검증 스키마
└── constants.ts                  # 상수

types/
└── index.ts                      # Recipe, Filter 타입

store/
└── use-recipe-store.ts           # Zustand 필터 상태

.claude/                          # Claude Code 설정
├── agents/
├── commands/
├── hooks/
└── settings.local.json
```

## 📊 Notion 데이터베이스 구조

| 필드명           | 타입          | 설명               |
| ---------------- | ------------- | ------------------ |
| **Title**        | Title         | 레시피 제목 (필수) |
| **Category**     | Select        | 요리 카테고리      |
| **CookingTime**  | Number        | 조리시간 (분)      |
| **Difficulty**   | Select        | 난이도             |
| **Ingredients**  | Rich Text     | 재료 목록          |
| **Instructions** | Rich Text     | 조리 방법          |
| **Image**        | Files & media | 요리 이미지        |
| **Servings**     | Number        | 인분               |
| **Published**    | Checkbox      | 공개 여부          |

## 📋 환경 변수 설정

`.env.local` 파일을 생성하고 다음을 추가하세요:

```bash
# Notion API
NEXT_PUBLIC_NOTION_DATABASE_ID=your_database_id
NOTION_API_KEY=your_api_key
```

## 🎯 개발 가이드

### 코딩 규칙

- **들여쓰기:** 2칸
- **컴포넌트:** PascalCase (`RecipeCard`)
- **변수/함수:** camelCase (`filterRecipes`)
- **타입:** 명시적 지정, `any` 금지
- **에러 처리:** `error: unknown` + 타입 가드 필수
- **주석/문서:** 한국어로 작성

### 타입 안전성

```typescript
// ✅ 올바른 에러 처리
try {
  // ...
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : "알 수 없는 오류";
}

// ❌ 금지
try {
  // ...
} catch (error: any) {
  // error의 타입이 불명확함
}
```

### 폼 + 검증

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema } from "@/lib/validations";

export function MyForm() {
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { /* ... */ }
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* 폼 필드 */}
    </form>
  );
}
```

## 📚 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Reference](https://developers.notion.com)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod Documentation](https://zod.dev)
