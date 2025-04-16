export const buildPrompt = (module, variation, data) => {
  if (module === 'blog' && variation === '1') {
    const {
      transcript = '',
      website = '',
      targetAudience = '',
      wordCount = '',
      tone = '',
      additionalPrompt = ''
    } = data;

    return {
      messages: [
        {
          role: 'system',
          content: `Ti si iskusni SEO blog pisac. Pišeš isključivo na srpskom jeziku i koristiš validne HTML oznake (<h1>, <h2>, <h3>, <p>, <ul>, <li>). Tvoj zadatak je da napišeš SEO blog post za vebsajt: ${website}.

 Ciljna publika: ${targetAudience}
 Ton pisanja: ${tone}
${additionalPrompt ? `  Dodatne smernice: ${additionalPrompt}` : ''}

 Ne koristi markdown. Ne koristi naslove izvan HTML strukture.`
        },
        {
          role: 'user',
          content: `Na osnovu sledećeg transkripta:\n\n"${transcript}"\n\nNapiši kompletan SEO blog post u čistom HTML formatu.

- Smernice koje moraš striktno da ispoštuješ:
- Ukupna dužina: tačno ${wordCount} reči (ni manje ni više)
- Koristi isključivo HTML (<h1>, <h2>, <p>, <ul>, <li>)
- NE koristi markdown, **, <strong>, <br>, ili bilo koji nepropisan tag
- Svaka sekcija mora imati svoj <h2> naslov i <p> paragraf
- NE grupiši više sekcija u jedan naslov/paragraf
- NE preskači zaključak
- NE dodaj outro, call-to-action ili promotivne poruke

 Struktura teksta:
1. <h1> – SEO naslov
2. <p> – Uvod (200 reči)
3. <h2> + <p> – 6 SEO sekcija (400 reči po sekciji)
4. <h2> – FAQ sekcija (<h3> 5 pitanja i 5 odgovora <p>, 150 reči po odgovoru)
5. <h2> – Zaključak ( Maksimalno do 200 reči)

⚠️ Ako ne možeš da ispuniš sve zbog ograničenja broja reči, skrati FAQ sekciju pre bilo koje druge. Zaključak je obavezan.`
        }
      ]
    };
  }

  return { messages: [] };
};
