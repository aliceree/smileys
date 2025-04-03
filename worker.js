export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Zpracování požadavků na endpoint /save-score
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

    // Vrácení chyby pro všechny ostatní požadavky
    return new Response('Not Found', { status: 404 });
  },
};