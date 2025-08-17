import React, { useState } from "react";
import { Video, Upload, GalleryVerticalEnd, Trash2 } from "lucide-react";
import axios from "axios";

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);

    try {
      const uploadedVideos = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append(
            "pinataMetadata",
            JSON.stringify({ name: file.name })
          );
          formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

          // Upload to Pinata
          const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                pinata_secret_api_key: import.meta.env
                  .VITE_PINATA_SECRET_API_KEY,
              },
            }
          );

          const ipfsHash = res.data.IpfsHash;
          const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

          // Add to local state with empty description
          return { ipfsHash, src: url, description: "" };
        })
      );

      setVideos((prev) => [...prev, ...uploadedVideos]);
    } catch (error) {
      console.error("Video upload failed:", error);
      alert("Failed to upload videos.");
    } finally {
      setUploading(false);
    }
  };

  const handleDescriptionChange = (index, value) => {
    const updated = [...videos];
    updated[index].description = value;
    setVideos(updated);
  };

  const handleDelete = (index) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
  };

  const handleSaveToBackend = async (index) => {
    const { ipfsHash, description } = videos[index];

    if (!ipfsHash || !description.trim()) {
      return alert("Please add a description before saving.");
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/starlock/video/addVideo",
        {
          video: ipfsHash,
          videoDescription: description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert("Video saved to backend successfully!");
      console.log("Backend response:", res.data);
      setVideos((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error saving to backend:", error);
      alert("Failed to save video to backend.");
    }
  };

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

        {/* Upload Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <label className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-10 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-xl transition">
            <Upload className="h-14 w-14 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <span className="text-gray-800 font-semibold text-lg">
              {uploading ? "Uploading..." : "Upload Videos"}
            </span>
            <input
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>

          <label className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-10 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-xl transition">
            <Video className="h-14 w-14 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <span className="text-gray-800 font-semibold text-lg">
              {uploading ? "Uploading..." : "Record with Camera"}
            </span>
            <input
              type="file"
              accept="video/*"
              capture="environment"
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        </div>

        {/* Uploaded Videos with Description and Save Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.length > 0 ? (
            videos.map((vid, idx) => (
              <div
                key={idx}
                className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col"
              >
                <button
                  onClick={() => handleDelete(idx)}
                  className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-md"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <video
                  src={vid.src}
                  controls
                  className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
                />

                <textarea
                  value={vid.description}
                  onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                  placeholder="Write your thoughts or a caption..."
                  className="w-full text-gray-700 border border-purple-200 rounded-xl p-3 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none mb-3"
                  rows={4}
                />

                <button
                  onClick={() => handleSaveToBackend(idx)}
                  className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition disabled:opacity-60"
                  disabled={!vid.description.trim()}
                >
                  Save to Backend
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full italic">
              "Capture 💜 Create 💜 Cherish 💜"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
