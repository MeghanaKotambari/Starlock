import axios from "axios";
import { useEffect, useState } from "react";

const useGetPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [unlocksAt, setUnlocksAt] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/starlock/prediction/getPredictions`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setPredictions(response.data.predictions || []);
          setSuccess(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setUnlocksAt(error.response.data.unlocksAt);
        } else {
          console.error("Error fetching predictions:", error);
        }
        setSuccess(false);
      }
    };

    fetchPredictions();
  }, []);

  return { success, data: predictions, unlocksAt };
};

export default useGetPredictions;
