const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = 8080;

app.use(express.json()); // parse JSON bodies
app.use(express.static('public')); // serve files from the public directory

//leaderboard stuff

const scoresFile = path.join(__dirname, 'scores.json');

app.get('/scores', (req, res) => {
  fs.readFile(scoresFile, 'utf8', (err, data) => {
    if (err) return res.json([]);
    try { 
    res.json(JSON.parse(data));
  } catch (err) {
    console.error('Error parsing scores:');
    res.json([]);
  }});
});

app.post('/scores', (req, res) => {
  const { name, score } = req.body;
  if (typeof
    score !== 'number' ||
    score > 20 ||
    score <= 0 ||
    typeof name !== 'string' ||
    name.length > 5 ||
    name.length === 0 ||
    name.includes('<') ||
    name.includes('>') ||
    name.includes('!')) { res.status(400).send('I love spud'); return; }
  fs.readFile(scoresFile, 'utf8', (err, data) => {
    let scores = [];
    if (!err) {
      try { scores = JSON.parse(data) } catch { }
    }
    scores.push({ name, score });
    fs.writeFile(scoresFile, JSON.stringify(scores, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Could not save' });
      res.json({ success: true });
    });
  });
});
////////////////

app.listen(port, () => { // server starts
  console.log(`Website running at http://localhost:${port}`);
});


app.use((req, res) => { //404 page 
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
