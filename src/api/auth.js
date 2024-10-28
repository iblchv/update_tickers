const fs = require('fs').promises;
const { google } = require('googleapis');

async function authorize() {
  try {
    const credentials = JSON.parse(await fs.readFile('src/config/credentials.json'));

    // Создаем клиент авторизации из учетных данных сервисного аккаунта
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    return auth;
  } catch (err) {
    console.error('Ошибка при авторизации:', err);
    throw err;
  }
}

module.exports = { authorize };
