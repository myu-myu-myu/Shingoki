/*
  This generates our fake newsfeed information.

  There is no need to touch the code in here until you get to basic requirement #4,
  but please check it out to familiarize yourself beforehand.
*/
(() => {
  window.bacefook = {};
  bacefook.newsfeed = [];
  bacefook.friends = {};
  bacefook.friendNames = ["トラちゃん", "しゅんしゅん", "エリコ", "みゅうすけ", "まさたか"];
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
    "happy😀",
    "smug😤",
    "lovestruck😍",
    "gross🐦‍⬛",
    "scared😨",
    "tired😮‍💨",
    "angry💢",
    "frustrated😣",
    "excited🤩",
    ""
  ];
  const images = [
    "pic1.png",
    "pic2.png",
    "pic3.png",
    "pic4.png",
    "pic5.png",
  ];

  const getRandomElement = array => {
    // Given an array, returns a random element
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

  const generatePostObj = timeOffset => {
    // if an offset is provided, make the timestamp that much older, 
    // otherwise just use the current time
    const timestamp =
      timeOffset
        ? new Date(new Date().getTime() - timeOffset)
        : new Date();
    // console.log("投稿文生成：", timestamp);
    return {
      friend: getRandomElement(bacefook.friendNames),
      text: generateRandomText(),
      feeling: getRandomElement(feelings),
      image: getRandomElement(images),
      timestamp
    };
  };

  const addPost = obj => {
    const friend = obj.friend;
    bacefook.friends[friend].push(obj);
    bacefook.newsfeed.push(obj);

    newPostAuto(obj);
  };

  const createPost = timeOffset => {
    const newPost = generatePostObj(timeOffset);
    addPost(newPost);
  };

  for (let i = 0; i < 3; i++) {
    // make the starting posts look like they were posted over the course of the past day
    const timeOffset = (2 * (10 - i) + Math.random()) * 60 * 60 * 1000;
    createPost(timeOffset);
  }

  const scheduler = () => {
    createPost(null);
    setTimeout(scheduler, (3 + Math.random() * 5) * 1000);
    // generate a new post every 3 to 8 seconds

  };

  scheduler();

  function newPostAuto(obj){
    // console.log("newPostAutoが発動",obj);

    const containerEl = document.querySelector("#newsfeed");

    const postEl = document.createElement("div");
    postEl.className = "one_post";

    //friend
    const friendEl = document.createElement("div");
    friendEl.className = "friend_name";
    friendEl.innerText = obj.friend;
    postEl.append(friendEl);

    //time
    const timeEl = document.createElement("div");
    timeEl.className = "post_time";

    timeEl.innerText = obj.timestamp;
    postEl.append(timeEl);

    //text
    const textEl = document.createElement("div");
    textEl.className = "text";
    textEl.innerText = obj.text;
    postEl.append(textEl);

    //feeling
    const feelingEl = document.createElement("div");
    feelingEl.className = "feeling";
    feelingEl.innerText = obj.feeling;
    postEl.append(feelingEl);

    //img
    const imageEl = document.createElement("img");
    imageEl.className = "picture";
    imageEl.src = `images/${obj.image}`;
    imageEl.alt = obj.image;
    postEl.append(imageEl);

    console.log("postEl",postEl)
    containerEl.prepend(postEl);
  }


})();
