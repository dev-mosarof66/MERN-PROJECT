import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getAuthUser } from './lib/userSlice.js'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile.jsx'
import Upload from './components/Upload.jsx'
import YourReels from './components/YourReels.jsx'

const App = () => {
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.user.authUser)
  const authStatus = useSelector((state) => state.user.status)

  useEffect(() => {
    dispatch(getAuthUser())
  }, [dispatch])

  if (authStatus === "loading") {
    return <div className='w-full h-screen bg-black flex items-center justify-center'><span className="loading loading-infinity loading-xl bg-green-600"></span></div>
  }

  return (
    <Routes>
      <Route path='/' element={authUser !== null ? <Home /> : <Navigate to='/login' />} />
      <Route path='/login' element={authUser === null ? <Login /> : <Navigate to='/' />} />
      <Route path='/signup' element={authUser === null ? <Signup /> : <Navigate to='/login' />} />

      <Route path='/dashboard' element={ authUser !== null ? <Profile /> : <Navigate to='/login' />} >
        <Route path='upload' element={<Upload />} />
        <Route path='uploaded-reels' element={<YourReels />} />
      </Route>
    </Routes>
  )
}

export default App
