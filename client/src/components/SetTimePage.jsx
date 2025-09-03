import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

const MemoryCard = ({ type, emoji, onSaved }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedTime, setSavedTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time) return;

    const localDateTime = new Date(`${date}T${time}:00`);
    const isoString = localDateTime.toISOString();

    try {
      // call type-specific endpoint
      const response = await axios.post(
        `http://localhost:3000/api/starlock/${type.toLowerCase()}/set${type}Capsule`,
        { timeToUnlock: isoString },
        {
          headers: { "Content-Type": "application/json" },
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

      setSaved(true);
      setSavedTime(isoString);

      // notify parent
      onSaved(type);
    } catch (err) {
      console.error("Error saving:", err);
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="bg-white/90 shadow-lg rounded-2xl p-6 w-full md:w-80">
      <h3 className="text-xl font-semibold mb-4">
        {emoji} {type}
      </h3>

      {saved ? (
        <div className="text-green-600 font-medium">
          ✅ Saved! Unlocks at:
          <div className="text-sm text-gray-700 mt-1">{savedTime}</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Unlock Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Unlock Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
};

const SetTimePage = () => {
  const memoryTypes = [
    { type: "Thought", emoji: "💭" },
    { type: "Image", emoji: "🖼️" },
    { type: "Audio", emoji: "🎵" },
    { type: "Video", emoji: "🎥" },
    { type: "Prediction", emoji: "🔮" },
    { type: "Playlist", emoji: "🎶" },
  ];

  const navigate = useNavigate();
  const [savedCapsules, setSavedCapsules] = useState(new Set());

  const handleSaved = (type) => {
    setSavedCapsules((prev) => {
      const updated = new Set(prev);
      updated.add(type); // ensures uniqueness

      // check if all capsules are saved
      if (updated.size === memoryTypes.length) {
        setTimeout(() => navigate("/"), 1000); // navigate to home after 1s
      }

      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">
        Set Time Capsules
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {memoryTypes.map((item) => (
          <MemoryCard
            key={item.type}
            type={item.type}
            emoji={item.emoji}
            onSaved={handleSaved}
          />
        ))}
      </div>
    </div>
  );
};

export default SetTimePage;
