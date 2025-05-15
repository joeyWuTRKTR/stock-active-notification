import axios from 'axios';
import * as cheerio from 'cheerio';

interface NewsItem {
  title: string;
  url: string;
}

export async function fetchRecentNewsByStockId(stockId: number): Promise<NewsItem[]> {
  const url = `https://tw.stock.yahoo.com/quote/${stockId}.TW/news`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);


  const newsItems: { title: string; url: string }[] = [];
  let word = '';

  const elements = $('li.js-stream-content').slice(0, 5).toArray();

  for (const el of elements) {
    const title = $(el).find('h3 a').text().trim();
    const href = $(el).find('h3 a').attr('href');

    if (title && href) {
      const fullUrl = href.startsWith('http') ? href : `https://tw.stock.yahoo.com${href}`;

      const body = await getArticleBody(fullUrl);
      word = word + `標題： ${title}\n` + `文章連結： ${href}\n` + body + "\n\n";

      newsItems.push({ title, url: fullUrl });
    }
  }

  console.log(word);

  return newsItems;
}

async function getArticleBody(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const bodyText = $('.caas-body').text().trim();

    if (!bodyText) {
      throw new Error('Article body not found.');
    }

    return bodyText;
  } catch (error) {
    console.error('Error fetching article:', (error as Error).message);
    return '';
  }
}