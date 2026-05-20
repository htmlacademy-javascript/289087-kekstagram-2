import { isEscEvent } from './util.js';
import { photos } from './data.js';

const findPictureById = (id) => photos.find((item) => +item.id === +id);
const INITIAL_COMMENTS_NUMBER = 5;

const previewElement = document.querySelector('.big-picture');
const previewCloseButtonElement = previewElement.querySelector('.big-picture__cancel');
const previewImageElement = previewElement.querySelector('.big-picture__img img');
const previewCaptionElement = previewElement.querySelector('.social__caption');
const previewLikesElement = previewElement.querySelector('.likes-count');

const previewCommentsContainer = previewElement.querySelector('.social__comments');
const previewShownCommentsElement = previewElement.querySelector('.social__comment-shown-count');
const previewTotalCommentsElement = previewElement.querySelector('.social__comment-total-count');
const previewCommentsCounterElement = previewElement.querySelector('.social__comment-count');
const previewCommentsLoaderElement = previewElement.querySelector('.comments-loader');
const commentTemplate = document.querySelector('#social-comment').content.querySelector('.social__comment');

let previewComments = [];
let shownCommentsNumber = 0;

const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;

  return(newComment);
};

const renderCommentsSlice = (a, b) => {
  const fragment = document.createDocumentFragment();

  previewComments
    .slice(a, b)
    .forEach((item) => {
      fragment.append(createComment(item));
      shownCommentsNumber++;
    });

  previewCommentsContainer.append(fragment);

  if (shownCommentsNumber < previewComments.length) {
    previewShownCommentsElement.textContent = shownCommentsNumber;
    previewTotalCommentsElement.textContent = previewComments.length;
    previewCommentsLoaderElement.addEventListener('click', commentsLoaderHandler);
  }

  if (shownCommentsNumber >= previewComments.length) {
    previewCommentsCounterElement.classList.add('hidden');
    previewCommentsLoaderElement.classList.add('hidden');
    previewCommentsLoaderElement.removeEventListener('click', commentsLoaderHandler);
  }
};

const renderComments = (comments) => {
  previewCommentsContainer.querySelectorAll('.social__comment').forEach((commentElement) => {
    commentElement.remove();
  });
  previewComments = [];
  shownCommentsNumber = 0;

  if (comments.length === 0) {
    previewCommentsContainer.innerHTML = '<li class="social__comment">Комментариев нет</li>';
    previewCommentsCounterElement.classList.add('hidden');
    previewCommentsLoaderElement.classList.add('hidden');
    return;
  }

  previewComments = comments;
  renderCommentsSlice(0, Math.min(comments.length, INITIAL_COMMENTS_NUMBER));
};

function commentsLoaderHandler () {
  renderCommentsSlice(shownCommentsNumber, Math.min(previewComments.length, shownCommentsNumber + INITIAL_COMMENTS_NUMBER));
}

const closePreview = () => {
  previewElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  previewCommentsCounterElement.classList.remove('hidden');
  previewCommentsLoaderElement.classList.remove('hidden');

  previewCloseButtonElement.removeEventListener('click', previewCloseHandler);
  document.removeEventListener('keydown', previewEscHandler);
  previewCommentsLoaderElement.removeEventListener('click', commentsLoaderHandler);
};

function previewCloseHandler () {
  closePreview();
}

function previewEscHandler (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

const openPreview = ({url, description, likes, comments}) => {
  previewElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  previewImageElement.src = url;
  previewImageElement.alt = description;
  previewCaptionElement.textContent = description;
  previewLikesElement.textContent = likes;

  renderComments(comments);

  previewCloseButtonElement.addEventListener('click', previewCloseHandler);
  document.addEventListener('keydown', previewEscHandler);
};


// можно перенести в галерею
const pictureClickHandler = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const targetPicture = findPictureById(evt.target.closest('.picture').dataset.id);
    openPreview(targetPicture);
  }
};

export { pictureClickHandler };
