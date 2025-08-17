import React, { useState } from "react"
import { Video, Upload, GalleryVerticalEnd, Trash2 } from "lucide-react"

const VideoPage = () => {
  const [videos, setVideos] = useState([])

  // Handle file upload/capture
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newVideos = files.map((file) => ({
      src: URL.createObjectURL(file),
      description: "",
    }))
    setVideos((prev) => [...prev, ...newVideos])
  }

  // Update description
  const handleDescriptionChange = (index, value) => {
    const updatedVideos = [...videos]
    updatedVideos[index].description = value
    setVideos(updatedVideos)
  }

  // Delete video
  const handleDelete = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index)
    setVideos(updatedVideos)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GalleryVerticalEnd className="h-12 w-12 text-purple-500" />
            <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow">
              Capture Life in Motion 🎥
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "Turn Moments Into Movies"
          </p>
        </div>

        {/* Upload & Capture Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* Upload Box */}
          <label className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-10 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-xl transition">
            <Upload className="h-14 w-14 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <span className="text-gray-800 font-semibold text-lg">Upload Videos</span>
            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Capture Box */}
          <label className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-10 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-xl transition">
            <Video className="h-14 w-14 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <span className="text-gray-800 font-semibold text-lg">Record with Camera</span>
            <input
              type="file"
              accept="video/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.length > 0 ? (
            videos.map((vid, idx) => (
              <div
                key={idx}
                className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(idx)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Video */}
                <video
                  src={vid.src}
                  controls
                  className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
                />

                {/* Description */}
                <textarea
                  value={vid.description}
                  onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                  placeholder="Write your thoughts or a caption..."
                  className="w-full text-gray-700 border border-purple-200 rounded-xl p-3 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={4}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full italic">
              "Capture💜 Create💜 Cherish💜"
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPage
