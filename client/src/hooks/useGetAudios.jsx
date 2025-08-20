import axios from "axios";
import { useEffect, useState } from "react";

const useGetAudios = () => {
  const [audios, setAudios] = useState([]);
  const [unlocksAt, setUnlocksAt] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const response = await axios.get(
          `https://starlockserver.onrender.com/api/starlock/audio/getAudios`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setAudios(response.data.audios || []);
          setSuccess(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Capsule is locked
          setUnlocksAt(error.response.data.unlocksAt);
        } else {
          console.error("Error fetching audios:", error);
        }
        setSuccess(false);
      }
    };

    fetchAudios();
  }, []);

  return { success, data: audios, unlocksAt };
};

export default useGetAudios;
