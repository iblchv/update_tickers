require('dotenv').config();
const fetchAllTickers = require('./src/service/fetchAllTickers');

// Функция для запуска скрипта с обработкой ошибок
async function main() {
  try {
    console.log('Запуск скрипта...');
    // Можно передать дату в формате YYYY-MM-DD или не передавать для использования текущей даты
    await fetchAllTickers(
      '2024-10-24'
    ); // или await fetchAllTickers('2024-03-20');
    console.log('Скрипт успешно завершен');
  } catch ( error ) {
    console.error('Ошибка при выполнении скрипта:', error);
    process.exit(1);
  }
}

// Запускаем скрипт
if ( require.main === module ) {
  main().catch(console.error);
}
