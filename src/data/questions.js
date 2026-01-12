export const questions = [
  {
    id: 1,
    word: "門",
    english: "Door",
    image: null, // Placeholder, can be replaced with actual path later
    options: [
      { id: 'a', pinyin: "ㄇㄣˊ", isCorrect: true },
      { id: 'b', pinyin: "ㄇㄥˊ", isCorrect: false }
    ]
  },
  {
    id: 2,
    word: "鏡子",
    english: "Mirror",
    image: null, 
    options: [
      { id: 'a', pinyin: "ㄐㄧㄥˋ ˙ㄗ", isCorrect: true },
      { id: 'b', pinyin: "ㄐㄧㄣˋ ˙ㄗ", isCorrect: false }
    ]
  },
  {
    id: 3,
    word: "閃電",
    english: "Lightning",
    image: null,
    options: [
      { id: 'a', pinyin: "ㄕㄢˇ ㄉㄧㄢˋ", isCorrect: true }, // en
      { id: 'b', pinyin: "ㄕㄤˇ ㄉㄧㄢˋ", isCorrect: false } // eng error
    ]
  },
  {
    id: 4,
    word: "蜜蜂",
    english: "Bee",
    image: null,
    options: [
      { id: 'a', pinyin: "ㄇㄧˋ ㄈㄣ", isCorrect: false }, // en error
      { id: 'b', pinyin: "ㄇㄧˋ ㄈㄥ", isCorrect: true }  // eng
    ]
  }
];
