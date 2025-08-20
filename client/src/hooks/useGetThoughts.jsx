import axios from "axios";
import { useState, useEffect } from "react";

const useGetThoughts = () => {
  const [thoughts, setThoughts] = useState([]);
  const [unlockTime, setUnlockTime] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await axios.get(
          `https://starlockserver.onrender.com/api/starlock/thought/getThoughts`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setThoughts(response.data.thoughts || []);
          setSuccess(true);
          setUnlockTime(null);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setUnlockTime(err.response.data.unlocksAt);
        }
        setSuccess(false);
        setThoughts([]);
      }
    };

    fetchThoughts();
  }, []);

  return { success, data: thoughts, unlocksAt: unlockTime };
};

export default useGetThoughts;
