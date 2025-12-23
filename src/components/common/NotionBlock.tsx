// components/NotionBlock.tsx

"use client";
import { getBlockImageProxyUrl, isNotionS3Url } from "@/utils/notion-image-url";
import { Accordion, AccordionItem, Alert, Checkbox } from "@heroui/react";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import RichText from "./RechText";

export default function NotionBlock({
  block,
  pageId,
}: {
  block: BlockObjectResponse;
  pageId?: string;
  children?: React.ReactNode;
}) {
  if (!("type" in block)) {
    return (
      <pre className="p-2 rounded text-sm">
        {JSON.stringify(block, null, 2)}
      </pre>
    );
  }

  switch (block.type) {
    case "heading_1":
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          <RichText richTexts={block.heading_1.rich_text} />
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-2xl font-bold mt-8 mb-4">
          <RichText richTexts={block.heading_2.rich_text} />
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-xl font-bold mt-6 mb-3">
          <RichText richTexts={block.heading_3.rich_text} />
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li className="list-disc list-inside mb-2">
          <RichText richTexts={block.bulleted_list_item.rich_text} />
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="list-decimal list-inside mb-2">
          <RichText richTexts={block.numbered_list_item.rich_text} />
        </li>
      );
    case "to_do":
      return (
        <div className="flex items-center my-2">
          <Checkbox checked={block.to_do.checked} readOnly />
          <span
            className={block.to_do.checked ? "line-through text-dark-500" : ""}
          >
            <RichText richTexts={block.to_do.rich_text} />
          </span>
        </div>
      );
    case "divider":
      return <hr className="my-6 border-gray-300" />;

    case "paragraph":
      return (
        <p className="mb-4 leading-relaxed">
          <RichText richTexts={block.paragraph.rich_text} />
        </p>
      );

    case "toggle":
      const children = block.has_children ? (
        <div className="mt-2 pl-4 border-l-2 border-gray-200">
          {block.object}
        </div>
      ) : null;
      return (
        <Accordion className="mb-4 border rounded">
          <AccordionItem
            title={<RichText richTexts={block.toggle.rich_text} />}
          >
            {children}
          </AccordionItem>
        </Accordion>
      );

    case "callout":
      return (
        <Alert
          className="my-4"
          icon={
            block.callout.icon?.type === "emoji" ? (
              <span className="text-xl">{block.callout.icon.emoji}</span>
            ) : null
          }
        >
          <RichText richTexts={block.callout.rich_text} />
        </Alert>
      );

    case "quote":
      return (
        <blockquote className="my-4 p-4 border-l-4 border-gray-300 bg-gray-50 dark:bg-gray-800 italic">
          <RichText richTexts={block.quote.rich_text} />
        </blockquote>
      );

    case "image":
      const originalSrc =
        block.image.type === "file"
          ? block.image.file.url
          : block.image.external.url;
      const caption = block.image.caption;

      // S3 임시 URL인 경우 프록시 사용
      const imageSrc =
        pageId && isNotionS3Url(originalSrc)
          ? getBlockImageProxyUrl(pageId, block.id)
          : originalSrc;

      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video">
            <Image
              src={imageSrc}
              alt={caption.length > 0 ? caption[0].plain_text : "Notion Image"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              unoptimized
            />
          </div>
          {caption.length > 0 && (
            <figcaption className="text-center text-sm text-dark-300 mt-2">
              <RichText richTexts={caption} />
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return (
        <pre className="bg-[#282c34] text-white p-4 rounded-md overflow-x-auto my-4 text-sm">
          <SyntaxHighlighter language={block.code.language} style={atomOneDark}>
            {block.code.rich_text[0]?.plain_text}
          </SyntaxHighlighter>
        </pre>
      );

    default:
      return (
        <pre className="p-2 rounded text-sm bg-gray-100 dark:bg-gray-800 overflow-x-auto">
          {JSON.stringify(block, null, 2)}
        </pre>
      );
  }
}
