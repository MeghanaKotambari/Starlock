import React from "react"
import { FileText, Image, Music, ListMusic, Sparkles, Video, User } from "lucide-react"

const HomePage = () => {
  const features = [
    { name: "Thoughts", icon: <FileText className="w-6 h-6 text-purple-600" />, link: "/thoughts" },
    { name: "Images", icon: <Image className="w-6 h-6 text-purple-600" />, link: "/image" },
    { name: "Audio", icon: <Music className="w-6 h-6 text-purple-600" />, link: "/audio" },
    { name: "Playlist", icon: <ListMusic className="w-6 h-6 text-purple-600" />, link: "/playlist" },
    { name: "Predictions", icon: <Sparkles className="w-6 h-6 text-purple-600" />, link: "/predictions" },
    { name: "Videos", icon: <Video className="w-6 h-6 text-purple-600" />, link: "/videos" },
   
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-100 to-purple-50 flex flex-col items-center">
      
      {/* Header */}
      <header className="w-full bg-white shadow-md shadow-gray-300 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-purple-700">Starlock ✨</h1>
        <a 
          href="/profile" 
          className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Profile
        </a>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-12 max-w-2xl">
        <h2 className="text-4xl font-extrabold text-purple-800">Welcome to Starlock</h2>
        <p className="mt-3 text-lg text-gray-600">
          Your personal space to store, create, and explore — from notes to videos, 
          from playlists to predictions 
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-6 max-w-5xl w-full">
        {features.map((feature, index) => (
          <a
            key={index}
            href={feature.link}
            className="bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg shadow-gray-300 border border-gray-200 hover:shadow-xl hover:scale-105 transition transform"
          >
            <div className="mb-3">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{feature.name}</h3>
          </a>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-16 mb-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Starlock — Unlock Your Memories ✨
      </footer>
    </div>
  )
}

export default HomePage
