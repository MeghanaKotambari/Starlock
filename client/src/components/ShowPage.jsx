import React, { useState } from "react"
import useGetThoughts from "@/hooks/useGetThoughts"
import useGetImages from "@/hooks/useGetImages"
import useGetVideos from "@/hooks/useGetVideos"
import useGetAudios from "@/hooks/useGetAudios"
import useGetPredictions from "@/hooks/useGetPredictions"
import useGetPlaylist from "@/hooks/useGetPlaylist"

const ShowPage = () => {
  // Fetch each capsule type using your custom hooks
  const thoughtsResult = useGetThoughts()
  const imagesResult = useGetImages()
  const videosResult = useGetVideos()
  const audiosResult = useGetAudios()
  const predictionsResult = useGetPredictions()
  const playlistsResult = useGetPlaylist()

  // Track which cards are opened by their unique id
  const [opened, setOpened] = useState([])

  // Consolidate capsule data into a single flat list
  const capsules = [
    { result: thoughtsResult, type: "Thought" },
    { result: imagesResult, type: "Image" },
    { result: videosResult, type: "Video" },
    { result: audiosResult, type: "Audio" },
    { result: predictionsResult, type: "Prediction" },
    { result: playlistsResult, type: "Playlist" },
  ].flatMap(({ result, type }) => {
    if (!result) return []

    if (result.success && Array.isArray(result.data)) {
      // Map each item to include the type
      return result.data.map((item) => ({
        ...item,
        type,
        id: item._id || item.id, // ensure unique id field exists
        locked: false,
      }))
    } else if (result.unlocksAt) {
      // Locked capsule placeholder
      return [
        {
          id: `${type}_LOCKED`,
          type,
          locked: true,
          unlocksAt: result.unlocksAt,
        },
      ]
    }

    return []
  })

  // Handler for clicking a card
  const handleCardClick = (capsule) => {
    if (capsule.locked) {
      alert(
        `🔒 This ${capsule.type.toLowerCase()} capsule is locked!\nUnlocks at ${new Date(
          capsule.unlocksAt
        ).toLocaleString()}`
      )
    } else {
      setOpened((prev) => (prev.includes(capsule.id) ? prev : [...prev, capsule.id]))
    }
  }

  // Check if card is opened
  const isOpened = (id) => opened.includes(id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <h2 className="text-4xl font-bold text-center text-purple-800 mb-10">
        ⏳ My Locked Time Capsules
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {capsules.map((cap) => {
          const openedFlag = isOpened(cap.id)
          return (
            <div
              key={cap.id}
              onClick={() => handleCardClick(cap)}
              className="relative bg-white shadow-xl rounded-2xl overflow-hidden w-full md:w-96 border border-gray-200 cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-purple-700">{cap.type}</h3>
                {openedFlag && !cap.locked ? (
                  <div className="mt-4">
                    {cap.type === "Thought" && <p className="text-black">{cap.content}</p>}
                    {cap.type === "Image" && (
                      <img src={cap.content} alt={cap.title || "image"} className="rounded-lg w-full" />
                    )}
                    {cap.type === "Video" && (
                      <video controls className="w-full rounded-lg">
                        <source src={cap.content} type="video/mp4" />
                      </video>
                    )}
                    {cap.type === "Audio" && (
                      <audio controls className="w-full">
                        <source src={cap.content} type="audio/mpeg" />
                      </audio>
                    )}
                    {cap.type === "Prediction" && <p className="italic">{cap.content}</p>}
                    {cap.type === "Playlist" && (
                      <a
                        href={cap.content}
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
                      This {cap.type.toLowerCase()} is locked
                    </p>
                    {cap.locked && (
                      <p className="text-sm text-gray-400 italic">
                        Unlocks at {new Date(cap.unlocksAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ShowPage
