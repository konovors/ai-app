//preset za prompt buildere prema temperature i top_p parametre

export const presetProfiles = {
    // 🧠 Tehnički (npr. tutorijali, how-to)
    technical: {
      temperature: 0.4,
      top_p: 1.0,
      max_tokens: 3000
    },
  
    // 📰 SEO blog (balansirano, informativno)
    blog_standard: {
      temperature: 0.8,
      top_p: 0.9,
      max_tokens: 3500
    },
  
    // ✍️ Marketing (kreativno ali još uvek u fokusu)
    marketing: {
      temperature: 1.1,
      top_p: 0.9,
      max_tokens: 4000
    },
  
    // 🔥 Storytelling / viral content (TikTok, reklame, YouTube)
    storytelling: {
      temperature: 1.3,
      top_p: 0.95,
      max_tokens: 4000
    },
  
    // 🤪 Eksperimentalno (maksimalna kreativnost)
    wild_creative: {
      temperature: 1.5,
      top_p: 0.95,
      max_tokens: 4096
    }
  };
  