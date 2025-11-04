import { Client } from '@notionhq/client';

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
    }
  });
    return response;
};