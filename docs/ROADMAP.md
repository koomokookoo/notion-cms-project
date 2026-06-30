# ROADMAP: 개인 개발 블로그 (Notion CMS 활용)

> 작성일: 2026-06-30  
> 기준 문서: [PRD.md](./PRD.md)  
> 총 예상 기간: 9~14일  
> **MVP 완료일: 2026-06-30**

---

## 전체 일정 요약

| Phase | 내용 | 예상 기간 | 누적 기간 | 상태 |
|-------|------|-----------|-----------|------|
| Phase 1 | 프로젝트 초기 설정 | 1~2일 | 1~2일 | ✅ 완료 |
| Phase 2 | 공통 모듈 개발 | 2~3일 | 3~5일 | ✅ 완료 |
| Phase 3 | 핵심 기능 개발 | 3~4일 | 6~9일 | ✅ 완료 |
| Phase 4 | 추가 기능 개발 | 2~3일 | 8~12일 | ✅ 완료 |
| Phase 5 | 최적화 및 배포 | 1~2일 | 9~14일 | ✅ 완료 |
| Phase 6 | 태그 검색 기능 | 1일 | 10~15일 | ✅ 완료 |

---

## Phase 1: 프로젝트 초기 설정 ✅

**예상 소요 기간:** 1~2일

### 목표

견고한 기반 없이는 기능 개발이 어렵기 때문에, 프로젝트 구조와 외부 연동 환경을 먼저 확립한다.

### 작업 목록

#### 1-1. Next.js 프로젝트 구조 설정
- [x] Next.js 15 + TypeScript 프로젝트 초기화
- [x] Tailwind CSS 설정
- [x] shadcn/ui 초기화 및 필요한 컴포넌트 설치
- [x] `src/app`, `src/components`, `src/lib`, `src/types` 디렉토리 구조 생성
- [x] ESLint / Prettier 설정

#### 1-2. Notion API 연동 환경 구축
- [x] `@notionhq/client` 패키지 설치
- [x] Notion Integration 생성 및 API 키 발급
- [x] Notion 블로그 데이터베이스 생성 (Title, Category, Tags, Published, Status 필드)
- [x] Integration과 데이터베이스 연결 (공유 권한 설정)
- [x] `.env.local` 파일 생성 및 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 설정
- [x] `.env.example` 파일 생성

#### 1-3. 기본 레이아웃 구조 생성
- [x] `app/layout.tsx` — 글로벌 레이아웃 (폰트, 메타데이터 기본값) 설정
- [x] 테스트용 더미 글 데이터 Notion에 입력 (3~5개)
- [x] Notion API 연결 확인 (`console.log` 수준 검증)

### 완료 기준

- [x] `npm run dev` 실행 시 Next.js 앱이 정상 기동된다.
- [x] `.env.local` 설정 후 Notion API 호출이 성공하고 데이터베이스 응답을 확인할 수 있다.
- [x] 프로젝트 디렉토리 구조가 PRD의 예정 구조와 일치한다.

---

## Phase 2: 공통 모듈 개발 ✅

**예상 소요 기간:** 2~3일

### 목표

모든 기능에서 재사용되는 코드를 먼저 만들어 중복을 방지하고 이후 Phase의 개발 속도를 높인다.

### 작업 목록

#### 2-1. 공통 타입 정의 (`src/types/notion.ts`)
- [x] `Post` 타입 정의 (id, title, category, tags, publishedAt, status)
- [x] `Category` 타입 정의
- [x] Notion 블록 타입 정의 (paragraph, heading, code, image, quote 등)
- [x] API 응답 래핑 타입 정의

#### 2-2. Notion API 공통 함수 (`src/lib/notion.ts`)
- [x] Notion 클라이언트 초기화
- [x] `fetchPages()` — 발행된 글 목록 조회 (Status = 발행됨, Published 기준 최신순 정렬)
- [x] `fetchPageContent(pageId)` — 특정 페이지의 블록 목록 조회
- [x] `fetchCategories()` — 전체 카테고리 목록 조회
- [x] Notion 속성 → `Post` 타입으로 변환하는 파서 함수

