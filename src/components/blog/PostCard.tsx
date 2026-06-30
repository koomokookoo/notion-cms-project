import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@/types/notion";

interface PostCardProps {
  post: Post;
  onTagClick?: (tag: string) => void;
}

export function PostCard({ post, onTagClick }: PostCardProps) {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Link href={`/posts/${post.id}`} className="block group">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            {formattedDate && (
              <span className="text-xs text-muted-foreground">{formattedDate}</span>
            )}
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        {post.tags.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className={`text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors ${
                    onTagClick ? "hover:border-primary" : ""
                  }`}
                  onClick={(e) => {
                    if (onTagClick) {
                      e.preventDefault();
                      e.stopPropagation();
                      onTagClick(tag);
                    }
                  }}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
