import React, { useState, useEffect } from "react"

// Mock data (replace with API later)
const mockData = [
  {
    id: 1,
    type: "Thought",
    title: "Future Me",
    content: "Stay patient and keep working hard 🚀",
    unlockTime: "2025-08-17T12:00:00.000Z",
  },
  {
    id: 2,
    type: "Image",
    title: "Graduation Pic",
    content: "https://via.placeholder.com/400",
    unlockTime: "2025-08-19T09:00:00.000Z",
  },
  {
    id: 3,
    type: "Video",
    title: "Birthday Celebration",
    content: "https://www.w3schools.com/html/mov_bbb.mp4",
    unlockTime: "2025-08-20T18:00:00.000Z",
  },
  {
    id: 4,
    type: "Audio",
    title: "Favorite Song",
    content: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    unlockTime: "2025-08-18T15:00:00.000Z",
  },
  {
    id: 5,
    type: "Prediction",
    title: "Life in 2030",
    content: "You will be living in your dream city ✨",
    unlockTime: "2025-08-22T08:00:00.000Z",
  },
  {
    id: 6,
    type: "Playlist",
    title: "My 2025 Jams",
    content: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    unlockTime: "2025-08-21T20:00:00.000Z",
  },
]

const MemoryCard = ({ memory }) => {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    const checkUnlock = () => {
      const now = new Date()
      setIsUnlocked(now >= new Date(memory.unlockTime))
    }

    checkUnlock()
    const interval = setInterval(checkUnlock, 1000)
    return () => clearInterval(interval)
  }, [memory.unlockTime])

  return (
    <div className="relative bg-white shadow-xl rounded-2xl overflow-hidden w-full md:w-96 border border-gray-200">
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-700">{memory.type}</h3>
        <p className="text-gray-600 mb-3">📌 {memory.title}</p>

        {isUnlocked ? (
          <div className="mt-4">
            {memory.type === "Thought" && (
              <p className="text-black">{memory.content}</p>
            )}
            {memory.type === "Image" && (
              <img
                src={memory.content}
                alt={memory.title}
                className="rounded-lg w-full"
              />
            )}
            {memory.type === "Video" && (
              <video controls className="w-full rounded-lg">
                <source src={memory.content} type="video/mp4" />
              </video>
            )}
            {memory.type === "Audio" && (
              <audio controls className="w-full">
                <source src={memory.content} type="audio/mpeg" />
              </audio>
            )}
            {memory.type === "Prediction" && (
              <p className="italic">{memory.content}</p>
            )}
            {memory.type === "Playlist" && (
              <a
                href={memory.content}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                🎵 Open Playlist
              </a>
            )}
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
            <div className="animate-bounce text-5xl">🔒</div>
            <p className="text-gray-500 mt-3 font-medium">
              This {memory.type.toLowerCase()} is locked
            </p>
            <p className="text-sm text-gray-400 italic">
              Unlocks at {new Date(memory.unlockTime).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

const ShowPage = () => {
  const [memories, setMemories] = useState([])

  useEffect(() => {
    setMemories(mockData) // later replace with API
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">
        ⏳ My Locked Time Capsules
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} />
        ))}
      </div>
    </div>
  )
}

export default ShowPage
