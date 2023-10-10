
function load_reload() {
  const containerEl = document.querySelector("#newsfeed");
  containerEl.innerText = "";

  // This makes things appear
  for (let index = bacefook.newsfeed.length - 1; index >= 0; index--) {
    const post = bacefook.newsfeed[index];

    const friendEl = document.createElement("div");
    friendEl.className = "friend";
    friendEl.innerText = post.friend;

    const postEl = document.createElement("div");
    postEl.className = "one_post";
    postEl.innerText = post.text;
    postEl.append(friendEl);

    const postEl_ = document.createElement("div");
    postEl_.innerText = moment(post.timestamp).startOf('second').fromNow();
    // postEl_.innerText = moment().startOf('minite').fromNow(post.timestamp);
    // console.log(post.timestamp);
    // console.log(moment(post.timestamp).format('MMMM Do YYYY, h:mm:ss a'));
    // post.timestamp;
    postEl.append(postEl_);

    const postEl__ = document.createElement("div");
    postEl__.innerText = post.feeling;
    postEl.append(postEl__);

    const postEl___ = document.createElement("img");
    postEl___.src = `images/${post.image}`;
    postEl___.alt = post.image;
    postEl.append(postEl___);

    containerEl.append(postEl);
  }
};

window.addEventListener("load", () => {
  // This is a check to see if there's a username stored
  let username = localStorage.getItem("username");
  if (!username) {
    // Prompt for one if a username isn't found
    username = window.prompt("What is your name?");
    localStorage.setItem("username", username);
  }
  load_reload();
});


const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  console.log('You click!!!!!');
  load_reload();
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

//     const postEl = document.createElement("div");
//     postEl.innerText = post.text;
//     postEl.append(friendEl);

//     // const postEl_ = document.createElement("div");
//     // postEl_.innerText = post.timestamp;
//     // postEl.append(postEl_);

//     containerEl.append(postEl);
//   }
// }, 3000);
