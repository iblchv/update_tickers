const SPREADSHEET_ID = '12upp3hTLfBOh39EATDbZoYKn6KZunuFNGXaYo95Ymsk';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// Настройки для различных задержек и повторных попыток
const DELAYS = {
  MIN_FETCH_DELAY: 5000,   // Увеличиваем минимальную задержку
  MAX_FETCH_DELAY: 10000,  // Увеличиваем максимальную задержку
  RETRY_DELAY: 10000,      // Увеличиваем задержку перед повторной попыткой
};

module.exports = {
  SPREADSHEET_ID,
  SCOPES,
  DELAYS
};
