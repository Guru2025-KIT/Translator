const RAPIDAPI_URL = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const RAPIDAPI_HOST = 'google-translate1.p.rapidapi.com';

export async function translateText(text, sourceLanguage, targetLanguage, apiKey) {
  try {
    const response = await fetch(RAPIDAPI_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/gzip',
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      },
      body: new URLSearchParams({
        q: text,
        target: targetLanguage,
        source: sourceLanguage
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${response.statusText}. ${errorText}`);
    }

    const data = await response.json();
    
    if (data.data && data.data.translations && data.data.translations.length > 0) {
      return data.data.translations[0].translatedText;
    } else {
      throw new Error('Translation not found in response');
    }
  } catch (error) {
    if (error.message.includes('API Error: 401') || error.message.includes('Invalid API key')) {
      throw new Error('Invalid API key. Please check your RapidAPI key and try again.');
    } else if (error.message.includes('API Error: 429')) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    } else if (error.message.includes('API Error: 403')) {
      throw new Error('Access forbidden. Please ensure you have an active subscription to the Google Translate API on RapidAPI.');
    } else {
      throw error;
    }
  }
}
