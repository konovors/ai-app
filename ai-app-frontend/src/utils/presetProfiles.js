// ✅ Preset podešavanja za različite stilove sadržaja

export const presetProfiles = {
  // 🧠 Tehnički (npr. tutorijali, how-to vodiči)
  technical: {
    temperature: 0.4,
    top_p: 1.0,
    max_tokens: 4096,
  },

  // 📰 SEO blogovi (balansirano, edukativno)
  blog_standard: {
    temperature: 0.8,
    top_p: 0.9,
    max_tokens: 4096,
  },

  // ✍️ Marketing stil (kreativno, prodajno orijentisano)
  marketing: {
    temperature: 1.1,
    top_p: 0.9,
    max_tokens: 4096,
  },

  // 🔥 Storytelling i viralni sadržaji (za TikTok, YouTube itd.)
  storytelling: {
    temperature: 1.3,
    top_p: 0.95,
    max_tokens: 4096,
  },

  // 🤪 Eksperimentalno i krajnje kreativno
  wild_creative: {
    temperature: 1.5,
    top_p: 0.95,
    max_tokens: 4096,
  },
};
