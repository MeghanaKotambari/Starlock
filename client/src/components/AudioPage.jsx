import React, { useState } from "react";
import axios from "axios";
import { Mic, Upload, GalleryVerticalEnd } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AudioPage = () => {
  const [audios, setAudios] = useState([]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newAudios = files.map((file) => ({
      file,
      src: URL.createObjectURL(file),
      description: "",
      ipfsHash: null,
    }));
    setAudios((prev) => [...prev, ...newAudios]);
  };

  const handleDescriptionChange = (index, value) => {
    const updated = [...audios];
    updated[index].description = value;
    setAudios(updated);
  };

  const handleUpload = async (index) => {
    const audio = audios[index];
    if (!audio.description || !audio.file) {
      alert("Please add a description before uploading.");
      return;
    }

    setUploadingIndex(index);

    try {
      const formData = new FormData();
      formData.append("file", audio.file);
      formData.append(
        "pinataMetadata",
        JSON.stringify({ name: audio.file.name })
      );
      formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        }
      );

      const ipfsHash = res.data.IpfsHash;

      const response = await axios.post(
        "https://starlockserver.onrender.com/api/starlock/audio/addAudio",
        {
          audio: ipfsHash,
          audioDescription: audio.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
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
      navigate("/home");

      // Mark uploaded in state
      const updated = [...audios];
      updated[index].ipfsHash = ipfsHash;
      setAudios(updated);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setUploadingIndex(null);
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
              AudioTreasure
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            “Capture voices, preserve emotions.”
          </p>
        </div>

        {/* Upload & Record */}
        <div className="w-full flex items-center justify-center gap-6 mb-12">
          <label className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-purple-200 rounded-2xl p-10 bg-white/70 backdrop-blur-lg shadow-md hover:shadow-xl transition">
            <Upload className="h-14 w-14 text-purple-500 mb-3 group-hover:scale-110 transition" />
            <span className="text-gray-800 font-semibold text-lg">
              Upload Audio
            </span>
            <input
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Audio Cards */}
        <div className="gap-8">
          {audios.length > 0 ? (
            audios.map((audio, idx) => (
              <div
                key={idx}
                className="relative bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col"
              >
                <audio src={audio.src} controls className="w-full mb-4" />

                <textarea
                  value={audio.description}
                  onChange={(e) => handleDescriptionChange(idx, e.target.value)}
                  placeholder="Write your thoughts or a caption..."
                  className="w-full text-gray-700 border border-purple-200 rounded-xl p-3 bg-gray-50/60 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={4}
                />

                <button
                  onClick={() => handleUpload(idx)}
                  disabled={uploadingIndex === idx || audio.ipfsHash}
                  className={`mt-4 w-full ${
                    audio.ipfsHash ? "bg-green-500" : "bg-purple-600"
                  } text-white py-2 rounded-xl shadow hover:opacity-90 transition disabled:opacity-60`}
                >
                  {audio.ipfsHash
                    ? "Uploaded ✅"
                    : uploadingIndex === idx
                    ? "Uploading..."
                    : "Add"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full italic">
              “Record💜 Reflect💜 Remember💜”
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioPage;
