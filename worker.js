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

    // Zpracování POST požadavků na endpoint /save-score
    if (request.method === 'POST' && url.pathname === '/save-score') {
      try {
        const { name, score } = await request.json();

        if (!name || typeof score !== 'number') {
          return new Response('Invalid data', {
            status: 400,
            headers: { 'Access-Control-Allow-Origin': '*' },
          });
        }

        // Přidání času dokončení hry
        const timestamp = Date.now();

        // Uložení dat do KV Storage
        await env['name-database'].put(name, JSON.stringify({ score, timestamp }));

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

    // Zpracování GET požadavků na endpoint /get-scores
    if (url.pathname === '/get-scores') {
      try {
        const scores = await env['name-database'].list(); // Načtení všech klíčů z KV
        const result = [];

        for (const key of scores.keys) {
          const value = await env['name-database'].get(key.name);
          const parsedValue = JSON.parse(value);
          result.push({ name: key.name, ...parsedValue });
        }

        // Seřazení podle času (nejnovější nahoře)
        result.sort((a, b) => b.timestamp - a.timestamp);

        return new Response(JSON.stringify(result), {
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

async function sendScoreToKV(playerName, playerScore) {
  try {
    const response = await fetch('https://smilecters-backend.al-borovickova.workers.dev/save-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: playerName,
        score: playerScore,
      }),
    });

    if (response.ok) {
      console.log('Score successfully saved!');
    } else {
      console.error('Failed to save score:', response.statusText);
    }
  } catch (error) {
    console.error('Error while sending score:', error);
  }
}