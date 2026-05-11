import { photos } from './data.js';
import { pictureClickHandler } from './picture-preview.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPicture = ({id, url, description, likes, comments}) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.dataset.id = id;
  return newPicture;
};

const renderPictures = (pictures) => {
  const picturesFragment = document.createDocumentFragment();
  pictures.forEach((picture) => picturesFragment.append(createPicture(picture)));
  picturesContainerElement.append(picturesFragment);

  picturesContainerElement.addEventListener('click', pictureClickHandler);
};

renderPictures(photos);
