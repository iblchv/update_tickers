const { eachDayOfInterval, parseISO } = require('date-fns');
const fetchAllTickers = require('./fetchAllTickers');
const { sleep } = require('../util/utils');
const { DELAYS } = require('../config/config');

async function fetchTickersForPeriod(startDate, endDate) {
  try {
    console.log(`Начинаем получение данных за период с ${startDate} по ${endDate}`);
    
    // Преобразуем строки дат в объекты Date
    const start = parseISO(startDate);
    const end = endDate ? parseISO(endDate) : new Date();

    // Получаем массив всех дат в заданном интервале
    const dates = eachDayOfInterval({ start, end });

    // Проходим по каждой дате и получаем данные
    for (const date of dates) {
      const isoDate = date.toISOString().split('T')[0];
      console.log(`Получаем данные за ${isoDate}`);

      try {
        await fetchAllTickers(isoDate);
        
        // Добавляем задержку между днями
        await sleep(DELAYS.MIN_FETCH_DELAY + Math.random() * (DELAYS.MAX_FETCH_DELAY - DELAYS.MIN_FETCH_DELAY));
      } catch (error) {
        console.error(`Ошибка при получении данных за ${isoDate}:`, error.message);
        // Продолжаем выполнение даже при ошибке для одного дня
        continue;
      }
    }

    console.log('Получение данных за период успешно завершено');
  } catch (error) {
    console.error('Критическая ошибка при получении данных за период:', error);
    throw error;
  }
}

module.exports = fetchTickersForPeriod;
