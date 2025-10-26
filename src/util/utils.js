const { format } = require('date-fns');

function getToday() {
  const dateObject = new Date();
  return {
    dateObject,
    isoPoint: format(dateObject, 'yyyy.MM.dd'),
    isoReverse: format(dateObject, 'dd-MM-yyyy'),
  };
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Форматирование чисел для вывода
function formatNumber(number, precision = 2) {
  return Number(number).toFixed(precision);
}

// Генерация случайной задержки
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  getToday,
  sleep,
  formatNumber,
  getRandomDelay
};
