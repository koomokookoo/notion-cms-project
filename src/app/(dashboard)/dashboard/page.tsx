import { Users, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/common/PageHeader";
import type { StatCard, ActivityItem } from "@/types";

const stats: StatCard[] = [
  {
    title: "총 사용자",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "이번 달 매출",
    value: "₩4,820,000",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "신규 가입",
    value: "382",
    change: "-3.1%",
    trend: "down",
    icon: Users,
  },
  {
    title: "전환율",
    value: "3.24%",
    change: "+0.4%",
    trend: "up",
    icon: TrendingUp,
  },
];

const activities: ActivityItem[] = [
  {
    id: "1",
    user: { name: "김민준", email: "minjun@example.com" },
    action: "새 프로젝트 생성",
    status: "완료",
    date: "2026-06-29",
  },
  {
    id: "2",
    user: { name: "이서연", email: "seoyeon@example.com" },
    action: "플랜 업그레이드",
    status: "완료",
    date: "2026-06-29",
  },
  {
    id: "3",
    user: { name: "박도윤", email: "doyun@example.com" },
    action: "결제 처리",
    status: "진행중",
    date: "2026-06-28",
  },
  {
    id: "4",
    user: { name: "최아린", email: "arin@example.com" },
    action: "회원가입",
    status: "완료",
    date: "2026-06-28",
  },
  {
    id: "5",
    user: { name: "정하은", email: "haeun@example.com" },
    action: "비밀번호 변경",
    status: "대기",
    date: "2026-06-27",
  },
];

const statusVariant: Record<ActivityItem["status"], "default" | "secondary" | "outline"> = {
  완료: "default",
  진행중: "secondary",
  대기: "outline",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="대시보드" description="서비스 현황을 한눈에 확인하세요." />

      {/* 통계 카드 */}
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
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
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

      {/* 최근 활동 테이블 */}
      <Card>
        <CardHeader>
          <CardTitle>최근 활동</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>활동</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">날짜</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {item.user.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{item.user.name}</p>
                        <p className="text-xs text-muted-foreground">{item.user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{item.action}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
