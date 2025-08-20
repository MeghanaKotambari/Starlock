import axios from "axios";
import { useState, useEffect } from "react";

const useGetVideos = () => {
  const [videos, setVideos] = useState([]);
  const [unlockTime, setUnlockTime] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://starlockserver.onrender.com/api/starlock/video/getVideos`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setVideos(response.data.videos || []);
          setSuccess(true);
          setUnlockTime(null);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setUnlockTime(err.response.data.unlocksAt);
        }
        setSuccess(false);
        setVideos([]);
      }
    };

    fetchVideos();
  }, []);

  return { success, data: videos, unlocksAt: unlockTime };
};

export default useGetVideos;
