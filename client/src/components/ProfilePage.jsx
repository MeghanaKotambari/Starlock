import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Clock,
  Image,
  Video,
  Quote,
  Lock,
  ListPlus,
  AudioLines,
  TrendingUpDown,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState(null);
  const { user } = useSelector((store) => store.auth);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchUploadCount = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/starlock/profile/getUploadsLength`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setData(response.data.counts);
    };
    fetchUploadCount();
  }, []);

  const LoginedUser = {
    name: user?.username,
    email: user?.email,
    bio: "Dreamer ✨ | Capturing memories & thoughts | Living in moments.",
  };

  const userPosts = [
    {
      type: "image",
      title: "Images",
      uploads: data?.imagesCount ?? 0,
      unlockTime: data?.imageUnlockTime,
      preview: "https://picsum.photos/300/200?random=1",
    },
    {
      type: "video",
      title: "Videos",
      uploads: data?.videosCount ?? 0,
      unlockTime: data?.videoUnlockTime,
      preview: "https://picsum.photos/300/200?random=2",
    },
    {
      type: "thought",
      title: "Thoughts",
      uploads: data?.thoughtsCount ?? 0,
      unlockTime: data?.thoughtUnlockTime,
      preview: null,
    },
    {
      type: "playlist",
      title: "Playlists",
      uploads: data?.playlistsCount ?? 0,
      unlockTime: data?.playlistUnlockTime,
      preview: null,
    },
    {
      type: "audio",
      title: "Audios",
      uploads: data?.audiosCount ?? 0,
      unlockTime: data?.audioUnlockTime,
      preview: null,
    },
    {
      type: "prediction",
      title: "Predictions",
      uploads: data?.predictionsCount ?? 0,
      unlockTime: data?.predictionUnlockTime,
      preview: null,
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5 text-purple-500" />;
      case "video":
        return <Video className="h-5 w-5 text-pink-500" />;
      case "thought":
        return <Quote className="h-5 w-5 text-blue-500" />;
      case "playlist":
        return <ListPlus className="h-5 w-5 text-blue-500" />;
      case "audio":
        return <AudioLines className="h-5 w-5 text-blue-500" />;
      case "prediction":
        return <TrendingUpDown className="h-5 w-5 text-blue-500" />;
      default:
        return <User className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 px-6 py-20 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
              <User className="h-6 w-6 text-purple-500" />
              {LoginedUser.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <Mail className="h-5 w-5 text-gray-500" />
              {LoginedUser.email}
            </p>
            <p className="mt-4 text-gray-700 italic">{LoginedUser.bio}</p>
          </div>
        </div>

        {/* Section Title */}
        <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Your Memories & Thoughts 📚
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPosts.map((post, idx) => {
            const unlockDate = new Date(post.unlockTime);
            const isUnlocked = currentTime >= unlockDate;

            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-2">
                  {getIcon(post.type)}
                  <h4 className="font-semibold text-lg text-gray-800">
                    {post.title}
                  </h4>
                </div>

                {/* Upload Count */}
                <div className="text-sm text-gray-600 mb-3">
                  Uploads:{" "}
                  <span className="font-medium text-purple-700">
                    {post.uploads}
                  </span>
                </div>

                {/* Preview or Locked */}
                {isUnlocked ? (
                  post.preview ? (
                    <img
                      src={post.preview}
                      alt={post.title}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 italic">
                      {post.title}
                    </div>
                  )
                ) : (
                  <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-200 rounded-lg text-gray-600 mb-4">
                    <Lock className="h-8 w-8 mb-2 text-gray-500" />
                    <span>Locked until {unlockDate.toLocaleString()}</span>
                  </div>
                )}

                {/* Unlock Info */}
                <div className="flex items-center gap-2 mt-auto text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-purple-500" />
                  {isUnlocked ? (
                    <span className="font-medium text-green-600">
                      Unlocked 🎉
                    </span>
                  ) : (
                    <span className="font-medium text-purple-700">
                      Unlocks at: {unlockDate.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
