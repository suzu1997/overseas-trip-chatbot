import React, { useState, useEffect, useCallback } from 'react';

import './assets/styles/style.css';
import { AnswersList, Chats } from './components';
import { db } from './firebase/index';
import Woman from './assets/image/woman.jpg';

export const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([
    {
      text: '独断と偏見で、おすすめの海外の旅行先を紹介します！質問に答えてください。',
      type: 'question',
    },
  ]);
  const [currentId, setCurrentId] = useState('init');
  const [dataset, setDataset] = useState({});

  //新しいチャットを追加するCallback関数
  const addChats = (chat) => {
    setChats((preChats) => {
      return [...preChats, chat];
    });
  };

  //チャット欄に次の質問を表示させる関数
  const displayNextQuestion = useCallback((nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question',
    });
    //回答の選択肢もここで更新
    setAnswers(nextDataset.answers);
    setCurrentId(nextQuestionId);
  }, []);

  //回答選択時（またはマウント時）にチャット欄を更新する関数
  //中でdisplayNextQuestionを呼び出す
  const selectAnswer = useCallback(
    (selectedAnswer, nextQuestionId) => {
      switch (true) {
        // リンクが選択された時
        case /^https:*/.test(nextQuestionId) ||
          /^http:*/.test(nextQuestionId): {
          const a = document.createElement('a');
          a.href = nextQuestionId; //href属性にnextQuestionId(URL)を設定
          a.target = '_blank'; //別タブで表示
          a.click(); //クリックしたらURLのページに遷移
          break;
        }
        // 選択された回答をchatsに追加
        default:
          addChats({
            text: selectedAnswer,
            type: 'answer',
          });
          setTimeout(
            () => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]),
            750
          );
          break;
      }
    },
    [dataset, displayNextQuestion]
  );

  //マウント（ページ初期化）が終わった時の処理
  //最初の質問をチャットエリアに表示する
  useEffect(() => {
    (async () => {
      const initDataset = {};
      //非同期処理
      await db
        .collection('questions')
        .get()
        .then((snapshots) => {
          snapshots.forEach((doc) => {
            const id = doc.id; //それぞれのドキュメントのキー(id)
            const data = doc.data(); //中身のデータ
            initDataset[id] = data;
            //idをキー、データをvalueとして、オブジェクト型のdatasetにセット
          });
        });
      //Firebaseから取得したデータセットを反映
      setDataset(initDataset);

      //最初の質問を表示
      displayNextQuestion(currentId, initDataset[currentId]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //最新のチャットが見えるように、スクロール位置の頂点をスクロール領域の最下部に設定する
  useEffect(() => {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  });

  return (
    <div>
      <section className='c-section'>
        <div className='c-box'>
          <div className='c-header'>
            <img src={Woman} alt='icon' className='header-icon' />
            <p>コロナが終わったらどこへ行く？✈︎</p>
          </div>
          <div className='c-main'>
            <Chats chats={chats} />
            <AnswersList answers={answers} select={selectAnswer} />
          </div>
        </div>
      </section>
    </div>
  );
};
