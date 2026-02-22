import React from 'react';

function ApiKeyInput({ apiKey, setApiKey, showApiInput, setShowApiInput }) {
  if (!showApiInput) {
    return (
      <div className="text-center mb-4">
        <button
          onClick={() => setShowApiInput(true)}
          className="text-white opacity-70 hover:opacity-100 transition-all text-sm font-semibold"
        >
          ⚙️ Show API Settings
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <label className="block text-gray-700 font-semibold mb-2 text-lg">
            RapidAPI Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your RapidAPI key here..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all code-font text-sm"
          />
          <p className="text-xs text-gray-500 mt-2">
            Don't have an API key? 
            <a 
              href="https://rapidapi.com/googlecloud/api/google-translate1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-600 font-semibold ml-1 hover:underline"
            >
              Get it here →
            </a>
          </p>
        </div>
        <button
          onClick={() => setShowApiInput(false)}
          className="mt-8 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all font-semibold"
        >
          Hide
        </button>
      </div>
    </div>
  );
}

export default ApiKeyInput;
