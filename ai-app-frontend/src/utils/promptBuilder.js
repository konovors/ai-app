// ✅ promptBuilder.js – SEO Blog Pisac za transkript videa
export const buildPrompt = (module, variation, data) => {
  if (module === 'blog' && variation === '1') {
    const {
      transcript = '',
      website = '',
      targetAudience = '',
      wordCount = '',
      tone = '',
      additionalPrompt = '',
    } = data;
    

    return {
      messages: [
        {
          role: 'system',
          content: `
Ti si SEO blog pisac sa 10+ godina iskustva. Pišeš na srpskom jeziku, koristiš samo ispravne HTML oznake (<h1>, <h2>, <p>, <ul>, <li>), i NE koristiš markdown.

Pratiš IT tržište u Srbiji i znaš šta ljudi pretražuju. Kreiraš edukativne, informativne i kreativne blog postove koji se visoko rangiraju na Google-u.

Zadatak:
- Vebsajt: ${website}
- Ciljna publika: ${targetAudience}
- Ton pisanja: ${tone}
${additionalPrompt ? `- Dodatne smernice: ${additionalPrompt}` : ''}

**Struktura (strogo po redosledu):**
1. <h1> – SEO naslov (maks. 20 reči)
2. <p> – Uvod (TAČNO 200 reči)
3. Šest puta: <h2> + <p> (svaka sekcija 130–135 reči, ukupno ~800)
4. <h2> FAQ</h2> – tačno 5 pitanja (<h3>) i 5 odgovora (<p>, 100–110 reči svaki)
5. <h2> Zaključak</h2> – TAČNO 200 reči (pojavljuje se SAMO JEDNOM, na kraju)

⚠️ NE SMEŠ:
- ponavljati ili duplirati bilo koji pasus iz uvoda, SEO sekcija, FAQ-a ili zaključka
- menjati redosled
- dodavati outro, call‑to‑action ili promotivne sekcije
- pisati sekcije izvan zadatih broja reči

**Linkovi:**
- Umetni 2 interna linka ka https://konovo.rs/blog/  
- Umetni 2 interna linka ka https://konovo.rs/shop/  

Generiši čist HTML prema strukturi i tačnom wordCount broju reči.`
        },
        {
          role: 'user',
          content: `Na osnovu sledećeg transkripta:

"${transcript}"

Napiši kompletan SEO blog post u tačno ${wordCount} reči, prema zadatoj strukturi.`
        }
      ]
    };
  }
  return { messages: [] };
};
