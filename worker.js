export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Endpoint pro načtení skóre
    if (url.pathname === '/get-scores') {
      const scores = await env['name-database'].list(); // Načtení všech klíčů z KV
      const result = {};

      for (const key of scores.keys) {
        const value = await env['name-database'].get(key.name);
        result[key.name] = JSON.parse(value).score; // Předpokládáme, že hodnota je JSON s klíčem `score`
      }

      return new Response(JSON.stringify(result), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://smilecters.pages.dev', // Povolení požadavků z vaší stránky
        },
      });
    }

    // Zpracování OPTIONS požadavků (preflight requests)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': 'https://smilecters.pages.dev',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
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