"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Logo from "@/components/common/Logo";
import { SIDEBAR_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 p-3">
      {SIDEBAR_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 모바일 — Sheet */}
      <div className="lg:hidden flex items-center px-4 h-14 border-b">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="메뉴 열기">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="h-14 flex items-center px-4 border-b">
              <Logo />
            </div>
            <Separator />
            <SidebarNav />
          </SheetContent>
        </Sheet>
        <div className="ml-3">
          <Logo />
        </div>
      </div>

      {/* 데스크탑 — 고정 사이드바 */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r h-screen sticky top-0">
        <div className="h-16 flex items-center px-4 border-b">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarNav />
        </div>
      </aside>
    </>
  );
}
