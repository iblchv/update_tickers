const { authorize } = require('../api/auth');
const SheetsAPI = require('../api/sheetsApi');
const fetchTicker = require('./fetchTicker');
const { getToday, sleep } = require('../util/utils');
const tickerList = require('../config/tickerList');
const { fetchGoldPrice } = require('../api/goldPrice');
const { DELAYS } = require('../config/config');

async function fetchAllTickers(date) {
  try {
    console.log('Начинаем получение данных...');

    const auth = await authorize();
    const sheetsApi = new SheetsAPI(auth);
    const targetDate = date ? new Date(date) : getToday().dateObject;
    const formattedDate = {
      isoPoint: targetDate.toISOString().split('T')[ 0 ].replace(/-/g, '.'),
      isoReverse: targetDate.toISOString().split('T')[ 0 ].split('-').reverse().join('-')
    };

    console.log('Авторизация успешна. Получаем данные по тикерам...');
    console.log({ tickerList });

    const promises = tickerList.map(async (ticker) => {
      try {
        console.log(`Получаем данные для ${ticker.code}...`);

        const result = await fetchTicker(ticker.code, formattedDate.isoPoint);
        await sheetsApi.appendRows('scrape2', [ [
          result.code,
          result.title,
          formattedDate.isoReverse,
          result.price
        ] ]);

        console.log(`Успешно получены данные для ${ticker.code}`);

        // Случайная задержка между запросами
        await sleep(DELAYS.MIN_FETCH_DELAY + Math.random() * (DELAYS.MAX_FETCH_DELAY - DELAYS.MIN_FETCH_DELAY));
      } catch ( error ) {
        console.error(`Ошибка при получении данных для ${ticker.code}:`, error.message);
        await sheetsApi.appendRows('scrape2', [ [
          ticker.code,
          ticker.title,
          formattedDate.isoReverse,
          '',
          `Ошибка: ${error.message}`
        ] ]);
      }
    });

    // Ждем завершения всех операций
    await Promise.all(promises);

    console.log('Получаем цену на золото...');
    try {
      const goldData = await fetchGoldPrice();
      await sheetsApi.appendRows('scrape2', [ [
        goldData.code,
        goldData.title,
        goldData.date,
        goldData.price
      ] ]);
      console.log('Цена на золото успешно добавлена');
    } catch ( error ) {
      console.error('Ошибка при получении цены на золото:', error);
    }

    console.log('Форматируем лист...');
    await sheetsApi.formatSheet('scrape2');

    console.log('Все операции успешно завершены');
  } catch ( error ) {
    console.error('Критическая ошибка в fetchAllTickers:', error);
  }
}

module.exports = fetchAllTickers;
