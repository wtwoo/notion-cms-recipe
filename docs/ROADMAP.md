# 레시피 카탈로그 개발 로드맵

Notion을 CMS로 활용하여 레시피 데이터를 중앙 집중식으로 관리하고, 웹에서 실시간으로 조회 및 필터링할 수 있는 동적 레시피 플랫폼입니다.

## 개요

**레시피 카탈로그**는 Notion API를 통해 실시간 레시피 데이터를 조회하고, 빠르고 직관적인 검색 및 필터링 기능을 제공하는 웹 애플리케이션입니다. 다음 핵심 기능을 포함합니다:

- **Notion API 기반 동적 조회**: Notion 데이터베이스에서 실시간으로 레시피 데이터를 조회 (ISR 캐싱 적용)
- **그리드 레이아웃 레시피 카드**: 모든 레시피를 카드 형식의 반응형 그리드로 표시
- **검색 및 필터 기능**: 카테고리, 조리시간, 제목 기반 실시간 필터링
- **상세 페이지**: 레시피 전체 정보 표시 (이미지, 재료, 조리법, 공유 기능)

## 개발 워크플로우

### 1. 작업 계획

현재 로드맵을 검토하고 다음 작업을 확인합니다.

### 2. 작업 구현

각 단계별 작업을 진행하며, API 연동 및 비즈니스 로직 구현 시 Playwright MCP를 활용한 테스트를 수행합니다.

### 3. 로드맵 업데이트

완료된 작업을 체크하고 로드맵을 최신 상태로 유지합니다.

## 개발 단계

### Phase 1: 애플리케이션 골격 구축

기초 설정 및 Notion API 연동을 완료하여 데이터 조회 기반을 마련합니다.

- **Task 001: Notion API 환경 설정 및 데이터베이스 구성** ✅
  - 목표: Notion Integration 생성 및 API 키 발급, 데이터베이스 구조 설계 완료
  - 구현 사항:
    - ✅ Notion Integrations 페이지에서 새 Integration 생성 및 Internal Token 발급
    - ✅ Notion 데이터베이스 생성 (필드: Title, Category, CookingTime, Difficulty, Ingredients, Instructions, Image, Servings, Published)
    - ✅ 생성된 Integration을 데이터베이스에 연결 (권한 설정)
    - ✅ `.env.local` 파일 작성 (NOTION_API_KEY, NOTION_DATABASE_ID 저장)
    - ✅ 샘플 레시피 데이터 5개 이상 입력 및 Published 체크

- **Task 002: API Route 기본 구현 및 타입 정의** ✅
  - 목표: Notion에서 데이터를 조회하는 API Route 구현 및 TypeScript 타입 정의 완료
  - 구현 사항:
    - ✅ `lib/validations.ts`에서 Zod로 레시피 타입 정의 (Recipe, RecipeFilterQuery)
    - ✅ `types/index.ts`에서 공통 타입 정의 (Recipe, Filter)
    - ✅ `lib/notion.ts`에서 Notion API 유틸 함수 구현 (fetchRecipes, parseRecipeData)
    - ✅ `app/api/recipes/route.ts` API Route 구현 (필터 파라미터 처리)
    - ✅ API 응답 스키마 정의 및 에러 핸들링

### Phase 2: UI/UX 완성 (더미 데이터 활용) ✅

메인 페이지의 필터 섹션 및 레시피 카드 UI를 완성하고, 실제 API 데이터와 연결합니다.

- **Task 003: 공통 컴포넌트 구현** ✅
  - 목표: RecipeCard, FilterSection 등 주요 UI 컴포넌트 완성
  - 구현 사항:
    - ✅ `components/recipe-card.tsx`: 레시피 카드 컴포넌트 (이미지, 제목, 카테고리, 조리시간, 난이도, 링크)
    - ✅ `components/filter-section.tsx`: 필터 섹션 컴포넌트 (카테고리, 조리시간 셀렉트 + 검색 입력 + 초기화 버튼)
    - ✅ shadcn/ui 기반 컴포넌트 활용 (Button, Select, Input, Badge, Card)
    - ✅ 반응형 디자인 (Tailwind CSS 4 유틸리티 클래스)
    - ✅ 호버 애니메이션 및 전환 효과 추가

