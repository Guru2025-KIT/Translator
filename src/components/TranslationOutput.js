import React from 'react';

function TranslationOutput({ translatedText, onCopy }) {
  return (
    <div className="translation-box rounded-xl p-6 border-2 border-purple-200">
      <div className="flex justify-between items-center mb-3">
        <label className="text-gray-700 font-semibold text-lg">
          Translation
        </label>
        <button
          onClick={onCopy}
          className="px-4 py-2 bg-white hover:bg-purple-50 border-2 border-purple-300 text-purple-700 font-semibold rounded-lg transition-all text-sm"
        >
          Copy
        </button>
      </div>
      <p className="text-gray-800 text-xl leading-relaxed">
        {translatedText}
      </p>
    </div>
  );
}

export default TranslationOutput;
