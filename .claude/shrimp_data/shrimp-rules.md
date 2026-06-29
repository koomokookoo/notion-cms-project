# Development Guidelines — Notion CMS Blog

## 1. 프로젝트 개요

- **목적**: Notion을 CMS로 활용하는 개인 기술 블로그
- **베이스**: Next.js 스타터킷(auth, dashboard 포함) 위에 블로그 기능을 추가하는 구조
- **핵심 원칙**: Notion API 호출은 반드시 `src/lib/notion.ts`에 집중, Server Component에서 직접 데이터 페칭

---

## 2. 기술 스택 버전

| 항목 | 버전 | 주의사항 |
|------|------|----------|
| Next.js | 16.2.9 | App Router 전용, Pages Router 사용 금지 |
| React | 19.2.4 | React Compiler 활성화 (`reactCompiler: true`) |
| Tailwind CSS | v4 | CSS 변수 방식, `@layer` 사용 방식 다름 |
| shadcn/ui | radix-nova 스타일 | `npx shadcn add <component>`로만 추가 |
| TypeScript | strict mode | `any` 타입 사용 절대 금지 |

> **AGENTS.md 참고 필수**: Next.js 16은 breaking change가 있음. 코드 작성 전 `node_modules/next/dist/docs/` 가이드 확인.

---

## 3. 디렉토리 구조

```
src/
├── app/
│   ├── (auth)/           # 로그인/회원가입 — 수정 금지
│   ├── (dashboard)/      # 대시보드 — 수정 금지
│   ├── posts/
│   │   └── [id]/
│   │       └── page.tsx  # 블로그 글 상세
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx  # 카테고리별 목록
│   ├── layout.tsx        # 글로벌 레이아웃
│   ├── page.tsx          # 홈 (글 목록)
│   └── globals.css       # 전역 스타일 (Tailwind v4)
├── components/
│   ├── blog/             # 블로그 전용 컴포넌트 (PostCard, PostList, CategoryFilter, SearchBar)
│   ├── notion/           # Notion 블록 렌더링 전용 (BlockRenderer)
│   ├── common/           # 공통 UI (Logo, PageHeader, ThemeToggle)
│   ├── layout/           # 레이아웃 (Header, Footer, AppSidebar)
│   └── ui/               # shadcn 컴포넌트 — 직접 수정 금지
├── lib/
│   ├── notion.ts         # Notion API 클라이언트 및 모든 fetch 함수
│   ├── utils.ts          # cn() 유틸
│   ├── constants.ts      # 상수
│   └── validations.ts    # Zod 스키마
├── types/
│   ├── index.ts          # 공통 타입 (User, NavItem 등)
│   └── notion.ts         # Notion 전용 타입 — 별도 파일로 분리
└── hooks/                # 커스텀 훅
```

---

## 4. 라우팅 규칙

- 블로그 라우트(`/posts/[id]`, `/category/[category]`)는 **라우트 그룹 없이** `src/app/` 직하위에 생성
- 기존 `(auth)`, `(dashboard)` 라우트 그룹은 **수정 금지**
- 모든 블로그 페이지에 `generateMetadata()` 함께 작성 필수
- 동적 라우트에 `generateStaticParams()` 설정으로 정적 경로 사전 생성

---

## 5. Notion API 연동 규칙

### 5-1. 파일 책임 분리

| 파일 | 역할 |
|------|------|
| `src/lib/notion.ts` | Notion 클라이언트 초기화, 모든 API 호출 함수 |
| `src/types/notion.ts` | Notion 관련 타입 정의 (`Post`, `NotionBlock`, `Category` 등) |
| `.env.local` | 실제 API 키 (git 추적 금지) |
| `.env.example` | 환경변수 예시 (git 추적) |

### 5-2. 필수 환경변수

