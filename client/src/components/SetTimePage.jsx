import React, { useState } from "react"

const MemoryCard = ({ type, emoji }) => {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!date || !time) return

    // Combine date + time into a JS Date
    const localDateTime = new Date(`${date}T${time}:00`)
    // Convert to ISO UTC format
    const isoString = localDateTime.toISOString()

    // Example: send to backend
    const payload = {
      type,
      unlockTime: isoString,
    }

    console.log("Payload →", payload)

    // Replace with actual backend API call:
    // await fetch("/api/save", { method: "POST", body: JSON.stringify(payload) })

    alert(`${type} memory set for ${isoString} ✅`)
    setDate("")
    setTime("")
  }

  return (
    <div className="bg-white/90 shadow-lg rounded-2xl p-6 w-full md:w-80">
      <h3 className="text-xl font-semibold mb-4">
        {emoji} {type}
      </h3>
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
    </div>
  )
}

const SetTimePage = () => {
  const memoryTypes = [
    { type: "Thought", emoji: "💭" },
    { type: "Image", emoji: "🖼️" },
    { type: "Audio", emoji: "🎵" },
    { type: "Video", emoji: "🎥" },
    { type: "Prediction", emoji: "🔮" },
    { type: "Playlist", emoji: "🎶" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">
        Set Time Capsules
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {memoryTypes.map((item) => (
          <MemoryCard key={item.type} type={item.type} emoji={item.emoji} />
        ))}
      </div>
    </div>
  )
}

export default SetTimePage
