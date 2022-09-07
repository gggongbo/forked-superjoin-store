import { singletons } from '@styles/theme/colors';

const {
  babyYellow,
  conversationBlue,
  culturePurPle,
  etcBlack,
  foodRed,
  gameOrange,
  shoppingPurple,
  sportsGreen,
  studyGreen,
  travelBlue,
  lifeBlue,
  religionGreen,
  animalPurple,
} = singletons;

const TALK = {
  name: '대화',
  color: conversationBlue,
  icon: 'Talk',
  value: 'talk',
};
const LIFE = {
  name: '생활',
  color: lifeBlue,
  icon: 'Life',
  value: 'life',
};
const TRAVEL = {
  name: '여행',
  color: travelBlue,
  icon: 'Travel',
  value: 'travel',
};
const SPORTS = {
  name: '운동',
  color: sportsGreen,
  icon: 'Sports',
  value: 'sports',
};
const STUDY = {
  name: '공부',
  color: studyGreen,
  icon: 'Study',
  value: 'study',
};
const BABY = {
  name: '육아',
  color: babyYellow,
  icon: 'Baby',
  value: 'baby',
};
const RELIGION = {
  name: '종교',
  color: religionGreen,
  icon: 'Religion',
  value: 'religion',
};
const GAME = {
  name: '오락',
  color: gameOrange,
  icon: 'Game',
  value: 'game',
};
const FOOD = {
  name: '음식',
  color: foodRed,
  icon: 'Food',
  value: 'food',
};
const ANIMAL = {
  name: '동물',
  color: animalPurple,
  icon: 'Animal',
  value: 'animal',
};
const CULTURE = {
  name: '문화',
  color: culturePurPle,
  icon: 'Culture',
  value: 'culture',
};
const SHOPPING = {
  name: '쇼핑',
  color: shoppingPurple,
  icon: 'Shopping',
  value: 'shopping',
};
const ETC = {
  name: '기타',
  color: etcBlack,
  icon: '',
  value: 'etc',
};

export {
  TALK,
  CULTURE,
  SHOPPING,
  STUDY,
  GAME,
  BABY,
  SPORTS,
  TRAVEL,
  FOOD,
  LIFE,
  ANIMAL,
  RELIGION,
  ETC,
};
