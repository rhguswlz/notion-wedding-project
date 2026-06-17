# Task 101: 관리자 라우트 구조 및 레이아웃 골격 구축

## 개요

**상태**: ⏳ 대기  
**소요 시간**: 약 2-3일  
**의존성**: 없음 (선행 필수 Task)  
**관련 기능**: `F101` (관리자 인증 및 레이아웃)

## 목표

관리자 영역의 전체 라우트와 레이아웃 골격이 완성되어 빈 화면 간 이동이 가능하다.

## 설명

`/admin` 하위 라우트 구조와 빈 페이지 껍데기, 관리자 전용 레이아웃 골격을 생성합니다.
이 Task는 v2.0 전체의 기초가 되므로 우선순위가 가장 높습니다.

공개 레이아웃(헤더/푸터)과 관리자 레이아웃을 분리하여 페이지 구조를 격리합니다.

## 구현 단계

### Step 1: 관리자 라우트 구조 생성 (약 1일)

#### 1-1. 라우트 그룹(Route Group) 설정

**목표**: `/admin`과 `/` 레이아웃을 분리하기 위해 라우트 그룹 활용

**체크리스트**

- [ ] `src/app/(admin)/` 라우트 그룹 디렉토리 생성
- [ ] `src/app/(admin)/layout.tsx` 관리자 전용 레이아웃 파일 생성
- [ ] 공개 페이지는 `src/app/(public)/` 또는 `src/app/` 유지

**참고**:

```
src/app/
├── (public)/
│   ├── layout.tsx          # 헤더/푸터 포함
│   ├── page.tsx            # 홈 (글 목록)
│   ├── category/[slug]/page.tsx
│   ├── post/[id]/page.tsx
│   └── search/page.tsx
├── (admin)/
│   ├── layout.tsx          # 관리자 레이아웃 (사이드바 + 헤더)
│   ├── page.tsx            # 대시보드 홈
│   ├── login/
│   │   └── page.tsx        # 로그인 페이지
│   ├── categories/
│   │   ├── page.tsx        # 카테고리 목록
│   │   └── [slug]/
│   │       └── page.tsx    # 카테고리별 글 목록
│   ├── feedback/
│   │   └── page.tsx        # 피드백 관리
│   └── analytics/
│       └── page.tsx        # 통계 (나중)
```

#### 1-2. 관리자 레이아웃 컴포넌트 생성

**목표**: 사이드바, 헤더가 포함된 관리자 레이아웃 기본 구조

**체크리스트**

- [ ] `src/components/admin/layout/` 디렉토리 생성
- [ ] `src/components/admin/layout/admin-sidebar.tsx` - 관리자 사이드바 (스켈레톤)
  - 메뉴: 대시보드 / 카테고리 / 통계 / 피드백
  - 현재 경로 활성화 표시 (준비만, 스타일은 나중)
- [ ] `src/components/admin/layout/admin-header.tsx` - 관리자 헤더 (스켈레톤)
  - 페이지 타이틀 + 로그아웃 버튼 영역
- [ ] `src/app/(admin)/layout.tsx` 업데이트
  ```tsx
  export default function AdminLayout({ children }) {
    return (
      <div className="flex h-screen">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 overflow-auto p-8">{children}</main>
        </div>
      </div>
    )
  }
  ```

### Step 2: 관리자 페이지 빈 껍데기 생성 (약 1일)

#### 2-1. 대시보드 및 주요 페이지 생성

**체크리스트**

- [ ] `src/app/(admin)/page.tsx` - 대시보드 홈 (임시 제목만)
  ```tsx
  export default function AdminDashboard() {
    return <h1>관리자 대시보드</h1>
  }
  ```
- [ ] `src/app/(admin)/login/page.tsx` - 로그인 페이지 (임시 제목만)
- [ ] `src/app/(admin)/categories/page.tsx` - 카테고리 목록 (임시 제목만)
- [ ] `src/app/(admin)/categories/[slug]/page.tsx` - 카테고리별 글 목록 (동적 라우트)
  ```tsx
  interface Props {
    params: { slug: string }
  }
  export default function CategoryPostsPage({ params }: Props) {
    return <h1>카테고리: {params.slug}</h1>
  }
  ```
