import { db } from './config.js';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  updateDoc,
  increment,
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js';

const voteForm = document.getElementById('vote-form');
const result = document.getElementById('result');
const resultsContainer = document.getElementById('results-container');
const suggestBtn = document.getElementById('suggest-btn');
const suggestResult = document.getElementById('suggest-result');
const resetBtn = document.getElementById('reset-btn');

const menus = ['カレー', 'ラーメン', '定食', 'うどん'];
let votes = {};

// Firebaseからデータを読み込む
async function loadVotes() {
  try {
    const collectionRef = collection(db, 'votes');
    const snapshot = await getDocs(collectionRef);

    menus.forEach(menu => {
      votes[menu] = 0;
    });

    snapshot.forEach(docSnap => {
      const data = docSnap.data();
      if (votes.hasOwnProperty(data.menu)) {
        votes[data.menu] = data.count || 0;
      }
    });

    updateResults();
  } catch (error) {
    console.error('Firebaseからの読み込みに失敗しました:', error);
    result.textContent = '⚠️ データベースの接続に失敗しました';
  }
}

// 投票
voteForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = new FormData(voteForm);
  const selected = data.get('menu');

  if (selected) {
    try {
      const voteDoc = doc(db, 'votes', selected);
      const docSnap = await getDoc(voteDoc);

      if (docSnap.exists()) {
        votes[selected]++;
        await updateDoc(voteDoc, {
          count: increment(1),
        });
      } else {
        votes[selected] = 1;
        await setDoc(voteDoc, {
          menu: selected,
          count: 1,
        });
      }

      result.textContent = `✅ 「${selected}」に投票しました！（合計: ${votes[selected]}票）`;
      result.style.color = '#48bb78';
      updateResults();
      voteForm.reset();
    } catch (error) {
      console.error('投票の保存に失敗:', error);
      result.textContent = '⚠️ 投票の保存に失敗しました';
    }
  }
});

// 結果表示
function updateResults() {
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  if (totalVotes === 0) {
    resultsContainer.innerHTML = '<p class="placeholder">投票がまだありません</p>';
    return;
  }

  const sorted = Object.keys(votes).sort((a, b) => votes[b] - votes[a]);

  resultsContainer.innerHTML = sorted
    .map((menu) => {
      const count = votes[menu];
      const percentage = (count / totalVotes) * 100;
      return `
        <div class="result-item">
          <span class="result-item-name">${menu}</span>
          <div class="result-item-stats">
            <div class="bar">
              <div class="bar-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="result-item-count">${count}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

// ランダム提案
suggestBtn.addEventListener('click', () => {
  const pick = menus[Math.floor(Math.random() * menus.length)];
  suggestResult.textContent = `🎲 本日のおすすめ: 「${pick}」です！`;
  suggestResult.style.color = '#667eea';
});

// リセット
resetBtn.addEventListener('click', async () => {
  if (confirm('投票結果をリセットしますか？')) {
    try {
      for (const menu of menus) {
        const voteDoc = doc(db, 'votes', menu);
        await setDoc(voteDoc, {
          menu: menu,
          count: 0,
        });
        votes[menu] = 0;
      }

      result.textContent = '';
      result.style.color = '';
      updateResults();
      voteForm.reset();
    } catch (error) {
      console.error('リセットに失敗:', error);
      result.textContent = '⚠️ リセットに失敗しました';
    }
  }
});

// 初期化
loadVotes();
