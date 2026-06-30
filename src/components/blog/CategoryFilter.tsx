"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PostList } from "@/components/blog/PostList";
import type { Post } from "@/types/notion";

interface CategoryFilterProps {
  categories: string[];
  posts: Post[];
}

export function CategoryFilter({ categories, posts }: CategoryFilterProps) {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const isSearching = query.trim().length > 0;
  const q = query.trim().toLowerCase();

  const handleTagClick = (tag: string) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
    setQuery("");
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0) setSelectedTag(null);
  };

  // 검색 모드: 제목 OR 태그 포함
  const searchResults = isSearching
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    : [];

  // 카테고리 + 태그 복합 필터
  const categoryFiltered =
    selected === "all" ? posts : posts.filter((p) => p.category === selected);

  const tagFiltered = selectedTag
    ? categoryFiltered.filter((p) => p.tags.includes(selectedTag))
    : categoryFiltered;

  return (
    <div>
      {/* 검색창 */}
      <Input
        type="search"
        placeholder="제목 또는 태그로 검색..."
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        className="mb-4 max-w-sm"
        data-testid="search-input"
      />

      {/* 선택된 태그 표시 */}
      {selectedTag && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-muted-foreground">태그 필터:</span>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 cursor-pointer"
            onClick={() => setSelectedTag(null)}
            data-testid="selected-tag-badge"
          >
            #{selectedTag}
            <X className="h-3 w-3" />
          </Badge>
        </div>
      )}

      {/* 검색 결과 */}
      {isSearching ? (
        searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">검색 결과가 없습니다.</p>
            <p className="text-sm mt-1">다른 키워드로 검색해보세요.</p>
          </div>
        ) : (
          <PostList posts={searchResults} onTagClick={handleTagClick} />
        )
      ) : (
        /* 카테고리 탭 + 태그 필터 */
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
            {tagFiltered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <p className="text-lg font-medium">해당하는 글이 없습니다.</p>
                <p className="text-sm mt-1">다른 태그나 카테고리를 선택해보세요.</p>
              </div>
            ) : (
              <PostList posts={tagFiltered} onTagClick={handleTagClick} />
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
