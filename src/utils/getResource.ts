import { NotionPage } from "@/types/notion.type";

export const getNotionBlogImageUrl = (post: NotionPage): string | null => {
  const cover = post.cover;
  if (!cover) {
    return null;
  }

  if (cover.type === "file") {
    return cover.file.url;
  }
  if (cover.type === "external") {
    return cover.external.url;
  }
  return null;
};

export const getNotionBlogTitle = (post: NotionPage): string => {
  const titleProp = post.properties.제목;
  return titleProp.title[0]?.plain_text || "제목 없음";
};
