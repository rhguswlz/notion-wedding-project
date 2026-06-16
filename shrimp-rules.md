# 개발 규칙 (AI Agent용)

**목적**: Notion CMS 기반 웨딩 비용 정리 블로그의 Next.js 애플리케이션 개발을 위한 AI 에이전트 지침

---

## 1. 프로젝트 개요

- **프로젝트명**: 웨딩 비용 정리 블로그
- **설명**: Notion을 CMS로 활용하여 웨딩 비용을 카테고리별로 정리하고 개인 블로그에서 자동 발행하는 시스템
- **프레임워크**: Next.js 15.5.3 (App Router + Turbopack)
- **런타임**: React 19.1.0 + TypeScript 5
- **UI/스타일**: Tailwind CSS v4 + shadcn/ui (new-york style)
- **폼**: React Hook Form + Zod
- **외부 연동**: Notion API (@notionhq/client)
- **배포**: Vercel

### 핵심 기능

- **F001**: Notion API 연동 (발행된 글 자동 조회)
- **F002**: 글 목록 표시 (카드 형태)
- **F003**: 글 상세 보기 (Notion 블록 렌더링)
- **F004**: 카테고리 필터링 (예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문)
- **F005**: 검색 기능 (제목 + 태그)
- **F006**: 반응형 디자인 (모바일/태블릿/데스크톱)
- **F010**: 기본 SEO 설정
- **F011**: 글 메타데이터 표시
- **F012**: 카테고리 네비게이션

---

## 2. 프로젝트 아키텍처

### 디렉토리 구조 (레이어드 아키텍처)

```
src/
├── app/                           # Next.js App Router (페이지 & 라우트)
│   ├── layout.tsx                 # 루트 레이아웃 (헤더, 푸터, 테마 제공자)
│   ├── page.tsx                   # 홈 페이지 (/)
│   ├── search/
│   │   └── page.tsx               # 검색 결과 페이지 (/search)
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx           # 카테고리 페이지 (/category/[slug])
│   ├── post/
│   │   └── [id]/
│   │       └── page.tsx           # 글 상세 페이지 (/post/[id])
│   └── api/                       # 선택: API 라우트 (필요시)
│
├── components/
│   ├── ui/                        # shadcn/ui 컴포넌트들
│   ├── layout/                    # 공통 레이아웃 컴포넌트
│   │   ├── header.tsx             # 헤더 (네비게이션 포함)
│   │   ├── footer.tsx             # 푸터
│   │   └── container.tsx          # 컨테이너 래퍼
│   ├── navigation/                # 네비게이션 컴포넌트
│   │   ├── main-nav.tsx           # 메인 네비게이션
│   │   └── mobile-nav.tsx         # 모바일 네비게이션
│   ├── providers/                 # 상태 제공자
│   │   └── theme-provider.tsx     # 다크모드 제공자
│   └── [feature-components]/      # 기능별 컴포넌트 (필요시)
│       ├── post-card.tsx          # 글 카드 컴포넌트
│       ├── block-renderer.tsx     # Notion 블록 렌더러
│       ├── search-bar.tsx         # 검색 바
│       └── category-filter.tsx    # 카테고리 필터
│
├── lib/
│   ├── env.ts                     # 환경 변수 검증 (Zod 기반)
│   ├── utils.ts                   # 유틸리티 함수
│   ├── notion/
│   │   ├── client.ts              # Notion API 클라이언트 (싱글톤)
│   │   ├── queries.ts             # Notion 데이터 조회 함수들
│   │   │   ├── getPosts()         # 모든 발행 글 조회
│   │   │   ├── getPostsByCategory() # 카테고리별 글 조회
│   │   │   ├── getPostById()      # 특정 글 조회
│   │   │   ├── getPageBlocks()    # 페이지 블록 조회
│   │   │   └── searchPosts()      # 검색
│   │   └── parsers.ts             # Notion 원본 데이터 → 타입 매핑
│   │       ├── parsePost()        # 글 데이터 정규화
│   │       ├── parseBlock()       # 블록 데이터 정규화
│   │       └── extractMetadata()  # 메타데이터 추출
│   ├── mock/
│   │   └── posts.ts               # 더미 데이터 (개발/테스트용)
│   └── [feature-libs]/            # 기능별 유틸리티 라이브러리
│
├── types/
│   ├── post.ts                    # Post 인터페이스
│   ├── category.ts                # Category 인터페이스 & 상수
│   ├── block.ts                   # Notion 블록 타입들
│   └── [feature-types]/           # 기능별 타입 정의
│
├── styles/
│   └── globals.css                # 전역 스타일 (Tailwind)
│
└── constants/
    └── categories.ts              # 카테고리 상수 (이름, slug, 설명)
```

