const fs = require('fs').promises;
const { google } = require('googleapis');
const path = require('node:path');

async function authorize() {
  try {
    // Используем path.resolve с __dirname для создания абсолютного пути
    const credentialsPath = path.resolve(__dirname, '../config/credentials.json');

    const credentials = JSON.parse(await fs.readFile(credentialsPath, 'utf8'));

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
