"use client";

import { useState } from "react";
import { Bell, Check, AlertTriangle, Info, User } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function SectionTitle({ id, title }: { id: string; title: string }) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <h2 className="text-xl font-bold">{title}</h2>
      <Separator className="mt-2" />
    </div>
  );
}

const sections = [
  { id: "buttons", label: "Button" },
  { id: "badges", label: "Badge" },
  { id: "cards", label: "Card" },
  { id: "inputs", label: "Input" },
  { id: "alerts", label: "Alert" },
  { id: "avatar", label: "Avatar" },
  { id: "toggles", label: "Switch / Checkbox" },
  { id: "progress", label: "Progress" },
  { id: "skeleton", label: "Skeleton" },
  { id: "tabs", label: "Tabs" },
  { id: "select", label: "Select" },
  { id: "tooltip", label: "Tooltip" },
];

export default function ExamplesPage() {
  const [progress] = useState(68);
  const [switchOn, setSwitchOn] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 flex gap-8">
        {/* 사이드 목차 */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">컴포넌트</p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 min-w-0 space-y-12">
          <div>
            <Badge variant="secondary" className="mb-3">컴포넌트 예제</Badge>
            <h1 className="text-4xl font-bold mb-2">UI 컴포넌트</h1>
            <p className="text-muted-foreground">
              shadcn/ui 기반으로 구성된 컴포넌트들을 직접 확인해보세요.
            </p>
          </div>

          {/* Button */}
          <section>
            <SectionTitle id="buttons" title="Button" />
            <div className="flex flex-wrap gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
              <Button size="icon" variant="outline">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Badge */}
          <section>
            <SectionTitle id="badges" title="Badge" />
            <div className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </section>

          {/* Card */}
          <section>
            <SectionTitle id="cards" title="Card" />
            <div className="grid sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>카드 제목</CardTitle>
                  <CardDescription>카드에 대한 간단한 설명을 여기에 작성합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">카드 본문 영역입니다. 다양한 콘텐츠를 담을 수 있습니다.</p>
                </CardContent>
              </Card>
              <Card className="border-primary/40">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    강조 카드
                  </CardTitle>
                  <CardDescription>중요한 정보를 강조할 때 사용합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">액션 버튼</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Input */}
          <section>
            <SectionTitle id="inputs" title="Input / Textarea" />
            <div className="max-w-md space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ex-input">일반 입력</Label>
                <Input id="ex-input" placeholder="텍스트를 입력하세요" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ex-disabled">비활성화</Label>
                <Input id="ex-disabled" placeholder="수정 불가" disabled />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ex-password">비밀번호</Label>
                <Input id="ex-password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ex-textarea">Textarea</Label>
                <Textarea id="ex-textarea" placeholder="여러 줄 입력..." rows={3} />
              </div>
            </div>
          </section>

          {/* Alert */}
          <section>
            <SectionTitle id="alerts" title="Alert" />
            <div className="space-y-3 max-w-xl">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>안내</AlertTitle>
                <AlertDescription>일반적인 정보를 전달하는 알림입니다.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>오류</AlertTitle>
                <AlertDescription>문제가 발생했을 때 표시하는 알림입니다.</AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Avatar */}
          <section>
            <SectionTitle id="avatar" title="Avatar" />
            <div className="flex items-center gap-4">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">김</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback className="text-base bg-primary text-primary-foreground">AB</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">JD</AvatarFallback>
              </Avatar>
            </div>
          </section>

          {/* Switch / Checkbox */}
          <section>
            <SectionTitle id="toggles" title="Switch / Checkbox" />
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  id="ex-switch"
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
                <Label htmlFor="ex-switch">
                  알림 수신 {switchOn ? "(켜짐)" : "(꺼짐)"}
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="ex-switch-disabled" disabled />
                <Label htmlFor="ex-switch-disabled" className="text-muted-foreground">비활성화</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="ex-check"
                  checked={checked}
                  onCheckedChange={(val) => setChecked(Boolean(val))}
                />
                <Label htmlFor="ex-check">이용약관에 동의합니다</Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox id="ex-check-disabled" disabled />
                <Label htmlFor="ex-check-disabled" className="text-muted-foreground">비활성화</Label>
              </div>
            </div>
          </section>

          {/* Progress */}
          <section>
            <SectionTitle id="progress" title="Progress" />
            <div className="max-w-md space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span>진행률</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
              <Progress value={25} className="h-1.5" />
              <Progress value={50} className="h-3" />
              <Progress value={100} className="h-2" />
            </div>
          </section>

          {/* Skeleton */}
          <section>
            <SectionTitle id="skeleton" title="Skeleton" />
            <div className="max-w-sm space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-32 w-full rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </section>

          {/* Tabs */}
          <section>
            <SectionTitle id="tabs" title="Tabs" />
            <Tabs defaultValue="tab1" className="max-w-lg">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="tab1">개요</TabsTrigger>
                <TabsTrigger value="tab2">설정</TabsTrigger>
                <TabsTrigger value="tab3">기록</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">개요 탭의 콘텐츠입니다. 프로젝트의 요약 정보를 보여줍니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab2">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">설정 탭의 콘텐츠입니다. 각종 설정 항목을 관리합니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab3">
                <Card>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground">기록 탭의 콘텐츠입니다. 활동 이력을 확인합니다.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </section>

          {/* Select */}
          <section>
            <SectionTitle id="select" title="Select" />
            <div className="max-w-xs space-y-3">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="역할을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">관리자</SelectItem>
                  <SelectItem value="editor">편집자</SelectItem>
                  <SelectItem value="viewer">뷰어</SelectItem>
                </SelectContent>
              </Select>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="비활성화" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a">항목 A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          {/* Tooltip */}
          <section>
            <SectionTitle id="tooltip" title="Tooltip" />
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">버튼에 호버하세요</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>툴팁 내용이 여기에 표시됩니다</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>추가 정보를 표시합니다</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
