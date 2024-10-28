const puppeteer = require('puppeteer');

class Browser {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Настраиваем User-Agent
    await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Включаем JavaScript
    await this.page.setJavaScriptEnabled(true);
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async getPageContent(url) {
    try {
      await this.page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      return await this.page.content();
    } catch (error) {
      console.error('Ошибка при загрузке страницы:', error);
      throw error;
    }
  }
}

module.exports = Browser;
