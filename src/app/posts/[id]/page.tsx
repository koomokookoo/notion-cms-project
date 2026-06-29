import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlockRenderer } from "@/components/notion/BlockRenderer";
import { fetchPages, fetchPageContent } from "@/lib/notion";
import { SITE_CONFIG } from "@/lib/constants";

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const posts = await fetchPages();
    return posts.map((post) => ({ id: post.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const posts = await fetchPages();
  const post = posts.find((p) => p.id === id);

  if (!post) return { title: "글을 찾을 수 없습니다" };

  return {
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: `${post.category ? `[${post.category}] ` : ""}${post.title}`,
    openGraph: {
      title: post.title,
      description: `${post.category ? `[${post.category}] ` : ""}${post.title}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [posts, blocks] = await Promise.all([fetchPages(), fetchPageContent(id)]);

  const postIndex = posts.findIndex((p) => p.id === id);
  if (postIndex === -1) notFound();

  const post = posts[postIndex];
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-10 flex-1 max-w-3xl">
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.category && <Badge variant="secondary">{post.category}</Badge>}
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight mb-3">{post.title}</h1>
            {formattedDate && (
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            )}
          </header>

          <BlockRenderer blocks={blocks} />
        </article>

        <nav className="mt-12 flex justify-between gap-4 border-t pt-8">
          <div className="flex-1">
            {prevPost && (
              <Button variant="outline" asChild className="w-full justify-start">
                <Link href={`/posts/${prevPost.id}`}>
                  <span className="text-muted-foreground mr-2">←</span>
                  <span className="truncate">{prevPost.title}</span>
                </Link>
              </Button>
            )}
          </div>
          <div className="flex-1">
            {nextPost && (
              <Button variant="outline" asChild className="w-full justify-end">
                <Link href={`/posts/${nextPost.id}`}>
                  <span className="truncate">{nextPost.title}</span>
                  <span className="text-muted-foreground ml-2">→</span>
                </Link>
              </Button>
            )}
          </div>
        </nav>
      </main>
      <Footer />
    </>
  );
}
