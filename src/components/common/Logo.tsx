import Link from "next/link";
import { Zap } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 font-bold text-xl ${className}`}>
      <Zap className="h-6 w-6 text-primary" />
      <span>{SITE_CONFIG.name}</span>
    </Link>
  );
}
