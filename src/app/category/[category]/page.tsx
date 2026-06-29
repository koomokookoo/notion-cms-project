import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PostList } from "@/components/blog/PostList";
import { fetchPages, fetchCategories } from "@/lib/notion";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    return categories.map((category) => ({ category: encodeURIComponent(category) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  return {
    title: `${decoded} | ${SITE_CONFIG.name}`,
    description: `${decoded} 카테고리의 글 목록`,
    openGraph: {
      title: `${decoded} | ${SITE_CONFIG.name}`,
      description: `${decoded} 카테고리의 글 목록`,
      type: "website",
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const decoded = decodeURIComponent(category);

  const [posts, categories] = await Promise.all([fetchPages(), fetchCategories()]);

  if (!categories.includes(decoded)) notFound();

  const filtered = posts.filter((p) => p.category === decoded);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1">
        <section className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">{decoded}</h1>
          <p className="text-muted-foreground">
            {filtered.length}개의 글
          </p>
        </section>
        <PostList posts={filtered} />
      </main>
      <Footer />
    </>
  );
}
