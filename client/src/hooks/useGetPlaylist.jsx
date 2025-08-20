import axios from "axios";
import { useEffect, useState } from "react";

const useGetPlaylist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [unlocksAt, setUnlocksAt] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://starlockserver.onrender.com/api/starlock/playlist/getPlaylists`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setPlaylists(response.data.playlists || []);
          setSuccess(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setUnlocksAt(error.response.data.unlocksAt);
        } else {
          console.error("Error fetching playlists:", error);
        }
        setSuccess(false);
      }
    };

    fetchPlaylist();
  }, []);

  return { success, data: playlists, unlocksAt };
};

export default useGetPlaylist;
