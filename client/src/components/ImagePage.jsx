import React, { useState } from "react";
import axios from "axios";
import { Camera, Upload } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ImagesPage = () => {
  const [image, setImage] = useState(null); // { preview, file }
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Convert file to preview URL
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage({ preview: URL.createObjectURL(file), file });
    setDescription("");
    e.target.value = null; // reset input
  };

  const handleSubmit = async () => {
    if (!image || !description) return alert("Image and description required.");

    setUploading(true);

    try {
      // Prepare form for Pinata
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append(
        "pinataMetadata",
        JSON.stringify({ name: image.file.name })
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
            pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
          },
        }
      );

      const ipfsHash = res.data.IpfsHash;

      // Send IPFS hash + description to your backend
      const response = await axios.post(
        "https://starlockserver.onrender.com/api/starlock/image/addImage",
        {
          image: ipfsHash,
          imageDescription: description,
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
      // Reset
      setImage(null);
      setDescription("");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error(err.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-purple-800 drop-shadow flex items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-purple-500" /> Memory Vault
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            “Every picture tells your story.”
          </p>
        </div>

        {/* Upload / Capture buttons */}
        <div className="flex gap-8 justify-center mb-10">
          <label className="cursor-pointer group flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl p-8 bg-white/80 backdrop-blur-lg shadow-md hover:shadow-xl transition w-40">
            <Upload className="h-12 w-12 text-purple-600 mb-2 group-hover:scale-110 transition" />
            <span className="text-gray-800 font-semibold text-center">
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Preview + Description */}
        {image && (
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-purple-200 max-w-md mx-auto">
            <img
              src={image.preview}
              alt="Selected"
              className="w-full h-64 object-contain rounded-lg mb-4"
            />
            <textarea
              rows={4}
              placeholder="Add a description or thoughts about this image..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none bg-gray-50"
            />
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="mt-4 w-full cursor-pointer bg-purple-600 text-white py-3 rounded-xl shadow hover:bg-purple-700 transition disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Add"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagesPage;
