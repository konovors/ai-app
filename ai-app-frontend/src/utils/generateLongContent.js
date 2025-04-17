import { countTokens } from './tokenCounter';

export const generateLongContent = async (messages, expectedWords) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/chat`;

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages })
    });
    const { response } = await res.json();
    const content = response.trim();

    // Prebroj reči, tokene i karaktere
    const stats = countTokens(content) || {
      words: 0,
      tokens: 0,
      characters: content.length
    };

    // Upozorenje ako se broj reči ne poklapa sa očekivanim
    if (expectedWords && stats.words !== expectedWords) {
      console.warn(
        `⚠️ Dobijen broj reči: ${stats.words}, a očekivano: ${expectedWords}.`
      );
    }

    return { content, stats };
  } catch (err) {
    console.error('generateLongContent error', err);
    throw err;
  }
};
