// linePush.ts
import axios from 'axios';

require('dotenv').config();

const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN; // Long-lived token
const USER_ID = process.env.USER_ID; // Target LINE user ID

export async function sendLinePushMessage(message: string) {
  try {
    const url = 'https://api.line.me/v2/bot/message/push';

    // const res = await axios.post(
    //   url,
    //   {
    //     to: USER_ID,
    //     messages: [{ type: 'text', text: message }],
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
    //     },
    //   }
    // );

    // console.log('Message sent:', res.data);
  } catch (err) {
    console.error('LINE message failed:', err);
  }
}
