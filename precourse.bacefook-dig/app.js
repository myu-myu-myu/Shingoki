// Webページがloadされると
window.addEventListener("load", () => {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");
  if (!username || !password) {
    username = window.prompt("What is your name?");
    password = window.prompt("What is your password?");
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }
  reloadPost();
  const user_icon = document.getElementById('login_icon');
  const user_name = document.getElementById('login_name');
  user_icon.src = `images/icon0.png`;
  user_name.innerText = `Hi, ${username}!`;
});


// モーダル画面
const m_btn = document.getElementById('btn_m_open');//Postボタン
const m_ = document.querySelector('.m_overlay');//モーダル全体
const closebtn_ = document.getElementById('m_close');//Casncelボタン
const body_ = document.getElementsByTagName('body')[0];
// Postボタン1を押すとモーダル画面表示
m_btn.addEventListener('click', function () {
  body_.classList.add('no_scroll');//スクロールさせない
  m_.classList.add('active');
  // ❌ボタンを押すとモーダル画面終了
  closebtn_.addEventListener('click', function () {
    m_.classList.remove('active');
    body_.classList.remove('no_scroll');
  }, false);
}, false);


// 画像のドラッグアンドドロップ
const articlePic = document.getElementById('articlePicture');
let result = "";
articlePic.addEventListener('dragover', function (e) {
  e.preventDefault();//意図的にブラウザで既定されている動作をキャンセル
  e.stopPropagation();//他のListenerへのイベントの伝播をキャンセル
  e.dataTransfer.dropEffect = 'copy';
});
articlePic.addEventListener('drop', function (e) {
  e.stopPropagation();
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = function (e) {//loadできたら以下関数を実行
    document.getElementById('preview').src = e.target.result;
    result = e.target.result;
  }
  reader.readAsDataURL(e.dataTransfer.files[0]);
});


// DOM作成後、イベント発火に備えて待機
document.addEventListener('DOMContentLoaded', function () {
  const articleForm = document.getElementById('articleForm');
  // Postボタン2の処理
  articleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('articleContent').value;
    const tag = document.getElementById('articleTag').value;
    const feeling = document.getElementById('articleFeeling').value;
    const pic = result;
    document.getElementById('articleContent').value = '';
    document.getElementById('articleTag').value = '';
    document.getElementById('articleFeeling').value = '';
    document.getElementById('articlePicture').value = 'Drag & Drop Here!';
    document.getElementById('preview').src = '';
    const timestamp = new Date();
    const article = {
      id: idCount(),
      friend: localStorage.getItem("username"),
      friend_icon: "icon0.png",
      text: text,
      tag: tag,
      feeling: feeling,
      image: pic,//"pic0.png",
      timestamp: timestamp
    };
    pushPost(article, pic);
    result = "";
    m_.classList.remove('active');
    body_.classList.remove('no_scroll');
  });
  // ❌ボタンの処理
  articleForm.addEventListener('reset', function (e) {
    e.preventDefault();
    document.getElementById('articleContent').value = '';
    document.getElementById('articleTag').value = '';
    document.getElementById('articleFeeling').value = '';
    document.getElementById('articlePicture').value = '';
  });
});

// new postで最上部に移動
const new_post = document.getElementById('new_post');
new_post.addEventListener('click', () => {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
  new_post.classList.remove('active');
});
