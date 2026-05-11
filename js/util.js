const ESC_KEY = 'Escape';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = lower + Math.random() * (upper - lower + 1);
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscEvent = (evt) => evt.key === ESC_KEY;

export { getRandomInteger, getRandomArrayElement, isEscEvent };
