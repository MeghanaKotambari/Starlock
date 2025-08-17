import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";

const PlaylistPage = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistLink, setPlaylistLink] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddPlaylist = async () => {
    if (!playlistName.trim() || !playlistLink.trim()) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/starlock/playlist/addPlaylist",
        {
          playlist: playlistName,
          playlistLink: playlistLink,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Playlist added:", response.data);
      alert("Playlist added successfully!");

      setPlaylistName("");
      setPlaylistLink("");
    } catch (error) {
      console.error("Failed to add playlist:", error);
      alert("Failed to add playlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow mb-1">
            🎵 MelodyBox
          </h1>
          <p className="text-gray-600">"Your Moments, Your Mix"</p>
        </div>

        {/* Input Form */}
        <div className="mb-6">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Playlist Name"
            className="w-full p-3 mb-3 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 bg-white/80"
          />
          <input
            type="text"
            value={playlistLink}
            onChange={(e) => setPlaylistLink(e.target.value)}
            placeholder="Playlist Link"
            className="w-full p-3 mb-4 rounded-xl border border-purple-300 focus:ring-2 focus:ring-purple-400 bg-white/80"
          />
          <button
            onClick={handleAddPlaylist}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition disabled:opacity-60"
          >
            <Plus size={18} /> {loading ? "Adding..." : "Add Playlist"}
          </button>
        </div>

        {/* Footer Tagline */}
        <div className="mt-8 text-center text-sm text-purple-600 italic">
          “Click 💜 Play 💜 Relive 💜”
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
