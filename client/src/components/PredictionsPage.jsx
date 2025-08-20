import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  "What memory always makes you smile?",
  "Describe a moment you wish to relive.",
  "What does your happiest day look like?",
  "If you could time travel, where would you go?",
  "What’s a small moment that changed everything?",
  "What’s one sound that brings back strong memories?",
  "Who in your life has shaped your best memories?",
  "What smell reminds you of home?",
  "What was your favorite childhood game or activity?",
  "Which family tradition do you treasure the most?",
  "What song instantly takes you back in time?",
  "Who was your childhood best friend, and what did you do together?",
  "What’s the first vacation you remember?",
  "What was your favorite subject in school and why?",
  "What’s a meal you’ll never forget?",
  "What’s the best gift you’ve ever received?",
  "Which teacher had the biggest impact on your life?",
  "What was your first big achievement?",
  "What memory do you wish you could photograph?",
  "What place from your childhood do you still think about?",
  "What toy or object meant the most to you as a kid?",
  "What was your happiest moment in college or school?",
  "What’s the funniest memory you have with your friends?",
  "What was your favorite TV show or cartoon growing up?",
  "What’s a holiday memory you’ll never forget?",
  "Who taught you an important life lesson?",
  "What was your favorite birthday celebration?",
  "What’s a memory that always makes you laugh?",
  "What was your first job experience like?",
  "What’s a tradition you want to pass on?",
  "What memory do you replay in your head often?",
  "What’s the earliest memory you can recall?",
  "What’s the best trip you’ve ever taken?",
  "Who made you feel most supported in your childhood?",
  "What’s one piece of advice someone gave you that stuck?",
  "What’s the most adventurous thing you did as a kid?",
  "What festival or celebration do you miss the most?",
  "What memory do you think defines who you are?",
  "What was your proudest school memory?",
  "What’s a childhood secret hideout you loved?",
];

const PredictionPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(
        "https://starlockserver.onrender.com/api/starlock/prediction/addPrediction",
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

      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      navigate("/home");
      generateRandomQuestion(); // ask a new question
    } catch (error) {
      console.error("Error submitting answer:", error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
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
          {loading ? "Adding..." : "Answer"}
        </button>
      </div>
    </div>
  );
};

export default PredictionPage;
