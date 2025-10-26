const axios = require('axios');
const cheerio = require('cheerio');
const { format } = require('date-fns');

async function fetchGoldPrice() {
  try {
    const url = 'https://zoloto-md.ru/bullion-coins/i-inostrannyye/zolotaya-moneta-avstrii-filarmoniker-2002-2016-g.v.,-31.1-g-chistogo-zolota-proba-9999';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const priceElement = $('div.js-price-buyout');
    console.log({ priceElement });

    if ( !priceElement.length ) {
      throw new Error('Элемент с ценой не найден на странице');
    }

    const priceText = priceElement.text().trim();
    console.log({ priceText });

    const price = Number(priceText.replace(/[^0-9]/g, ''));

    if ( isNaN(price) || price === 0 ) {
      throw new Error('Не удалось извлечь корректную цену');
    }

    return {
      code: 'AUFI',
      title: 'Золотая инвестиционная монета',
      date: format(new Date(), 'dd-MM-yyyy'),
      price: price
    };
  } catch ( error ) {
    console.error('Ошибка при получении цены на золото:', error);
    throw error;
  }
}

module.exports = { fetchGoldPrice };
