import Link from "next/link";
import Logo from "@/components/common/Logo";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-16 items-center justify-between px-6 border-b">
        <Logo />
        <ThemeToggle />
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
      <footer className="py-4 text-center text-xs text-muted-foreground border-t">
        © {new Date().getFullYear()} StarterKit.{" "}
        <Link href="/privacy" className="hover:underline">개인정보처리방침</Link>
        {" · "}
        <Link href="/terms" className="hover:underline">이용약관</Link>
      </footer>
    </div>
  );
}
