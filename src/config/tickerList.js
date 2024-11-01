const tickerList = [
  {
    'code': 'SBER',
    'title': 'Сбербанк России, акция обыкновенная',
    'uri': 'https://investfunds.ru/stocks/Sberbank/1/?action=chartData&stocks%5B%5D=20%2F1&dateFrom=25.07.2024&dateTo=25.10.2024&index=false&needVolume=true&newAlgorithm=true',
    'get_uri': (dFrom, dTo) => `https://investfunds.ru/stocks/Sberbank/1/?action=chartData&stocks%5B%5D=20%2F1&dateFrom=${dFrom}&dateTo=${dTo}&index=false&needVolume=true&newAlgorithm=true`,
    'multiply': 1,
  },
  {
    'code': 'TMOS',
    'title': 'Тинькофф Индекс МосБиржи',
    'uri': 'https://investfunds.ru/funds/6333/?action=chartData&data_key=pay&date_from=25.10.2024&date_to=25.10.2024&ids[]=6333&index=true',
    'get_uri': (dFrom, dTo) => `https://investfunds.ru/funds/6333/?action=chartData&data_key=pay&date_from=${dFrom}&date_to=${dTo}&ids[]=6333&index=true`,
    'multiply': 1,
  },
  {
    'code': 'EQMX',
    'title': 'Индекс МосБиржи',
    'uri': 'https://investfunds.ru/funds/6073/?action=chartData&data_key=pay&date_from=03.10.2024&date_to=03.10.2024&currencyId=1&ids[]=6073',
    'get_uri': (dFrom, dTo) => `https://investfunds.ru/funds/6073/?action=chartData&data_key=pay&date_from=${dFrom}&date_to=${dTo}&currencyId=1&ids[]=6073`,
    'multiply': 1,
  },
  {
    'code': 'SBMX',
    'title': 'Первая - Фонд Топ Российских акций',
    'uri': 'https://investfunds.ru/funds/5247/?action=chartData&data_key=pay&date_from=03.10.2024&date_to=03.10.2024&currencyId=1&ids[]=5247',
    'get_uri': (dFrom, dTo) => `https://investfunds.ru/funds/5247/?action=chartData&data_key=pay&date_from=${dFrom}&date_to=${dTo}&currencyId=1&ids[]=5247`,
    'multiply': 1,
  },
  {
    'code': 'ОФЗ 26234',
    'title': 'ОФЗ 26234',
    'uri': 'https://investfunds.ru/bonds/734895/?action=chartData&tg_id=135&date_from=03.10.2024&data_keys=bid,ask,last,volume&date_to=03.10.2024',
    'get_uri': (dFrom, dTo) => `https://investfunds.ru/bonds/734895/?action=chartData&tg_id=135&date_from=${dFrom}&data_keys=bid,ask,last,volume&date_to=${dTo}`,
    'multiply': 10,
  }
];

module.exports = tickerList;
