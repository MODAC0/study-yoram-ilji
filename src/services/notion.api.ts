import { NotionPage } from '@/types/notion.type';
import {
  Client,
  GetPageResponse,
  ListBlockChildrenResponse,
} from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const dataSourceId = process.env.NOTION_DATA_SOURCE_ID!;

export const getPublishedPosts = async () => {
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: '발행',
      checkbox: {
        equals: true,
      },
    },
  });
  return response;
};

export async function getBlogPosts() {
  if (!dataSourceId) {
    throw new Error('NOTION_DATA_SOURCE_ID가 설정되지 않았습니다.');
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: '발행',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: '생성일',
          direction: 'descending',
        },
      ],
    });
    // 3. 타입 단언
    return response.results as NotionPage[];
  } catch (error) {
    console.error('Notion API Error:', error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

export const getPost = async (id: string): Promise<GetPageResponse> => {
  const response = await notion.pages.retrieve({ page_id: id });
  return response;
};

export const getPostContent = async (
  id: string,
): Promise<ListBlockChildrenResponse> => {
  const response = await notion.blocks.children.list({ block_id: id });
  return response;
};

export async function getPostsByCategory(category: string) {
  if (!dataSourceId) {
    throw new Error('NOTION_DATA_SOURCE_ID가 설정되지 않았습니다.');
  }

  try {
    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        and: [
          {
            property: '발행',
            checkbox: {
              equals: true,
            },
          },
          {
            property: '카테고리',
            select: {
              equals: category,
            },
          },
        ],
      },
      sorts: [
        {
          property: '생성일',
          direction: 'descending',
        },
      ],
    });
    return response.results as NotionPage[];
  } catch (error) {
    console.error('Notion API Error:', error);
    return [];
  }
}
