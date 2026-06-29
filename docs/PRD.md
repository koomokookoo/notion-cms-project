# PRD: 개인 개발 블로그 (Notion CMS 활용)

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | 개인 개발 블로그 |
| 목적 | Notion을 CMS로 활용한 개인 기술 블로그 |
| 작성일 | 2026-06-30 |

### 배경 및 목적

Notion에서 글을 작성하면 별도의 배포 과정 없이 블로그에 자동으로 반영되는 개인 기술 블로그를 구축한다. Notion을 CMS로 선택함으로써 콘텐츠 작성 환경과 블로그 운영을 분리하고, 익숙한 Notion 인터페이스에서 글을 관리할 수 있다.

---

## 2. 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js 15, TypeScript |
| CMS | Notion API (`@notionhq/client`) |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 3. Notion 데이터베이스 구조

| 필드명 | 타입 | 설명 |
|--------|------|------|
| Title | title | 글 제목 |
| Category | select | 카테고리 (예: React, Next.js, TypeScript 등) |
| Tags | multi_select | 태그 목록 |
| Published | date | 발행일 |
| Status | select | `초안` / `발행됨` |
| Content | page content | 본문 (Notion 페이지 블록) |

> `Status`가 `발행됨`인 글만 블로그에 노출된다.

---

## 4. 주요 기능

### 4.1 글 목록 조회
- Notion 데이터베이스에서 `Status = 발행됨` 조건으로 글 목록을 가져온다
- `Published` 기준 최신순으로 정렬
- 제목, 카테고리, 태그, 발행일 미리보기 표시

### 4.2 글 상세 페이지
- Notion 페이지 블록을 파싱하여 본문 렌더링
- 제목, 카테고리, 태그, 발행일 표시
- 코드 블록, 이미지, 인용구 등 Notion 블록 타입 지원

### 4.3 카테고리 필터링
- 전체 카테고리 목록 표시
- 선택한 카테고리에 해당하는 글만 필터링하여 표시

### 4.4 검색
- 글 제목 기반 클라이언트 사이드 검색
- 검색어 입력 시 실시간 결과 필터링

### 4.5 반응형 디자인
- 모바일, 태블릿, 데스크탑 레이아웃 대응
- Tailwind CSS 브레이크포인트 기준 적용

---

## 5. 화면 구성

### 5.1 홈 (`/`)
- 최근 발행된 글 목록
- 카테고리 필터 탭
- 검색 입력창

### 5.2 글 상세 (`/posts/[id]`)
- 글 제목, 메타 정보 (카테고리, 태그, 발행일)
- Notion 본문 렌더링
- 이전/다음 글 네비게이션

### 5.3 카테고리 (`/category/[category]`)
- 선택한 카테고리에 속한 글 목록
- 카테고리명 헤더

---

## 6. MVP 범위

MVP에 포함되는 기능은 아래와 같다.

- [x] Notion API 연동
- [x] 글 목록 페이지
- [x] 글 상세 페이지
- [x] 기본 스타일링 (Tailwind CSS + shadcn/ui)
- [x] 반응형 디자인

MVP에서 제외되는 기능 (향후 고려):

- 댓글 기능
- RSS 피드
- 다크 모드
- 글 조회수 통계
- OG 이미지 자동 생성

---

## 7. 구현 단계

### 1단계: 환경 설정
- `@notionhq/client` 패키지 설치
- `.env.local`에 Notion API 키 및 데이터베이스 ID 설정
- Notion Integration 생성 및 데이터베이스 공유

### 2단계: Notion 데이터베이스 설정
- Notion에서 블로그용 데이터베이스 생성
- 필드 구조 정의 (Title, Category, Tags, Published, Status)
- 테스트 글 데이터 입력

### 3단계: 글 목록 페이지 구현
- Notion API로 글 목록 fetch (`/lib/notion.ts`)
- 목록 UI 컴포넌트 구현
- 카테고리 필터 및 검색 구현

### 4단계: 글 상세 페이지 구현
- Notion 페이지 블록 fetch 및 파싱
- 블록 타입별 렌더링 컴포넌트 구현
- 동적 라우팅 설정 (`/posts/[id]`)

### 5단계: 스타일링 및 최적화
- shadcn/ui 컴포넌트 적용
- 반응형 레이아웃 완성
- ISR(Incremental Static Regeneration) 설정으로 성능 최적화
- Vercel 배포

---

## 8. 환경 변수

```env
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 9. 디렉토리 구조 (예정)

```
src/
├── app/
│   ├── page.tsx              # 홈 (글 목록)
│   ├── posts/
│   │   └── [id]/
│   │       └── page.tsx      # 글 상세
│   └── category/
│       └── [category]/
│           └── page.tsx      # 카테고리별 목록
├── components/
│   ├── PostCard.tsx           # 글 카드
│   ├── PostList.tsx           # 글 목록
│   ├── CategoryFilter.tsx     # 카테고리 필터
│   ├── SearchBar.tsx          # 검색창
│   └── notion/
│       └── BlockRenderer.tsx  # Notion 블록 렌더러
├── lib/
│   └── notion.ts              # Notion API 클라이언트 및 fetch 함수
└── types/
    └── notion.ts              # Notion 관련 타입 정의
```
