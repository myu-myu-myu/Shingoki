function newPost(post, containerEl, val) {
  const postEl = document.createElement("div");
  postEl.className = "one_post";

  const friendEl = document.createElement("div");
  friendEl.className = "friend_name";
  friendEl.innerText = post.friend;
  postEl.append(friendEl);

  const timeEl = document.createElement("div");
  timeEl.className = `post_time post_time_${post.id}`;
  const time_diff = moment().diff(post.timestamp);
  const time_sec = Math.floor(time_diff / 1000);
  // console.log("timestamp:",time_sec);
  
  if (time_sec < 60) {
    timeEl.innerText = `posted a while ago`;
  } else if (time_sec < 60 * 60) {
    timeEl.innerText = `posted ${Math.floor(time_sec / 60)} minites ago`;
  } else {
    timeEl.innerText = `posted ${Math.floor(time_sec / 60 / 60)} hours ago`;
  }
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

  val
    ? containerEl.prepend(postEl)
    : containerEl.append(postEl);
};

let height_before;

function reloadPost() {
  const containerEl = document.querySelector("#newsfeed");
  containerEl.innerText = "";
  for (let i = bacefook.newsfeed.length - 1; i >= 0; i--) {
    const post = bacefook.newsfeed[i];
    newPost(post, containerEl);
  }
  const height_after = document.getElementById('newsfeed').scrollHeight;
  const height_difference = height_after - height_before
  window.scrollBy(0, height_difference);
  height_before = height_after;
};


function pushPost(post) {
  const containerEl = document.querySelector("#newsfeed");
  newPost(post, containerEl, 1);
  bacefook.newsfeed.push(post);
};


(() => {
  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};
  bacefook.friendNames = ["ディグダ", "ヒトカゲ", "ミュウ", "ピカチュウ", "ゼニガメ"];
  bacefook.friendNames.forEach(name => {
    bacefook.friends[name] = [];
  });

  const starters = [
    "totally just",
    "just",
    "completely",
    "waaaaah! i",
    "i just",
    "a salaryman",
    "a salaryman",
    "yesterday I",
    "a ninja",
    "my boss"
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
    ""
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
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "pic4.png",
    "pic5.png",
  ];

  // select要素にoption要素を追加
  const select_tag = document.getElementById('articleFeeling');
  for (const i of feelings) {
    const optionEl = document.createElement('option');
    optionEl.innerText = i;
    // optionEl.setAttribute('label', i);
    // optionEl.setAttribute('value', i);
    select_tag.appendChild(optionEl);
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
      getRandomElement(nouns),
      getRandomElement(hashtags)
    ].join(" ");
  };

  let count = -1;
  const idCount = ()=> {
  // console.log("count:",count);
  count++ 
  return count;
  };

  const generatePostObj = timeOffset => {
    // timeOffset: 投稿を自動生成する間隔（乱数で生成）
    const timestamp =
      timeOffset
        ? new Date(new Date().getTime() - timeOffset)
        : new Date();
    // new Date():日時を省略した場合は現在の日時を表す日付objを生成
    // obj.getTime():objの日時を、1970-01-01 00:00:00(UTC)からのミリ秒で取得
    console.log("投稿文生成：", timestamp);
    return {
      id: idCount(),
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
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

  const startComentNum = 3;
  for (let i = 0; i < startComentNum; i++) {
    // 自動投稿する間隔、乱数で生成
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000;
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000);
    // generate a new post every 3 to 8 seconds
    setInterval(() => timeReload(bacefook.newsfeed),1000);
  };

  scheduler();

  function timeReload(obj){
    for(let i = 0; i < obj.length ; i++){
      console.log("timestamp:",obj[i].timestamp);
      const timeEl = document.querySelector(`.post_time_${i}`);

      const time = Math.floor(moment(obj[i].timestamp).diff(new Date())/1000 * -1);

      if (time < 60) {
        timeEl.innerText = `posted a while ago`;
      } else if (time < 60 * 60) {
        timeEl.innerText = `posted ${Math.floor(time / 60)} minites ago`;
      } else {
        timeEl.innerText = `posted ${Math.floor(time / 60 / 60)} hours ago`;
      }
    }
  }

  // function newPostAuto(obj) {
  //   console.log("post auto! : ", obj)
  //   const containerEl = document.querySelector("#newsfeed");
  //   const postEl = document.createElement("div");
  //   postEl.className = "one_post";

  //   // friend
  //   const friendEl = document.createElement("div");
  //   friendEl.className = "friend_name";
  //   friendEl.innerText = obj.friend;
  //   postEl.append(friendEl);//子要素として持つ

  //   // time
  //   const timeEl = document.createElement("div");
  //   timeEl.className = "post_time";
  //   const time_diff = moment().diff(obj.timestamp);
  //   const time_sec = Math.floor(time_diff / 1000);
  //   if (time_sec < 60) {
  //     timeEl.innerText = ` ${time_sec} 秒前`;
  //   } else if (time_sec < 60 * 60) {
  //     timeEl.innerText = ` ${Math.floor(time_sec / 60)} 分前`;
  //   } else {
  //     timeEl.innerText = ` ${Math.floor(time_sec / 60 / 60)} 時間前`;
  //   }
  //   postEl.append(timeEl);

  //   // text
  //   const textEl = document.createElement("div");
  //   textEl.className = "text";
  //   textEl.innerText = obj.text;
  //   postEl.append(textEl);

  //   // feeling
  //   const feelingEl = document.createElement("div");
  //   feelingEl.className = "feeling";
  //   feelingEl.innerText = obj.feeling;
  //   postEl.append(feelingEl);

  //   // img
  //   const imageEl = document.createElement("img");
  //   imageEl.className = "picture";
  //   imageEl.src = `images/${obj.image}`;
  //   imageEl.alt = obj.image;
  //   postEl.append(imageEl);

  //   containerEl.prepend(postEl);
  // }
})();
