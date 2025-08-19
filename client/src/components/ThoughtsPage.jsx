import React, { useState } from "react";
import axios from "axios";
import { PlusCircle, Sparkles } from "lucide-react";
import { Bounce, toast } from "react-toastify";

const ThoughtsPage = ({ capsuleId = null }) => {
  const [thoughtTitle, setThoughtTitle] = useState("");
  const [thoughtDescription, setThoughtDescription] = useState("");

  const addThought = async () => {
    if (thoughtTitle.trim() === "" || thoughtDescription.trim() === "") return;

    const thoughtObject = {
      thoughtTitle,
      thoughtDescription,
      ...(capsuleId && { capsuleId }),
    };

    setThoughtTitle("");
    setThoughtDescription("");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/starlock/thought/addThoughts`,
        thoughtObject,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
      console.error("Error sending thought to backend:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-gray-200 flex items-center justify-center relative px-4 py-10">
      {/* Glows */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 opacity-30 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 opacity-25 blur-3xl rounded-full" />

      {/* Thought Card */}
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-purple-100 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-purple-800 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" /> Shine Your Thought
          </h2>
          <p className="text-gray-600 mt-2">
            Capture a spark of inspiration and store it for later ✨
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Thought Title"
            value={thoughtTitle}
            onChange={(e) => setThoughtTitle(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Thought Description"
            value={thoughtDescription}
            onChange={(e) => setThoughtDescription(e.target.value)}
            rows={4}
            className="px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white/70 backdrop-blur focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <button
            onClick={addThought}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition self-end"
          >
            <PlusCircle className="w-5 h-5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThoughtsPage;
