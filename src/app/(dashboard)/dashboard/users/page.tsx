import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/common/PageHeader";

const users = [
  { id: "1", name: "김민준", email: "minjun@example.com", role: "관리자", status: "활성", joinedAt: "2026-01-15" },
  { id: "2", name: "이서연", email: "seoyeon@example.com", role: "사용자", status: "활성", joinedAt: "2026-02-03" },
  { id: "3", name: "박도윤", email: "doyun@example.com", role: "사용자", status: "비활성", joinedAt: "2026-03-20" },
  { id: "4", name: "최아린", email: "arin@example.com", role: "편집자", status: "활성", joinedAt: "2026-04-07" },
  { id: "5", name: "정하은", email: "haeun@example.com", role: "사용자", status: "활성", joinedAt: "2026-05-11" },
  { id: "6", name: "강지호", email: "jiho@example.com", role: "사용자", status: "대기", joinedAt: "2026-06-01" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  활성: "default",
  비활성: "secondary",
  대기: "outline",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="사용자 관리" description="등록된 사용자를 조회하고 관리하세요." />
      <Card>
        <CardHeader>
          <CardTitle>전체 사용자 ({users.length}명)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>사용자</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">가입일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[user.status]}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {user.joinedAt}
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