### 파일 네이밍 규칙

- **컴포넌트**: `PascalCase` (예: `PostCard.tsx`, `BlockRenderer.tsx`)
- **유틸리티/라이브러리**: `camelCase` (예: `parsePost.ts`, `getPageBlocks.ts`)
- **타입/인터페이스**: `PascalCase` (예: `Post.ts`, `Category.ts`)
- **상수**: `UPPER_SNAKE_CASE` 내부, 파일명은 `camelCase` (예: `categories.ts` 내부 `CATEGORIES`)

---

## 3. 데이터 모델 및 타입

### Post (글)

```typescript
// types/post.ts
interface Post {
  id: string // Notion 페이지 ID
  title: string // 글 제목
  category: string // 카테고리 (예식장, 스드메, 예물, 하객 선물, 신혼살림, 허니문)
  tags: string[] // 태그 배열
  publishedDate: Date // 발행일
  status: 'draft' | 'published' // 상태 (발행됨만 블로그에 표시)
  content: Block[] // Notion 블록 배열
}
```

### Category (카테고리)

```typescript
// types/category.ts
interface Category {
  name: string // 카테고리명 (예: 예식장)
  slug: string // URL 슬러그 (예식장 → venue)
  description: string // 설명
}
```

### Block (Notion 블록)

```typescript
// types/block.ts
type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ListBlock
  | QuoteBlock
  | DividerBlock
```

---

## 4. 핵심 파일 협력 관계 (중요)

### 📌 규칙: 다중 파일 협력 시 모두 함께 수정

다음 파일들은 서로 밀접한 관계가 있으므로, 한 파일을 수정할 때 연관 파일도 함께 검토/수정해야 함:

#### **Notion 데이터 흐름**

```
Notion DB
   ↓
lib/notion/client.ts (API 클라이언트)
   ↓
lib/notion/queries.ts (조회 함수: getPosts, getPostsByCategory, getPostById, getPageBlocks, searchPosts)
   ↓
lib/notion/parsers.ts (parsePost, parseBlock, extractMetadata)
   ↓
types/post.ts, types/block.ts (타입 정의)
   ↓
components/ (컴포넌트: PostCard, BlockRenderer 등)
```

#### **카테고리 시스템**

- `constants/categories.ts` 수정 → `types/category.ts` 타입 확인 → `lib/notion/queries.ts` 필터 로직 확인 → `components/navigation/main-nav.tsx` 메뉴 업데이트
- **규칙**: 새 카테고리 추가 시 반드시 이 네 파일을 모두 수정

#### **라우팅 및 검색**

- `app/search/page.tsx` (검색 결과) ↔ `lib/notion/queries.ts` (searchPosts 함수)
- `app/category/[slug]/page.tsx` ↔ `lib/notion/queries.ts` (getPostsByCategory 함수)
- `app/post/[id]/page.tsx` ↔ `lib/notion/queries.ts` (getPostById 함수)

---

## 5. 코드 표준

### TypeScript 강타입 원칙

- **모든 함수는 반드시 타입 선언 필수**

  ```typescript
  // ❌ 금지
  function getPosts() { ... }

  // ✅ 필수
  function getPosts(): Promise<Post[]> { ... }
  ```

