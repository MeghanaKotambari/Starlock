import AudioPage from "@/components/AudioPage";
import HomePage from "@/components/HomePage";
import ImagesPage from "@/components/ImagePage";
import LandingPage from "@/components/LandingPage";
import LoginPage from "@/components/LoginPage";
import PlaylistPage from "@/components/PlaylistPage";
import PredictionPage from "@/components/PredictionsPage";
import ProfilePage from "@/components/ProfilePage";
import RegisterPage from "@/components/RegisterPage";
import SetTimePage from "@/components/SetTimePage";
import ShowPage from "@/components/ShowPage";
import ThoughtsPage from "@/components/ThoughtsPage";
import VideoPage from "@/components/VideoPage";
import React from "react";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/thoughts" element={<ThoughtsPage />} />
      <Route path="/image" element={<ImagesPage />} />
      <Route path="/videos" element={<VideoPage />} />
      <Route path="/audio" element={<AudioPage />} />
      <Route path="/playlist" element={<PlaylistPage />} />
      <Route path="/predictions" element={<PredictionPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/settime" element={<SetTimePage />} />
      <Route path="/show" element={<ShowPage />} />
      
      
    </Routes>
  );
};

export default AppRoutes;
