import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const documents = [
  { id: "1", title: "서비스 이용약관 v2.1", category: "법적", size: "48 KB", updatedAt: "2026-06-20", status: "게시됨" },
  { id: "2", title: "개인정보처리방침", category: "법적", size: "62 KB", updatedAt: "2026-06-18", status: "게시됨" },
  { id: "3", title: "API 연동 가이드", category: "기술", size: "210 KB", updatedAt: "2026-06-15", status: "게시됨" },
  { id: "4", title: "2026 Q2 분기 보고서", category: "보고서", size: "1.2 MB", updatedAt: "2026-06-10", status: "초안" },
  { id: "5", title: "신규 기능 기획서", category: "기획", size: "95 KB", updatedAt: "2026-06-05", status: "검토중" },
  { id: "6", title: "온보딩 가이드", category: "교육", size: "340 KB", updatedAt: "2026-05-28", status: "게시됨" },
];

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  게시됨: "default",
  검토중: "secondary",
  초안: "outline",
};

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="문서 관리" description="업로드된 문서를 조회하고 관리하세요." />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            전체 문서 ({documents.length}개)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>문서명</TableHead>
                <TableHead>분류</TableHead>
                <TableHead>크기</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">수정일</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{doc.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{doc.size}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[doc.status]}>{doc.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {doc.updatedAt}
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