#### 2-3. 공통 컴포넌트
- [x] `components/Header.tsx` — 사이트 제목, 검색 링크
- [x] `components/Footer.tsx` — 저작권 표시
- [x] `components/PostCard.tsx` — 글 제목, 카테고리, 태그, 발행일 미리보기 카드
- [x] `components/PostList.tsx` — PostCard 목록 렌더링

### 완료 기준

- [x] `fetchPages()` 호출 시 Notion 데이터베이스에서 `Status = 발행됨` 글 목록이 반환된다.
- [x] `fetchPageContent(pageId)` 호출 시 해당 페이지의 블록 데이터가 반환된다.
- [x] `Post` 타입에 `any` 없이 모든 Notion 속성이 올바르게 매핑된다.
- [x] `PostCard` 컴포넌트가 글 정보를 화면에 렌더링한다.

---

## Phase 3: 핵심 기능 개발 ✅

**예상 소요 기간:** 3~4일

### 목표

블로그의 가장 기본이 되는 기능인 글 목록과 상세 페이지를 구현한다.

### 작업 목록

#### 3-1. 블로그 글 목록 페이지 (`app/page.tsx`)
- [x] `fetchPages()` 호출 후 글 목록을 SSR/ISR로 렌더링
- [x] `PostList` 컴포넌트로 목록 표시
- [x] 페이지 메타데이터(`title`, `description`) 설정

#### 3-2. Notion 컨텐츠 렌더링 (`components/notion/BlockRenderer.tsx`)
- [x] `paragraph` 블록 렌더링
- [x] `heading_1`, `heading_2`, `heading_3` 블록 렌더링
- [x] `bulleted_list_item`, `numbered_list_item` 블록 렌더링
- [x] `code` 블록 렌더링 (언어 강조 포함)
- [x] `image` 블록 렌더링
- [x] `quote` 블록 렌더링
- [x] `divider` 블록 렌더링
- [x] 미지원 블록 타입 폴백 처리

#### 3-3. 블로그 글 상세 페이지 (`app/posts/[id]/page.tsx`)
- [x] 동적 라우팅 설정 (`/posts/[id]`)
- [x] `fetchPageContent(id)` 호출 후 `BlockRenderer`로 본문 렌더링
- [x] 글 제목, 카테고리, 태그, 발행일 메타 정보 표시
- [x] `generateStaticParams()` 설정으로 정적 경로 사전 생성
- [x] 이전/다음 글 네비게이션
- [x] 페이지 메타데이터 (`title`, `description`) 설정

### 완료 기준

- [x] 홈(`/`) 접속 시 Notion에서 `Status = 발행됨`인 글이 최신순으로 목록에 표시된다.
- [x] 글 카드 클릭 시 `/posts/[id]`로 이동하여 Notion 본문이 올바르게 렌더링된다.
- [x] 코드 블록, 이미지, 인용구가 상세 페이지에서 정상 출력된다.
- [x] 존재하지 않는 `id`로 접근 시 404 페이지가 표시된다.

---

## Phase 4: 추가 기능 개발 ✅

**예상 소요 기간:** 2~3일

### 목표

핵심 기능이 완성된 후 사용자 경험을 향상시키는 부가 기능을 추가한다.

### 작업 목록

#### 4-1. 카테고리 필터링
- [x] `components/CategoryFilter.tsx` — 카테고리 탭 UI 컴포넌트
- [x] 홈 페이지에 카테고리 필터 탭 연동 (전체 / 각 카테고리)
- [x] `app/category/[category]/page.tsx` — 카테고리별 글 목록 페이지
- [x] 카테고리 페이지 메타데이터 설정

#### 4-2. 검색 기능
- [x] `components/SearchBar.tsx` — 검색 입력 컴포넌트
- [x] 글 제목 기반 클라이언트 사이드 실시간 필터링
- [x] 검색어 입력 시 결과 목록 즉시 반영
- [x] 검색 결과 없음 상태 UI 처리

