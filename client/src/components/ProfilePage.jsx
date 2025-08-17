import React, { useEffect, useState } from "react"
import { User, Mail, Clock, Image, Video, Quote, Lock } from "lucide-react"

const ProfilePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Dummy user data
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    bio: "Dreamer ✨ | Capturing memories & thoughts | Living in moments.",
    avatar: "https://i.pravatar.cc/150?img=12",
  }

  // Dummy user posts
  const userPosts = [
    {
      type: "image",
      title: "Beach Sunset 🌅",
      unlockTime: "2025-08-20T19:30:00", // use ISO date format
      preview: "https://picsum.photos/300/200?random=1",
    },
    {
      type: "video",
      title: "Birthday Celebration 🎉",
      unlockTime: "2025-09-01T18:00:00",
      preview: "https://picsum.photos/300/200?random=2",
    },
    {
      type: "thought",
      title: "Life is about moments ✨",
      unlockTime: "2025-08-25T09:00:00",
      preview: null,
    },
  ]

  // Choose icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "image":
        return <Image className="h-5 w-5 text-purple-500" />
      case "video":
        return <Video className="h-5 w-5 text-pink-500" />
      case "thought":
        return <Quote className="h-5 w-5 text-blue-500" />
      default:
        return <User className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 px-6 py-10 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 mb-10">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-purple-300"
          />
          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
              <User className="h-6 w-6 text-purple-500" />
              {user.name}
            </h2>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <Mail className="h-5 w-5 text-gray-500" />
              {user.email}
            </p>
            <p className="mt-4 text-gray-700 italic">{user.bio}</p>
          </div>
        </div>

        {/* User Added Section */}
        <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">
          Your Memories & Thoughts 📚
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userPosts.map((post, idx) => {
            const unlockDate = new Date(post.unlockTime)
            const isUnlocked = currentTime >= unlockDate

            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl shadow-lg hover:shadow-2xl transition flex flex-col"
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  {getIcon(post.type)}
                  <h4 className="font-semibold text-lg text-gray-800">
                    {post.title}
                  </h4>
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
                  <div className="w-full h-40 flex flex-col items-center justify-center bg-gray-200 rounded-lg text-gray-600">
                    <Lock className="h-8 w-8 mb-2 text-gray-500" />
                    <span>Locked until {unlockDate.toLocaleString()}</span>
                  </div>
                )}

                {/* Unlock Info */}
                <div className="flex items-center gap-2 mt-auto text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-purple-500" />
                  {isUnlocked ? (
                    <span className="font-medium text-green-600">Unlocked 🎉</span>
                  ) : (
                    <span className="font-medium text-purple-700">
                      Unlocks at: {unlockDate.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
