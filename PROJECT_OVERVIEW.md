# Notion CMS 레시피 카탈로그

Notion을 CMS로 활용하여 레시피 데이터를 관리하고, 웹에서 실시간으로 조회 및 필터링할 수 있는 동적 레시피 플랫폼입니다.

## 🎯 프로젝트 개요

- **프로젝트명:** 레시피 카탈로그 (Recipe Catalog)
- **목적:** Notion API 기반 CMS로 레시피 데이터 중앙 집중식 관리 및 동적 웹 플랫폼 제공
- **CMS 선택 이유:** 비개발자도 Notion에서 직접 콘텐츠 관리 가능, 별도 백엔드 DB 불필요, 빠른 프로토타이핑

## 🎨 주요 기능

1. **Notion API 기반 동적 조회**
   - 실시간 레시피 데이터 조회 및 캐싱 (ISR)
   - 새 데이터 추가 시 자동 반영

2. **그리드 레이아웃 레시피 카드**
   - 반응형 디자인 (모바일 1열, 태블릿 2열, 데스크톱 4열)
   - 호버 애니메이션 효과

3. **검색 및 필터**
   - 카테고리 필터 (한식, 양식, 중식, 일식, 기타)
   - 조리시간 필터 (10분, 20분, 30분)
   - 제목 기반 실시간 검색
   - 필터 조합 가능

4. **상세 페이지**
   - 동적 라우트 `/recipes/[id]`
   - 이미지, 제목, 재료, 조리법 단계별 표시
   - 공유 기능 (클립보드 복사, 링크 공유)

## 🛠 기술 스택

| 계층         | 기술                               |
| ------------ | ---------------------------------- |
| **Frontend** | Next.js 16.1.1 (App Router)        |
| **언어**     | TypeScript 5 (strict 모드)         |
| **스타일링** | Tailwind CSS 4 + shadcn/ui         |
| **폼/검증**  | React Hook Form 7.70.0 + Zod 4.3.5 |
| **상태관리** | Zustand 5.0.9                      |
| **아이콘**   | Lucide React 0.562.0               |
| **CMS**      | Notion API                         |

## 📊 Notion 데이터베이스 구조

| 필드명           | 타입          | 설명                    |
| ---------------- | ------------- | ----------------------- |
| **Title**        | Title         | 레시피 제목 (필수)      |
| **Category**     | Select        | 요리 카테고리           |
| **CookingTime**  | Number        | 조리시간 (분)           |
| **Difficulty**   | Select        | 난이도 (초급/중급/상급) |
| **Ingredients**  | Rich Text     | 재료 목록               |
| **Instructions** | Rich Text     | 조리 방법 (단계별)      |
| **Image**        | Files & media | 요리 이미지             |
| **Servings**     | Number        | 인분                    |
| **Published**    | Checkbox      | 공개 여부               |

## 📱 화면 구성

### 메인 페이지 (`/`)

- **헤더:** 로고 + 제목 + 테마 토글
- **필터:** 카테고리 + 조리시간 드롭다운 + 검색 입력 + 초기화 버튼
- **콘텐츠:** 반응형 카드 그리드 (이미지 + 제목 + 카테고리 + 조리시간 + 난이도)
- **상태:** 로딩 스켈레톤, 빈 상태 처리

### 상세 페이지 (`/recipes/[id]`)

- **상단:** 큰 이미지 + 제목 + 메타정보 (카테고리/난이도/시간/인분)
- **본문:** 재료 섹션 + 조리법 섹션
- **하단:** 공유 버튼 + 이전/다음 레시피 네비게이션

## 📋 MVP 체크리스트

### Phase 1: Notion API 연동

- [ ] Notion 데이터베이스 생성 및 샘플 데이터 입력
- [ ] Notion Integration 설정 및 API 키 발급
- [ ] `.env.local` 파일 설정
- [ ] `/api/recipes` API Route 구현

### Phase 2: UI 컴포넌트

- [ ] `RecipeCard` 컴포넌트 구현
- [ ] `FilterSection` 컴포넌트 구현
- [ ] 메인 페이지 완성
- [ ] 반응형 테스트

### Phase 3: 상세 페이지 & 마무리

- [ ] `/recipes/[id]` 동적 라우트 구현
- [ ] 상세 페이지 UI 완성
- [ ] 공유 기능 테스트
- [ ] 전체 통합 테스트

## 🚀 개발 명령어

```bash
# 개발 서버 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# Lint 검사
npm run lint
```

## 🎯 개발 가이드

### 코딩 규칙

- **들여쓰기:** 2칸 (Prettier 자동화)
- **컴포넌트:** PascalCase (예: `RecipeCard`)
- **변수/함수:** camelCase (예: `filterRecipes`)
- **타입:** 명시적 지정, `any` 금지
- **에러 처리:** `error: unknown` + 타입 가드 필수

### 주요 코드 패턴

**CVA 컴포넌트 변형:**

```typescript
const buttonVariants = cva("base-class", {
  variants: {
    /* ... */
  },
  defaultVariants: {
    /* ... */
  },
});
```

**폼 + 검증:**

```typescript
const form = useForm<DataType>({
  resolver: zodResolver(schema),
  defaultValues: {
    /* ... */
  },
});
```

**클래스 병합:**

```typescript
className={cn("base", condition && "dynamic")}
```

**상태 관리:**

```typescript
export const useStore = create<State>((set) => ({
  // 상태 및 액션
}));
```

## 📁 프로젝트 구조

```
app/
├── page.tsx              # 메인 페이지 (레시피 카탈로그)
├── recipes/
│   └── [id]/
│       └── page.tsx      # 레시피 상세 페이지
├── api/
│   └── recipes.ts        # Notion API 통합 Route
└── layout.tsx            # 루트 레이아웃 (ThemeProvider)

components/
├── ui/                   # shadcn/ui 컴포넌트
├── layout/              # Header, Footer
└── recipes/
    ├── recipe-card.tsx         # 레시피 카드
    ├── recipe-grid.tsx         # 카드 그리드
    ├── filter-section.tsx      # 필터/검색 섹션
    └── recipe-detail.tsx       # 상세 페이지

lib/
├── utils.ts             # cn() - 클래스 병합
├── validations.ts       # Zod 검증 스키마
└── constants.ts         # 상수 (라우트, 필터 옵션)

types/
└── index.ts            # Recipe, Filter 타입

store/
└── use-recipe-store.ts  # 선택사항: Zustand 필터 상태
```

## 🔧 주요 설정

- **Next.js App Router:** SSR/SSG 활용
- **TypeScript Strict:** 모든 타입 명시
- **Tailwind CSS 4:** CSS 변수 기반 다크모드
- **shadcn/ui (new-york):** 모던 디자인 스타일
- **Path Alias:** `@/*` → 프로젝트 루트

## 🚀 다음 단계

1. [PRD.md](./docs/PRD.md) 상세 요구사항 확인
2. Notion 데이터베이스 생성 및 API 키 발급
3. Phase 1부터 차례대로 구현
