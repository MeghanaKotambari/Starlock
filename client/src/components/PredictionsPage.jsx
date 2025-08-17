import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import axios from "axios";

const QUESTIONS = [
  "What memory always makes you smile?",
  "Describe a moment you wish to relive.",
  "What does your happiest day look like?",
  "If you could time travel, where would you go?",
  "What’s a small moment that changed everything?",
  "What’s one sound that brings back strong memories?",
  "Who in your life has shaped your best memories?",
  "What smell reminds you of home?",
];

const PredictionPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  // Generate random question
  const generateRandomQuestion = () => {
    const random = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    setQuestion(random);
    setAnswer(""); // clear previous answer
  };

  useEffect(() => {
    generateRandomQuestion();
  }, []);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      alert("Please answer the question.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:3000/api/starlock/prediction/addPrediction",
        {
          question,
          answer,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert("Your answer was submitted!");
      generateRandomQuestion(); // ask a new question
    } catch (error) {
      console.error("Error submitting answer:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
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
          <p className="text-gray-600">“Answer what the future asks...”</p>
        </div>

        {/* Textarea */}
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={question}
          className="w-full p-4 rounded-2xl border border-purple-200 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none text-gray-700"
          rows={5}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-3 rounded-xl shadow hover:bg-purple-700 transition disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Answer"}
        </button>
      </div>
    </div>
  );
};

export default PredictionPage;
