// ✅ src/agents/BlogAgent.js
import { countTokens } from '../utils/tokenCounter';

const apiUrl = `${import.meta.env.VITE_API_URL}/api/chat`;

const systemPrompt = {
  role: 'system',
  content: `
Ti si SEO blog pisac sa 10+ godina iskustva. Pišeš na srpskom jeziku i koristiš isključivo HTML oznake (<h1>, <h2>, <p>, <ul>, <li>). Nikada ne koristiš markdown.

Struktura:
1. <h1> + <p> uvod (200 reči)
2. Šest SEO sekcija: <h2> + <p> (130–135 reči svaka)
3. <h2> FAQ</h2> – 5x <h3> pitanje + <p> odgovor (100–110 reči)
4. <h2> Zaključak</h2> – tačno 200 reči (na kraju)

Ne smeš:
- Duplirati nijednu sekciju
- Pisati išta posle zaključka
- Izaći van zadatog formata
`
};

async function chat(messages) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  });
  const { response } = await res.json();
  return response.trim();
}

export const generateBlogWithAgent = async (data) => {
  const {
    transcript,
    website,
    targetAudience,
    wordCount,
    tone,
    additionalPrompt
  } = data;

  let sections = [];
  const baseUserInfo = `Tema: ${transcript}
Vebsajt: ${website}
Publika: ${targetAudience}
Stil: ${tone}
Cilj: ${wordCount || 1200} reči
${additionalPrompt ? `Napomena: ${additionalPrompt}` : ''}`;

  // 1. H1 + uvod
  sections.push(await chat([
    systemPrompt,
    { role: 'user', content: `${baseUserInfo}\nNapiši <h1> naslov i <p> uvod (200 reči).` }
  ]));

  // 2. 6 SEO sekcija
  for (let i = 0; i < 6; i++) {
    sections.push(await chat([
      systemPrompt,
      { role: 'assistant', content: sections.join('\n') },
      {
        role: 'user',
        content: `Dodaj sledeću <h2> SEO sekciju i <p> paragraf (130–135 reči). Ne ponavljaj prethodne teme.`
      }
    ]));
  }

  // 3. FAQ
  sections.push(await chat([
    systemPrompt,
    { role: 'assistant', content: sections.join('\n') },
    {
      role: 'user',
      content: `Dodaj <h2> FAQ</h3> sa 5 pitanja i odgovora. Svaki odgovor 100–110 reči.`
    }
  ]));

  // 4. Zaključak
  sections.push(await chat([
    systemPrompt,
    { role: 'assistant', content: sections.join('\n') },
    {
      role: 'user',
      content: `Na kraju dodaj <h2> Zaključak</h2> (tačno 200 reči). Nemoj dodavati više ništa posle toga.`
    }
  ]));

  const finalContent = sections.join('\n');
  const stats = countTokens(finalContent);

  // Opcionalno upozorenje ako se ne poklapa broj reči
  if (wordCount && stats.words && (stats.words < wordCount * 0.95 || stats.words > wordCount * 1.05)) {
    console.warn(`⚠️ Očekovano ${wordCount} reči, dobijeno ${stats.words}.`);
  }

  return { content: finalContent, stats };
};
