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
  const user_display = document.getElementById('login_name');
  user_display.innerText = username;
});

// DOM作成後はイベント発火を待つ
document.addEventListener('DOMContentLoaded', function () {
  const articleForm = document.getElementById('articleForm');

  // Postボタンを押すと
  articleForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = document.getElementById('articleContent').value;
    const feeling = document.getElementById('articleFeeling').value;
    console.log("get : ", document.getElementById('articlePicture'));
    const pic = "pic0.png";// document.getElementById('articlePicture').value;
    document.getElementById('articleContent').value = '';
    document.getElementById('articleFeeling').value = '';
    // document.getElementById('articlePicture').value = '';
    const timestamp = new Date();
    const article = {
      friend: localStorage.getItem("username"),
      text: text,
      feeling: feeling,
      image: pic,
      timestamp: timestamp
    };
    pushPost(article);
  });

  // Cancelボタンを押すと
  articleForm.addEventListener('reset', function (e) {
    e.preventDefault();
    document.getElementById('articleContent').value = '';
    document.getElementById('articleFeeling').value = '';
    document.getElementById('articlePicture').value = '';


    console.log("filename : ", filename);
  });

});

// 画像のドラッグアンドドロップ 未完。。。
const target = document.getElementById('articlePicture');

target.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
});

const filename = target.addEventListener('drop', function (e) {
  e.stopPropagation();
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('preview').src = e.target.result;
  }
  reader.readAsDataURL(e.dataTransfer.files[0]);


  console.log("check : ", e.dataTransfer.files[0].name);
  return e.dataTransfer.files[0].name;
});
console.log("filename : ", filename);

// モーダル
const modal_btn = document.getElementById('btn-modal-open');//Let's Postボタン
const modal_01 = document.querySelector('.modal-overlay');//モーダル全体
const closeBtn_01 = document.getElementById('modal-close');//cancelボタン
const body_01 = document.getElementsByTagName('body')[0];
console.log(body_01);
modal_btn.addEventListener('click', function() {
  body_01.classList.add('no_scroll');//スクロールさせない
  modal_01.classList.add('active');
   closeBtn_01.addEventListener('click', function() {
      modal_01.classList.remove('active');
      body_01.classList.remove('no_scroll');
   }, false);
   //Escapeを押した時に閉じるようにする
   document.addEventListener('keydown', keydown_ivent);
   function keydown_ivent(e) {
      if(e.key == 'Escape'){
         modal.classList.remove('active');
        body_01.classList.remove('no_scroll');
      }
   }
}, false);
