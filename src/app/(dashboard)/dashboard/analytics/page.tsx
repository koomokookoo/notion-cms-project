import { TrendingUp, TrendingDown, Users, MousePointerClick, Eye, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PageHeader from "@/components/common/PageHeader";

const stats = [
  { title: "페이지 조회수", value: "284,392", change: "+18.2%", trend: "up", icon: Eye },
  { title: "순 방문자", value: "48,721", change: "+9.4%", trend: "up", icon: Users },
  { title: "클릭률", value: "4.73%", change: "-0.8%", trend: "down", icon: MousePointerClick },
  { title: "평균 체류 시간", value: "3분 42초", change: "+12.1%", trend: "up", icon: Clock },
];

const trafficSources = [
  { source: "검색엔진 (SEO)", percentage: 42 },
  { source: "직접 접속", percentage: 28 },
  { source: "소셜 미디어", percentage: 18 },
  { source: "추천 링크", percentage: 12 },
];

const topPages = [
  { path: "/", title: "홈", views: 94210 },
  { path: "/dashboard", title: "대시보드", views: 52840 },
  { path: "/register", title: "회원가입", views: 38130 },
  { path: "/login", title: "로그인", views: 29470 },
  { path: "/examples", title: "예제", views: 15320 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="분석" description="트래픽 및 사용자 행동 데이터를 확인하세요." />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-emerald-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">지난 달 대비</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>트래픽 출처</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {trafficSources.map((item) => (
              <div key={item.source} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.source}</span>
                  <span className="font-medium">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>인기 페이지 (TOP 5)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div key={page.path} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                    <div>
                      <p className="text-sm font-medium">{page.title}</p>
                      <p className="text-xs text-muted-foreground">{page.path}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{page.views.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
