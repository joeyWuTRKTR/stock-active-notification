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

  const newsItems: NewsItem[] = [];

  $('li.js-stream-content').slice(0, 5).each((_, el) => {
    const title = $(el).find('h3 a').text().trim();
    const href = $(el).find('h3 a').attr('href');

    if (title && href) {
      const fullUrl = href.startsWith('http') ? href : `https://tw.stock.yahoo.com${href}`;
      newsItems.push({ title, url: fullUrl });
    }
  });

  return newsItems;
}
