  const leaderboardBody = document.getElementById('leaderboard-body');

  function updateLeaderboard(scores) {
    leaderboardBody.innerHTML = '';
    scores.forEach(({ name, score }) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${name}</td><td>${score}</td>`;
      leaderboardBody.appendChild(row);
    });
  }

  async function fetchScores() {
    try {
      const res = await fetch('/scores');
      const data = await res.json();
      data.sort((a, b) => b.score - a.score); 

      updateLeaderboard(data);
    } catch (err) {
      console.error('Error fetching scores:', err);
    }
  }

  async function addScore() {
    let name = prompt('Enter your name:');
    while (true) {
      if (name.length > 5) {
        alert('Name is too long! Please enter a name with 5 characters or less.');
        name = prompt('Enter your name:');
      } else {break;}
    }
    if (!name) return;
    try {
      await fetch('/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score: RealScore.toFixed(3) })
      });
      fetchScores();
    } catch (err) {
      console.error('Error saving score:', err);
    }
  }

  document.addEventListener('DOMContentLoaded', fetchScores);