- **Task 004: 메인 페이지 완성** ✅
  - 목표: 모든 레시피를 그리드 형식으로 표시하는 메인 페이지 완성
  - 구현 사항:
    - ✅ `app/page.tsx` 메인 페이지 구현
    - ✅ 실제 API 데이터 연결 (fetch `/api/recipes`)
    - ✅ 필터 상태 관리 (URL 쿼리 파라미터 활용)
    - ✅ 반응형 카드 그리드 (sm: 1열, md: 2열, lg: 4열)
    - ✅ 로딩 스켈레톤 및 빈 상태 UI
    - ✅ 전체 레이아웃 (Header + FilterSection + RecipeGrid + Footer)

### Phase 3: 상세 페이지 및 고급 기능 ✅

레시피 상세 페이지를 구현하고, 필터링 및 검색 기능을 완벽하게 통합합니다.

- **Task 005: 레시피 상세 페이지 구현** ✅
  - 목표: 동적 라우트 `/recipes/[id]`에서 레시피 상세 정보 표시
  - 구현 사항:
    - ✅ `app/recipes/[id]/page.tsx` 동적 라우트 구현
    - ✅ 레시피 상세 정보 표시 (큰 이미지, 제목, 카테고리, 조리시간, 난이도, 인분)
    - ✅ 재료 섹션 (마크다운 형식으로 정렬된 리스트)
    - ✅ 조리법 섹션 (단계별 안내 텍스트)
    - ✅ Breadcrumb 네비게이션 (Home > 카테고리 > 레시피 제목)
    - ✅ 공유 버튼 (클립보드 복사 기능)
    - ✅ 에러 처리 및 로딩 상태

- **Task 006: 필터링 및 검색 기능 고도화** ✅
  - 목표: 카테고리, 조리시간, 검색 필터를 모두 통합하여 정상 작동
  - 구현 사항:
    - ✅ API Route에서 다중 필터 처리 (category, cookingTime, search 쿼리 파라미터)
    - ✅ 프론트엔드에서 필터 상태를 URL 쿼리 파라미터로 관리
    - ✅ 필터 조합 가능 (예: 한식 + 20분 이내 + "계란" 검색)
    - ✅ 필터 초기화 기능 (모든 필터 제거)
    - ✅ 실시간 검색 기능 (제목 및 재료 기반)
    - ✅ 필터 결과 반영 및 빈 상태 처리

- **Task 006-1: API 및 비즈니스 로직 통합 테스트** ✅
  - 목표: Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
  - 테스트 시나리오:
    - ✅ 메인 페이지 로드 및 모든 레시피 표시 확인
    - ✅ 카테고리 필터링 동작 확인
    - ✅ 조리시간 필터링 동작 확인
    - ✅ 검색 기능 (제목 기반) 동작 확인
    - ✅ 필터 조합 (카테고리 + 조리시간 + 검색) 동작 확인
    - ✅ 필터 초기화 기능 동작 확인
    - ✅ 레시피 카드 클릭 시 상세 페이지 이동 확인
    - ✅ 상세 페이지에서 올바른 정보 표시 확인
    - ✅ 공유 기능 (클립보드 복사) 동작 확인
    - ✅ 반응형 디자인 확인 (모바일/태블릿/데스크톱)
    - ✅ 에러 상태 및 로딩 상태 처리 확인
    - ✅ 404 페이지 처리 (존재하지 않는 레시피 접근)

### Phase 4: 성능 최적화 및 배포 준비 ✅

전체 애플리케이션을 최적화하고 프로덕션 배포를 준비합니다.

- **Task 007: 성능 최적화 및 캐싱 전략** ✅
  - 목표: ISR 캐싱, 이미지 최적화, 번들 크기 최소화 완료
  - 구현 사항:
    - ✅ ISR (Incremental Static Regeneration) 설정 (revalidate: 3600초)
    - ✅ Next.js Image 컴포넌트 활용 (이미지 최적화, 레이지 로딩)
    - ✅ API 응답 캐싱 최적화
    - ✅ CSS-in-JS 번들 크기 최소화
    - ✅ 코드 분할 (Code Splitting) 확인
    - ✅ 성능 측정 (Core Web Vitals)

- **Task 008: 배포 및 QA 완료** ✅
  - 목표: 프로덕션 빌드 성공 및 Vercel 배포 완료
  - 구현 사항:
    - ✅ 로컬 프로덕션 빌드 테스트 (`npm run build`)
    - ✅ 빌드 에러 및 TypeScript 타입 체크
    - ✅ ESLint 및 Prettier 코드 검사
    - ✅ Vercel 배포 (환경변수 설정)
    - ✅ 배포된 사이트에서 전체 기능 재검증
    - ✅ 모니터링 및 에러 로깅 설정
    - ✅ 문서화 완료 (README.md, CLAUDE.md 업데이트)

