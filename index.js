require('dotenv').config();
const fetchAllTickers = require('./src/service/fetchAllTickers');
const fetchTickersForPeriod = require('./src/service/fetchTickersForPeriod');

// Функция для запуска скрипта с обработкой ошибок
async function main() {
  try {
    console.log('Запуск скрипта...');

    // Пример использования: получение данных за период
    // await fetchTickersForPeriod(
    //   '2024-10-12',  // начальная дата
    //   '2024-10-29'   // конечная дата (необязательно, по умолчанию - сегодня)
    // );

    // Или получение данных за один день (старый вариант)
    await fetchAllTickers('2024-10-28');

    console.log('Скрипт успешно завершен');
  } catch (error) {
    console.error('Ошибка при выполнении скрипта:', error);
    process.exit(1);
  }
}

// Запускаем скрипт
if ( require.main === module ) {
  main().catch(console.error);
}
