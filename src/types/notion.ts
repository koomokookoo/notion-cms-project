export interface Post {
  id: string;
  title: string;
  category: string;
  tags: string[];
  publishedAt: string;
  slug: string;
}

export type Category = string;

export type NotionBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "code"
  | "image"
  | "quote"
  | "divider"
  | "unsupported";

export interface RichText {
  type: string;
  text: {
    content: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    code: boolean;
    strikethrough: boolean;
  };
}

export interface NotionBlock {
  id: string;
  type: NotionBlockType;
  richText: RichText[];
  language?: string;
  url?: string;
  children?: NotionBlock[];
}
