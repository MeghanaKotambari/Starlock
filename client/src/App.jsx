import './App.css'
import AudioPage from './components/AudioPage'
import HomePage from './components/HomePage'
import ImagesPage from './components/ImagePage'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import PlaylistPage from './components/PlaylistPage'
import PredictionPage from './components/PredictionsPage'
import ProfilePage from './components/ProfilePage'
import RegisterPage from './components/RegisterPage'
import ThoughtsPage from './components/ThoughtsPage'
import VideoPage from './components/VideoPage'
import Routes from './Routes/Routes'

function App() {
  return (
    <>
      <LandingPage />
      <LoginPage/>
      <RegisterPage/>
      <HomePage/>
      <ThoughtsPage/>
      <ImagesPage/>
      <VideoPage/>
      <AudioPage/>
      <PlaylistPage/>
      <PredictionPage/>
      <ProfilePage/>
   
    </>
  )
}

export default App
