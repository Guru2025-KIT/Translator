import React from 'react';

function LanguageSelector({ 
  sourceLanguage, 
  targetLanguage, 
  setSourceLanguage, 
  setTargetLanguage, 
  languages,
  onSwap 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          From
        </label>
        <select
          value={sourceLanguage}
          onChange={(e) => setSourceLanguage(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all font-medium"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-end justify-center">
        <button
          onClick={onSwap}
          className="swap-button w-12 h-12 bg-purple-100 hover:bg-purple-200 rounded-full flex items-center justify-center text-2xl"
          title="Swap languages"
        >
          ⇄
        </button>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          To
        </label>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all font-medium"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default LanguageSelector;
