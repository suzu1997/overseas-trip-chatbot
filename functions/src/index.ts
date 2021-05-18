import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(); // adminを初期化
const db = admin.firestore(); // admin権限でfirestoreを操作、定数に入れておく

// レスポンスを返すための関数
const sendResponse = (
  response: functions.Response,
  statusCode: number,
  body: any
) => {
  response.send({
    statusCode,
    body: JSON.stringify(body),
  });
};

export const addDataset = functions.https.onRequest(
  // コールバック関数
  async (req: any, res: any) => {
    if (req.method !== 'POST') {
      sendResponse(res, 405, { error: 'Invalid Request' });
    } else {
      // データを追加するので基本はこっち
      // req.methodが"POST"の時
      const dataset = req.body;
      for (const key of Object.keys(dataset)) {
        const data = dataset[key];
        await db.collection('questions').doc(key).set(data);
      }
      sendResponse(res, 200, {
        message: 'Successfully added dataset!',
      });
    }
  }
);
