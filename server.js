const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();

const port = 8080;

app.use(express.static('public')); // serve files from the public directory

app.get('/playtime', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://tracker.gg/valorant/profile/riot/TuxMan%230424/performance?platform=pc&playlist=competitive', {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    await new Promise(resolve => setTimeout(resolve, 5000));
    await page.screenshot({ path: 'debug.png', fullPage: true });
    console.log('Screenshot taken for debugging.');

    const playtime = await page.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('div.label'));
      const target = labels.find(el => el.textContent.includes("Total Playtime"));
      const valueDiv = target?.parentElement?.querySelector('.value');
      return valueDiv ? valueDiv.textContent.trim() : 'Unavailable';
    });

    await browser.close();
    res.json({ playtime });
  } catch (error) {
    console.error('Puppeteer scraping failed:', error);
    res.status(500).json({ error: 'Unable to fetch playtime' });
  }
});
// other working things

app.use((req, res) => { //404 page 
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => { // server starts
  console.log(`Website running at http://localhost:${port}`);
});
