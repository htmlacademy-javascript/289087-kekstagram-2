const checkStringLength = (string = '', maxLength = 1) => string.length <= maxLength;

checkStringLength('проверяемая строка', 20);
checkStringLength('проверяемая строка', 18);
checkStringLength('проверяемая строка', 10);

const isPalindrome = (string = '') => {
  if (!string) {
    return false;
  }

  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = [...normalizedString].reverse().join('');
  return normalizedString === reversedString;
};

isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');

const getDigits = (string = '') => {
  string = string.toString();
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string[i], 10))) {
      result += string[i];
    }
  }

  return result.length ? parseInt(result, 10) : NaN;
};

getDigits('1nxhbg2');
getDigits(-1.5);
getDigits(0);
getDigits('1 кефир, 0.5 батона');