## 기술 스택

| 계층         | 기술                          |
| ------------ | ----------------------------- |
| **Frontend** | Next.js 16.1.1 (App Router)   |
| **언어**     | TypeScript 5 (strict 모드)    |
| **스타일링** | Tailwind CSS 4 + shadcn/ui    |
| **폼/검증**  | React Hook Form + Zod         |
| **상태관리** | URL 쿼리 파라미터 (필터 상태) |
| **아이콘**   | Lucide React                  |
| **CMS**      | Notion API                    |
| **배포**     | Vercel                        |

## 파일 구조

```
notion-cms-recipe/
├── app/
│   ├── page.tsx                  # 메인 페이지
│   ├── layout.tsx                # 루트 레이아웃
│   ├── api/
│   │   └── recipes/
│   │       └── route.ts          # Notion API 엔드포인트
│   └── recipes/
│       └── [id]/
│           └── page.tsx          # 레시피 상세 페이지
│
├── components/
│   ├── recipe-card.tsx           # 레시피 카드 컴포넌트
│   ├── filter-section.tsx        # 필터 섹션 컴포넌트
│   ├── layout/
│   │   ├── header.tsx            # 헤더
│   │   └── footer.tsx            # 푸터
│   └── ui/                       # shadcn/ui 컴포넌트
│
├── lib/
│   ├── notion.ts                 # Notion API 유틸
│   ├── validations.ts            # Zod 검증 스키마
│   ├── constants.ts              # 상수 정의
│   └── utils.ts                  # 유틸 함수 (cn 등)
│
├── types/
│   └── index.ts                  # TypeScript 타입 정의
│
├── docs/
│   ├── PRD.md                    # 상세 요구사항 문서
│   └── ROADMAP.md                # 개발 로드맵 (현재 파일)
│
└── .env.local.example            # 환경변수 템플릿
```

## 주요 API 엔드포인트

### GET /api/recipes

레시피 목록 조회 (필터 적용 가능)

**쿼리 파라미터:**

| 파라미터      | 타입   | 설명                             |
| ------------- | ------ | -------------------------------- |
| `category`    | string | 카테고리 필터 (한식, 양식, 중식) |
| `cookingTime` | number | 조리시간 필터 (분 이하)          |
| `search`      | string | 제목 및 재료 검색                |

**응답 예시:**

```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "title": "계란말이",
      "category": "한식",
      "cookingTime": 15,
      "difficulty": "초급",
      "ingredients": "계란 3개, 설탕...",
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

## 완료 상태

- **Phase 1: 애플리케이션 골격 구축** ✅
  - Task 001: Notion API 환경 설정 ✅
  - Task 002: API Route 기본 구현 ✅

- **Phase 2: UI/UX 완성** ✅
  - Task 003: 공통 컴포넌트 구현 ✅
  - Task 004: 메인 페이지 완성 ✅

- **Phase 3: 상세 페이지 및 고급 기능** ✅
  - Task 005: 레시피 상세 페이지 ✅
  - Task 006: 필터링 및 검색 기능 ✅
  - Task 006-1: 통합 테스트 ✅

- **Phase 4: 성능 최적화 및 배포** ✅
  - Task 007: 성능 최적화 ✅
  - Task 008: 배포 및 QA ✅

## 주요 기능 체크리스트

### 코어 기능

- [x] Notion API 인증 및 데이터 조회
- [x] 메인 페이지: 모든 레시피 카드 그리드 표시
- [x] 카테고리 필터링 (드롭다운)
- [x] 조리시간 필터링 (드롭다운)
- [x] 검색 기능 (제목 기반)
- [x] 레시피 상세 페이지
- [x] 반응형 레이아웃
- [x] 로딩 및 에러 상태 처리

### 부가 기능

- [x] 공유 기능 (클립보드 복사)
- [x] Breadcrumb 네비게이션
- [x] 다크모드 지원
- [x] ISR 캐싱 최적화

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# Lint 검사
npm run lint
```

## 환경변수 설정

`.env.local` 파일에 다음 환경변수 추가:

```env
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxx
```

## 참고 자료

### Notion API

- [Notion API 공식 문서](https://developers.notion.com/)
- [데이터베이스 쿼리 API](https://developers.notion.com/reference/post-database-query)

### Next.js

- [Next.js App Router](https://nextjs.org/docs/app)
- [ISR 설정](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)

### 디자인 시스템

- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)

---

**마지막 업데이트:** 2025-01-09
**상태:** MVP 완료 및 배포 완료