```
NOTION_API_KEY=secret_xxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5-3. 필수 함수 목록 (`src/lib/notion.ts`)

- `fetchPages()` — Status=발행됨, Published 기준 최신순 정렬
- `fetchPageContent(pageId: string)` — 블록 목록 조회
- `fetchCategories()` — 전체 카테고리 목록
- Notion 속성 → `Post` 타입 변환 파서 함수

### 5-4. 데이터 페칭 위치

- **Server Component에서 직접 호출** (async/await 사용)
- `'use client'` 컴포넌트에서 Notion API 호출 금지
- 클라이언트 측 필터링(검색, 카테고리)은 props로 전달받은 데이터에서 수행

---

## 6. 타입 정의 규칙

- `any` 타입 사용 **절대 금지**
- Notion 관련 타입은 모두 `src/types/notion.ts`에 정의
- 공통 앱 타입은 `src/types/index.ts`에 정의
- Notion 속성 파싱 시 `unknown` 타입으로 받아 타입 가드 사용

### 필수 타입 정의 위치

```typescript
// src/types/notion.ts
interface Post { id, title, category, tags, publishedAt, status }
interface Category { name: string }
type NotionBlockType = 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' | 'bulleted_list_item' | 'numbered_list_item' | 'code' | 'image' | 'quote' | 'divider'
interface NotionBlock { id: string; type: NotionBlockType; ... }
```

---

## 7. 컴포넌트 규칙

### 7-1. 컴포넌트 분류

| 위치 | 용도 | 예시 |
|------|------|------|
| `components/ui/` | shadcn 컴포넌트 — **수정 금지** | Button, Card, Badge |
| `components/blog/` | 블로그 전용 | PostCard, PostList, CategoryFilter, SearchBar |
| `components/notion/` | Notion 블록 렌더링 | BlockRenderer |
| `components/layout/` | 레이아웃 | Header, Footer |
| `components/common/` | 범용 공통 | Logo, PageHeader |

### 7-2. 새 shadcn 컴포넌트 추가

```bash
npx shadcn add <component-name>
```

- `components/ui/` 파일을 직접 생성하거나 수정하지 말 것

### 7-3. Server/Client 분리

- 기본값: Server Component (async 함수)
- `'use client'` 사용 조건: 브라우저 이벤트 핸들러, useState/useEffect, 실시간 필터링
- `SearchBar`, `CategoryFilter`는 `'use client'`로 구현 (실시간 상호작용)

---

## 8. 스타일링 규칙

- **Tailwind CSS v4** 사용 — 설정 파일 없이 CSS 변수 기반
- 커스텀 스타일은 `src/app/globals.css`에 추가
- 색상 토큰은 CSS 변수 사용 (`bg-primary`, `text-muted-foreground` 등)
- `cn()` 유틸리티(`src/lib/utils.ts`)로 조건부 클래스 병합
- 반응형 필수: `sm:`, `md:`, `lg:` 브레이크포인트 사용
- 다크모드: `dark:` 접두사 사용 (`next-themes` 연동)

---

## 9. 동시 수정 파일 규칙

| 작업 | 수정해야 할 파일 |
|------|----------------|
| Notion 타입 추가 | `src/types/notion.ts` + `src/lib/notion.ts` 파서 함수 확인 |
| 새 페이지 추가 | `page.tsx` + `generateMetadata()` 동시 작성 |
| 환경변수 추가 | `.env.local` + `.env.example` 동시 추가 |
| 새 블로그 컴포넌트 | `src/components/blog/` 파일 생성 + 사용하는 page.tsx import 확인 |
| Notion 블록 타입 추가 | `src/types/notion.ts` + `src/components/notion/BlockRenderer.tsx` 동시 수정 |

---

## 10. ISR 설정 규칙

- 블로그 페이지에 `export const revalidate = 3600` 설정 (1시간)
- Notion 데이터 변경이 최대 1시간 내 반영되도록 유지

---

## 11. 금지 사항

- `any` 타입 사용
- `components/ui/` 파일 직접 수정
- Client Component에서 Notion API 직접 호출
- Pages Router(`pages/` 디렉토리) 사용
- `(auth)`, `(dashboard)` 라우트 그룹 수정
- 환경변수 `.env.local`을 git에 커밋
- `console.log` 프로덕션 코드에 남기기
- `useEffect`로 데이터 페칭 (Server Component fetch 사용)

---

## 12. AI 의사결정 기준

| 상황 | 결정 |
|------|------|
| Server vs Client Component? | 기본 Server, 브라우저 이벤트/훅 필요 시 Client |
| Notion 타입 어디에 둘지? | `src/types/notion.ts` (index.ts 아님) |
| 새 UI 컴포넌트 필요? | `npx shadcn add` 먼저 확인, 없으면 `components/blog/`에 직접 생성 |
| 블로그 vs 기존 스타터킷 코드 충돌? | 블로그 기능 우선, 스타터킷 코드 수정은 최소화 |
| API 호출 위치? | 반드시 `src/lib/notion.ts` |
| ISR vs SSR? | ISR 기본 (`revalidate = 3600`), 실시간 필요 시만 SSR |
