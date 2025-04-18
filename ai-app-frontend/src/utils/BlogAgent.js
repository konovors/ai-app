// src/utils/blogAgent.js
import { chat } from './api/chat'        // tvoj osnovni fetch/chat wrapper
import { countTokens } from './tokenCounter'

/**
 * Generiše kompletan blog post po fazama (intro, SEO sekcije, FAQ, zaključak),
 * pazeći na tačan broj reči i bez dupliranja.
 */
export async function generateBlogPost(messages, expectedWords, maxRetries = 3) {
  let content = ''
  let stats = { words: 0, tokens: 0, characters: 0 }
  let stage = 'full'  // faze: full, faq, conclusion
  let attempts = 0

  // Klon originalnih poruka
  const systemMsg = messages.find((m) => m.role === 'system')
  const userMsg   = messages.find((m) => m.role === 'user')

  while (attempts < maxRetries) {
    let batch

    if (stage === 'full') {
      // prvi pokušaj: pusti modelu da generiše sve
      batch = [...messages]
    } else if (stage === 'faq') {
      batch = [
        systemMsg,
        userMsg,
        { role: 'assistant', content },
        {
          role: 'user',
          content: `⚠️ Molim te: **dodaj** FAQ sekciju (<h2>FAQ</h2> sa 5 pitanja i odgovora), **ne diraš ništa drugo**.`
        }
      ]
    } else if (stage === 'conclusion') {
      batch = [
        systemMsg,
        userMsg,
        { role: 'assistant', content },
        {
          role: 'user',
          content: `⚠️ Molim te: **dodaj** zaključak (<h2>Zaključak</h2> tačno 200 reči), **ništa nakon njega**.`
        }
      ]
    }

    // poziv modela
    const { response } = await chat({ messages: batch })
    const chunk = response.trim()
    content += (attempts === 0 ? '' : '\n') + chunk

    // update statistike
    stats = countTokens(content) || { words: 0, tokens: 0, characters: content.length }

    // proveri da li je FAQ ubačen
    if (stage === 'full' && /<h2>FAQ<\/h2>/i.test(content)) {
      stage = 'conclusion'
    }
    // proveri da li je zaključak ubačen
    if ((stage === 'full' || stage === 'conclusion') && /<h2>Zaključak<\/h2>/i.test(content)) {
      break
    }

    // ako prvi poziv nije ubacio FAQ, idemo na fazu faq
    if (attempts === 0 && !/<h2>FAQ<\/h2>/i.test(content)) {
      stage = 'faq'
    }

    attempts++
  }

  return { content: content.trim(), stats }
}