- **any 타입 절대 금지** (타입 모름 시 `unknown` 사용 후 가드)
- **옵션 프로퍼티는 `?` 사용** (예: `description?: string`)

### 함수 네이밍 규칙

- **Notion 조회 함수**: `get` + 리소스명 (예: `getPosts`, `getPostById`, `getPageBlocks`)
- **검색 함수**: `search` + 리소스명 (예: `searchPosts`)
- **필터 함수**: `filter` + 기준 (예: `filterByCategory`)
- **파싱 함수**: `parse` + 대상 (예: `parsePost`, `parseBlock`)

### 파일 구성 순서 (import/export)

```typescript
// 1. 외부 라이브러리
import { notionClient } from '@/lib/notion/client'

// 2. 내부 타입/상수
import type { Post, Block } from '@/types'
import { CATEGORIES } from '@/constants'

// 3. 내부 함수/컴포넌트
import { parsePost } from '@/lib/notion/parsers'
import { PostCard } from '@/components/post-card'

// 4. 실제 구현
// ...

// 5. 내보내기
export { getPosts }
```

---

## 6. Notion API 및 데이터 처리

### Notion 클라이언트 사용

```typescript
// ✅ 올바른 사용법
import { notionClient } from '@/lib/notion/client' // 싱글톤 import

async function getPosts(): Promise<Post[]> {
  const response = await notionClient.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'status',
      select: { equals: 'published' },
    },
  })

  return response.results.map(parsePost)
}

// ❌ 금지: 새로운 인스턴스 생성
const client = new Client({ auth: process.env.NOTION_TOKEN })
```

### 필터링 및 정렬

- **필터**: 모든 필터링은 `lib/notion/queries.ts` 함수에서 수행 (컴포넌트X)
- **정렬**: Notion 데이터베이스 쿼리에서 정렬하거나, 최악의 경우 `lib/notion/parsers.ts`에서 처리
- **컴포넌트는 이미 필터링된 데이터만 받음**

---

## 7. 페이지 및 라우팅

### 페이지 라우팅 구조

| 페이지    | 파일                           | 기능                                | 쿼리           |
| --------- | ------------------------------ | ----------------------------------- | -------------- |
| 홈        | `app/page.tsx`                 | 최근 글 목록 + 카테고리 필터 + 검색 | -              |
| 카테고리  | `app/category/[slug]/page.tsx` | 카테고리별 글 목록                  | 동적 `slug`    |
| 글 상세   | `app/post/[id]/page.tsx`       | 글 상세 내용 + 블록 렌더링          | 동적 `id`      |
| 검색 결과 | `app/search/page.tsx`          | 검색어 기반 결과                    | 쿼리스트링 `q` |

### 서버/클라이언트 컴포넌트 규칙

- **페이지/레이아웃**: 기본 서버 컴포넌트 (데이터 페칭)
- **대화형 UI** (검색, 필터, 토글): `'use client'` 필수
- **캐싱**: `revalidatePath`, `revalidateTag` 또는 `revalidate` 숫자값 사용

---

## 8. 컴포넌트 패턴

### 글 카드 (PostCard)

```typescript
interface PostCardProps {
  post: Post;
  className?: string;
}

// ✅ 패턴: post 데이터를 받아서 렌더링만 함
export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <h3>{post.title}</h3>
      </CardHeader>
      <CardContent>
        <p>발행일: {post.publishedDate.toLocaleDateString()}</p>
        <Badge>{post.category}</Badge>
      </CardContent>
    </Card>
  );
}
```

### Notion 블록 렌더러 (BlockRenderer)

