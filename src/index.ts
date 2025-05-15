import { getChangePercentByStockId } from './stockService';
import { fetchRecentNewsByStockId } from './fetchNews';
import { sendLinePushMessage } from './linePush';

const stockId = 8069;
const upperPriceLimit = 3
const lowerPriceLimit = -3

async function main() {
  const percent = await getChangePercentByStockId(stockId);
  
  if (percent === null) {
    console.log('無法取得股價資料');
    return;
  }

  console.log(`股票漲跌幅: ${percent.toFixed(2)}%`);

  if (percent >= upperPriceLimit || percent <= lowerPriceLimit) {
    console.log('已發送通知');

    const news = await fetchRecentNewsByStockId(stockId);

    let message = `股票代號： ${stockId}\n`;

    news.forEach((item, i) => {
      console.log(`${i + 1}. ${item.title}`);
      console.log(`   ${item.url}`);
      message += `${i + 1}. ${item.title}\n`;
      message += `${item.url}\n`;
    });

    sendLinePushMessage(message);
  } else {
    console.log('未達到漲跌幅限制設定，不發送通知');
  }
}

main();