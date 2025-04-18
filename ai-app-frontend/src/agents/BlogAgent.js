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

Obavezno:
- U tekstu moraš prirodno uključiti minimum:
  - 2 interna HTML linka ka člancima sa bloga (koristi https://konovo.rs/blog/)
  - 2 interna HTML linka ka proizvodima koji su relevantni za temu (koristi https://konovo.rs/shop/)
  
Linkove moraš napisati koristeći <a href="...">tekst</a> format u HTML-u.



Ne smeš:
- Duplirati nijednu sekciju
- Pisati išta posle zaključka
- Izaći van zadatog formata
`
};

// 🧠 Chat funkcija sa opcionalnim signal-om
async function chat(messages, signal) {
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal, // ✅ omogućava prekid
  });

  if (!res.ok) {
    throw new Error(`Greška: ${res.status} ${res.statusText}`);
  }

  const { response } = await res.json();
  return response.trim();
}

export const generateBlogWithAgent = async (data, signal) => {
  const {
    transcript,
    topic,
    title,
    keywords,
    website,
    targetAudience,
    wordCount,
    tone,
    additionalPrompt
  } = data;

  const topicSource = title && keywords
    ? `Naslov: ${title}
Ključne reči: ${keywords}`
    : topic || transcript || 'Nedefinisana tema';

  let sections = [];
  const baseUserInfo = `${topicSource}
Vebsajt: ${website}
Publika: ${targetAudience}
Stil: ${tone}
Cilj: ${wordCount || 1200} reči
${additionalPrompt ? `Napomena: ${additionalPrompt}` : ''}`;

  try {
    // 1. Uvod
    sections.push(await chat([
      systemPrompt,
      { role: 'user', content: `${baseUserInfo}
Napiši <h1> naslov i <p> uvod (200 reči).` }
    ], signal));

    // 2. Šest SEO sekcija
    for (let i = 0; i < 6; i++) {
      sections.push(await chat([
        systemPrompt,
        { role: 'assistant', content: sections.join('\n') },
        {
          role: 'user',
          content: `Dodaj sledeću <h2> SEO sekciju i <p> paragraf (130–135 reči). Ne ponavljaj prethodne teme.`
        }
      ], signal));
    }

    // 3. FAQ
    sections.push(await chat([
      systemPrompt,
      { role: 'assistant', content: sections.join('\n') },
      {
        role: 'user',
        content: `Dodaj <h2> FAQ</h2> sa 5 pitanja i odgovora. Svaki odgovor 100–110 reči.`
      }
    ], signal));

    // 4. Zaključak
    sections.push(await chat([
      systemPrompt,
      { role: 'assistant', content: sections.join('\n') },
      {
        role: 'user',
        content: `Na kraju dodaj <h2> Zaključak</h2> (tačno 200 reči). Nemoj dodavati više ništa posle toga.`
      }
    ], signal));
  } catch (err) {
    if (err.name === 'AbortError') {
      console.warn('⛔ Generisanje prekinuto od strane korisnika.');
      throw err; // propagira dalje u BlogWriter da se može prikazati poruka
    }
    throw err;
  }

  const finalContent = sections.join('\n');
  const stats = countTokens(finalContent);

  if (wordCount && stats.words && (stats.words < wordCount * 0.98 || stats.words > wordCount * 1.02)) {
    console.warn(`⚠️ Očekivano ${wordCount} reči, dobijeno ${stats.words}.`);
  }

  return { content: finalContent, stats };
};
