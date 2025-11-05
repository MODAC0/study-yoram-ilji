"use client";

import { Checkbox } from "@heroui/react";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function NotionBlock({ block }: { block: BlockObjectResponse }) {
  switch (block.type) {
    case "heading_1":
      return (
        <h1 className="text-3xl font-bold mt-8 mb-4">
          {block.heading_1.rich_text[0]?.plain_text}
        </h1>
      );
    case "heading_2":
      return (
        <h2 className="text-2xl font-bold mt-8 mb-4">
          {block.heading_2.rich_text[0]?.plain_text}
        </h2>
      );
    case "heading_3":
      return (
        <h3 className="text-xl font-bold mt-6 mb-3">
          {block.heading_3.rich_text[0]?.plain_text}
        </h3>
      );
    case "bulleted_list_item":
      return (
        <li className="list-disc list-inside mb-2">
          {block.bulleted_list_item.rich_text[0]?.plain_text}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="list-decimal list-inside mb-2">
          {block.numbered_list_item.rich_text[0]?.plain_text}
        </li>
      );
    case "to_do":
      return (
        <Checkbox checked={block.to_do.checked}>
          {/* {block.to_do.rich_text[0]?.plain_text} */}
        </Checkbox>
      );
    case "paragraph":
      return <p className="mb-4">{block.paragraph.rich_text[0]?.plain_text}</p>;
    default:
      return (
        <pre className="p-2 rounded text-sm">
          {JSON.stringify(block, null, 2)}
        </pre>
      );
  }
}
