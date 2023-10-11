
function load_reload() {
  const containerEl = document.querySelector("#newsfeed");
  containerEl.innerText = "";

  // This makes things appear
  for (let i = bacefook.newsfeed.length - 1; i >= 0; i--) {
    const post = bacefook.newsfeed[i];
    const postEl = document.createElement("p");
    postEl.className = "one_post";

    const friendEl = document.createElement("div");
    friendEl.className = "friend_name";
    friendEl.innerText = post.friend;
    postEl.append(friendEl);

    const timeEl = document.createElement("div");
    timeEl.className = "post_time";
    // timeEl.innerText = moment(post.timestamp).format('[posted] YYYY/MM/DD, hh:mm:ss');
    // timeEl.innerText = moment(post.timestamp).toNow();//.format('[posted] hh:mm:ss');
    const time_diff = moment().diff(post.timestamp);
    // const time_sec = Math.floor(moment.duration(time_diff).as('seconds'));
    const time_sec = Math.floor(time_diff / 1000);
    console.log(time_diff, time_sec)
    // const time_ = moment.duration(time_sec).humanize();
    timeEl.innerText = `posted ${time_sec} 秒前`;
    postEl.append(timeEl);

    const textEl = document.createElement("div");
    textEl.className = "text";
    textEl.innerText = post.text;
    postEl.append(textEl);

    const feelingEl = document.createElement("div");
    feelingEl.className = "feeling";
    feelingEl.innerText = post.feeling;
    postEl.append(feelingEl);

    const imageEl = document.createElement("img");
    imageEl.className = "picture";
    imageEl.src = `images/${post.image}`;
    imageEl.alt = post.image;
    postEl.append(imageEl);

    containerEl.append(postEl);
  }
};




function load_reload2(article) {
  const containerEl = document.querySelector("#newsfeed");
  const postEl = document.createElement("p");
  postEl.className = "one_post";

  const friendEl = document.createElement("div");
  friendEl.className = "friend_name";
  friendEl.innerText = article.friend;
  postEl.append(friendEl);//子要素として持つ

  const textEl = document.createElement("div");
  textEl.className = "text";
  textEl.innerText = article.text;
  postEl.append(textEl);

  containerEl.prepend(postEl);
  // addPost(article);
  bacefook.newsfeed.push(article);
  // load_reload();
};




window.addEventListener("load", () => {
  // ユーザーネームが保存されているか確認
  let username = localStorage.getItem("username");
  if (!username) {
    // もし保存されてなければプロンプトを表示して入力を促す
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
  }
  load_reload();

  const user_display = document.getElementById('login_name');
  user_display.innerText = username;

});


const btn_reload = document.getElementById('btn_reload');
const btn_put = document.getElementById('btn_put');

// btn_reload.addEventListener(if (post.length !== count), () => {
//   console.log('自動更新します!');
//   load_reload();
//   count += 1;
// });
btn_reload.addEventListener('click', () => {
  console.log('画面を更新します!');
  load_reload();
});
form_post.addEventListener('click', () => {
  console.log('投稿します!');
  // load_reload();
});

document.addEventListener('DOMContentLoaded', function () {
  const articleForm = document.getElementById('articleForm');

  articleForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the user's input
    const content = document.getElementById('articleContent').value;
    const feeling = document.getElementById('articleFeeling').value;

    // console.log(content, feeling);
    // Validate input (you can add more validation as needed)

    // Create an article object (you can send this data to your server)
    const article = {
      friend: localStorage.getItem("username"),
      text: content,
      feeling: feeling,
      // You can add more fields here, e.g., author, date, etc.
    };

    // Send the article data to the server or perform other actions here

    // Optionally, clear the form fields after submission
    document.getElementById('articleContent').value = '';
    document.getElementById('articleFeeling').value = '';
    document.getElementById('articlePicture').value = '';


    load_reload2(article);

    // You can also display a success message or perform other actions here
  });
});




// 自動更新しようとして失敗。。。
// window.setInterval(() => {
//   const containerEl = document.querySelector("#newsfeed");
//   containerEl.innerText = "";

//   // This makes things appear
//   for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
//     const post = bacefook.newsfeed[index];
//     const friendEl = document.createElement("div");
//     friendEl.className = "friend";
//     friendEl.innerText = post.friend;
//     containerEl.append(postEl);
//   }

// }, 3000);
