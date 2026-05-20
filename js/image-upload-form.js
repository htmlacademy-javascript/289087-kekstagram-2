import { DEFAULT_IMAGE_SCALE, HASHTAG_REGEX, isEscEvent, MAX_HASHTAGS_NUMBER, MAX_DESCRIPTION_LENGTH, EFFECTS, DEFAULT_EFFECT, MIN_IMAGE_SCALE, IMAGE_SCALE_STEP, MAX_IMAGE_SCALE } from './util.js';

const imageFormElement = document.querySelector('.img-upload__form');
const imageInputElement = imageFormElement.querySelector('.img-upload__input');
const imagePreviewElement = imageFormElement.querySelector('.img-upload__preview img');
const scaleControlValue = imageFormElement.querySelector('.scale__control--value');
const hashtagInputElement = imageFormElement.querySelector('[name=hashtags]');
const descriptionInputElement = imageFormElement.querySelector('[name=description]');
const uploadCancelButtonElement = imageFormElement.querySelector('#upload-cancel');
const imageOverlayElement = imageFormElement.querySelector('.img-upload__overlay');
const effectSliderElement = imageFormElement.querySelector('.effect-level__slider');
const effectLevelInputElement = imageFormElement.querySelector('.effect-level__value');
const effectsContainer = imageFormElement.querySelector('.effects');
const effectLevelContainer = imageFormElement.querySelector('.img-upload__effect-level');
const scaleSmallerButtonElement = imageFormElement.querySelector('.scale__control--smaller');
const scaleBiggerButtonElement = imageFormElement.querySelector('.scale__control--bigger');

// IMAGE SCALE

let scaleCurrentValue = DEFAULT_IMAGE_SCALE;
const scaleSmallerHandler = () => {
  if (scaleCurrentValue !== MIN_IMAGE_SCALE) {
    scaleCurrentValue -= IMAGE_SCALE_STEP;
    imagePreviewElement.style.transform = `scale(${ scaleCurrentValue / 100 })`;
    scaleControlValue.setAttribute('value', `${ scaleCurrentValue }%`);
  }
};

const scaleBiggerHandler = () => {
  if (scaleCurrentValue !== MAX_IMAGE_SCALE) {
    scaleCurrentValue += IMAGE_SCALE_STEP;
    imagePreviewElement.style.transform = `scale(${ scaleCurrentValue / 100 })`;
    scaleControlValue.setAttribute('value', `${ scaleCurrentValue }%`);
  }
};

// IMAGE EFFECTS

noUiSlider.create(effectSliderElement, {
  connect: 'lower',
  range: {
    min: 1,
    max: 100,
  },
  step: 1,
  start: 100,
  format: {
    to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

const updateSlider = ({min, max, step, start}) => {
  effectSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
  }, true);
  effectSliderElement.noUiSlider.set(start);
};

const updateEffectType = (effect) => {
  updateSlider(EFFECTS[effect]);

  if (effect === 'none') {
    imagePreviewElement.style.removeProperty('filter');
    effectLevelContainer.classList.add('hidden');
    effectLevelInputElement.setAttribute('value', '');
    return;
  }

  effectLevelContainer.classList.remove('hidden');
};

const effectLevelChangeHandler = () => {
  const newValue = effectSliderElement.noUiSlider.get();
  effectLevelInputElement.setAttribute('value', newValue);

  const current = imageFormElement.querySelector('[name=effect]:checked').value;
  const {filter, unit} = EFFECTS[current];
  imagePreviewElement.style.filter = `${filter}(${newValue}${unit})`;
};

const effectTypeChangeHandler = (evt) => {
  if (evt.target.matches('[name=effect]')) {
    updateEffectType(evt.target.value);
  }
};

// HASHTAGS & DESCRIPTION

const pristine = new Pristine(imageFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const modify = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

pristine.addValidator(hashtagInputElement, (value) => modify(value).every((item) => item.startsWith('#')), 'Хэштег должен начинаться с #.');
pristine.addValidator(hashtagInputElement, (value) => modify(value).every((item) => item !== '#'), 'Хэштег не может состоять только из #.');
pristine.addValidator(hashtagInputElement, (value) => modify(value).every((item) => HASHTAG_REGEX.test(item)), 'Допустимы только #, буквы и цифры, всего от 2 до 20 символов.');
pristine.addValidator(hashtagInputElement, (value) => modify(value).every((item, index, self) => self.indexOf(item) === index), 'Один и тот же хэштег не может быть использован дважды.');
pristine.addValidator(hashtagInputElement, (value) => modify(value).length <= MAX_HASHTAGS_NUMBER, 'Нельзя указать больше пяти хэштегов.');

pristine.addValidator(descriptionInputElement, (value) => value.length <= MAX_DESCRIPTION_LENGTH, `Длина комментария не может быть больше ${MAX_DESCRIPTION_LENGTH} символов.`);

// OPEN & CLOSE FORM

const openImageEditor = () => {
  imageOverlayElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  uploadCancelButtonElement.addEventListener('click', uploadCancelHandler);
  document.addEventListener('keydown', imageEditorEscHandler);

  scaleSmallerButtonElement.addEventListener('click', scaleSmallerHandler);
  scaleBiggerButtonElement.addEventListener('click', scaleBiggerHandler);

  effectSliderElement.noUiSlider.on('update', effectLevelChangeHandler,);
  effectsContainer.addEventListener('change', effectTypeChangeHandler);
};

const closeImageEditor = () => {
  imageOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadCancelButtonElement.removeEventListener('click', uploadCancelHandler);
  document.removeEventListener('keydown', imageEditorEscHandler);

  scaleSmallerButtonElement.removeEventListener('click', scaleSmallerHandler);
  scaleBiggerButtonElement.removeEventListener('click', scaleBiggerHandler);
  effectsContainer.removeEventListener('change', effectTypeChangeHandler);

  scaleControlValue.setAttribute('value', `${ DEFAULT_IMAGE_SCALE }%`);
  imagePreviewElement.style.transform = `scale(${ DEFAULT_IMAGE_SCALE / 100 })`;
  scaleCurrentValue = DEFAULT_IMAGE_SCALE;
  updateEffectType(DEFAULT_EFFECT);
  pristine.reset();
  imageFormElement.reset();
};

function uploadCancelHandler () {
  closeImageEditor();
}

function uploadOpenHandler () {
  openImageEditor();
}

function imageEditorEscHandler (evt) {
  if (isEscEvent(evt)
    && document.activeElement !== hashtagInputElement
    && document.activeElement !== descriptionInputElement) {
    evt.preventDefault();
    closeImageEditor();
  }
}

const imageFormSubmitHandler = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

imageInputElement.addEventListener('change', uploadOpenHandler);
imageFormElement.addEventListener('submit', imageFormSubmitHandler);
