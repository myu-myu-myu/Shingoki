let count = -1;
const idCount = () => {
  count++;
  return count;
};

function newPost(post, containerEl, val_add, val_pic) {
  const postEl = document.createElement("article");
  postEl.className = "one_post";
  // friend情報をランダム生成
  const post_El = document.createElement("div");
  post_El.className = "friend_info";
  const iconEl = document.createElement("img");
  iconEl.className = "friend_icon";
  iconEl.src = `images/${post.friend_icon}`;
  iconEl.alt = post.friend_icon;
  post_El.append(iconEl);
  const friendEl = document.createElement("div");
  friendEl.className = "friend_name";
  friendEl.innerText = post.friend;
  post_El.append(friendEl);
  postEl.append(post_El);

  const timeEl = document.createElement("div");
  timeEl.className = `post_time post_time_${post.id}`;
  const time_diff = moment().diff(post.timestamp);
  const time = Math.floor(time_diff / 1000);
  if (time < 60) {
    // timeEl.innerText = `posted a while ago`;
    timeEl.innerText = `posted ${Math.floor(time)} seconds ago`;
  } else if (time < 60 * 60) {
    timeEl.innerText = `posted ${Math.floor(time / 60)} minites ago`;
  } else {
    timeEl.innerText = `posted ${Math.floor(time / 60 / 60)} hours ago`;
  }
  postEl.append(timeEl);

  const textEl = document.createElement("div");
  textEl.className = "text";
  textEl.innerText = post.text;
  postEl.append(textEl);

  const tagEl = document.createElement("div");
  tagEl.className = "tag";
  tagEl.innerText = post.tag;
  postEl.append(tagEl);

  const feelingEl = document.createElement("div");
  feelingEl.className = "feeling";
  feelingEl.innerText = post.feeling;
  postEl.append(feelingEl);

  const imageEl = document.createElement("img");
  imageEl.className = "picture";
  console.log("post.image.length :", post.image.length);
  if (val_pic || post.image.length > 100) {
    imageEl.src = post.image;
  } else {
    imageEl.src = `images/${post.image}`;
  }
  console.log("imageEl.src:", imageEl.src)
  imageEl.alt = "good picture!";
  postEl.append(imageEl);

  val_add
    ? containerEl.prepend(postEl)
    : containerEl.append(postEl);
};

//newsfeedの前回Heightを保管する変数
let height_before;
//newsfeedをカウントするための変数(初期値６)
let newsfeed_counter = 3;
function reloadPost() {// 新規投稿の時に投稿objをすべて更新
  const containerEl = document.querySelector("#newsfeed");
  containerEl.innerText = "";
  for (let i = bacefook.newsfeed.length - 1; i >= 0; i--) {
    const post = bacefook.newsfeed[i];
    newPost(post, containerEl);
  }
  // 自動でスクロール移動しないように投稿の高さを計算
  const height_after = document.getElementById('newsfeed').scrollHeight;
  const height_diff = height_after - height_before;
  height_before ? window.scrollBy(0, height_diff) : null;
  height_before = height_after;
  //new postを表示させる
  if (newsfeed_counter + 2 <= bacefook.newsfeed.length) {
    newsfeed_counter = bacefook.newsfeed.length;
    new_post.classList.add('active');
  }
};

function pushPost(post, pic) {// 自分の投稿を投稿objに追加
  const containerEl = document.querySelector("#newsfeed");
  newPost(post, containerEl, 1, pic);
  bacefook.newsfeed.push(post);
};


