# 웨딩 비용 정리 블로그

Notion을 CMS로 활용하여 웨딩 비용을 카테고리별로 정리하고 개인 블로그에서 자동으로 발행하여 경험을 공유하는 블로그입니다.

## 프로젝트 개요

**목적**: Notion 데이터베이스를 CMS로 활용한 웨딩 비용 정리 개인 블로그

**사용자**: 결혼 준비 중이거나 완료한 개인 및 커플이 본인의 기록을 남기고 경험을 공유하려는 사람

## 주요 페이지

1. **홈 페이지** - 최근 글 목록, 카테고리 네비게이션, 검색 기능
2. **카테고리 페이지** - 선택한 카테고리의 필터링된 글 목록
3. **글 상세 페이지** - Notion 블록 기반 본문 렌더링, 메타데이터 표시
4. **검색 결과 페이지** - 제목 및 태그 기반 검색 결과 목록

## 카테고리

- 예식장
- 스드메 (스튜디오/드레스/메이크업)
- 예물
- 하객 선물
- 신혼살림
- 허니문

## 핵심 기능

- **Notion API 연동**: Notion 데이터베이스에서 발행된 글 자동 조회
- **글 목록 표시**: 최근 글을 카드 형태로 게시글 목록 표시
- **카테고리 필터링**: 선택한 카테고리의 글 목록만 조회 및 표시
- **검색 기능**: 제목 및 태그로 글 검색
- **글 상세 보기**: Notion 블록을 기반으로 글의 전체 본문 렌더링
- **반응형 디자인**: 모바일/태블릿/데스크톱 최적화 레이아웃
- **기본 SEO 설정**: 페이지별 메타데이터 및 OG 태그

## 기술 스택

- **Framework**: Next.js 15.5.3 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui (new-york style)
- **CMS**: Notion API (`@notionhq/client`)
- **Form**: React Hook Form + Zod
- **Icons**: Lucide React
- **Deploy**: Vercel

## 시작하기

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local에 NOTION_API_KEY, NOTION_DATABASE_ID 입력

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 개발 상태

- 기본 프로젝트 구조 설정 완료
- 개발 중: Notion API 연동
- 예정: 글 목록/상세/카테고리/검색 페이지 구현

## 문서

- [PRD 문서](./docs/PRD.md) - 상세 요구사항
- [개발 로드맵](./docs/ROADMAP.md) - 개발 계획
- [개발 가이드](./CLAUDE.md) - 개발 지침
