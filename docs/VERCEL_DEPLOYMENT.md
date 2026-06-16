# Vercel 배포 가이드

이 문서는 **웨딩 비용 정리 블로그** 프로젝트를 Vercel에 배포하는 방법을 설명합니다.

## 📋 배포 전 체크리스트

배포 전에 다음 항목들을 확인하세요:

- [ ] 로컬 프로덕션 빌드 성공 (`npm run build`)
- [ ] 모든 환경 변수가 `.env.example`에 정의되어 있음
- [ ] `.env.local`은 `.gitignore`에 등록되어 있음 (배포 시 제외)
- [ ] GitHub 저장소가 public으로 설정됨
- [ ] Notion Integration 토큰 및 데이터베이스 ID 준비 완료

## 🔧 필요한 환경 변수

Vercel 배포 시 다음 환경 변수를 설정해야 합니다:

### 필수 환경 변수

| 변수명                        | 설명                                   | 예시                                                 |
| ----------------------------- | -------------------------------------- | ---------------------------------------------------- |
| `NOTION_TOKEN`                | Notion Integration 인증 토큰           | `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` |
| `NOTION_CATEGORY_DATABASE_ID` | 카테고리 데이터베이스 ID (Notion)      | `38151c2cb67380edb05dff0c7e285c48`                   |
| `NOTION_ITEMS_DATABASE_ID`    | 포스트/아이템 데이터베이스 ID (Notion) | `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`                   |

### 선택사항 환경 변수

| 변수명                | 설명                      | 기본값                  |
| --------------------- | ------------------------- | ----------------------- |
| `NEXT_PUBLIC_APP_URL` | 앱의 공개 URL (OG 태그용) | `http://localhost:3000` |

## 🚀 Vercel 배포 단계

### 1단계: Vercel 계정 생성 및 로그인

