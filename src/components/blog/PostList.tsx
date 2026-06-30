"use client";

import { PostCard } from "@/components/blog/PostCard";
import type { Post } from "@/types/notion";

interface PostListProps {
  posts: Post[];
  onTagClick?: (tag: string) => void;
}

export function PostList({ posts, onTagClick }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <p className="text-lg font-medium">아직 게시된 글이 없습니다.</p>
        <p className="text-sm mt-1">곧 새로운 글로 찾아올게요!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onTagClick={onTagClick} />
      ))}
    </div>
  );
}
