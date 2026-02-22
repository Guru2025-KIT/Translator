import React from 'react';

function TextInput({ inputText, setInputText }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-700 font-semibold">
          Enter Text
        </label>
        <span className="char-count">
          {inputText.length} characters
        </span>
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type or paste your text here..."
        rows="6"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all resize-none text-gray-700 text-lg"
      />
    </div>
  );
}

export default TextInput;