1. [Vercel 공식 사이트](https://vercel.com/)로 이동
2. 계정 생성 또는 로그인 (GitHub/GitLab/Bitbucket 계정으로 가입 권장)

### 2단계: GitHub 저장소 연결

1. Vercel 대시보드에서 **+ New Project** 클릭
2. **Import Git Repository** 선택
3. GitHub 계정 연결 후 `notion-wedding-project` 저장소 선택
4. **Import** 클릭

### 3단계: 배포 설정

Vercel 프로젝트 설정 화면에서:

1. **Project Name**: `notion-wedding-project` (또는 원하는 이름)
2. **Framework Preset**: `Next.js` (자동으로 감지됨)
3. **Root Directory**: `./` (루트 디렉토리)

### 4단계: 환경 변수 설정

배포 설정 화면의 **Environment Variables** 섹션에서:

1. 다음 환경 변수들을 추가합니다:

```
NOTION_TOKEN = [당신의 Notion 토큰]
NOTION_CATEGORY_DATABASE_ID = [카테고리 DB ID]
NOTION_ITEMS_DATABASE_ID = [포스트 DB ID]
NEXT_PUBLIC_APP_URL = https://your-vercel-app.vercel.app
```

2. 각 변수를 입력한 후 **Add** 클릭
3. 모든 변수가 추가되었는지 확인

#### 환경 변수 값 찾기

**Notion Token 얻기:**

1. [Notion Integrations](https://www.notion.so/my-integrations) 방문
2. 생성된 Integration 선택
3. **Internal Integration Token** 복사

**데이터베이스 ID 찾기:**

1. Notion에서 해당 데이터베이스 열기
2. URL에서 데이터베이스 ID 추출: `https://notion.so/[ID]?...`
3. 또는 데이터베이스 공유 링크에서 32자의 ID 찾기

### 5단계: 배포 실행

1. **Deploy** 버튼 클릭
2. 배포 진행 상황 모니터링 (약 1-2분 소요)
3. 배포 완료 후 **Visit** 버튼으로 라이브 사이트 확인

## ✅ 배포 후 검증 체크리스트

배포가 완료된 후 다음 항목들을 확인하세요:

### 1. 기본 접근성 검증

- [ ] 배포된 URL에 접근 가능한가?
- [ ] HTTPS로 안전하게 연결되는가?

### 2. 홈 페이지 검증

- [ ] 포스트 목록이 정상적으로 로드되는가?
- [ ] 포스트 카드가 모두 표시되는가?
- [ ] 검색창이 정상적으로 작동하는가?
- [ ] 카테고리 필터 버튼이 정상 작동하는가?

### 3. 카테고리 페이지 검증

- [ ] 각 카테고리 페이지에 접근 가능한가?
- [ ] 카테고리별 포스트가 정확하게 필터링되는가?
- [ ] 카테고리 제목과 설명이 올바르게 표시되는가?

### 4. 포스트 상세 페이지 검증

- [ ] 포스트 제목, 내용, 메타데이터가 표시되는가?
- [ ] Notion 블록(텍스트, 이미지, 리스트 등)이 정상 렌더링되는가?
- [ ] 포스트 관련 메타데이터(발행일, 카테고리, 태그)가 표시되는가?

### 5. 검색 기능 검증

- [ ] 검색창에 입력이 가능한가?
- [ ] 검색 결과가 정확하게 표시되는가?
- [ ] 검색어가 없을 때 적절한 메시지가 표시되는가?
- [ ] 검색 결과가 없을 때 "결과 없음" 메시지가 표시되는가?

### 6. 404 페이지 검증

- [ ] 존재하지 않는 경로에 접근 시 404 페이지가 표시되는가?
- [ ] 404 페이지에서 홈으로 돌아가는 버튼이 작동하는가?

### 7. SEO & 메타데이터 검증

브라우저 개발자 도구(F12)에서:

- [ ] 각 페이지의 `<title>` 태그가 적절한가?
- [ ] `<meta name="description">` 태그가 존재하는가?
- [ ] `<meta property="og:*">` 태그들이 설정되어 있는가?
- [ ] `robots.txt`에 접근 가능한가? (`/robots.txt`)
- [ ] `sitemap.xml`에 접근 가능한가? (`/sitemap.xml`)

### 8. 반응형 디자인 검증

브라우저 개발자 도구의 Device Emulation으로:

- [ ] 모바일 (375px) 화면에서 올바르게 표시되는가?
- [ ] 태블릿 (768px) 화면에서 올바르게 표시되는가?
- [ ] 데스크톱 (1024px+) 화면에서 올바르게 표시되는가?

### 9. 성능 검증

1. [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)를 사용하여 성능 점수 확인
   - 배포된 URL을 Lighthouse에 입력
   - 다음 점수 확인:
     - Performance: >= 80
     - Accessibility: >= 90
     - Best Practices: >= 85
     - SEO: >= 90

## 🔄 배포 후 지속적 운영

### 환경 변수 업데이트

Notion 데이터베이스 ID나 토큰을 변경한 경우:

1. Vercel 프로젝트 Settings > Environment Variables
2. 해당 변수 편집 또는 삭제 후 재추가
3. 자동으로 재배포됨

### 도메인 연결 (선택사항)

커스텀 도메인을 사용하려면:

1. Vercel 프로젝트 Settings > Domains
2. **Add** 클릭
3. 도메인 입력
4. DNS 설정 지침 따르기

## 🆘 배포 문제 해결

### "Build failed" 오류

```
원인: 환경 변수 누락 또는 Notion API 오류
해결:
1. 환경 변수가 모두 설정되었는지 확인
2. Notion 토큰과 데이터베이스 ID가 정확한지 확인
3. Vercel 배포 로그에서 정확한 오류 메시지 확인
```

### "Notion API Error" 실행 시간 오류

```
원인: Notion 데이터베이스에 접근 불가
해결:
1. Integration이 데이터베이스에 추가되었는지 확인
2. 토큰이 유효한지 확인
3. Notion Integration의 권한 확인
```

### 페이지 로드 실패

```
원인: 환경 변수가 프로덕션에 적용되지 않음
해결:
1. Vercel Settings > Environment Variables 확인
2. 변수 추가 후 자동 재배포 대기
3. 필요시 Redeploy 실행
```

## 📝 배포 후 체크리스트

모든 검증이 완료되면:

- [ ] 배포 URL을 팀/관계자와 공유
- [ ] 피드백 수집 및 버그 리포트 시스템 설정
- [ ] Vercel 모니터링 설정 (선택사항)
- [ ] 정기적인 업데이트 및 유지보수 계획 수립

## 🚀 v1.0 릴리스

배포가 검증되면:

1. GitHub에서 Release 생성
2. Tag: `v1.0`
3. 릴리스 노트 작성 (아래 참조)
4. 배포된 URL 공개

---

**마지막 업데이트**: 2026-06-17
**배포 플랫폼**: Vercel
**프레임워크**: Next.js 15.5.3
