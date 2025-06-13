import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore';

function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()

  console.log({onlineUsers})

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser});

  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <Homepage/>: <Navigate to="/login"/>}></Route>
        <Route path="/signup" element={!authUser ? <SignupPage/>: <Navigate to="/"/>}></Route>
        <Route path="/login" element={!authUser ?<LoginPage />: <Navigate to="/"/>}></Route>
        <Route path="/settings" element={<SettingsPage />}></Route>
        <Route path="/profile" element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
