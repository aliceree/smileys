export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Zpracování OPTIONS požadavků (preflight requests)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // Endpoint pro uložení skóre
    if (request.method === 'POST' && url.pathname === '/save-score') {
      try {
        const { name, score } = await request.json();

        if (!name || typeof score !== 'number') {
          return new Response('Invalid data', {
            status: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
          });
        }

        // Uložení dat do KV Storage
        await env['name-database'].put(name, JSON.stringify({ score }));

        return new Response('Score successfully saved!', {
          status: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      } catch (error) {
        console.error('Error saving score:', error);
        return new Response('Failed to save score', {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // Endpoint pro načtení skóre
    if (request.method === 'GET' && url.pathname === '/get-scores') {
      try {
        const keys = await env['name-database'].list();
        const scores = {};

        for (const key of keys.keys) {
          const value = await env['name-database'].get(key.name);
          scores[key.name] = JSON.parse(value);
        }

        return new Response(JSON.stringify(scores), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      } catch (error) {
        console.error('Error fetching scores:', error);
        return new Response('Failed to fetch scores', {
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // Vrácení chyby pro všechny ostatní požadavky
    return new Response('Not Found', {
      status: 404,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
  },
};

async function loadScores() {
  try {
    const response = await fetch('https://smilecters-backend.al-borovickova.workers.dev/get-scores');
    if (response.ok) {
      const scores = await response.json();
      console.log('Scores received from backend:', scores); // Ladící výstup

      // Najde seznam skóre
      const scoreboard = document.getElementById('scoreboard');
      scoreboard.innerHTML = ''; // Vyčistí pouze seznam skóre

      // Seřadí skóre podle hodnoty (od nejvyššího po nejnižší)
      const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b.score - a.score);

      // Vytvoří seznam skóre
      sortedScores.forEach(([name, { score }]) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${name}: ${score}`;
        scoreboard.appendChild(listItem);
      });
    } else {
      console.error('Failed to load scores:', response.statusText);
    }
  } catch (error) {
    console.error('Error while loading scores:', error);
  }
}