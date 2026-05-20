const ESC_KEY = 'Escape';

const DEFAULT_IMAGE_SCALE = 100;
const MAX_IMAGE_SCALE = 100;
const MIN_IMAGE_SCALE = 25;
const IMAGE_SCALE_STEP = 25;

const HASHTAG_REGEX = /^#{1}[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_NUMBER = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const DEFAULT_EFFECT = 'none';

const EFFECTS = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: 'grayscale',
    unit: '',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    filter: 'sepia',
    unit: '',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    filter: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    filter: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    filter: 'brightness',
    unit: '',
  },
  none: {
    min: 1,
    max: 100,
    step: 1,
    start: 100,
    filter: 'none',
    unit: '',
  }
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = lower + Math.random() * (upper - lower + 1);
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscEvent = (evt) => evt.key === ESC_KEY;

export { DEFAULT_IMAGE_SCALE, MAX_IMAGE_SCALE, MIN_IMAGE_SCALE, IMAGE_SCALE_STEP, HASHTAG_REGEX, MAX_HASHTAGS_NUMBER, MAX_DESCRIPTION_LENGTH, DEFAULT_EFFECT, EFFECTS, getRandomInteger, getRandomArrayElement, isEscEvent };
