import { Client, isFullBlock, isFullPage } from "@notionhq/client";
import type {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import type { Post, NotionBlock, RichText } from "@/types/notion";

function getNotionClient(): Client {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error("NOTION_API_KEY 환경변수가 설정되지 않았습니다.");
  return new Client({ auth: apiKey });
}

function getDatabaseId(): string {
  const id = process.env.NOTION_DATABASE_ID;
  if (!id) throw new Error("NOTION_DATABASE_ID 환경변수가 설정되지 않았습니다.");
  return id;
}

function parseRichTextItems(items: { type: string; plain_text: string; annotations: { bold: boolean; italic: boolean; code: boolean; strikethrough: boolean }; text?: { content: string } }[]): RichText[] {
  return items.map((item) => ({
    type: item.type,
    text: {
      content: item.text?.content ?? item.plain_text,
    },
    annotations: {
      bold: item.annotations.bold,
      italic: item.annotations.italic,
      code: item.annotations.code,
      strikethrough: item.annotations.strikethrough,
    },
  }));
}

function parsePost(page: PageObjectResponse): Post {
  const props = page.properties;

  const titleProp = props["Title"] ?? props["이름"] ?? props["Name"];
  const title =
    titleProp?.type === "title"
      ? titleProp.title.map((t) => t.plain_text).join("")
      : "";

  const categoryProp = props["Category"] ?? props["카테고리"];
  const category =
    categoryProp?.type === "select" ? (categoryProp.select?.name ?? "") : "";

  const tagsProp = props["Tags"] ?? props["태그"];
  const tags =
    tagsProp?.type === "multi_select"
      ? tagsProp.multi_select.map((t) => t.name)
      : [];

  const publishedProp = props["Published"] ?? props["발행일"];
  const publishedAt =
    publishedProp?.type === "date" ? (publishedProp.date?.start ?? "") : "";

  return {
    id: page.id,
    title,
    category,
    tags,
    publishedAt,
    slug: page.id,
  };
}

function parseBlock(block: BlockObjectResponse): NotionBlock {
  const base = { id: block.id };

  switch (block.type) {
    case "paragraph":
      return {
        ...base,
        type: "paragraph",
        richText: parseRichTextItems(block.paragraph.rich_text),
      };
    case "heading_1":
      return {
        ...base,
        type: "heading_1",
        richText: parseRichTextItems(block.heading_1.rich_text),
      };
    case "heading_2":
      return {
        ...base,
        type: "heading_2",
        richText: parseRichTextItems(block.heading_2.rich_text),
      };
    case "heading_3":
      return {
        ...base,
        type: "heading_3",
        richText: parseRichTextItems(block.heading_3.rich_text),
      };
    case "bulleted_list_item":
      return {
        ...base,
        type: "bulleted_list_item",
        richText: parseRichTextItems(block.bulleted_list_item.rich_text),
      };
    case "numbered_list_item":
      return {
        ...base,
        type: "numbered_list_item",
        richText: parseRichTextItems(block.numbered_list_item.rich_text),
      };
    case "code":
      return {
        ...base,
        type: "code",
        richText: parseRichTextItems(block.code.rich_text),
        language: block.code.language,
      };
    case "image": {
      const img = block.image;
      const url = img.type === "external" ? img.external.url : img.file.url;
      return { ...base, type: "image", richText: [], url };
    }
    case "quote":
      return {
        ...base,
        type: "quote",
        richText: parseRichTextItems(block.quote.rich_text),
      };
    case "divider":
      return { ...base, type: "divider", richText: [] };
    default:
      return { ...base, type: "unsupported", richText: [] };
  }
}

export async function fetchPages(): Promise<Post[]> {
  const response = await getNotionClient().databases.query({
    database_id: getDatabaseId(),
    filter: {
      property: "status",
      select: { equals: "발행됨" },
    },
    sorts: [{ property: "Published", direction: "descending" }],
  });

  return response.results.filter(isFullPage).map(parsePost);
}

export async function fetchPageContent(pageId: string): Promise<NotionBlock[]> {
  const response = await getNotionClient().blocks.children.list({ block_id: pageId });

  return response.results.filter(isFullBlock).map(parseBlock);
}

export async function fetchCategories(): Promise<string[]> {
  const posts = await fetchPages();
  return [...new Set(posts.map((p) => p.category).filter(Boolean))];
}
