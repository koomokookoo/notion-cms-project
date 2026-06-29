import {
  LayoutDashboard,
  Settings,
  Users,
  BarChart3,
  FileText,
  Bell,
} from "lucide-react";
import type { NavItem, SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "StarterKit",
  description: "모던 Next.js 스타터킷 — 빠르게 웹 개발을 시작하세요",
  url: "https://example.com",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "예제", href: "/examples" },
  { label: "문서", href: "/docs" },
];

export const SIDEBAR_ITEMS: NavItem[] = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "사용자", href: "/dashboard/users", icon: Users },
  { label: "분석", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "문서", href: "/dashboard/documents", icon: FileText },
  { label: "알림", href: "/dashboard/notifications", icon: Bell },
  { label: "설정", href: "/settings", icon: Settings },
];
