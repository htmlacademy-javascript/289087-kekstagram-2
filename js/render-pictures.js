import { generatePhotos } from './data.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photos = generatePhotos();

const createPicture = ({url, description, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  return newPicture;
};

const picturesFragment = document.createDocumentFragment();

photos.map((photo) => picturesFragment.append(createPicture(photo)));

picturesContainerElement.append(picturesFragment);
