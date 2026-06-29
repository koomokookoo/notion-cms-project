"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PostList } from "@/components/blog/PostList";
import type { Post } from "@/types/notion";

interface CategoryFilterProps {
  categories: string[];
  posts: Post[];
}

export function CategoryFilter({ categories, posts }: CategoryFilterProps) {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");

  const isSearching = query.trim().length > 0;

  const searchResults = isSearching
    ? posts.filter((p) =>
        p.title.toLowerCase().includes(query.trim().toLowerCase())
      )
    : [];

  const filteredByCategory =
    selected === "all" ? posts : posts.filter((p) => p.category === selected);

  return (
    <div>
      <Input
        type="search"
        placeholder="글 제목으로 검색..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6 max-w-sm"
      />

      {isSearching ? (
        searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">검색 결과가 없습니다.</p>
            <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
          </div>
        ) : (
          <PostList posts={searchResults} />
        )
      ) : (
        <Tabs value={selected} onValueChange={setSelected}>
          <div className="overflow-x-auto pb-1">
            <TabsList className="flex-nowrap h-auto mb-6">
              <TabsTrigger value="all">전체</TabsTrigger>
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value={selected}>
            <PostList posts={filteredByCategory} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
