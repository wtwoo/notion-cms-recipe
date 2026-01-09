# 레시피 카탈로그 (Recipe Catalog)

Notion을 CMS로 활용한 레시피 카탈로그 웹 애플리케이션입니다. Next.js 16, TypeScript, Tailwind CSS 4로 구축되었으며, Notion API를 통해 실시간으로 레시피 데이터를 조회합니다.

## 주요 기능

- **Notion API 연동**: Notion 데이터베이스에서 실시간으로 레시피 조회
- **필터 및 검색**: 카테고리, 조리시간, 제목 기반 필터링
- **반응형 그리드**: 모바일, 태블릿, 데스크톱 대응
- **레시피 상세 페이지**: 재료, 조리법 등 상세 정보 표시
- **다크모드**: 라이트/다크 테마 전환 지원
- **타입 안전성**: TypeScript strict 모드 + Zod 검증

## 기술 스택

| 계층         | 기술                        |
| ------------ | --------------------------- |
| **Frontend** | Next.js 16.1.1 (App Router) |
| **언어**     | TypeScript (strict 모드)    |
| **스타일링** | Tailwind CSS 4 + shadcn/ui  |
| **아이콘**   | Lucide React                |
| **검증**     | Zod                         |
| **CMS**      | Notion API                  |
| **API 통신** | fetch (내장)                |

## 설치 및 실행

### 1. 프로젝트 클론

```bash
git clone [repository-url]
cd notion-cms-recipe
```

### 2. 의존성 설치

```bash
npm install
```

### 3. Notion 설정

#### 3.1 Notion Integration 생성

1. [Notion Integrations](https://www.notion.so/my-integrations) 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "Recipe Catalog")
4. Internal Integration Token 복사

#### 3.2 Notion 데이터베이스 생성

다음 속성으로 데이터베이스를 생성하세요:

| 필드명           | 타입          | 설명                                    |
| ---------------- | ------------- | --------------------------------------- |
| **Title**        | Title         | 레시피 제목                             |
| **Category**     | Select        | 카테고리 (한식, 양식, 중식, 일식, 기타) |
| **CookingTime**  | Number        | 조리시간 (분)                           |
| **Difficulty**   | Select        | 난이도 (초급, 중급, 상급)               |
| **Ingredients**  | Rich Text     | 재료 목록                               |
| **Instructions** | Rich Text     | 조리 방법                               |
| **Image**        | Files & media | 레시피 이미지                           |
| **Servings**     | Number        | 인분                                    |
| **Published**    | Checkbox      | 공개 여부                               |

#### 3.3 데이터베이스에 Integration 연결

1. 생성한 데이터베이스 페이지 열기
2. 우측 상단 "..." 메뉴 클릭
3. "Add connections" 선택
4. 생성한 Integration 선택

#### 3.4 데이터베이스 ID 확인

데이터베이스 URL에서 ID 추출:

```
https://www.notion.so/[workspace]/[database_id]?v=...
                                  ^^^^^^^^^^^^^^^^
                                  이 부분이 Database ID
```

### 4. 환경변수 설정

`.env.local.example` 파일을 복사하여 `.env.local` 생성:

```bash
cp .env.local.example .env.local
```

`.env.local` 파일 수정:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 6. 프로덕션 빌드

```bash
npm run build
npm run start
```

## 프로젝트 구조

```
notion-cms-recipe/
├── app/
│   ├── api/
│   │   └── recipes/
│   │       └── route.ts          # Notion API 엔드포인트
│   ├── recipes/
│   │   └── [id]/
│   │       └── page.tsx          # 레시피 상세 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   └── page.tsx                  # 메인 페이지
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── layout/                   # Header, Footer
│   ├── recipe-card.tsx           # 레시피 카드 컴포넌트
│   └── filter-section.tsx        # 필터 섹션 컴포넌트
├── lib/
│   ├── notion.ts                 # Notion API 유틸리티
│   ├── validations.ts            # Zod 검증 스키마
│   └── utils.ts                  # 유틸리티 함수
├── types/
│   └── index.ts                  # TypeScript 타입 정의
└── .env.local.example            # 환경변수 템플릿
```

## API 엔드포인트

### GET /api/recipes

레시피 목록 조회 (필터 적용 가능)

**쿼리 파라미터:**

- `category`: 카테고리 필터 (한식, 양식, 중식, 일식, 기타)
- `cookingTime`: 조리시간 필터 (분 단위, 이하 조건)
- `search`: 제목 검색

**응답 예시:**

```json
{
  "success": true,
  "data": [
    {
      "id": "xxx",
      "title": "계란말이",
      "category": "한식",
      "cookingTime": 15,
      "difficulty": "초급",
      "ingredients": "계란 3개, 설탕 1큰술...",
      "instructions": "1. 계란을 풀어준다...",
      "image": "https://...",
      "servings": 2,
      "published": true,
      "createdAt": "2025-01-09T..."
    }
  ],
  "count": 1
}
```

## 주요 컴포넌트

### RecipeCard

레시피 카드 UI 컴포넌트

- 이미지, 제목, 카테고리, 난이도, 조리시간, 인분 표시
- 호버 애니메이션
- 상세 페이지 링크 연결

### FilterSection

필터 UI 컴포넌트

- 카테고리 드롭다운
- 조리시간 드롭다운
- 제목 검색 입력
- 필터 초기화 버튼

## 타입 정의

### Recipe

```typescript
interface Recipe {
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
```

## 개발 가이드

### 코딩 규칙

- **들여쓰기:** 2칸
- **컴포넌트:** PascalCase (`RecipeCard`)
- **변수/함수:** camelCase (`filterRecipes`)
- **타입:** 명시적 지정, `any` 금지
- **에러 처리:** `error: unknown` + 타입 가드 필수
- **주석/문서:** 한국어로 작성

### 새 레시피 추가

1. Notion 데이터베이스에서 새 페이지 생성
2. 모든 필드 입력
3. `Published` 체크박스 활성화
4. 웹에서 자동으로 표시됨

### 필터 카테고리 추가

1. `components/filter-section.tsx`에서 카테고리 옵션 추가
2. Notion 데이터베이스의 `Category` 속성에 동일한 옵션 추가

## 배포

### Vercel 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com) 접속
3. "New Project" 클릭
4. GitHub 레포지토리 선택
5. 환경변수 설정:
   - `NOTION_API_KEY`
   - `NOTION_DATABASE_ID`
6. 배포 완료

## 라이선스

MIT License

## 문의

프로젝트 관련 문의사항은 이슈를 등록해주세요.
