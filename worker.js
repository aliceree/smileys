export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      try {
        // Získání dat z těla požadavku
        const { name, score } = await request.json();

        if (!name || !score) {
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

    // Pokud metoda není POST, vrátí chybu
    return new Response('Method not allowed', { status: 405 });
  },
};