```typescript
interface BlockRendererProps {
  blocks: Block[];
  className?: string;
}

// ✅ 패턴: 블록 배열을 받아서 각 타입별로 렌더링
export function BlockRenderer({ blocks, className }: BlockRendererProps) {
  return (
    <div className={className}>
      {blocks.map((block) => {
        switch (block.type) {
          case 'heading':
            return <BlockHeading key={block.id} block={block} />;
          case 'paragraph':
            return <BlockParagraph key={block.id} block={block} />;
          // ... 기타 타입
        }
      })}
    </div>
  );
}
```

### 리스트 페이지 패턴

```typescript
export default async function CategoryPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await getPostsByCategory(slug);

  if (!posts.length) {
    return <div>글이 없습니다.</div>;
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

---

## 9. Styling (Tailwind CSS + shadcn/ui)

### 클래스 스타일 규칙

- **Tailwind 클래스만 사용** (인라인 스타일 금지)
- **반응형 클래스**: `sm:`, `md:`, `lg:`, `xl:` 사용 (모바일 우선 설계)
- **다크모드**: `dark:` 클래스 사용 가능

### 그리드 레이아웃

```typescript
// ✅ 반응형 그리드 패턴
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {posts.map((post) => (
    <PostCard key={post.id} post={post} />
  ))}
</div>
```

### shadcn/ui 사용

- **UI 컴포넌트는 반드시 shadcn/ui 사용** (스타일 일관성)
- **필요한 컴포넌트**: `Card`, `Button`, `Badge`, `Input`, `Sheet` (모바일 메뉴) 등
- **추가 컴포넌트 필요시**: `npx shadcn@latest add [component]` 명령으로 추가

---

## 10. AI 의사결정 규칙

### 상황별 의사결정 트리

#### Q1: "새로운 기능을 추가해야 할 때"

- ROADMAP.md의 Task 정의 확인
- PRD.md의 해당 기능 ID 확인
- 기존 Task 목록에서 유사 기능 검색 후 패턴 따르기
- 단계별로 구현: 타입 정의 → 쿼리/유틸 → 컴포넌트 → 페이지

#### Q2: "파일을 수정/생성할 때"

- **기존 파일인가?**: 기존 패턴 따라 확장
- **새 파일인가?**: 가장 가까운 유사 파일을 참고해서 구조 모방
- **다중 파일 협력 필요한가?**: "핵심 파일 협력 관계" 섹션 확인

#### Q3: "타입/타입스크립트 의문이 생길 때"

- `types/` 디렉토리의 기존 타입 확인
- 필요시 `types/` 디렉토리에 새로운 타입 파일 생성
- 모든 함수 반환 타입 명시 (any 금지)

#### Q4: "스타일링/UI 의문이 생길 때"

- shadcn/ui 컴포넌트 우선 사용
- Tailwind 클래스 조합으로 커스터마이징
- 반응형은 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` 패턴 사용

#### Q5: "환경 변수나 설정이 필요할 때"

- `lib/env.ts` (Zod 기반 검증) 확인
- `.env.local` (실제값) / `.env.example` (가이드) 동시 수정

---

## 11. 금지 사항 (Prohibitions)

### ❌ 절대 금지

1. **`any` 타입 사용** → `unknown` 또는 명확한 타입 사용
2. **파일 간 원형 import** (A → B → A) → 공통 유틸 파일로 분리
3. **컴포넌트에서 Notion API 직접 호출** → 항상 `lib/notion/queries` 함수 사용
4. **하드코딩된 상수** → `constants/` 또는 `types/` 사용
5. **로컬 스타일 (style 속성)** → Tailwind 클래스만 사용
6. **`export default` 다중 사용** (파일당 1개 권장)
7. **Notion 응답 데이터 직접 사용** → 반드시 `parsePost`, `parseBlock` 등으로 변환
8. **카테고리명 하드코딩** → `constants/categories.ts` CATEGORIES 배열 사용
9. **새로운 API 라이브러리 설치** (승인 필요) → 기존 `@notionhq/client` 사용
10. **캐싱 전략 임의 변경** → CLAUDE.md의 가이드 문서 참조

---

