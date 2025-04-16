// ✅ generateLongContent.js – Verzija sa tačnim brojem reči, tone-om i strožom dopunom

import { countTokens } from './tokenCounter';

const splitTextIntoChunks = (text, maxLength = 1000) => {
  const chunks = [];
  let current = '';

  for (const line of text.split('\n')) {
    if ((current + '\n' + line).length > maxLength) {
      chunks.push(current);
      current = line;
    } else {
      current += '\n' + line;
    }
  }

  if (current.trim()) {
    chunks.push(current);
  }

  return chunks;
};

export const generateLongContent = async (
  initialMessages,
  minWords = 1200,
  maxRetries = 4,
  tone = 'Balansiran i optimizovan za SEO.'
) => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/chat`;

  let result = '';
  let attempts = 0;

  const systemPrompt = initialMessages.find((msg) => msg.role === 'system');
  const userPrompt = initialMessages.find((msg) => msg.role === 'user');

  if (!systemPrompt || !userPrompt) {
    console.warn('❌ Nedostaju osnovne poruke.');
    return '';
  }

  while (attempts < maxRetries) {
    const tokenData = countTokens(result) || { words: 0, tokens: 0 };

    // ✅ Ako smo blizu cilja (5% tolerancije), prekini
    if (tokenData.words >= minWords && tokenData.words <= minWords * 1.05) break;

    // ⛔ Ako prelazi više od 10% – velika šansa da je predugačak zaključak
    if (tokenData.words > minWords * 1.1) {
      console.warn(`⚠️ Sadržaj je predugačak za ${tokenData.words - minWords} reči.`);
      break;
    }

    const assistantChunks = splitTextIntoChunks(result, 1000).map((chunk) => ({
      role: 'assistant',
      content: chunk.trim(),
    }));

    const fullMessages = [
      systemPrompt,
      userPrompt,
      ...assistantChunks,
      {
        role: 'user',
        content: `Nastavi HTML tekst tačno gde si stao. Stil pisanja: ${tone}.
⚠️ Ne duži zaključak. Zaključak mora imati TAČNO 200 reči – bez dodatnih pasusa, outro-a, ili call-to-action teksta.
Fokusiraj se isključivo na dopunu nedostajućih sekcija dok ne dostigneš ukupno ${minWords} reči. Ne ponavljaj ranije napisano.`,
      },
    ];

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: fullMessages }),
      });

      const data = await response.json();
      const newContent = data?.response || '';

      if (!newContent || newContent.trim().length < 20) break;

      result += '\n' + newContent;
    } catch (err) {
      console.error('❌ Greška pri generisanju sadržaja:', err);
      break;
    }

    attempts++;
  }

  return result.trim();
};
