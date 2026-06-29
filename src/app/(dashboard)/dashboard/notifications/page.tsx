import { Bell, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/common/PageHeader";
import { cn } from "@/lib/utils";

type NotificationType = "info" | "success" | "warning";

const notifications: {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}[] = [
  {
    id: "1",
    title: "신규 사용자 가입",
    message: "강지호님이 새로 가입했습니다.",
    type: "info",
    read: false,
    createdAt: "2026-06-29 14:32",
  },
  {
    id: "2",
    title: "결제 완료",
    message: "이서연님의 프리미엄 플랜 결제가 완료되었습니다.",
    type: "success",
    read: false,
    createdAt: "2026-06-29 11:15",
  },
  {
    id: "3",
    title: "서버 점검 예정",
    message: "6월 30일 02:00 ~ 04:00 정기 점검이 예정되어 있습니다.",
    type: "warning",
    read: false,
    createdAt: "2026-06-28 18:00",
  },
  {
    id: "4",
    title: "보고서 생성 완료",
    message: "Q2 분기 보고서가 생성되었습니다. 확인해보세요.",
    type: "success",
    read: true,
    createdAt: "2026-06-28 09:40",
  },
  {
    id: "5",
    title: "새 댓글",
    message: "박도윤님이 문서에 댓글을 남겼습니다.",
    type: "info",
    read: true,
    createdAt: "2026-06-27 15:22",
  },
];

const typeConfig: Record<NotificationType, { icon: React.ElementType; color: string }> = {
  info: { icon: Info, color: "text-blue-500" },
  success: { icon: CheckCircle2, color: "text-emerald-500" },
  warning: { icon: AlertCircle, color: "text-amber-500" },
};

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="알림"
        description={`읽지 않은 알림이 ${unreadCount}개 있습니다.`}
      />
      <div className="space-y-3 max-w-2xl">
        {notifications.map((notification) => {
          const { icon: Icon, color } = typeConfig[notification.type];
          return (
            <Card
              key={notification.id}
              className={cn(
                "transition-colors",
                !notification.read && "border-primary/30 bg-primary/5"
              )}
            >
              <CardContent className="flex items-start gap-4 py-4">
                <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", color)} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    {!notification.read && (
                      <Badge variant="default" className="text-xs px-1.5 py-0">
                        <Bell className="h-2.5 w-2.5 mr-1" />
                        새 알림
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.createdAt}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
