export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/save-score') {
      try {
        const { name, score } = await request.json();

        if (!name || typeof score !== 'number') {
          return new Response('Invalid data', { status: 400 });
        }

        // Uložení dat do KV Storage
        await env['name-database'].put(name, JSON.stringify({ score }));

        return new Response('Score successfully saved!', { status: 200 });
      } catch (error) {
        console.error('Error saving score:', error);
        return new Response('Failed to save score', { status: 500 });
      }
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