- [ ] `src/app/(admin)/feedback/page.tsx` - 피드백 관리 (임시 제목만)

#### 2-2. 네비게이션 연결 검증

**체크리스트**

- [ ] 사이드바 메뉴 링크가 각 페이지로 이동하는지 확인
  - 대시보드 → `/admin`
  - 카테고리 → `/admin/categories`
  - 피드백 → `/admin/feedback`
- [ ] 현재 경로 활성화 표시 (`usePathname()` 활용)

### Step 3: 공개/관리자 레이아웃 분리 확인 (약 반일)

#### 3-1. 레이아웃 분리 검증

**체크리스트**

- [ ] 공개 페이지(`/`) 접속 → 헤더/푸터 보임, 사이드바 없음
- [ ] 관리자 페이지(`/admin`) 접속 → 사이드바/헤더 보임, 공개 헤더/푸터 없음
- [ ] 라우트 그룹이 제대로 작동하는지 확인

#### 3-2. 스타일링 (기본만)

**체크리스트**

- [ ] `AdminSidebar`: 기본 flexbox 레이아웃 (너비 250px 정도)
- [ ] `AdminHeader`: flex 정렬, 페이지 타이틀 + 로그아웃 버튼 위치
- [ ] 반응형 고려 (모바일에서 사이드바 축소는 Task 104에서)
- [ ] Tailwind 클래스만 사용, shadcn/ui는 아직 추가하지 않음

---

## 체크리스트

### 구현 사항

- [ ] `src/app/(admin)/` 라우트 그룹 디렉토리 구조 생성
- [ ] `src/app/(admin)/layout.tsx` 관리자 전용 레이아웃 작성
- [ ] `src/components/admin/layout/admin-sidebar.tsx` 사이드바 컴포넌트 (스켈레톤)
- [ ] `src/components/admin/layout/admin-header.tsx` 헤더 컴포넌트 (스켈레톤)
- [ ] 관리자 페이지 빈 껍데기 생성
  - [ ] `/admin` (대시보드 홈)
  - [ ] `/admin/login` (로그인)
  - [ ] `/admin/categories` (카테고리 목록)
  - [ ] `/admin/categories/[slug]` (카테고리별 글)
  - [ ] `/admin/feedback` (피드백)
- [ ] 사이드바 네비게이션 링크 동작 확인
- [ ] 공개/관리자 레이아웃 분리 검증
- [ ] `npm run dev` 에서 모든 라우트 이동 확인

### 수락 기준 (Definition of Done)

- ✅ `/admin` 및 하위 경로 모두 접근 가능
- ✅ 관리자 레이아웃(사이드바 + 헤더)이 모든 `/admin/*` 페이지에 적용
- ✅ 공개 페이지(`/`)에는 관리자 요소가 나타나지 않음
- ✅ 사이드바 메뉴에서 페이지 간 이동이 정상 작동
- ✅ ESLint, TypeScript 에러 없음
- ✅ 모바일에서도 기본 레이아웃 확인 가능 (반응형은 Task 104)

---

## 변경 사항 요약

이 Task에서는 **라우트 구조와 기본 레이아웃만** 설정합니다.

- ✅ **추가됨**:
  - `src/app/(admin)/` 라우트 그룹
  - `src/components/admin/layout/admin-sidebar.tsx`
  - `src/components/admin/layout/admin-header.tsx`
  - 5개 관리자 페이지 (빈 껍데기)

- ❌ **제외됨** (다음 Task에서 처리):
  - 인증 로직 (Task 102)
  - 스타일/디자인 상세 (Task 104)
  - 실제 데이터/API (Task 106+)

---

## 다음 Task

완료 후 **Task 102: 관리자 인증 시스템 구현**으로 진행합니다.

- 로그인 Server Action
- 미들웨어 기반 `/admin` 보호
- 세션 쿠키 관리
