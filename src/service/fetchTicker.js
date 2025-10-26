const Browser = require('../browser/browser');
const { format } = require('date-fns');
const { sleep, getRandomDelay } = require('../util/utils');
const { DELAYS } = require('../config/config');
const tickerList = require('../config/tickerList');

async function fetchTicker(code, date) {
  console.log({ code, date });

  const ticker = tickerList.find(t => t.code === code);
  if ( !ticker ) {
    throw new Error('Тикер не найден: ' + code);
  }

  const parsedDate = new Date(date);

  const dateFrom = new Date(+new Date(date) - 30 * 24 * 60 * 60 * 1000);
  const dateTo = new Date(date);

  if ( isNaN(parsedDate.getTime()) ) {
    throw new Error('Неверный формат даты. Используйте YYYY-MM-DD');
  }

  const formattedDate = format(parsedDate, 'dd.MM.yyyy');

  const formattedDateFrom = format(dateFrom, 'dd.MM.yyyy');
  const formattedDateTo = format(dateTo, 'dd.MM.yyyy');

  const url = ticker.get_uri(formattedDateFrom, formattedDateTo);

  console.log({ url });

  const browser = new Browser();

  try {
    await browser.init();
    await sleep(getRandomDelay(DELAYS.MIN_FETCH_DELAY, DELAYS.MAX_FETCH_DELAY));

    const content = await browser.getPageContent(url);

    // Извлекаем данные из JSON в скрипте на странице
    const match = content.match(/<pre>(.*?)<\/pre>/);
    if ( !match || !match[ 1 ] ) {
      throw new Error('Данные не найдены на странице');
    }

    const chartData = JSON.parse(match[ 1 ])[ 0 ].data;
    console.log({ chartData });

    if ( !chartData?.length ) {
      throw new Error('Данные не найдены для указанной даты');
    }

    const price = chartData.slice(-1)[ 0 ][ 1 ];
    const formattedPrice = price * ticker.multiply;

    return {
      code,
      title: ticker.title,
      date,
      formattedDate,
      price: formattedPrice,
    };
  } catch ( error ) {
    console.error('Ошибка при получении данных тикера:', error);
    throw new Error(`Не удалось получить данные: ${error.message}`);
  } finally {
    await browser.close();
  }
}

module.exports = fetchTicker;
