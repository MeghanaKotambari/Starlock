import React, { useState } from "react";
import { Plus, Trash2, Link } from "lucide-react";

const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistLink, setPlaylistLink] = useState("");

  const handleAddPlaylist = () => {
    if (!playlistName.trim() || !playlistLink.trim()) return;

    const newPlaylist = {
      id: Date.now(),
      name: playlistName,
      link: playlistLink,
    };

    setPlaylists([...playlists, newPlaylist]);
    setPlaylistName("");
    setPlaylistLink("");
  };

  const handleDeletePlaylist = (id) => {
    setPlaylists(playlists.filter((p) => p.id !== id));
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    alert("Playlist link copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow mb-2">
            🎵 MelodyBox
          </h1>
          <p className="text-gray-600">"Your Moments, Your Mix"</p>
        </div>

        {/* Input for Playlist Name & Link */}
        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            placeholder="Enter playlist name..."
            className="p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/70 backdrop-blur-lg"
          />
          <input
            type="text"
            value={playlistLink}
            onChange={(e) => setPlaylistLink(e.target.value)}
            placeholder="Enter playlist link..."
            className="p-3 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/70 backdrop-blur-lg"
          />
          {/* Small Add Playlist Button */}
          <div className="w-full flex items-center justify-center">
          <button
            onClick={handleAddPlaylist}
            className="flex items-center gap-1 px-3 py-2 w-[200px] bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition text-sm text-center"
          >
            <Plus size={16} /> Add
          </button>
          </div>
        </div>

        {/* Playlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg p-5 flex flex-col"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-purple-800">
                    {playlist.name}
                  </h2>
                  <button
                    onClick={() => handleDeletePlaylist(playlist.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Playlist Link */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={playlist.link}
                    readOnly
                    className="flex-1 p-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-50/60"
                  />
                  <button
                    onClick={() => handleCopyLink(playlist.link)}
                    className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-1"
                  >
                    <Link size={16} /> Copy
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full italic">
              “Click💜 Play💜 Relive💜”
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistPage;
