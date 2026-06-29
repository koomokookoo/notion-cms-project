export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "admin" | "user";
}

export interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
}

export interface ActivityItem {
  id: string;
  user: Pick<User, "name" | "email" | "avatarUrl">;
  action: string;
  status: "완료" | "진행중" | "대기";
  date: string;
}
