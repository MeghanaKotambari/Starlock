import React, { useState, useEffect } from "react"
import { PlusCircle, Trash2, Sparkles } from "lucide-react"

const ThoughtsPage = () => {
  const [thoughts, setThoughts] = useState(() => {
    const saved = localStorage.getItem("thoughts")
    return saved ? JSON.parse(saved) : []
  })
  const [newThought, setNewThought] = useState("")

  useEffect(() => {
    localStorage.setItem("thoughts", JSON.stringify(thoughts))
  }, [thoughts])

  const addThought = () => {
    if (newThought.trim() === "") return
    setThoughts([{ id: Date.now(), text: newThought }, ...thoughts])
    setNewThought("")
  }

  const deleteThought = (id) => {
    setThoughts(thoughts.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-purple-50 to-gray-200 flex flex-col items-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 opacity-30 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 opacity-25 blur-3xl rounded-full"></div>

      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md shadow-md border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-600" /> Starlock Thoughts
        </h1>
        <a 
          href="/homepage" 
          className="px-4 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          Home
        </a>
      </header>

      {/* Title */}
      <section className="text-center mt-12 max-w-2xl px-4">
        <h2 className="text-5xl font-extrabold text-purple-800 tracking-tight">
          💭 Thoughts that Shine
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Capture sparks of inspiration, thoughts, and reflections in a safe space ✨
        </p>
      </section>

      {/* Input Section */}
      <div className="mt-10 w-full max-w-2xl flex gap-3 px-6">
        <input
          type="text"
          placeholder="Write a thought and let it shine..."
          value={newThought}
          onChange={(e) => setNewThought(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm bg-white/80 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={addThought}
          className="flex items-center gap-2 px-5 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          <PlusCircle className="w-5 h-5" /> Add
        </button>
      </div>

      {/* Thoughts List */}
      <div className="mt-12 w-full max-w-3xl px-6">
        {thoughts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Let the thoughts of life sparkle✨
          </p>
        ) : (
          <div className="grid gap-5">
            {thoughts.map((thought) => (
              <div
                key={thought.id}
                className="bg-white/80 backdrop-blur-md p-5 rounded-xl shadow-lg shadow-gray-300 border border-gray-200 flex justify-between items-center hover:shadow-xl transition"
              >
                <p className="text-gray-700 text-lg">{thought.text}</p>
                <button
                  onClick={() => deleteThought(thought.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    
    </div>
  )
}

export default ThoughtsPage
