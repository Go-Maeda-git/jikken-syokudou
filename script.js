const voteForm = document.getElementById('vote-form');
const result = document.getElementById('result');
const resultsContainer = document.getElementById('results-container');
const suggestBtn = document.getElementById('suggest-btn');
const suggestResult = document.getElementById('suggest-result');
const resetBtn = document.getElementById('reset-btn');

const menus = ['カレー', 'ラーメン', '定食', 'うどん'];
const storageKey = 'cafeteria_votes';

// 初期化
function initVotes() {
  const stored = localStorage.getItem(storageKey);
  return stored ? JSON.parse(stored) : {};
}

let votes = initVotes();
menus.forEach(menu => {
  if (!votes[menu]) votes[menu] = 0;
});

// 投票フォーム処理
voteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(voteForm);
  const selected = data.get('menu');

  if (selected) {
    votes[selected]++;
    localStorage.setItem(storageKey, JSON.stringify(votes));
    result.textContent = `✅ 「${selected}」に投票しました！（合計: ${votes[selected]}票）`;
    result.style.color = '#48bb78';
    updateResults();
    voteForm.reset();
  }
});

// 結果表示更新
function updateResults() {
  const totalVotes = Object.values(votes).reduce((sum, count) => sum + count, 0);

  if (totalVotes === 0) {
    resultsContainer.innerHTML = '<p class="placeholder">投票がまだありません</p>';
    return;
  }

  const sorted = menus.sort((a, b) => votes[b] - votes[a]);

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
resetBtn.addEventListener('click', () => {
  if (confirm('投票結果をリセットしますか？')) {
    menus.forEach(menu => votes[menu] = 0);
    localStorage.removeItem(storageKey);
    result.textContent = '';
    result.style.color = '';
    updateResults();
    voteForm.reset();
  }
});

// 初期表示
updateResults();
