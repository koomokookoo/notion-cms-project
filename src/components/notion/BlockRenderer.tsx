import Image from "next/image";
import type { NotionBlock, RichText } from "@/types/notion";

function renderRichText(items: RichText[]): React.ReactNode {
  return items.map((item, i) => {
    let node: React.ReactNode = item.text.content;

    if (item.annotations.bold) node = <strong key={i}>{node}</strong>;
    if (item.annotations.italic) node = <em key={i}>{node}</em>;
    if (item.annotations.code) node = <code key={i} className="rounded bg-muted px-1 py-0.5 text-sm font-mono">{node}</code>;
    if (item.annotations.strikethrough) node = <s key={i}>{node}</s>;

    return <span key={i}>{node}</span>;
  });
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-4 leading-7 text-foreground">
          {renderRichText(block.richText)}
        </p>
      );
    case "heading_1":
      return (
        <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight">
          {renderRichText(block.richText)}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="mt-6 mb-3 text-2xl font-semibold tracking-tight">
          {renderRichText(block.richText)}
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="mt-5 mb-2 text-xl font-semibold tracking-tight">
          {renderRichText(block.richText)}
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li className="mb-1 ml-4 list-disc leading-7">
          {renderRichText(block.richText)}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="mb-1 ml-4 list-decimal leading-7">
          {renderRichText(block.richText)}
        </li>
      );
    case "code":
      return (
        <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4">
          <code className="text-sm font-mono">
            {block.richText.map((t) => t.text.content).join("")}
          </code>
          {block.language && (
            <div className="mt-2 text-xs text-muted-foreground">{block.language}</div>
          )}
        </pre>
      );
    case "image":
      return block.url ? (
        <figure className="mb-6">
          <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
            <Image
              src={block.url}
              alt="Notion 이미지"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </figure>
      ) : null;
    case "quote":
      return (
        <blockquote className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
          {renderRichText(block.richText)}
        </blockquote>
      );
    case "divider":
      return <hr className="my-8 border-border" />;
    case "unsupported":
      return null;
    default:
      return null;
  }
}

interface BlockRendererProps {
  blocks: NotionBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {blocks.map((block) => (
        <Block key={block.id} block={block} />
      ))}
    </div>
  );
}
