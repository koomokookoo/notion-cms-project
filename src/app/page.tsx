import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { fetchPages } from "@/lib/notion";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default async function HomePage() {
  const posts = await fetchPages().catch(() => []);
  const categories = [...new Set(posts.map((p) => p.category).filter(Boolean))];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{SITE_CONFIG.name}</h1>
          <p className="text-muted-foreground">{SITE_CONFIG.description}</p>
        </section>
        <CategoryFilter posts={posts} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
