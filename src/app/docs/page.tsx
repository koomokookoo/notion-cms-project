import Link from "next/link";
import { ArrowRight, FolderOpen, Package, Layers, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const stack = [
  { name: "Next.js 15", description: "App Router 기반 풀스택 프레임워크", badge: "프레임워크" },
  { name: "React 19", description: "최신 서버/클라이언트 컴포넌트 지원", badge: "UI" },
  { name: "TypeScript", description: "정적 타입으로 안전한 코드 작성", badge: "언어" },
  { name: "Tailwind CSS", description: "유틸리티 퍼스트 스타일링", badge: "스타일" },
  { name: "shadcn/ui", description: "접근성 높은 재사용 가능 컴포넌트", badge: "컴포넌트" },
  { name: "Zod + React Hook Form", description: "타입 안전한 폼 유효성 검증", badge: "폼" },
];

const structure = [
  { path: "src/app/", description: "Next.js App Router 페이지" },
  { path: "src/app/(auth)/", description: "로그인 · 회원가입 · 비밀번호 찾기" },
  { path: "src/app/(dashboard)/", description: "대시보드 · 설정 · 관리 페이지" },
  { path: "src/components/ui/", description: "shadcn/ui 기반 UI 컴포넌트" },
  { path: "src/components/layout/", description: "헤더 · 푸터 · 사이드바" },
  { path: "src/components/common/", description: "공통 유틸리티 컴포넌트" },
  { path: "src/lib/", description: "상수 · 유효성 스키마 · 유틸리티" },
  { path: "src/types/", description: "공유 TypeScript 타입 정의" },
];

const quickStart = [
  { step: "1", title: "저장소 클론", code: "git clone https://github.com/your-org/starter.git" },
  { step: "2", title: "의존성 설치", code: "npm install" },
  { step: "3", title: "개발 서버 실행", code: "npm run dev" },
];

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-20 text-center">
          <Badge variant="secondary" className="mb-4">문서</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            시작 가이드
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            스타터킷의 기술 스택과 구조를 파악하고 바로 개발을 시작해보세요.
          </p>
          <Button asChild>
            <Link href="/examples">
              컴포넌트 예제 보기 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>

        <section className="container mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                빠른 시작
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {quickStart.map((item) => (
                  <Card key={item.step}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {item.step}
                        </span>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <code className="text-xs bg-muted rounded px-2 py-1 block font-mono">
                        {item.code}
                      </code>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                기술 스택
              </h2>
              <div className="space-y-3">
                {stack.map((item) => (
                  <Card key={item.name}>
                    <CardContent className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Badge variant="secondary">{item.badge}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FolderOpen className="h-5 w-5 text-primary" />
                디렉터리 구조
              </h2>
              <Card>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    {structure.map((item) => (
                      <div key={item.path} className="flex gap-3 py-1 border-b last:border-0">
                        <code className="text-xs font-mono text-primary shrink-0 w-52">
                          {item.path}
                        </code>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  구현된 페이지
                </h3>
                <div className="space-y-2">
                  {[
                    { path: "/", label: "랜딩 페이지" },
                    { path: "/login", label: "로그인" },
                    { path: "/register", label: "회원가입" },
                    { path: "/forgot-password", label: "비밀번호 찾기" },
                    { path: "/dashboard", label: "대시보드" },
                    { path: "/dashboard/users", label: "사용자 관리" },
                    { path: "/dashboard/analytics", label: "분석" },
                    { path: "/dashboard/documents", label: "문서 관리" },
                    { path: "/dashboard/notifications", label: "알림" },
                    { path: "/settings", label: "설정" },
                    { path: "/examples", label: "컴포넌트 예제" },
                  ].map((page) => (
                    <div key={page.path} className="flex items-center justify-between text-sm py-1 border-b last:border-0">
                      <code className="text-xs font-mono text-muted-foreground">{page.path}</code>
                      <span>{page.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
