import { getChangePercentByStockId } from './stockService';

async function main() {
  const percent = await getChangePercentByStockId(2330);
  if (percent === null) {
    console.log('無法取得台積電股價資料');
    return;
  }

  console.log(`台積電漲幅: ${percent.toFixed(2)}%`);

  if (percent >= 3) {
    console.log('已發送通知');
  } else {
    console.log('未超過 3%，不發送通知');
  }
}

main();
