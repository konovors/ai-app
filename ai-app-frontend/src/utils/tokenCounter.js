    // Koristi GPT-3.5/4 token logiku kao aproksimaciju
    export const countTokens = (text = '') => {
        if (!text) return 0;
    
        // Tokenizacija bazirana na OpenAI-evom modelu: prosečno ~4 karaktera po tokenu
        const words = text.trim().split(/\s+/); // Broj reči
        const characters = text.replace(/\s+/g, '').length; // Broj karaktera bez razmaka
        const tokenEstimate = Math.ceil(characters / 4); // Gruba aproksimacija
    
        return {
        words: words.length,
        characters,
        tokens: tokenEstimate
        };
    };
    