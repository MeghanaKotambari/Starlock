import axios from "axios";
import { useEffect, useState } from "react";

const useGetImages = () => {
  const [images, setImages] = useState([]);
  const [unlocksAt, setUnlocksAt] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://starlockserver.onrender.com/api/starlock/image/getImages`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setImages(response.data.images || []);
          setSuccess(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setUnlocksAt(error.response.data.unlocksAt);
        } else {
          console.error("Error fetching images:", error);
        }
        setSuccess(false);
      }
    };

    fetchImages();
  }, []);

  return { success, data: images, unlocksAt };
};

export default useGetImages;