## 12. 개발 워크플로우

### 새 기능 구현 시

1. **ROADMAP.md에서 해당 Task 찾기** (예: Task 007)
2. **PRD.md에서 기능 ID 확인** (예: F001, F002)
3. **관련 CLAUDE.md 가이드 문서 읽기** (예: component-patterns.md, nextjs-15.md)
4. **타입 정의 먼저** (`types/` 디렉토리)
5. **유틸/쿼리 구현** (`lib/` 디렉토리)
6. **컴포넌트 구현** (`components/` 디렉토리)
7. **페이지 연결** (`app/` 디렉토리)
8. **테스트 실행** (Playwright MCP 사용 필수, 선택사항 아님)
9. **로드맵 업데이트** (Task 완료 표시)

### 버그 수정 시

1. **git log로 변경 이력 확인**
2. **관련 파일 목록 파악** (단일 vs 다중 파일)
3. **타입 검증** (타입스크립트 컴파일 오류 없는지 확인)
4. **스타일 검증** (Tailwind 클래스 올바른지)
5. **테스트 실행** (fix 이후 동작 확인)

---

## 13. 테스트 및 검증

### 필수 검증 단계

- **타입 체크**: `npm run build` 성공 확인
- **린팅**: `npm run check-all` 통과 확인
- **E2E 테스트**: Playwright MCP 사용 (Task에 명시된 시나리오)
- **Notion API 연동**: 실제 Notion 데이터 조회 테스트
- **반응형 검증**: 모바일(375px) / 태블릿(768px) / 데스크톱(1024px) 확인

### 테스트 불가능한 상황

- Notion 계정/토큰 접근 불가 시: 로컬 더미 데이터로 UI 검증
- 배포 환경 테스트: Vercel 환경에서만 확인 가능 (로컬 예측 불가)

---

## 14. 문서 참조

| 문서                                   | 용도                     |
| -------------------------------------- | ------------------------ |
| `CLAUDE.md` (본 프로젝트)              | 개발 개요 + 주요 명령어  |
| `docs/PRD.md`                          | 기능 정의 및 페이지 스펙 |
| `docs/ROADMAP.md`                      | Task 목록 및 진행 상황   |
| `docs/guides/component-patterns.md`    | 컴포넌트 작성 패턴       |
| `docs/guides/nextjs-15.md`             | Next.js 15 고급 가이드   |
| `docs/guides/forms-react-hook-form.md` | 폼 처리 (검색창 등)      |

---

## 15. 변수/상수 관례

### 환경 변수

```typescript
// ✅ 올바른 사용
const DATABASE_ID = process.env.NOTION_DATABASE_ID
if (!DATABASE_ID) throw new Error('NOTION_DATABASE_ID is required')

// env.ts에서 한번에 검증
export const config = z
  .object({
    NOTION_TOKEN: z.string(),
    NOTION_DATABASE_ID: z.string(),
  })
  .parse(process.env)
```

### 카테고리 상수

```typescript
// constants/categories.ts
export const CATEGORIES = [
  { name: '예식장', slug: 'venue', description: '예식장 선택 및 비용' },
  { name: '스드메', slug: 'dress', description: '신부 드레스 및 신랑 정장' },
  // ... 나머지 6개
] as const
```

---

## 요약

이 프로젝트는 **Next.js 15 App Router 기반의 Notion CMS 통합 블로그**입니다.

**AI 에이전트가 기억할 핵심**:

1. **레이어드 구조**: lib(데이터) → components(UI) → app(페이지)
2. **타입 우선**: 모든 함수에 명시적 타입 선언 필수
3. **다중 파일 협력**: 카테고리/Notion 데이터 수정 시 관련 파일 모두 확인
4. **Notion API는 lib 계층에서만 호출**
5. **컴포넌트는 순수 렌더링 담당**
6. **shadcn/ui + Tailwind만 사용**
7. **모든 기능은 ROADMAP의 Task와 매핑**
