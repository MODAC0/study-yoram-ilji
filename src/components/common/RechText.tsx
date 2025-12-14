import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import React from "react";

export default function RichText({
  richTexts,
}: {
  richTexts: RichTextItemResponse[];
}) {
  if (!richTexts) {
    return null;
  }

  return (
    <>
      {richTexts.map((textItem, index) => {
        const { annotations, plain_text, href } = textItem;
        let content: React.ReactNode = plain_text;

        if (annotations.bold) {
          content = <strong>{content}</strong>;
        }
        if (annotations.italic) {
          content = <em>{content}</em>;
        }
        if (annotations.strikethrough) {
          content = <s>{content}</s>;
        }
        if (annotations.underline) {
          content = <u>{content}</u>;
        }
        if (annotations.code) {
          content = (
            <code className="text-sm font-mono bg-gray-200 dark:bg-gray-700 rounded px-1 py-0.5">
              {content}
            </code>
          );
        }

        if (href) {
          content = (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-point hover:underline"
            >
              {content}
            </a>
          );
        }

        return <React.Fragment key={index}>{content}</React.Fragment>;
      })}
    </>
  );
}
