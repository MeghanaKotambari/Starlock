import React, { useState } from "react";
import { Zap, RefreshCw } from "lucide-react";

const PredictionPage = () => {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");

  // Handle prediction (mock example)
  const handlePredict = () => {
    if (!inputText.trim()) return;
    // Mock prediction logic
    const outcomes = [
      "Your memory will bring a smile today! 😊",
      "A nostalgic moment is coming your way! 🌟",
      "Cherish the present, it becomes tomorrow's memory! 💜",
      "A small surprise awaits in your near future! 🎁",
    ];
    const randomPrediction =
      outcomes[Math.floor(Math.random() * outcomes.length)];
    setPrediction(randomPrediction);
  };

  // Reset
  const handleReset = () => {
    setInputText("");
    setPrediction("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="text-center mb-6">
          <Zap className="mx-auto h-12 w-12 text-purple-500 mb-2" />
          <h1 className="text-3xl font-extrabold text-purple-800 drop-shadow mb-2">
           FutureSight
          </h1>
          <p className="text-gray-600">
            “Enter a thought, see what the future whispers”
          </p>
        </div>

        {/* Input Section */}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a memory, event, or feeling..."
          className="w-full p-4 rounded-2xl border border-purple-200 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-gray-700"
          rows={5}
        />

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handlePredict}
            className="flex items-center gap-2 px-5 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition"
          >
            Predict
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition"
          >
            <RefreshCw size={16} /> Reset
          </button>
        </div>

        {/* Prediction Output */}
        {prediction && (
          <div className="mt-6 p-4 bg-purple-50/70 rounded-2xl border border-purple-200 text-purple-800 text-center text-lg font-medium shadow-sm">
            {prediction}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
