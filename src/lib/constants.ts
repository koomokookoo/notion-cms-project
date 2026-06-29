import type { NavItem, SiteConfig } from "@/types";

export const SITE_CONFIG: SiteConfig = {
  name: "개발 블로그",
  description: "Notion으로 운영하는 개인 기술 블로그",
  url: "https://your-blog.vercel.app",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "홈", href: "/" },
  { label: "카테고리", href: "/category" },
];

// 블로그에서는 사이드바를 사용하지 않으므로 빈 배열로 유지
export const SIDEBAR_ITEMS: NavItem[] = [];
