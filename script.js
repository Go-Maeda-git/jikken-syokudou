const voteForm = document.getElementById('vote-form');
const result = document.getElementById('result');
const suggestBtn = document.getElementById('suggest-btn');
const suggestResult = document.getElementById('suggest-result');

const menus = ['カレー', 'ラーメン', '定食', 'うどん'];

voteForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(voteForm);
  const selected = data.get('menu');

  if (!selected) {
    result.textContent = 'メニューを選んでください。';
    return;
  }

  result.textContent = `「${selected}」に投票しました！`;
});

suggestBtn.addEventListener('click', () => {
  const pick = menus[Math.floor(Math.random() * menus.length)];
  suggestResult.textContent = `今日のおすすめは「${pick}」です。`;
});
