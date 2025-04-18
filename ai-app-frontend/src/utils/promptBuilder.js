/* ✅ promptBuilder.js – SEO Blog Pisac: transkript ili tema
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

**Stalna pravila**:
- Struktura (strogo po redosledu):
  1. <h1> – SEO naslov (maks. 20 reči)
  2. <p> – Uvod (TAČNO 200 reči)
  3. Šest puta: <h2> + <p> (svaka sekcija 130–135 reči, ukupno ~800)
  4. <h2> FAQ</h2> – tačno 5 pitanja (<h3>) i 5 odgovora (<p>, 100–110 reči svaki)
  5. <h2> Zaključak</h2> – TAČNO 200 reči (pojavljuje se SAMO JEDNOM)

⚠️ NE SMEŠ:
- ponavljati ili duplirati bilo koji pasus iz uvoda, SEO sekcija, FAQ-a ili zaključka
- menjati redosled
- dodavati outro, CTA ili promocije
- prelaziti zadati broj reči

**Linkovi** (stalno):
- 2× interna ka https://konovo.rs/blog/
- 2× interna ka https://konovo.rs/shop/
`
        },
        {
          role: 'user',
          content: `
Na osnovu sledećeg transkripta:

"${transcript}"

Vebsajt: ${website}  
Ciljna publika: ${targetAudience}  
Ton pisanja: ${tone}  
Broj reči: ${wordCount}  

Napiši kompletan SEO blog post u tačno ${wordCount} reči, prema gornjim pravilima.  
${additionalPrompt || ''}
`
        }
      ]
    };
  }

  if (module === 'blog' && variation === '2') {
    const {
      topic = '',
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

**Stalna pravila**:
- Struktura (strogo po redosledu):
  1. <h1> – SEO naslov (maks. 20 reči)
  2. <p> – Uvod (TAČNO 200 reči)
  3. Šest puta: <h2> + <p> (svaka sekcija 130–135 reči, ukupno ~800)
  4. <h2> FAQ</h2> – tačno 5 pitanja (<h3>) i 5 odgovora (<p>, 100–110 reči svaki)
  5. <h2> Zaključak</h2> – TAČNO 200 reči (pojavljuje se SAMO JEDNOM)

⚠️ NE SMEŠ:
- ponavljati ili duplirati bilo koji pasus iz uvoda, SEO sekcija, FAQ-a ili zaključka
- menjati redosled
- dodavati outro, CTA ili promocije
- prelaziti zadati broj reči

**Linkovi** (stalno):
- 2× interna ka https://konovo.rs/blog/
- 2× interna ka https://konovo.rs/shop/
`
        },
        {
          role: 'user',
          content: `
Na osnovu sledeće teme:

"${topic}"

Vebsajt: ${website}  
Ciljna publika: ${targetAudience}  
Ton pisanja: ${tone}  
Broj reči: ${wordCount}  

Napiši kompletan SEO blog post u tačno ${wordCount} reči, prema gornjim pravilima.  
${additionalPrompt || ''}
`
        }
      ]
    };
  }
  if (module === 'blog' && variation === '3') {
    const {
      title = '',
      keywords = '',
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
  Ti si profesionalni SEO blog pisac sa 10+ godina iskustva. Pišeš isključivo na srpskom jeziku koristeći pravilne HTML oznake (<h1>, <h2>, <h3>, <p>, <ul>, <li>) — bez Markdown formata.
  
  Tvoj zadatak je da pišeš **optimizovane blog postove** koji su **informativni, jasni, strukturirani** i **visokorangirani na Google pretrazi**.
  
  🎯 Pravila strukture:
  1. <h1> – SEO naslov (do 20 reči)
  2. <p> – Uvod (tačno 200 reči)
  3. Šest SEO sekcija: <h2> naslov + <p> paragraf (130–135 reči)
  4. <h2> FAQ</h2>: 5 pitanja u <h3> + odgovori u <p> (100–110 reči svaki)
  5. <h2> Zaključak</h2>: tačno 200 reči, bez dodataka nakon
  
  🔒 Ne smeš:
  - Duplirati sadržaj (ni uvod, ni zaključak, ni sekcije)
  - Pisati više od navedenog
  - Dodavati CTA, outro ili promotivne blokove
  
  🔗 Obavezni linkovi:
  - 2x interna ka <a href="https://konovo.rs/blog/">Blog</a>
  - 2x interna ka <a href="https://konovo.rs/shop/">Shop</a>
  
  SEO ton pisanja: ${tone}
  Publika: ${targetAudience}
  Minimalno reči: ${wordCount || 1200}
  `
        },
        {
          role: 'user',
          content: `
  Naslov blog posta: "${title}"
  Ključne reči: ${keywords}
  Web sajt: ${website}
  
  Tvoj zadatak je da napišeš kompletan SEO blog u skladu sa svim pravilima iz sistemske poruke. Napiši tačno ${wordCount || 1200} reči.
  
  ${additionalPrompt || ''}
  `
        }
      ]
    };
  }
  

  return { messages: [] };
};
*/