(() => {
  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};
  bacefook.friendNames = [
    "くの", "さとう", "うだつ", "いむ", "はしだて", "じん", "ふくおか", "たかはし", "うえはら", "ばば",
    "よこた", "ひらいし", "おがた", "おの", "うえだ", "まつい", "たなか", "こんどう", "あだち", "おおぶち",
    "かきぞの", "やまだ", "いのうえ", "わきた", "いながき", "かたぎり", "おの", "いはら", "なかくぼ"];
  bacefook.friendNames.forEach(name => {
    bacefook.friends[name] = [];
  });

  const starters = [
    "Totally just",
    "Just",
    "Completely",
    "Waaaaah! i",
    "I just",
    "A salaryman",
    "A salaryman",
    "Yesterday I",
    "A ninja",
    "My boss"
  ];
  const verbs = [
    "ate",
    "drank",
    "threw up in",
    "refactored",
    "iterated on",
    "thought about",
    "threw up on",
    "saw",
    "walked to",
    "got lost in",
    "walked into",
    "googled",
    "drove",
    "ran to",
    "worked on",
    "slept on",
    "slept in"
  ];
  const fillers = [
    "my",
    "your",
    "his",
    "her",
    "my favorite",
    "a beautiful",
    "a delicious",
    "that",
    "this",
    "an interesting",
    "",
    "the best",
    "the greatest",
    "a delightful"
  ];
  const nouns = [
    "DIG",
    "restaurant",
    "omakase",
    "hitomedia",
    "family mart",
    "private jet",
    "mama",
    "lawsons",
    "conbini",
    "whisky",
    "onigiri",
    "car",
    "food",
    "house",
    "toilet",
    "tokyo",
    "city",
    "iphone",
    "google",
    "unicorn",
    "mess",
    "pirate ship",
    "ninja"
  ];
  const hashtags = [
    "#DIG",
    "#techlife",
    "#toyota",
    "#tokyo",
    "#japan",
    "#interesting",
    "#til",
    "#lol",
    "#tgifriday",
    "#hashtags",
    "#japanlife",
    "#oops",
  ];
  const feelings = [
    "happy 😀",
    "smug 😤",
    "lovestruck 😍",
    "gross 🐦‍⬛",
    "scared 😨",
    "tired 😮‍💨",
    "angry 💢",
    "frustrated 😣",
    "excited 🤩",
  ];
  const images = [
    "pic1.png", "pic2.png", "pic3.png", "pic4.png", "pic5.png",
    "pic6.png", "pic7.png", "pic8.png", "pic9.png", "pic10.png",
    "pic11.png", "pic12.png", "pic13.png", "pic14.png", "pic15.png",
    "pic16.png", "pic17.png", "pic18.png", "pic19.png", "pic20.png",
  ];
  const friends_icon = [
    "icon1.png", "icon2.png", "icon3.png", "icon4.png", "icon5.png",
  ];

  // select要素にoption要素を追加 feeling版
  const select_tag = document.getElementById('articleFeeling');
  for (const i of feelings) {
    const optionEl = document.createElement('option');
    optionEl.innerText = i;
    select_tag.appendChild(optionEl);
  };

  // select要素にoption要素を追加 hashtag版
  const select = document.getElementById('articleTag');
  for (const i of hashtags) {
    const optionEl = document.createElement('option');
    optionEl.innerText = i;
    select.appendChild(optionEl);
  };

  const getRandomElement = array => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const generateRandomText = () => {
    return [
      getRandomElement(starters),
      getRandomElement(verbs),
      getRandomElement(fillers),
      getRandomElement(nouns)
    ].join(" ");
  };

  const generatePostObj = timeOffset => {
    // timeOffset: 投稿を自動生成する時間間隔
    const timestamp =
      timeOffset
        ? new Date(new Date().getTime() - timeOffset)
        : new Date();
    // new Date():現在の日時を表す日付objを生成
    // obj.getTime():1970-01-01 00:00:00(UTC)からのミリ秒で取得
    console.log("投稿文生成：", timestamp);
    return {
      id: idCount(),
      friend: getRandomElement(bacefook.friendNames),
      friend_icon: getRandomElement(friends_icon),
      text: generateRandomText(),
      tag: getRandomElement(hashtags),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp: timestamp
    };
  };

  const addPost = obj => {
    const friend = obj.friend;
    bacefook.friends[friend].push(obj);
    bacefook.newsfeed.push(obj);
    reloadPost();
  };

  const createPost = timeOffset => {
    const newPost = generatePostObj(timeOffset);
    addPost(newPost);
  };

  const startCommentNum = 3;
  for (let i = 0; i < startCommentNum; i++) {// 自動投稿する間隔
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000;
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000);
    setInterval(() => timeReload(bacefook.newsfeed), 1000);
  };

  scheduler();

  function timeReload(obj) {
    for (let i = 0; i < obj.length; i++) {
      const timeEl = document.querySelector(`.post_time_${i}`);
      const time = Math.floor(moment(obj[i].timestamp).diff(new Date()) / 1000 * -1);
      if (time < 60) {
        // timeEl.innerText = `posted a while ago`;
        timeEl.innerText = `posted ${Math.floor(time)} seconds ago`;
      } else if (time < 60 * 60) {
        timeEl.innerText = `posted ${Math.floor(time / 60)} minites ago`;
      } else {
        timeEl.innerText = `posted ${Math.floor(time / 60 / 60)} hours ago`;
      }
    }
  }

})();
