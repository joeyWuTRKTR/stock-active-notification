import { getChangePercentByStockId } from './stockService';
import { fetchRecentNewsByStockId } from './fetchNews';


async function main() {
  const percent = await getChangePercentByStockId(2330);
  
  if (percent === null) {
    console.log('無法取得台積電股價資料');
    return;
  }

  console.log(`台積電漲幅: ${percent.toFixed(2)}%`);

  const news = await fetchRecentNewsByStockId(8069);

  news.forEach((item, i) => {
    console.log(`${i + 1}. ${item.title}`);
    console.log(`   ${item.url}`);
  });

  if (percent >= 3) {
    console.log('已發送通知');
  } else {
    console.log('未超過 3%，不發送通知');
  }
}

main();