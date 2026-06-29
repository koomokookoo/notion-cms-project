import Link from "next/link";
import {
  Zap,
  Shield,
  Palette,
  BarChart3,
  Globe,
  Lock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const features = [
  {
    icon: Zap,
    title: "빠른 성능",
    description: "Next.js 15 App Router와 React 19로 최적화된 성능을 경험하세요.",
  },
  {
    icon: Palette,
    title: "아름다운 UI",
    description: "shadcn/ui와 Tailwind CSS로 모던하고 접근성 높은 인터페이스를 제공합니다.",
  },
  {
    icon: Shield,
    title: "타입 안전성",
    description: "TypeScript와 Zod로 런타임 오류를 줄이고 개발 생산성을 높입니다.",
  },
  {
    icon: Lock,
    title: "인증 준비 완료",
    description: "로그인, 회원가입 폼이 react-hook-form과 zod로 구현되어 있습니다.",
  },
  {
    icon: BarChart3,
    title: "대시보드 템플릿",
    description: "통계 카드, 테이블, 사이드바가 포함된 완성형 대시보드를 즉시 사용하세요.",
  },
  {
    icon: Globe,
    title: "다크모드 지원",
    description: "next-themes로 시스템 설정을 따르는 완벽한 다크모드를 지원합니다.",
  },
];

const included = [
  "Next.js 15 App Router",
  "TypeScript + Zod 타입 검증",
  "shadcn/ui 20+ 컴포넌트",
  "다크모드 (next-themes)",
  "react-hook-form 폼 관리",
  "usehooks-ts 유틸리티 훅",
  "반응형 레이아웃",
  "대시보드 + 인증 페이지",
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero 섹션 */}
        <section className="container mx-auto px-4 py-24 md:py-32 text-center">
          <Badge variant="secondary" className="mb-6">
            Next.js 15 + React 19
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl mx-auto">
            웹 개발을{" "}
            <span className="text-primary">빠르게 시작</span>하는<br />
            모던 스타터킷
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            검증된 기술 스택과 재사용 가능한 컴포넌트로 아이디어를 빠르게 제품으로 만들어보세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                무료로 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">데모 보기</Link>
            </Button>
          </div>
        </section>

        {/* Features 섹션 */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              모든 것이 준비되어 있습니다
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              처음부터 설정할 필요 없이 바로 기능 개발에 집중하세요.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA 배너 */}
        <section className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  지금 바로 시작하세요
                </h2>
                <p className="text-primary-foreground/80 mb-8">
                  설정에 시간을 낭비하지 말고 제품 개발에 집중하세요.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/register">
                    무료로 시작하기 <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <ul className="space-y-3">
                {included.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary-foreground/70" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
