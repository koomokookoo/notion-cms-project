"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PostList } from "@/components/blog/PostList";
import type { Post } from "@/types/notion";

interface SearchBarProps {
  posts: Post[];
}

export function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  return (
    <div>
      <Input
        type="search"
        placeholder="글 제목으로 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 max-w-sm"
      />
      {query.trim() && (
        <div>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <p className="text-lg font-medium">검색 결과가 없습니다.</p>
              <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
            </div>
          ) : (
            <PostList posts={filtered} />
          )}
        </div>
      )}
    </div>
  );
}
