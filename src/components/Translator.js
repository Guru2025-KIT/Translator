import React, { useState } from 'react';
import LanguageSelector from './LanguageSelector';
import TextInput from './TextInput';
import TranslationOutput from './TranslationOutput';
import ApiKeyInput from './ApiKeyInput';
import { translateText } from '../services/translationService';
import { languages } from '../data/languages';

function Translator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    if (!apiKey.trim()) {
      setError('Please enter your RapidAPI key');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const result = await translateText(inputText, sourceLanguage, targetLanguage, apiKey);
      setTranslatedText(result);
    } catch (err) {
      console.error('Translation error:', err);
      setError(err.message || 'Translation failed. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const clearAll = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    alert('✓ Copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-6xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
            Language Translator
          </h1>
          <p className="text-white text-xl opacity-90">
            Powered by RapidAPI & Google Translate
          </p>
        </div>

        <ApiKeyInput
          apiKey={apiKey}
          setApiKey={setApiKey}
          showApiInput={showApiInput}
          setShowApiInput={setShowApiInput}
        />

        <div className="glass-card rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <LanguageSelector
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            setSourceLanguage={setSourceLanguage}
            setTargetLanguage={setTargetLanguage}
            languages={languages}
            onSwap={swapLanguages}
          />

          <TextInput
            inputText={inputText}
            setInputText={setInputText}
          />

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={handleTranslate}
              disabled={loading}
              className="flex-1 btn-gradient text-white font-bold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="spinner mr-2"></div>
                  Translating...
                </span>
              ) : (
                '✨ Translate'
              )}
            </button>
            
            <button
              onClick={clearAll}
              className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 animate-fade-in-up">
              <div className="flex items-start">
                <span className="text-2xl mr-3">⚠️</span>
                <div>
                  <p className="text-red-700 font-semibold">Error</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {translatedText && (
            <TranslationOutput
              translatedText={translatedText}
              onCopy={copyToClipboard}
            />
          )}
        </div>

        <div className="glass-card rounded-2xl p-6 mt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-gray-800 font-bold text-lg mb-3 flex items-center">
             How to Use RapidAPI
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li className="pl-2">
              <strong>Sign up</strong> at{' '}
              <a 
                href="https://rapidapi.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                RapidAPI.com
              </a>
            </li>
            <li className="pl-2">
              <strong>Subscribe</strong> to{' '}
              <a 
                href="https://rapidapi.com/googlecloud/api/google-translate1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 font-semibold hover:underline"
              >
                Google Translate API
              </a>{' '}
              (Free tier: 500 requests/month)
            </li>
            <li className="pl-2">
              <strong>Copy</strong> your API key from the dashboard
            </li>
            <li className="pl-2">
              <strong>Paste</strong> it above and start translating!
            </li>
          </ol>
        </div>

        <div className="text-center mt-8 text-white opacity-75 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-sm">
            Built with React + Tailwind CSS + RapidAPI
          </p>
        </div>
      </div>
    </div>
  );
}

export default Translator;
