import AudioPage from '@/components/AudioPage'
import HomePage from '@/components/HomePage'
import ImagesPage from '@/components/ImagePage'
import LandingPage from '@/components/LandingPage'
import LoginPage from '@/components/LoginPage'
import PlaylistPage from '@/components/PlaylistPage'
import PredictionPage from '@/components/PredictionsPage'
import ProfilePage from '@/components/ProfilePage'
import RegisterPage from '@/components/RegisterPage'
import VideoPage from '@/components/VideoPage'
import { Route } from 'lucide-react'
import React from 'react'

const Routes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/image" element={<ImagesPage/>} />
      <Route path="/video" element={<VideoPage/>} />
      <Route path="/audio" element={<AudioPage/>} />
      <Route path="/playlist" element={<PlaylistPage/>} />
      <Route path="/prediction" element={<PredictionPage/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      
 </Routes>
  )
}

export default Routes