#### 4-3. SEO 최적화
- [x] `app/layout.tsx`에 글로벌 `metadata` 설정
- [x] 글 상세 페이지에 동적 `generateMetadata()` 적용 (제목, 설명, OG 태그)
- [x] `robots.txt`, `sitemap.xml` 생성
- [x] ISR(`revalidate`) 설정으로 콘텐츠 최신성 유지

### 완료 기준

- [x] 카테고리 탭 클릭 시 해당 카테고리 글만 필터링되어 표시된다.
- [x] `/category/[category]` URL 직접 접근 시 해당 카테고리 글 목록이 표시된다.
- [x] 검색창에 키워드 입력 시 글 제목 기준으로 실시간 필터링된다.
- [x] 글 상세 페이지 소스에 OG 태그가 포함된다.
- [x] `sitemap.xml` URL 접근 시 발행된 글 목록이 반환된다.

---

## Phase 5: 최적화 및 배포 ✅

**예상 소요 기간:** 1~2일

### 목표

기능이 완성된 후 성능과 품질을 높이고 실제 서비스를 배포한다.

### 작업 목록

#### 5-1. 성능 최적화
- [x] `next/image` 적용으로 이미지 최적화
- [x] ISR `revalidate` 값 조정 (예: 3600초)
- [x] 불필요한 Notion API 호출 최소화 (중복 요청 제거)
- [x] Lighthouse 성능 점수 측정 및 개선

#### 5-2. 반응형 디자인 개선
- [x] 모바일(~768px), 태블릿(768px~1024px), 데스크탑(1024px~) 레이아웃 검증
- [x] 터치 인터랙션 및 모바일 폰트 크기 점검
- [x] 코드 블록 가로 스크롤 처리

#### 5-3. Vercel 배포
- [x] GitHub 저장소에 코드 푸시
- [x] Vercel 프로젝트 생성 및 GitHub 연동
- [x] Vercel 환경 변수 (`NOTION_API_KEY`, `NOTION_DATABASE_ID`) 설정
- [x] 프로덕션 배포 및 도메인 확인
- [x] 배포 후 주요 기능 동작 검증 (목록, 상세, 카테고리, 검색)

### 완료 기준

- [x] Lighthouse 성능(Performance) 점수 80점 이상
- [x] 모바일, 태블릿, 데스크탑 모든 해상도에서 레이아웃이 깨지지 않는다.
- [x] Vercel 배포 URL에서 모든 핵심 기능이 정상 동작한다.
- [x] Notion에서 글을 새로 발행하면 최대 1시간 내 블로그에 반영된다.

---

## Phase 6: 태그 검색 기능 ✅

**완료일: 2026-06-30**

### 목표

태그 기반 검색/필터링으로 사용자가 관심 주제의 글을 빠르게 찾을 수 있게 한다.

### 작업 목록

- [x] 검색창에서 제목 + 태그 동시 검색 (OR 조건)
- [x] PostCard 태그 Badge 클릭 → 해당 태그 즉시 필터링
- [x] 선택된 태그 표시 및 해제 버튼 UI
- [x] 카테고리 탭 + 태그 필터 복합 동작 지원
- [x] Playwright 자동화 검증

### 완료 기준

- [x] 검색창에 태그명 입력 시 해당 태그를 가진 글이 결과에 포함된다.
- [x] 태그 Badge 클릭 시 카드 링크 이동 없이 태그 필터링이 적용된다.
- [x] 선택된 태그가 UI에 표시되고 × 버튼으로 해제 가능하다.
- [x] 카테고리 선택 상태에서 태그 필터가 복합 적용된다.

---

## MVP 완료 정의

PRD의 MVP 범위를 기준으로, 아래 항목이 모두 충족되면 MVP 완료로 간주한다.

- [x] Notion API 연동
- [x] 글 목록 페이지 (`/`)
- [x] 글 상세 페이지 (`/posts/[id]`)
- [x] 기본 스타일링 (Tailwind CSS + shadcn/ui)
- [x] 반응형 디자인
- [x] Vercel 배포
- [x] 태그 검색 및 필터링 (Phase 6 추가)

> MVP 이후 고려 사항: 댓글 기능, RSS 피드, 다크 모드, 글 조회수 통계, OG 이미지 자동 생성
