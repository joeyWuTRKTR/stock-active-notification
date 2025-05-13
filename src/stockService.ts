import axios from 'axios';

export async function getChangePercentByStockId(stockId: number): Promise<number | null> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stockId}.TW?range=2d&interval=1d`;
    const res = await axios.get(url);
    const { chart } = res.data;
    const prices = chart.result[0].indicators.quote[0].close;

    const [prev, today] = prices;
    if (!prev || !today) return null;

    const change = ((today - prev) / prev) * 100;
    return change;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
}
