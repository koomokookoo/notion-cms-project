---
name: project-phase1-setup
description: Phase 1 초기 설정 완료 내역 — 패키지, 디렉토리, env, 레이아웃 업데이트
metadata:
  type: project
---

Phase 1 초기 설정이 2026-06-30 완료됨.

**Why:** Notion CMS 블로그 MVP 개발 시작을 위한 기반 환경 구축

**How to apply:** Phase 2(공통 모듈) 작업 시 아래 완료 사항을 전제로 진행

## 완료된 작업

### 패키지
- `@notionhq/client` 설치 완료

### 디렉토리
- `src/components/blog/` 생성 (블로그 전용 컴포넌트)
- `src/components/notion/` 생성 (Notion 블록 렌더러)

### 환경 변수
- `.env.local` 생성 (NOTION_API_KEY, NOTION_DATABASE_ID 포함, git 제외됨)
- `.env.example` 생성 (플레이스홀더 값)
- `.gitignore`에 `.env*` 이미 포함되어 있었음

### 수정된 파일
- `src/app/layout.tsx` — metadata를 "개발 블로그"로 업데이트, ThemeProvider/Toaster/TooltipProvider 구조 유지
- `src/lib/constants.ts` — SITE_CONFIG, NAV_ITEMS 블로그용으로 변경, SIDEBAR_ITEMS 빈 배열로 유지

## 주의사항
- `src/app` 하위에 기존 스타터킷 라우트((auth), (dashboard), docs, examples 등)가 여전히 존재
- 이 라우트들은 블로그 개발 과정에서 제거 또는 유지 여부 결정 필요 (현재는 유지 중)
- `SIDEBAR_ITEMS`를 참조하는 컴포넌트가 있을 경우 빈 배열이어도 타입 호환 유지됨
