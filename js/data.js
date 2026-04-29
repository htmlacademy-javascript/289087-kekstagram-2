import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTOS_NUMBER = 25;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const MIN_AVATARS_NUMBER = 0;
const MAX_AVATARS_NUMBER = 6;
const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENTS_NUMBER = 30;

const COMMENTS_CONTENT = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const RANDOM_NAMES = ['Чубака', 'Рей', 'Кекс', 'Кайло', 'Люк', 'Йода'];

const RANDOM_DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
  'Duis aute irure dolor in reprehenderit in voluptate velit',
  'Excepteur sint occaecat cupidatat non proident',
  'Aenean commodo ligula eget dolor',
  'Cum sociis natoque penatibus et magnis dis parturient montes',
  'Nullam dictum felis eu pede mollis pretium',
  'Integer tincidunt. Cras dapibus'];

const commentsIds = [];

const createUniqueCommentId = () => {

  let newId = getRandomInteger(0, MAX_COMMENTS_NUMBER * PHOTOS_NUMBER);
  while (commentsIds.includes(newId)) {
    newId = getRandomInteger(0, MAX_COMMENTS_NUMBER * PHOTOS_NUMBER);
  }
  commentsIds.push(newId);
  return newId;
};

const createComment = () => ({
  id: createUniqueCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATARS_NUMBER, MAX_AVATARS_NUMBER)}.svg`,
  name: getRandomArrayElement(RANDOM_NAMES),
  message: getRandomArrayElement(COMMENTS_CONTENT),
});

const createComments = () => {
  const randomCommentsNumber = getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER);

  return Array.from({length: randomCommentsNumber}, createComment);
};


const createPhoto = (index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(RANDOM_DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
  comments: createComments(),
});

const generatePhotos = () => Array.from({length: PHOTOS_NUMBER}, (_, index) => createPhoto(index));

export { generatePhotos };
