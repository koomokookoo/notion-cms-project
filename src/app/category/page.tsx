import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { fetchCategories, fetchPages } from "@/lib/notion";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "카테고리",
  description: "전체 카테고리 목록",
};

export default async function CategoryIndexPage() {
  const [categories, posts] = await Promise.all([
    fetchCategories().catch(() => []),
    fetchPages().catch(() => []),
  ]);

  const countByCategory = Object.fromEntries(
    categories.map((cat) => [cat, posts.filter((p) => p.category === cat).length])
  );

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">카테고리</h1>
          <p className="text-muted-foreground">전체 {categories.length}개의 카테고리</p>
        </section>

        {categories.length === 0 ? (
          <p className="text-muted-foreground">아직 카테고리가 없습니다.</p>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <li key={cat}>
                <Link
                  href={`/category/${encodeURIComponent(cat)}`}
                  className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 text-center hover:bg-accent transition-colors"
                >
                  <span className="font-semibold">{cat}</span>
                  <span className="mt-1 text-sm text-muted-foreground">
                    {countByCategory[cat]}개의 글
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
